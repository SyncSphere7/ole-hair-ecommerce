import { Resend } from 'resend'

const resend = new Resend(process.env.AUTH_RESEND_KEY)

export async function sendMagicLink(email: string, callbackUrl: string = '/') {
  if (!process.env.AUTH_RESEND_KEY) {
    throw new Error('Resend API key not configured')
  }

  // Generate a simple token (in production, use crypto.randomBytes)
  const token = Buffer.from(`${email}:${Date.now()}`).toString('base64url')
  const magicUrl = `${process.env.AUTH_URL}/api/auth/magic-link?token=${token}&callbackUrl=${encodeURIComponent(callbackUrl)}`

  try {
    await resend.emails.send({
      from: 'Ole Hair <noreply@olehair.com>',
      to: email,
      subject: 'Sign in to Ole Hair',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FFCC00; margin: 0;">Ole Hair</h1>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Welcome back!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Click the button below to sign in to your Ole Hair account. This link will expire in 15 minutes for security.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${magicUrl}" 
               style="background: #FFCC00; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
              Sign In to Ole Hair
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            If you didn't request this email, you can safely ignore it. This link will expire automatically.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Ole Hair - Premium Wigs & Hair Bundles<br>
            Kampala, Uganda
          </p>
        </div>
      `,
    })
    
    return { success: true }
  } catch (error) {
    console.error('Failed to send magic link:', error)
    throw new Error('Failed to send magic link email')
  }
}

export function verifyMagicLinkToken(token: string) {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const [email, timestamp] = decoded.split(':')
    
    // Check if token is expired (15 minutes)
    const tokenAge = Date.now() - parseInt(timestamp)
    const fifteenMinutes = 15 * 60 * 1000
    
    if (tokenAge > fifteenMinutes) {
      return { valid: false, error: 'Token expired' }
    }
    
    return { valid: true, email }
  } catch (error) {
    return { valid: false, error: 'Invalid token' }
  }
}