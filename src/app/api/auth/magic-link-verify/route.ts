import { NextRequest, NextResponse } from 'next/server'
import { verifyMagicLinkToken, getOrCreateUser } from '@/lib/magic-link'
import { signIn } from '@/auth'

/**
 * Verify magic link token and sign in user
 * GET /api/auth/magic-link-verify?token=xxx&callbackUrl=/
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    // Validate token parameter
    if (!token) {
      return NextResponse.redirect(
        new URL('/auth/error?error=MissingToken', request.url)
      )
    }

    // Verify the token
    const email = await verifyMagicLinkToken(token)

    if (!email) {
      return NextResponse.redirect(
        new URL('/auth/error?error=Invalid token', request.url)
      )
    }

    // Get or create user
    try {
      await getOrCreateUser(email)
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.redirect(
        new URL('/auth/error?error=VerificationFailed', request.url)
      )
    }

    // Sign in the user using NextAuth credentials provider
    // We'll create a custom credentials provider for magic links
    try {
      // Create a session by signing in with email
      const result = await signIn('credentials', {
        email,
        redirect: false,
      })

      if (result?.error) {
        console.error('Sign in error:', result.error)
        return NextResponse.redirect(
          new URL('/auth/error?error=VerificationFailed', request.url)
        )
      }

      // Redirect to success page with email
      return NextResponse.redirect(
        new URL(`/auth/magic-success?email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
      )
    } catch (error) {
      console.error('Error signing in:', error)
      
      // Fallback: redirect to success page anyway (user is created)
      // They can sign in with Google or request another magic link
      return NextResponse.redirect(
        new URL(`/auth/magic-success?email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url)
      )
    }

  } catch (error) {
    console.error('Error in magic-link-verify:', error)
    return NextResponse.redirect(
      new URL('/auth/error?error=VerificationFailed', request.url)
    )
  }
}
