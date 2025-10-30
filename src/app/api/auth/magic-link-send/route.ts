import { NextRequest, NextResponse } from 'next/server'
import { sendMagicLink } from '@/lib/magic-link'

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!process.env.AUTH_RESEND_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Please use social login instead.' },
        { status: 503 }
      )
    }

    const { email, callbackUrl } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }
    
    await sendMagicLink(email, callbackUrl)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Magic link sent! Check your email.' 
    })
  } catch (error) {
    console.error('Magic link send error:', error)
    
    // Handle specific Resend API errors
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Email service not properly configured. Please use social login instead.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to send magic link. Please try again or use social login.' },
      { status: 500 }
    )
  }
}