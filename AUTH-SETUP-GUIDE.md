# Authentication Setup Guide

This guide will walk you through setting up social authentication (OAuth) for Ole Hair e-commerce site.

## ✅ What's Already Done

- ✅ Supabase database with `users`, `orders`, and `wishlists` tables
- ✅ NextAuth.js v5 installed and configured
- ✅ Sign-in modal component created
- ✅ Session provider integrated into the app
- ✅ Environment variables template ready

## 🔐 OAuth Provider Setup

You need to set up OAuth apps for each social login provider. Here's how:

---

### 1. Google OAuth Setup (5 minutes)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing one)
3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Ole Hair"
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://your-vercel-domain.vercel.app` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://your-vercel-domain.vercel.app/api/auth/callback/google`
   - Click "Create"

5. **Copy credentials** and add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

---

### 2. Facebook OAuth Setup (5 minutes)

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create an App**:
   - Click "My Apps" → "Create App"
   - Use case: "Other"
   - App type: "Consumer"
   - App name: "Ole Hair"
   - Click "Create App"

3. **Add Facebook Login**:
   - From dashboard, click "Add Product"
   - Find "Facebook Login" and click "Set Up"
   - Choose "Web"
   - Site URL: `https://your-vercel-domain.vercel.app`

4. **Configure OAuth settings**:
   - Go to "Facebook Login" → "Settings"
   - **Valid OAuth Redirect URIs**:
     - `http://localhost:3000/api/auth/callback/facebook`
     - `https://your-vercel-domain.vercel.app/api/auth/callback/facebook`
   - Click "Save Changes"

5. **Get credentials**:
   - Go to "Settings" → "Basic"
   - Copy "App ID" and "App Secret"
   - Add to `.env.local`:
     ```
     FACEBOOK_CLIENT_ID=your-app-id
     FACEBOOK_CLIENT_SECRET=your-app-secret
     ```

6. **Make app live**:
   - Toggle the switch at the top from "Development" to "Live"
   - (You may need to verify your business first for production use)

---

### 3. GitHub OAuth Setup (3 minutes)

1. **Go to GitHub Settings**: https://github.com/settings/developers
2. **Register a new OAuth app**:
   - Click "OAuth Apps" → "New OAuth App"
   - Application name: "Ole Hair"
   - Homepage URL: `https://your-vercel-domain.vercel.app`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Click "Register application"

3. **Generate client secret**:
   - Click "Generate a new client secret"
   - Copy the secret immediately (you won't see it again)

4. **Add credentials** to `.env.local`:
   ```
   GITHUB_CLIENT_ID=your-client-id
   GITHUB_CLIENT_SECRET=your-client-secret
   ```

5. **For production**, create another OAuth app with production callback:
   - Authorization callback URL: `https://your-vercel-domain.vercel.app/api/auth/callback/github`

---

### 4. Apple Sign In Setup (Optional - Requires $99/year Apple Developer Account)

⚠️ **Skip this for now** unless you have an Apple Developer account.

If you want to add it later:
1. Sign up for Apple Developer Program ($99/year)
2. Create an App ID at https://developer.apple.com/account/
3. Enable "Sign in with Apple" capability
4. Create a Service ID
5. Configure domains and redirect URLs
6. Generate a private key
7. Add credentials to `.env.local`

---

## 🚀 Quick Start (For Development)

### Minimal Setup - Just use GitHub (Easiest)

If you want to test authentication quickly, just set up **GitHub OAuth** (takes 3 minutes):

1. Follow "GitHub OAuth Setup" above
2. Comment out Google and Facebook providers in `/src/auth.ts`:
   ```typescript
   providers: [
     // Google({ ... }),  // Comment out
     // Facebook({ ... }), // Comment out
     GitHub({
       clientId: process.env.GITHUB_CLIENT_ID!,
       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
     }),
   ],
   ```
3. Hide Google/Facebook buttons in `SignInModal.tsx`
4. Test the app!

---

## 📝 Environment Variables Checklist

Your `.env.local` should have:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://izlvdgjugtcuezzmfuth.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# NextAuth
NEXTAUTH_SECRET=7DoFa0QI6emhzlEQ90/O2nDjICtrLuT917CrqxT98Ak=
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

---

## 🧪 Testing Authentication

Once you've set up at least one provider:

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Test sign-in**:
   - Go to http://localhost:3000
   - Click "Sign In" (we'll add this button to Header next)
   - Try signing in with configured provider

3. **Check database**:
   - Go to Supabase dashboard → Table Editor
   - Check `users` table - you should see your user data

---

## 🔜 Next Steps After OAuth Setup

1. Add "Sign In" button to Header component
2. Show user avatar/name when logged in
3. Add sign-out functionality
4. Protect checkout route (require login or allow guest)
5. Create user profile page
6. Show order history for logged-in users
7. Migrate wishlist from localStorage to database

---

## 🆘 Troubleshooting

### "Error: Configuration error"
- Check all environment variables are set correctly
- Restart dev server after adding env vars

### "Redirect URI mismatch"
- Make sure callback URLs match exactly in OAuth app settings
- Check for trailing slashes (they matter!)

### "User not created in database"
- Check Supabase table policies
- Check browser console for errors
- Verify Supabase credentials in `.env.local`

---

## 📚 Resources

- NextAuth.js Docs: https://authjs.dev/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Google OAuth: https://console.cloud.google.com/
- Facebook Login: https://developers.facebook.com/
- GitHub OAuth: https://github.com/settings/developers

---

**Ready to continue?** Set up at least one OAuth provider and let me know - I'll help you integrate the sign-in button into your app! 🚀
