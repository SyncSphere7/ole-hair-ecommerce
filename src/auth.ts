import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { createClient } from "@/lib/supabase/server"
import { MagicLinkEmail } from "@/emails/magic-link-email"
import { render } from "@react-email/components"
import Resend from "next-auth/providers/resend";

// Only include providers with valid credentials
const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }))
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }))
}

if (process.env.AUTH_RESEND_KEY) {
  providers.push(Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: 'noreply@olehair.com',
    async sendVerificationRequest({ identifier: email, url, provider: { from } }) {
      const { default: resend } = await import('resend');
      const client = new resend.Resend(process.env.AUTH_RESEND_KEY);
      await client.emails.send({
        from,
        to: email,
        subject: 'Sign in to Ole Hair',
        html: render(MagicLinkEmail({ url })),
      });
    },
  }))
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
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
