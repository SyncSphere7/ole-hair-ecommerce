import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyOTP } from '@/lib/auth/rate-limiter'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const { phone, token } = await request.json()

    if (!phone || !token) {
      return NextResponse.json(
        { error: 'Phone and token are required' },
        { status: 400 }
      )
    }

    // Verify OTP from database
    const verification = await verifyOTP(phone, token, 'phone')
    
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.message },
        { status: 400 }
      )
    }

    // Create or get user with Supabase Auth
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Check if user exists with this phone
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single()

    let userId: string

    if (existingUser) {
      // Update existing user
      userId = existingUser.id
      await supabaseAdmin
        .from('users')
        .update({
          phone_verified: true,
          last_sign_in_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
    } else {
      // Create new user in Supabase Auth with phone
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        phone,
        phone_confirm: true,
        user_metadata: {
          phone_verified: true
        }
      })

      if (authError || !authData.user) {
        console.error('Error creating auth user:', authError)
        return NextResponse.json(
          { error: 'Failed to create user' },
          { status: 500 }
        )
      }

      userId = authData.user.id

      // Create user in public.users table
      await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          phone,
          phone_verified: true,
          auth_method: 'phone',
          last_sign_in_at: new Date().toISOString()
        })
    }

    // Generate session token for the user
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: `${userId}@phone.olehair.com`, // Temporary email for phone-only users
      options: {
        redirectTo: `${request.nextUrl.origin}/auth/success`
      }
    })

    if (sessionError) {
      console.error('Session generation error:', sessionError)
    }

    return NextResponse.json({
      success: true,
      userId,
      phone,
      message: 'Phone verified successfully'
    })

  } catch (error) {
    console.error('Verify phone OTP error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
