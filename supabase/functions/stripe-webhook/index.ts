
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not configured");
    return new Response("Stripe not configured", { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2023-10-16",
  });

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  
  let event;
  try {
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
    } else {
      // For development, parse without signature verification
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("Received webhook event:", event.type);

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.client_reference_id;
        
        console.log("Processing checkout.session.completed for user:", userId);
        
        if (session.mode === "subscription" && userId) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const premiumUntil = new Date(subscription.current_period_end * 1000).toISOString();
          
          console.log("Updating user premium status:", { userId, premiumUntil });
          
          const { error } = await supabaseClient
            .from("profiles")
            .upsert({
              id: userId,
              premium: true,
              premium_until: premiumUntil,
              updated_at: new Date().toISOString(),
            });

          if (error) {
            console.error("Error updating user premium status:", error);
          } else {
            console.log("Successfully updated premium status for user:", userId);
          }
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Processing subscription cancellation:", subscription.id);
        
        // Find user by customer ID
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if (customer && !customer.deleted && customer.email) {
          const { error } = await supabaseClient
            .from("profiles")
            .update({
              premium: false,
              premium_until: null,
              updated_at: new Date().toISOString(),
            })
            .eq("email", customer.email);

          if (error) {
            console.error("Error removing user premium status:", error);
          } else {
            console.log("Successfully removed premium status for:", customer.email);
          }
        }
        break;
      }
      
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        if (invoice.billing_reason === "subscription_cycle") {
          console.log("Processing subscription renewal:", invoice.subscription);
          
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          
          if (customer && !customer.deleted && customer.email) {
            const premiumUntil = new Date(subscription.current_period_end * 1000).toISOString();
            
            const { error } = await supabaseClient
              .from("profiles")
              .update({
                premium: true,
                premium_until: premiumUntil,
                updated_at: new Date().toISOString(),
              })
              .eq("email", customer.email);

            if (error) {
              console.error("Error updating renewal:", error);
            } else {
              console.log("Successfully updated renewal for:", customer.email);
            }
          }
        }
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(`Webhook Error: ${error.message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
