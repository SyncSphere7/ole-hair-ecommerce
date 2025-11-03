import { NextRequest, NextResponse } from 'next/server'
import { getPesapalToken, getPesapalTransactionStatus, PESAPAL_STATUS } from '@/lib/pesapal'
import { supabase } from '@/lib/auth/supabase-auth'

/**
 * GET /api/pesapal/ipn
 * Handle IPN (Instant Payment Notification) from Pesapal
 * This webhook endpoint receives payment status updates
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderTrackingId = searchParams.get('OrderTrackingId')
    const orderMerchantReference = searchParams.get('OrderMerchantReference')
    const orderNotificationType = searchParams.get('OrderNotificationType')

    console.log('Pesapal IPN received:', {
      orderTrackingId,
      orderMerchantReference,
      orderNotificationType,
    })

    if (!orderTrackingId) {
      return NextResponse.json({ error: 'Missing OrderTrackingId' }, { status: 400 })
    }

    // Get Pesapal auth token
    const token = await getPesapalToken()

    // Get transaction status from Pesapal
    const transactionStatus = await getPesapalTransactionStatus(orderTrackingId, token)

    // Determine order status
    let orderStatus = 'PENDING'
    if (transactionStatus.payment_status_code === PESAPAL_STATUS.COMPLETED) {
      orderStatus = 'COMPLETED'
    } else if (transactionStatus.payment_status_code === PESAPAL_STATUS.FAILED) {
      orderStatus = 'FAILED'
    } else if (transactionStatus.payment_status_code === PESAPAL_STATUS.REVERSED) {
      orderStatus = 'REVERSED'
    }

    // Update order in database
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: orderStatus,
        payment_status_description: transactionStatus.payment_status_description,
        payment_method: transactionStatus.payment_method,
        payment_account: transactionStatus.payment_account,
        updated_at: new Date().toISOString(),
      })
      .eq('pesapal_tracking_id', orderTrackingId)

    if (updateError) {
      console.error('Error updating order status via IPN:', updateError)
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
    }

    console.log(`Order ${orderMerchantReference} updated to status: ${orderStatus}`)

    // Pesapal expects a success response
    return NextResponse.json({ 
      success: true,
      message: 'IPN processed successfully',
      orderTrackingId,
      status: orderStatus,
    })
  } catch (error) {
    console.error('Error processing Pesapal IPN:', error)
    return NextResponse.json(
      {
        error: 'IPN processing failed',
        message: (error as Error).message,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/pesapal/ipn
 * Some IPN notifications may come as POST requests
 */
export async function POST(request: NextRequest) {
  return GET(request)
}
