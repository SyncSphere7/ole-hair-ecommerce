import { NextRequest, NextResponse } from 'next/server'
import { sendMagicLink } from '@/lib/magic-link'

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: 'Failed to send magic link. Please try again.' },
      { status: 500 }
    )
  }
}