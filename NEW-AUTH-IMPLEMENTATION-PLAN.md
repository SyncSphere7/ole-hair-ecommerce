# 🔐 New Authentication System - Implementation Plan

## ✅ Completed Steps

### 1. Database Schema ✅
- Added `phone`, `auth_method`, `phone_verified`, `email_verified` columns to `users` table
- Created `otp_attempts` table for rate limiting
- Implemented `check_otp_rate_limit()` function (3 attempts per 15 minutes)
- Added indexes for performance
- Updated RLS policies

### 2. Dependencies ✅
- Installed Twilio SDK
- Added Twilio environment variables to `.env.local`

---

## 🚀 Next Steps

### Phase 1: Email OTP + Magic Link (Current Focus)

#### A. Supabase Auth Configuration
- [ ] Enable Email OTP in Supabase Dashboard
- [ ] Configure OTP settings (6 digits, 5min expiry)
- [ ] Enable Magic Link
- [ ] Customize email templates

#### B. Create New Auth Components
- [ ] `src/components/auth/AuthModal.tsx` - Main modal with tabs
- [ ] `src/components/auth/EmailAuthTab.tsx` - Email OTP/Magic Link
- [ ] `src/components/auth/PhoneAuthTab.tsx` - WhatsApp/SMS OTP
- [ ] `src/components/auth/OTPInput.tsx` - 6-digit OTP input
- [ ] `src/components/auth/CountrySelector.tsx` - Phone country codes

#### C. Create Auth API Routes
- [ ] `/api/auth/send-email-otp` - Send OTP via Supabase Auth
- [ ] `/api/auth/verify-email-otp` - Verify OTP and create session
- [ ] `/api/auth/send-magic-link` - Send magic link via Supabase Auth
- [ ] `/api/auth/send-phone-otp` - Send OTP via Twilio (WhatsApp/SMS)
- [ ] `/api/auth/verify-phone-otp` - Verify phone OTP
- [ ] `/api/auth/resend-otp` - Resend OTP with rate limiting

#### D. Create Auth Helper Functions
- [ ] `src/lib/auth/supabase-auth.ts` - Supabase Auth helpers
- [ ] `src/lib/auth/twilio.ts` - Twilio integration
- [ ] `src/lib/auth/rate-limiter.ts` - Rate limiting logic
- [ ] `src/lib/auth/phone-formatter.ts` - E.164 phone formatting

#### E. Update Existing Components
- [ ] Update `Header.tsx` - New "Sign In" button behavior
- [ ] Update `SessionProvider.tsx` - Handle new auth flow
- [ ] Remove old `SignInModal.tsx`

#### F. Create Auth Pages
- [ ] `/auth/verify-otp` - OTP verification page
- [ ] `/auth/success` - Success page after auth
- [ ] `/auth/error` - Error handling page

---

### Phase 2: WhatsApp OTP (After Phase 1)

#### A. Twilio WhatsApp Setup
- [ ] Configure Twilio WhatsApp sender
- [ ] Set up WhatsApp message templates
- [ ] Test WhatsApp delivery

#### B. SMS Fallback
- [ ] Implement SMS OTP as fallback
- [ ] Auto-detect WhatsApp availability
- [ ] User can choose SMS if WhatsApp fails

---

### Phase 3: Migration & Cleanup

#### A. Migrate Existing Users
- [ ] Script to migrate Google OAuth users to email-based
- [ ] Update `provider` field to `auth_method`
- [ ] Send notification emails to migrated users

#### B. Remove Old Auth Code
- [ ] Delete `src/auth.ts` (NextAuth config)
- [ ] Remove Google/Facebook OAuth providers
- [ ] Delete old magic link implementation
- [ ] Remove `/api/auth/[...nextauth]` route
- [ ] Clean up unused dependencies

#### C. Update Documentation
- [ ] Update README with new auth flow
- [ ] Document Twilio setup process
- [ ] Create user guide for email/phone auth

---

## 📋 File Structure

