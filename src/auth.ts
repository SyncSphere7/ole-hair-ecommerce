import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import { createClient } from "@/lib/supabase/server"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

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
          // Note: We'll need to handle auth.users creation separately
          const { error } = await supabase
            .from('users')
            .insert({
              email: user.email,
              name: user.name,
              image: user.image,
            })

          if (error) {
            console.error('Error creating user:', error)
            return false
          }
        }

        return true
      } catch (error) {
        console.error('SignIn callback error:', error)
        return false
      }
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
})
