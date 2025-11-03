import { NextRequest, NextResponse } from 'next/server'
import { getPesapalToken, submitPesapalOrder } from '@/lib/pesapal'
import { supabase } from '@/lib/auth/supabase-auth'

/**
 * POST /api/pesapal/initiate
 * Initiate payment with Pesapal and get redirect URL
 * This endpoint handles the entire payment initiation flow
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const {
      orderNumber,
      amount,
      currency,
      email,
      phone,
      firstName,
      lastName,
      cartItems,
      deliveryMethod,
      deliveryAddress,
    } = body

    // Validate required fields
    if (!orderNumber || !amount || !email || !phone || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get Pesapal auth token
    const token = await getPesapalToken()

    // Get the base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const callbackUrl = `${baseUrl}/api/pesapal/callback`
    const notificationId = process.env.PESAPAL_IPN_ID || ''

    // Prepare order data for Pesapal
    const pesapalOrder = {
      id: orderNumber,
      currency: currency || 'UGX',
      amount: Math.round(amount), // Pesapal expects integer amount
      description: `Order #${orderNumber} - ${cartItems?.length || 0} items`,
      callback_url: callbackUrl,
      notification_id: notificationId,
      billing_address: {
        email_address: email,
        phone_number: phone.replace(/\s+/g, ''), // Remove spaces
        country_code: 'UG',
        first_name: firstName,
        last_name: lastName,
        line_1: deliveryAddress?.address || '',
        city: deliveryAddress?.city || '',
        state: deliveryAddress?.state || '',
        postal_code: deliveryAddress?.postalCode || '',
        zip_code: deliveryAddress?.postalCode || '',
      },
    }

    // Submit order to Pesapal
    const pesapalResponse = await submitPesapalOrder(pesapalOrder, token)

    // Store order in database
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData?.session?.user?.id || null

    const { error: dbError } = await supabase.from('orders').insert({
      order_number: orderNumber,
      user_id: userId,
      pesapal_tracking_id: pesapalResponse.order_tracking_id,
      amount: amount,
      currency: currency || 'UGX',
      status: 'PENDING',
      payment_method: 'pesapal',
      customer_info: {
        email,
        phone,
        firstName,
        lastName,
        deliveryMethod,
        deliveryAddress,
      },
      items: cartItems,
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error('Error storing order in database:', dbError)
      // Continue anyway - payment is more important than DB storage
    }

    // Return Pesapal redirect URL to client
    return NextResponse.json({
      success: true,
      redirect_url: pesapalResponse.redirect_url,
      order_tracking_id: pesapalResponse.order_tracking_id,
      merchant_reference: pesapalResponse.merchant_reference,
    })
  } catch (error) {
    console.error('Error initiating Pesapal payment:', error)
    return NextResponse.json(
      {
        error: 'Failed to initiate payment',
        message: (error as Error).message,
      },
      { status: 500 }
    )
  }
}
