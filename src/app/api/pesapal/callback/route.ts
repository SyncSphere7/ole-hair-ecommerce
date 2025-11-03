import { NextRequest, NextResponse } from 'next/server'
import { getPesapalToken, getPesapalTransactionStatus, PESAPAL_STATUS } from '@/lib/pesapal'
import { supabase } from '@/lib/auth/supabase-auth'

/**
 * GET /api/pesapal/callback
 * Handle redirect from Pesapal after payment
 * This endpoint verifies the payment status and redirects user to confirmation page
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderTrackingId = searchParams.get('OrderTrackingId')
    const merchantReference = searchParams.get('OrderMerchantReference')

    if (!orderTrackingId) {
      return NextResponse.redirect(
        new URL('/checkout?error=missing_tracking_id', request.url)
      )
    }

    // Get Pesapal auth token
    const token = await getPesapalToken()

    // Get transaction status from Pesapal
    const transactionStatus = await getPesapalTransactionStatus(orderTrackingId, token)

    // Update order status in database
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
        updated_at: new Date().toISOString(),
      })
      .eq('pesapal_tracking_id', orderTrackingId)

    if (updateError) {
      console.error('Error updating order status:', updateError)
    }

    // Redirect to confirmation page with order number
    const confirmationUrl = new URL('/confirmation', request.url)
    confirmationUrl.searchParams.set('order', merchantReference || orderTrackingId)
    confirmationUrl.searchParams.set('status', orderStatus)

    return NextResponse.redirect(confirmationUrl)
  } catch (error) {
    console.error('Error in Pesapal callback:', error)
    return NextResponse.redirect(
      new URL('/checkout?error=payment_verification_failed', request.url)
    )
  }
}
