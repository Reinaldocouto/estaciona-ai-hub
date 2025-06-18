
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("=== CHECK-SUBSCRIPTION FUNCTION STARTED ===");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Usar chave de serviço para bypass RLS em operações de perfil
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("🔧 Supabase client initialized with service role key");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.log("ℹ️ No authorization header - returning default status");
      return new Response(JSON.stringify({ 
        isPremium: false,
        premiumUntil: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Usar chave anônima para autenticação do usuário
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    console.log("🔐 Authenticating user...");
    
    const { data, error: userError } = await supabaseAuth.auth.getUser(token);
    
    if (userError || !data.user) {
      console.log("❌ User authentication failed:", userError?.message || "No user data");
      return new Response(JSON.stringify({ 
        isPremium: false,
        premiumUntil: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const user = data.user;
    console.log("✓ User authenticated:", user.id, user.email);

    // Garantir que o perfil existe usando chave de serviço
    console.log("📝 Ensuring profile exists...");
    const { error: upsertError } = await supabaseClient
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        premium: false,
        premium_until: null
      }, {
        onConflict: 'id'
      });

    if (upsertError) {
      console.log("⚠️ Profile upsert warning:", upsertError.message);
    } else {
      console.log("✓ Profile ensured for user:", user.id);
    }

    // Verificar status do perfil
    console.log("🔍 Checking premium status...");
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("premium, premium_until")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.log("❌ Profile fetch error:", profileError.message);
      return new Response(JSON.stringify({ 
        isPremium: false,
        premiumUntil: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const isPremium = profile?.premium && 
      profile?.premium_until && 
      new Date(profile.premium_until) > new Date();

    console.log("📊 Premium status result:", { 
      isPremium, 
      premiumUntil: profile?.premium_until,
      premium: profile?.premium 
    });

    return new Response(JSON.stringify({ 
      isPremium: isPremium || false,
      premiumUntil: profile?.premium_until || null
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("💥 ERROR in check-subscription:");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      isPremium: false,
      premiumUntil: null,
      details: {
        type: error.constructor.name,
        message: error.message
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200, // Retorna 200 para não quebrar a aplicação
    });
  }
});
