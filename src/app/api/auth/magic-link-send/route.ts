import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createMagicLinkToken } from '@/lib/magic-link'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

/**
 * Send magic link email to user
 * POST /api/auth/magic-link-send
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, callbackUrl } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if Resend is configured
    if (!process.env.AUTH_RESEND_KEY) {
      console.error('AUTH_RESEND_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create magic link token
    const { token, expiresAt } = await createMagicLinkToken(email)

    // Build magic link URL
    const baseUrl = process.env.AUTH_URL || 'http://localhost:3000'
    const magicLinkUrl = `${baseUrl}/api/auth/magic-link-verify?token=${token}&callbackUrl=${encodeURIComponent(callbackUrl || '/')}`

    // Calculate expiration time in minutes
    const expiresInMinutes = Math.floor((expiresAt.getTime() - Date.now()) / 60000)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Ole Hair <noreply@olehair.com>',
      to: email,
      subject: 'Sign in to Ole Hair',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sign in to Ole Hair</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 3px solid #FFCC00;">
                        <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 32px; color: #000000;">Ole Hair</h1>
                        <p style="margin: 10px 0 0; color: #FFCC00; font-size: 14px; font-weight: 600;">Premium Wigs & Hair Bundles</p>
                      </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px; font-size: 24px; color: #000000; font-weight: 600;">Welcome back!</h2>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4b5563;">
                          Click the button below to sign in to your Ole Hair account. This link will expire in <strong>${expiresInMinutes} minutes</strong> for security.
                        </p>
                        
                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                          <tr>
                            <td align="center">
                              <a href="${magicLinkUrl}" style="display: inline-block; padding: 16px 40px; background-color: #FFCC00; color: #000000; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                Sign In to Ole Hair
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                          Or copy and paste this link into your browser:
                        </p>
                        <p style="margin: 10px 0 0; font-size: 12px; line-height: 1.6; color: #9ca3af; word-break: break-all;">
                          ${magicLinkUrl}
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                          If you didn't request this email, you can safely ignore it.
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                          Ole Hair - Kampala, Uganda<br>
                          WhatsApp: +256 758 774 233
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Magic link email sent successfully:', { email, messageId: data?.id })

    return NextResponse.json({
      success: true,
      message: 'Check your email for a sign-in link!',
    })

  } catch (error) {
    console.error('Error in magic-link-send:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
