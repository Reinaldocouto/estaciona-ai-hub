
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

  try {
    console.log("Starting checkout creation...");
    
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response(JSON.stringify({ 
        error: "Stripe não configurado. Entre em contato com o suporte." 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ 
        error: "Usuário não autenticado" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      return new Response(JSON.stringify({ 
        error: "Usuário não encontrado" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    console.log("User authenticated for checkout:", user.email);

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Existing customer found:", customerId);
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Estaciona Aí Premium",
              description: "Acesso premium com descontos exclusivos e prioridade na busca",
            },
            unit_amount: 2990, // R$ 29,90
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      client_reference_id: user.id,
      success_url: `${origin}/premium?success=true`,
      cancel_url: `${origin}/premium?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ 
      error: `Erro ao processar pagamento: ${error.message}` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
