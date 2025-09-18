import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'
import Stripe from 'https://esm.sh/stripe@13.6.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ProcessPaymentRequest {
  sessionId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { sessionId }: ProcessPaymentRequest = await req.json()
    
    console.log('Processing payment success for session:', sessionId)
    
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    const metadata = session.metadata
    if (!metadata) {
      throw new Error('No metadata found in session')
    }

    // Get user from auth token
    const authToken = metadata.auth_token
    const { data: { user }, error: authError } = await supabase.auth.getUser(authToken)
    
    if (authError || !user) {
      throw new Error('Invalid auth token')
    }

    console.log('Creating reservation for user:', user.id)

    // Create the reservation
    const startDateTime = new Date(`${metadata.selected_date}T${metadata.start_time}:00`)
    const endDateTime = new Date(`${metadata.selected_date}T${metadata.end_time}:00`)

    const { data: reservation, error: reservationError } = await supabase
      .from('reservas')
      .insert({
        user_id: user.id,
        vaga_id: metadata.space_id,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        total_price: parseFloat(metadata.total_price),
        status: 'confirmed'
      })
      .select()
      .single()

    if (reservationError) {
      console.error('Error creating reservation:', reservationError)
      throw reservationError
    }

    console.log('Reservation created successfully:', reservation)

    return new Response(
      JSON.stringify({
        success: true,
        reservation,
        message: 'Reserva confirmada com sucesso!'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error processing payment success:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})