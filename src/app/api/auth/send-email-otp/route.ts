import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkOTPRateLimit } from '@/lib/auth/rate-limiter'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const { email, useMagicLink = false } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check rate limiting
    const rateLimit = await checkOTPRateLimit(email, 'email')
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: rateLimit.message,
          retryAfter: rateLimit.retryAfterSeconds 
        },
        { status: 429 }
      )
    }

    // Send OTP or Magic Link via Supabase Auth
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    if (useMagicLink) {
      // Send Magic Link (clickable link in email)
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${request.nextUrl.origin}/auth/success`,
        },
      })

      if (error) {
        console.error('Supabase Magic Link error:', error)
        return NextResponse.json(
          { error: 'Failed to send magic link. Please try again.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Magic link sent to your email',
        type: 'magic_link',
        attemptsRemaining: rateLimit.attemptsRemaining
      })
    } else {
      // Send OTP (6-digit code only)
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
        options: {
          shouldCreateUser: true,
          // Don't include emailRedirectTo for OTP-only
        },
      })

      if (error) {
        console.error('Supabase OTP error:', error)
        return NextResponse.json(
          { error: 'Failed to send OTP. Please try again.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'OTP sent to your email',
        type: 'otp',
        attemptsRemaining: rateLimit.attemptsRemaining
      })
    }

  } catch (error) {
    console.error('Send email OTP error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
