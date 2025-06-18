
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("=== CREATE-CHECKOUT FUNCTION STARTED ===");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar todas as variáveis de ambiente
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    console.log("Environment variables check:");
    console.log("- SUPABASE_URL:", supabaseUrl ? "✓ Present" : "✗ Missing");
    console.log("- SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Present" : "✗ Missing");
    console.log("- SUPABASE_SERVICE_KEY:", supabaseServiceKey ? "✓ Present" : "✗ Missing");
    console.log("- STRIPE_SECRET_KEY:", stripeKey ? `✓ Present (starts with: ${stripeKey.substring(0, 7)}...)` : "✗ Missing");

    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY não encontrada!");
      return new Response(JSON.stringify({ 
        error: "Configuração do Stripe ausente. Verifique se STRIPE_SECRET_KEY está configurada nos secrets da Edge Function.",
        details: "STRIPE_SECRET_KEY not found in environment"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!stripeKey.startsWith('sk_')) {
      console.error("Formato da chave Stripe inválido:", stripeKey.substring(0, 10));
      return new Response(JSON.stringify({ 
        error: "Chave do Stripe com formato inválido. Deve começar com 'sk_'",
        details: `Key format invalid: ${stripeKey.substring(0, 10)}`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("✓ Stripe key validated successfully");

    // Usar chave anônima para autenticação do usuário
    const supabaseAuth = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
    
    // Usar chave de serviço para operações de perfil
    const supabaseAdmin = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.log("❌ No authorization header provided");
      return new Response(JSON.stringify({ 
        error: "Token de autorização necessário",
        details: "No authorization header"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("🔐 Authenticating user with token...");
    
    const { data, error: authError } = await supabaseAuth.auth.getUser(token);
    
    if (authError) {
      console.error("❌ Authentication error:", authError.message);
      return new Response(JSON.stringify({ 
        error: "Erro de autenticação: " + authError.message,
        details: authError
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const user = data.user;
    if (!user?.email) {
      console.log("❌ No user or email found");
      return new Response(JSON.stringify({ 
        error: "Usuário não encontrado ou email ausente",
        details: "User not found or no email"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    console.log("✓ User authenticated successfully:", user.email);

    // Garantir que o perfil existe usando chave de serviço
    console.log("📝 Ensuring user profile exists...");
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
      console.log("⚠️ Profile upsert warning:", profileError.message);
    } else {
      console.log("✓ Profile ensured for user:", user.id);
    }

    console.log("💳 Initializing Stripe with key...");
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    console.log("🔍 Checking for existing Stripe customer...");
    // Verificar se o cliente já existe
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("✓ Existing Stripe customer found:", customerId);
    } else {
      console.log("ℹ️ No existing customer found, will create new one during checkout");
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    console.log("🛒 Creating Stripe checkout session for origin:", origin);
    
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

    console.log("✅ Checkout session created successfully!");
    console.log("Session ID:", session.id);
    console.log("Session URL:", session.url);

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("💥 CRITICAL ERROR IN CREATE-CHECKOUT:");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    // Retornar erro mais detalhado para debug
    return new Response(JSON.stringify({ 
      error: `Erro interno do servidor: ${error.message}`,
      details: {
        type: error.constructor.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5) // Primeiras 5 linhas do stack
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
