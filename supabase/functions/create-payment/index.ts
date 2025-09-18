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
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    if (!stripeKey || !stripeKey.startsWith("sk_")) {
      return new Response(JSON.stringify({ error: "Stripe não configurado corretamente" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Token de autorização necessário" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error: authError } = await supabaseAuth.auth.getUser(token);
    if (authError) {
      return new Response(JSON.stringify({ error: "Erro de autenticação" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const user = data.user;
    if (!user?.email) {
      return new Response(JSON.stringify({ error: "Usuário sem e-mail" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const body = await req.json().catch(() => ({}));
    const amount = typeof body.amount === 'number' ? body.amount : 0; // em centavos
    const currency = body.currency || 'brl';
    const description = body.description || 'Pagamento de reserva';
    const metadata = body.metadata || {};

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Valor inválido para pagamento" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Reutiliza cliente se já existir
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const origin = req.headers.get("origin") || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: description },
            unit_amount: amount, // em centavos
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
        ...metadata,
      },
      success_url: `${origin}/spaces/${metadata?.space_id || ''}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/spaces/${metadata?.space_id || ''}?payment=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
