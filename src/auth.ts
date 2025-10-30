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

// Note: Email magic links require a database adapter
// For now, we'll focus on OAuth providers which work without a database
// To enable email auth, you would need to set up Supabase or another database adapter

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  trustHost: true, // Trust the host header for production
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
