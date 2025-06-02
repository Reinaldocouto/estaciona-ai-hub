
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();
  
  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    return new Response(`Webhook signature verification failed`, { status: 400 });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  switch (receivedEvent.type) {
    case "checkout.session.completed": {
      const session = receivedEvent.data.object;
      const userId = session.client_reference_id;
      
      if (session.mode === "subscription") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        const { error } = await supabaseClient
          .from("profiles")
          .update({
            premium: true,
            premium_until: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (error) {
          console.error("Error updating user premium status:", error);
        }
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = receivedEvent.data.object;
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      
      if (customer && !customer.deleted) {
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
        }
      }
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
