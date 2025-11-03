import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
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

// Credentials provider for magic link authentication
// This is used internally by the magic link verify endpoint
providers.push(Credentials({
  id: 'credentials',
  name: 'Magic Link',
  credentials: {
    email: { label: "Email", type: "email" }
  },
  async authorize(credentials) {
    if (!credentials?.email || typeof credentials.email !== 'string') {
      return null
    }

    const email = credentials.email as string

    // Return user object - the signIn callback will handle Supabase sync
    return {
      id: email, // Temporary ID, will be replaced in signIn callback
      email: email,
      name: email.split('@')[0],
    }
  },
}))

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