```
src/
├── components/
│   └── auth/
│       ├── AuthModal.tsx          # Main auth modal (NEW)
│       ├── EmailAuthTab.tsx       # Email OTP/Magic Link tab (NEW)
│       ├── PhoneAuthTab.tsx       # WhatsApp/SMS tab (NEW)
│       ├── OTPInput.tsx           # OTP input component (NEW)
│       └── CountrySelector.tsx    # Country code selector (NEW)
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── send-email-otp/route.ts      (NEW)
│   │       ├── verify-email-otp/route.ts    (NEW)
│   │       ├── send-magic-link/route.ts     (NEW)
│   │       ├── send-phone-otp/route.ts      (NEW)
│   │       ├── verify-phone-otp/route.ts    (NEW)
│   │       └── resend-otp/route.ts          (NEW)
│   └── auth/
│       ├── verify-otp/page.tsx    (NEW)
│       ├── success/page.tsx       (UPDATE)
│       └── error/page.tsx         (UPDATE)
└── lib/
    └── auth/
        ├── supabase-auth.ts       # Supabase Auth helpers (NEW)
        ├── twilio.ts              # Twilio integration (NEW)
        ├── rate-limiter.ts        # Rate limiting (NEW)
        └── phone-formatter.ts     # Phone formatting (NEW)
```

---

## 🎨 UI Design Specs

### AuthModal Layout

```
┌─────────────────────────────────────┐
│  Sign In / Sign Up            [X]   │
├─────────────────────────────────────┤
│                                     │
│  [  Email  ] [  WhatsApp  ]  ← Tabs│
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Enter your email              │ │
│  │ [email@example.com          ] │ │
│  └───────────────────────────────┘ │
│                                     │
│  [ ] Send OTP  [ ] Send Magic Link │
│                                     │
│  [    Send Code    ]  ← Button     │
│                                     │
│  ─────────── OR ───────────        │
│                                     │
│  [  Continue as Guest  ]           │
│                                     │
└─────────────────────────────────────┘
```

### OTP Verification

```
┌─────────────────────────────────────┐
│  Enter Verification Code      [X]   │
├─────────────────────────────────────┤
│                                     │
│  We sent a code to:                │
│  user@example.com                  │
│                                     │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐│
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 ││
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘│
│                                     │
│  Code expires in 4:32              │
│                                     │
│  [     Verify Code     ]           │
│                                     │
│  Didn't receive code?              │
│  [Resend OTP] (available in 30s)  │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔒 Security Implementation

### Rate Limiting
- **Email OTP:** 3 attempts per 15 minutes per email
- **Phone OTP:** 3 attempts per 15 minutes per phone
- **Verification:** 3 wrong OTP attempts = block for 15 minutes
- **Resend:** 30 second cooldown between resends

### OTP Settings
- **Length:** 6 digits
- **Expiry:** 5 minutes
- **Type:** Numeric only
- **Storage:** Supabase Auth handles this

### Phone Number Validation
- **Format:** E.164 (+256...)
- **Validation:** libphonenumber-js
- **Sanitization:** Remove spaces, dashes, etc.

---

## 🧪 Testing Checklist

### Email OTP
- [ ] Send OTP to valid email
- [ ] Verify correct OTP
- [ ] Reject incorrect OTP
- [ ] Handle expired OTP
- [ ] Rate limiting works
- [ ] Resend OTP works
- [ ] Auto-create account for new email

### Magic Link
- [ ] Send magic link
- [ ] Click link and sign in
- [ ] Handle expired link
- [ ] Rate limiting works

### WhatsApp OTP
- [ ] Send OTP via WhatsApp
- [ ] Verify OTP
- [ ] Fallback to SMS if WhatsApp fails
- [ ] International numbers work
- [ ] Rate limiting works

### Account Linking
- [ ] User can add phone to email account
- [ ] User can add email to phone account
- [ ] Both methods work for same account

### UI/UX
- [ ] Dark mode works
- [ ] Light mode works
- [ ] System theme works
- [ ] Mobile responsive
- [ ] Keyboard navigation
- [ ] Screen reader accessible

---

## 📊 Current Status

**Phase 1 Progress:** 20% Complete
- ✅ Database schema updated
- ✅ Twilio installed
- ⏳ Supabase Auth configuration (next)
- ⏳ Build auth components
- ⏳ Create API routes
- ⏳ Testing

**Estimated Time:**
- Phase 1: 3-4 hours
- Phase 2: 1-2 hours  
- Phase 3: 1 hour
- **Total: 5-7 hours**

---

## 🎯 Next Immediate Actions

1. Configure Supabase Auth in dashboard
2. Create `AuthModal.tsx` with tabs
3. Build Email OTP flow
4. Test email OTP end-to-end
5. Add WhatsApp OTP
6. Migrate users
7. Remove old code

---

**Ready to proceed with Phase 1 implementation!** 🚀
