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
    verifyRequest: '/auth/magic-success',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
})
