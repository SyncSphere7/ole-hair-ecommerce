# Authentication Testing Guide

## Pre-Testing Checklist
- [ ] Vercel deployment completed successfully
- [ ] Check deployment status at: https://vercel.com/dashboard
- [ ] Confirm build passed without errors

## Test 1: Google OAuth Sign-In

### Steps:
1. Go to your production site (olehair.com or Vercel preview URL)
2. Click **"Sign In"** or **"Continue with Google"**
3. Select your Google account
4. Grant permissions if prompted

### Expected Results:
✅ OAuth consent screen appears  
✅ Successfully redirects back to your site  
✅ Modal closes automatically  
✅ User name/avatar appears in header (signed in state)  
✅ Can access protected pages (Profile, Orders, etc.)

### If It Fails:
- Check browser console for JavaScript errors
- Check Vercel function logs for backend errors
- Look for "Sign-in attempt" log messages

---

## Test 2: Magic Link Authentication

### Steps:
1. Click **"Sign In"**
2. Enter your email address
3. Click **"Send Magic Link"**
4. Check for success message: "✉️ Magic link sent! Check your email (and spam/junk folder)"
5. Open your email inbox (check spam folder!)
6. Click the magic link in the email

### Expected Results:
✅ Success message appears immediately  
✅ Email arrives within 1-2 minutes  
✅ Magic link opens verification page  
✅ "Verifying..." message appears briefly  
✅ Redirects to home page after 3 seconds  
✅ User is signed in (name/avatar in header)

### If Email Doesn't Send:
- Check browser console for error messages
- Verify you see "Failed to send email" or other error
- Check Vercel logs for Resend API errors
- Verify `AUTH_RESEND_KEY` is set in Vercel environment variables

### If Email Link Doesn't Work:
- Check if link redirects to `/auth/verify-email`
- Check browser console for errors
- Look for token verification errors in Vercel logs

---

## Test 3: Session Persistence

After signing in with either method:

### Steps:
1. Navigate to a few pages (Products, About, Cart)
2. Refresh the page (Cmd+R or F5)
3. Close browser and reopen the site
4. Check if still signed in

### Expected Results:
✅ User stays signed in after navigation  
✅ User stays signed in after refresh  
✅ Session persists across browser restarts  
✅ Protected pages remain accessible

---

## Test 4: Sign Out

### Steps:
1. While signed in, find the sign-out button
2. Click **"Sign Out"**

### Expected Results:
✅ User is signed out immediately  
✅ Header returns to signed-out state  
✅ Redirects to home page  
✅ Protected pages no longer accessible

---

## Vercel Logs - What to Look For

### Access Logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Logs"** or **"Functions"** tab
4. Filter by recent deployments

### Success Indicators:
```
✅ "Sign-in attempt: { provider: 'google', email: '...' }"
✅ "User signed in: { userId: '...', provider: 'google' }"
✅ "New user created: { userId: '...', email: '...' }"
```

### Error Indicators:
```
❌ Database connection errors
❌ "relation does not exist"
❌ "permission denied for table"
❌ Resend API errors
❌ "Invalid verification token"
```

---

## Supabase Database Verification

### Check User Records:
1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Check these tables:

#### Users Table
- Should have records for each signed-in user
- Check columns: id, email, name, email_verified, image

#### Accounts Table
- Should have OAuth account records
- Check provider (google), provider_account_id

#### Sessions Table
- Should have active session records
- Check session_token, expires, user_id

#### Verification Tokens Table
- Should have magic link tokens (temporary)
- Old tokens should expire after use

---

## Common Issues & Solutions

### Issue: "Sign-in Failed: An error occurred"
**Solution:** Check Vercel logs for specific error. Likely RLS policy or adapter issue.

### Issue: "Failed to send email"
**Solution:** 
- Verify `AUTH_RESEND_KEY` environment variable
- Check Resend dashboard for API limits
- Verify sender email domain is verified

### Issue: User signed in but no data showing
**Solution:** 
- Check session callback in auth.ts
- Verify user.id is being set correctly
- Check browser Application > Storage > Cookies

### Issue: Magic link expired/invalid
**Solution:** 
- Tokens expire after 24 hours by default
- User may have clicked an old link
- Request a new magic link

---

## Quick Debug Commands

### Check Environment Variables (Vercel):
```bash
vercel env ls
```

### Check Latest Logs:
```bash
vercel logs
```

### Test Database Connection:
```bash
supabase db dump --schema public --table users
```

---

## Report Results

After testing, report back with:
1. ✅ or ❌ for Google OAuth
2. ✅ or ❌ for Magic Link
3. Any error messages seen
4. Screenshots if needed

**If both work:** Authentication system is fully fixed! 🎉  
**If issues remain:** Share the specific error messages or logs.
