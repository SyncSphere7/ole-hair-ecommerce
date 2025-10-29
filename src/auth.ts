import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Resend from "next-auth/providers/resend"
import { createClient } from "@/lib/supabase/server"

// Only include providers with valid credentials
const providers = []

// Google OAuth
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }))
}

// Facebook OAuth
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }))
}

// Email Magic Link (Resend)
if (process.env.AUTH_RESEND_KEY) {
  providers.push(Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: 'noreply@olehair.com',
    async sendVerificationRequest({ identifier: email, url }) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.AUTH_RESEND_KEY)
        
        await resend.emails.send({
          from: 'Ole Hair <noreply@olehair.com>',
          to: email,
          subject: 'Sign in to Ole Hair',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #FFCC00;">Welcome to Ole Hair!</h2>
              <p>Click the link below to sign in to your account:</p>
              <a href="${url}" style="background: #FFCC00; color: black; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Sign In
              </a>
              <p style="margin-top: 20px; color: #666;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </div>
          `,
        })
      } catch (error) {
        console.error('Failed to send email:', error)
        throw new Error('Failed to send verification email')
      }
    },
  }))
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      // Only try Supabase integration if environment variables are set
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        try {
          const supabase = await createClient()
          
          // Check if user exists in our database
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser && account) {
            // Create user in Supabase if they don't exist
            const { error } = await supabase
              .from('users')
              .insert({
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account.provider,
              })

            if (error) {
              console.error('Error creating user in Supabase:', error)
              // Don't block sign-in if Supabase fails
            }
          }
        } catch (error) {
          console.error('Supabase integration error:', error)
          // Don't block sign-in if Supabase fails
        }
      }

      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
})
