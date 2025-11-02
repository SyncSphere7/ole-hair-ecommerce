import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { SupabaseAdapter } from "@auth/supabase-adapter"

// Only include providers with valid credentials
const providers = []

// Google OAuth
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }))
}

// Email Magic Link with Resend
if (process.env.AUTH_RESEND_KEY) {
  providers.push(Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: "Ole Hair <noreply@olehair.com>",
  }))
}

// Configure adapter only if Supabase credentials are available
// Note: Adapter is REQUIRED for email provider to work
const adapterConfig = (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
  ? SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    })
  : undefined

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  adapter: adapterConfig,
  trustHost: true,
  pages: {
    signIn: '/',
    verifyRequest: '/auth/verify-email',
    error: '/auth/error',
  },
  session: {
    strategy: adapterConfig ? "database" : "jwt",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (adapterConfig && user) {
        // Database session
        session.user.id = user.id
      } else if (token?.sub) {
        // JWT session
        session.user.id = token.sub as string
      }
      return session
    },
    async signIn({ user, account, profile, email }) {
      // Log sign-in attempts in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Sign-in attempt:', { 
          provider: account?.provider, 
          email: user?.email || email?.verificationRequest,
          userId: user?.id 
        })
      }
      return true
    },
  },
  events: {
    async signIn({ user, account }) {
      console.log('User signed in:', { userId: user.id, provider: account?.provider })
    },
    async createUser({ user }) {
      console.log('New user created:', { userId: user.id, email: user.email })
    },
  },
  debug: true,
})
