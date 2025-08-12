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
    const { amount, userEmail } = await req.json()
    
    // Generate 6-digit auth code
    const authCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Store auth code in database (expires in 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    
    const { error: dbError } = await supabase
      .from('auth_codes')
      .insert({
        code: authCode,
        user_email: userEmail,
        amount: amount,
        expires_at: expiresAt,
        used: false
      })
    
    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }
    
    // Send email using Resend (you'll need to add RESEND_API_KEY to secrets)
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'BluePay <noreply@bluepay.com>',
          to: ['josiahjohnpaul123@gmail.com'],
          subject: 'BluePay Withdrawal Authentication Code',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">BluePay Withdrawal Authentication</h2>
              <p>A withdrawal request has been initiated for:</p>
              <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
              <p><strong>User Email:</strong> ${userEmail}</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0; color: #1f2937;">Authentication Code:</h3>
                <p style="font-size: 24px; font-weight: bold; color: #2563eb; margin: 10px 0; letter-spacing: 2px;">${authCode}</p>
              </div>
              <p style="color: #6b7280; font-size: 14px;">This code expires in 10 minutes.</p>
            </div>
          `,
        }),
      })
      
      if (!emailResponse.ok) {
        console.error('Email sending failed:', await emailResponse.text())
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Authentication code sent' }),
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