import { NextRequest, NextResponse } from 'next/server'
import { getPesapalToken } from '@/lib/pesapal'

/**
 * GET /api/pesapal/auth
 * Get Pesapal OAuth token
 * This is a server-side only endpoint - never expose credentials to client
 */
export async function GET(request: NextRequest) {
  try {
    // Verify environment variables are set
    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      return NextResponse.json(
        { error: 'Pesapal credentials not configured' },
        { status: 500 }
      )
    }

    const token = await getPesapalToken()

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error in Pesapal auth:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate with Pesapal', message: (error as Error).message },
      { status: 500 }
    )
  }
}
