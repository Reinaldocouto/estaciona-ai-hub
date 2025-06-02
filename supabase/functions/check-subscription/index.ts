
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    console.log("Starting subscription check...");
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.log("No authorization header");
      return new Response(JSON.stringify({ 
        isPremium: false,
        premiumUntil: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !data.user) {
      console.log("User authentication failed:", userError);
      return new Response(JSON.stringify({ 
        isPremium: false,
        premiumUntil: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const user = data.user;
    console.log("User authenticated:", user.id);

    // Check profile in database
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("premium, premium_until")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.log("Profile error:", profileError);
      // Try to create profile if it doesn't exist
      if (profileError.code === 'PGRST116') {
        const { error: insertError } = await supabaseClient
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email,
            premium: false,
            premium_until: null
          });
        
        if (insertError) {
          console.log("Failed to create profile:", insertError);
        }
      }
      
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

    console.log("Premium status:", { isPremium, premiumUntil: profile?.premium_until });

    return new Response(JSON.stringify({ 
      isPremium: isPremium || false,
      premiumUntil: profile?.premium_until || null
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in check-subscription:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      isPremium: false,
      premiumUntil: null 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200, // Return 200 to avoid breaking the app
    });
  }
});
