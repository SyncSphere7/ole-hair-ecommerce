# Authentication System Fix - Complete Investigation & Resolution

## Problem Summary

Both Google OAuth and Magic Link authentication were completely broken after implementing the Supabase adapter for NextAuth.

### Root Cause Identified

**Database Schema Conflict**: Two migrations created incompatible `users` table definitions:

1. **Old Migration** (20251024050722_create_auth_schema.sql):
   - Created users table with: `id UUID PRIMARY KEY REFERENCES auth.users(id)`
   - This made the public.users table dependent on Supabase Auth's built-in auth.users table
   - Used foreign key constraint linking to auth.users

2. **New Migration** (20251102000000_nextauth_schema.sql):
   - Attempted to create users table with: `id UUID DEFAULT gen_random_uuid() PRIMARY KEY`
   - This is a standalone table (NextAuth standard)
   - Conflicted with existing foreign key constraint

### Why Both Auth Methods Failed

1. **Magic Links**: Required the Supabase adapter to store verification tokens, but adapter couldn't write to users table due to foreign key constraint
2. **Google OAuth**: The adapter tries to create/update user records, but failed due to schema mismatch and RLS policy restrictions

## Solutions Implemented

### 1. Database Schema Fix (Migration 20251102000001)

**Fixed users table structure:**
```sql
-- Removed foreign key constraint to auth.users
DROP CONSTRAINT users_id_fkey

-- Made users table standalone
ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid()

-- Added missing NextAuth column
ALTER TABLE users ADD COLUMN email_verified TIMESTAMPTZ
```

**Updated RLS Policies:**
```sql
-- Critical: Service role needs FULL access for NextAuth
CREATE POLICY "Service role has full access" ON users
  FOR ALL 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role')
```

Applied to all tables:
- ✅ users
- ✅ accounts  
- ✅ sessions
- ✅ verification_tokens

### 2. Enhanced Error Logging (auth.ts)

Added comprehensive debugging:
```typescript
callbacks: {
  async signIn({ user, account, profile, email }) {
    console.log('Sign-in attempt:', { 
      provider: account?.provider, 
      email: user?.email || email?.verificationRequest 
    })
    return true
  }
},
events: {
  async signIn({ user, account }) {
    console.log('User signed in:', { userId: user.id, provider: account?.provider })
  },
  async createUser({ user }) {
    console.log('New user created:', { userId: user.id, email: user.email })
  }
}
```

## What Was Fixed

### Database Level
- ✅ Removed conflicting foreign key constraint to auth.users
- ✅ Made users table fully compatible with NextAuth adapter
- ✅ Added missing email_verified column
- ✅ Fixed all RLS policies to grant service_role full access
- ✅ Ensured proper cascading foreign keys in accounts and sessions tables

### Application Level
- ✅ Added debug logging for sign-in attempts
- ✅ Added event tracking for user creation and sign-ins
- ✅ Enabled full debug mode for better error visibility
- ✅ Maintained backward compatibility with existing users

## Testing Required

Once Vercel deployment completes, test:

### Google OAuth
1. Click "Continue with Google"
2. Select Google account
3. Should successfully sign in and redirect to home page
4. Check Vercel logs for "User signed in" message

### Magic Link
1. Click "Continue with email"
2. Enter email address
3. Should see "✉️ Magic link sent! Check your email (and spam/junk folder)"
4. Check email for magic link
5. Click link - should sign in and redirect to home
6. Check Vercel logs for verification token creation

## Verification Checklist

- [ ] Vercel deployment successful
- [ ] Google OAuth sign-in works
- [ ] Magic link emails are sent
- [ ] Magic link verification works
- [ ] Users can access protected pages after sign-in
- [ ] Session persists after page refresh
- [ ] Check Vercel function logs for any errors

## Environment Variables Confirmed

All required variables are set in Vercel:
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (service role access)
- ✅ `NEXT_PUBLIC_SUPABASE_URL` (database URL)
- ✅ `AUTH_RESEND_KEY` (email sending)
- ✅ `GOOGLE_CLIENT_ID` (OAuth)
- ✅ `GOOGLE_CLIENT_SECRET` (OAuth)
- ✅ `AUTH_SECRET` (NextAuth encryption)

## Files Modified

1. `supabase/migrations/20251102000001_fix_users_table_conflict.sql` - NEW
2. `src/auth.ts` - Enhanced with logging
3. Database: Applied migration via `supabase db push`

## Expected Behavior After Fix

### Google Sign-In Flow
```
User clicks Google → OAuth consent → Creates/updates user record → 
Creates account record → Creates session → Redirects home → User signed in
```

### Magic Link Flow
```
User enters email → Creates verification_token → Sends email → 
User clicks link → Verifies token → Creates/updates user → 
Creates session → Redirects home → User signed in
```

## Next Steps

1. Wait for Vercel deployment to complete
2. Test both authentication methods
3. Check Vercel function logs if issues persist
4. Verify database records are created correctly

## Additional Notes

- The fix maintains compatibility with existing users in the database
- RLS policies ensure users can only access their own data
- Service role (NextAuth) has full access to manage authentication tables
- Debug logging will help identify any remaining issues
