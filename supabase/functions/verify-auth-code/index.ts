import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { code, userEmail, amount } = await req.json()
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Verify auth code
    const { data: authCodeData, error } = await supabase
      .from('auth_codes')
      .select('*')
      .eq('code', code)
      .eq('user_email', userEmail)
      .eq('amount', amount)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()
    
    if (error || !authCodeData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid or expired authentication code' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }
    
    // Mark code as used
    await supabase
      .from('auth_codes')
      .update({ used: true })
      .eq('id', authCodeData.id)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Authentication code verified successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
    
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})