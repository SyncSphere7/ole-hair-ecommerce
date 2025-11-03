import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export interface RateLimitResult {
  allowed: boolean
  message: string
  attemptsRemaining?: number
  retryAfterSeconds?: number
}

/**
 * Check if identifier can send OTP (rate limiting)
 */
export async function checkOTPRateLimit(
  identifier: string,
  attemptType: 'email' | 'phone'
): Promise<RateLimitResult> {
  try {
    const { data, error } = await supabaseAdmin.rpc('check_otp_rate_limit', {
      p_identifier: identifier.toLowerCase(),
      p_attempt_type: attemptType
    })

    if (error) {
      console.error('Rate limit check error:', error)
      // Allow on error (fail open)
      return {
        allowed: true,
        message: 'OK',
        attemptsRemaining: 3
      }
    }

    return data as RateLimitResult
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // Allow on error (fail open)
    return {
      allowed: true,
      message: 'OK',
      attemptsRemaining: 3
    }
  }
}

/**
 * Store OTP in database with expiry
 */
export async function storeOTP(
  identifier: string,
  otp: string,
  type: 'email' | 'phone'
): Promise<void> {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

  const { error } = await supabaseAdmin
    .from('otp_verifications')
    .upsert({
      identifier: identifier.toLowerCase(),
      otp,
      type,
      expires_at: expiresAt.toISOString(),
      attempts: 0,
      created_at: new Date().toISOString()
    }, {
      onConflict: 'identifier,type'
    })

  if (error) {
    console.error('Error storing OTP:', error)
    throw new Error('Failed to store OTP')
  }
}

/**
 * Verify OTP from database
 */
export async function verifyOTP(
  identifier: string,
  otp: string,
  type: 'email' | 'phone'
): Promise<{ valid: boolean; message: string }> {
  // Get stored OTP
  const { data, error } = await supabaseAdmin
    .from('otp_verifications')
    .select('*')
    .eq('identifier', identifier.toLowerCase())
    .eq('type', type)
    .single()

  if (error || !data) {
    return { valid: false, message: 'OTP not found or expired' }
  }

  // Check if expired
  if (new Date(data.expires_at) < new Date()) {
    return { valid: false, message: 'OTP has expired' }
  }

  // Check attempts
  if (data.attempts >= 3) {
    return { valid: false, message: 'Too many failed attempts' }
  }

  // Verify OTP
  if (data.otp !== otp) {
    // Increment attempts
    await supabaseAdmin
      .from('otp_verifications')
      .update({ attempts: data.attempts + 1 })
      .eq('identifier', identifier.toLowerCase())
      .eq('type', type)

    return { valid: false, message: 'Invalid OTP' }
  }

  // Valid OTP - delete it (one-time use)
  await supabaseAdmin
    .from('otp_verifications')
    .delete()
    .eq('identifier', identifier.toLowerCase())
    .eq('type', type)

  return { valid: true, message: 'OTP verified' }
}

/**
 * Clean up expired OTPs
 */
export async function cleanupExpiredOTPs(): Promise<void> {
  await supabaseAdmin
    .from('otp_verifications')
    .delete()
    .lt('expires_at', new Date().toISOString())
}
