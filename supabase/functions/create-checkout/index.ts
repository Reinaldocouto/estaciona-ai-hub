
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
    console.log("=== STARTING CHECKOUT CREATION ===");
    
    // Check all environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    console.log("Environment check:", {
      supabaseUrl: supabaseUrl ? "✓ Present" : "✗ Missing",
      supabaseAnonKey: supabaseAnonKey ? "✓ Present" : "✗ Missing",
      supabaseServiceKey: supabaseServiceKey ? "✓ Present" : "✗ Missing",
      stripeKey: stripeKey ? `✓ Present (${stripeKey.substring(0, 8)}...)` : "✗ Missing"
    });

    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY is not configured in environment");
      return new Response(JSON.stringify({ 
        error: "Stripe não configurado. Verifique as configurações do sistema." 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!stripeKey.startsWith('sk_')) {
      console.error("Invalid Stripe key format:", stripeKey.substring(0, 10));
      return new Response(JSON.stringify({ 
        error: "Chave do Stripe inválida. Verifique se começam com sk_" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("✓ Stripe key validated");

    // Use anon key for user authentication
    const supabaseAuth = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
    
    // Use service role key for profile operations
    const supabaseAdmin = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.log("No authorization header provided");
      return new Response(JSON.stringify({ 
        error: "Usuário não autenticado" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Authenticating user...");
    
    const { data, error: authError } = await supabaseAuth.auth.getUser(token);
    
    if (authError) {
      console.error("Authentication error:", authError);
      return new Response(JSON.stringify({ 
        error: "Erro de autenticação: " + authError.message 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const user = data.user;
    if (!user?.email) {
      console.log("No user or email found");
      return new Response(JSON.stringify({ 
        error: "Usuário não encontrado" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    console.log("✓ User authenticated:", user.email);

    // Ensure profile exists using service role
    console.log("Ensuring profile exists...");
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        premium: false,
        premium_until: null
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.log("Profile upsert error:", profileError);
    } else {
      console.log("✓ Profile ensured for user:", user.id);
    }

    console.log("Initializing Stripe...");
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    console.log("Checking for existing customer...");
    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("✓ Existing customer found:", customerId);
    } else {
      console.log("No existing customer found, will create new one");
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    console.log("Creating checkout session for origin:", origin);
    
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

    console.log("✓ Checkout session created successfully:", session.id);
    console.log("Session URL:", session.url);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("=== ERROR IN CREATE-CHECKOUT ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: `Erro ao processar pagamento: ${error.message}` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
