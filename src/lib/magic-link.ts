import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export interface MagicLinkToken {
  id: string
  email: string
  token: string
  expires_at: string
  used: boolean
  created_at: string
}

/**
 * Generate a secure random token for magic link
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Create and store a magic link token in database
 * @param email - User's email address
 * @returns Token string and expiration date
 */
export async function createMagicLinkToken(email: string): Promise<{ token: string; expiresAt: Date }> {
  try {
    const token = generateSecureToken()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now

    const { data, error } = await supabaseAdmin
      .from('magic_link_tokens')
      .insert({
        email: email.toLowerCase().trim(),
        token,
        expires_at: expiresAt.toISOString(),
        used: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating magic link token:', error)
      throw new Error('Failed to create magic link token')
    }

    return { token, expiresAt }
  } catch (error) {
    console.error('Error in createMagicLinkToken:', error)
    throw error
  }
}

/**
 * Verify a magic link token
 * @param token - Token from the magic link URL
 * @returns Email if valid, null if invalid/expired
 */
export async function verifyMagicLinkToken(token: string): Promise<string | null> {
  try {
    // Fetch the token from database
    const { data, error } = await supabaseAdmin
      .from('magic_link_tokens')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .single()

    if (error || !data) {
      console.error('Token not found or error:', error)
      return null
    }

    const tokenData = data as MagicLinkToken

    // Check if token has expired
    const expiresAt = new Date(tokenData.expires_at)
    if (expiresAt < new Date()) {
      console.log('Token expired')
      return null
    }

    // Mark token as used
    await supabaseAdmin
      .from('magic_link_tokens')
      .update({ used: true })
      .eq('token', token)

    return tokenData.email
  } catch (error) {
    console.error('Error in verifyMagicLinkToken:', error)
    return null
  }
}

/**
 * Clean up expired and used tokens
 * Should be called periodically (e.g., via cron job)
 */
export async function cleanupExpiredTokens(): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('magic_link_tokens')
      .delete()
      .or(`expires_at.lt.${new Date().toISOString()},used.eq.true`)

    if (error) {
      console.error('Error cleaning up tokens:', error)
    }
  } catch (error) {
    console.error('Error in cleanupExpiredTokens:', error)
  }
}

/**
 * Get or create user in Supabase
 * @param email - User's email address
 * @returns User ID
 */
export async function getOrCreateUser(email: string): Promise<string> {
  try {
    // Check if user exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existingUser) {
      return existingUser.id
    }

    // Create new user in auth.users first
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email.toLowerCase().trim(),
      email_confirm: true, // Auto-confirm email since they clicked magic link
    })

    if (authError || !authUser.user) {
      console.error('Error creating auth user:', authError)
      throw new Error('Failed to create user')
    }

    // Create user in public.users table
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authUser.user.id,
        email: email.toLowerCase().trim(),
        name: email.split('@')[0], // Use email prefix as default name
      })
      .select()
      .single()

    if (userError) {
      console.error('Error creating user record:', userError)
      throw new Error('Failed to create user record')
    }

    return authUser.user.id
  } catch (error) {
    console.error('Error in getOrCreateUser:', error)
    throw error
  }
}
