import { NextRequest, NextResponse } from 'next/server'
import { verifyMagicLinkToken } from '@/lib/magic-link'
import { signIn } from '@/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/error?error=MissingToken', request.url))
  }
  
  const verification = verifyMagicLinkToken(token)
  
  if (!verification.valid) {
    return NextResponse.redirect(new URL(`/auth/error?error=${verification.error}`, request.url))
  }
  
  try {
    // Create a simple session by redirecting to a success page with user info
    const successUrl = new URL('/auth/magic-success', request.url)
    successUrl.searchParams.set('email', verification.email!)
    successUrl.searchParams.set('callbackUrl', callbackUrl)
    
    return NextResponse.redirect(successUrl)
  } catch (error) {
    console.error('Magic link verification error:', error)
    return NextResponse.redirect(new URL('/auth/error?error=VerificationFailed', request.url))
  }
}