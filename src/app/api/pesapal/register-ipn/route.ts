import { NextRequest, NextResponse } from 'next/server'
import { getPesapalToken, registerPesapalIPN } from '@/lib/pesapal'

/**
 * POST /api/pesapal/register-ipn
 * Register IPN URL with Pesapal
 * This should be run once during setup
 */
export async function POST(request: NextRequest) {
  try {
    // Verify environment variables
    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      return NextResponse.json(
        { error: 'Pesapal credentials not configured' },
        { status: 500 }
      )
    }

    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const ipnUrl = `${baseUrl}/api/pesapal/ipn`

    // Get Pesapal auth token
    const token = await getPesapalToken()

    // Register IPN with Pesapal
    const ipnId = await registerPesapalIPN(ipnUrl, token)

    console.log('Pesapal IPN registered successfully:', {
      ipnUrl,
      ipnId,
    })

    return NextResponse.json({
      success: true,
      ipn_id: ipnId,
      ipn_url: ipnUrl,
      message: 'IPN registered successfully. Add this IPN ID to your .env.local file as PESAPAL_IPN_ID',
    })
  } catch (error) {
    console.error('Error registering Pesapal IPN:', error)
    return NextResponse.json(
      {
        error: 'Failed to register IPN',
        message: (error as Error).message,
      },
      { status: 500 }
    )
  }
}
