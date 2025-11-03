# 🔧 Supabase OTP Configuration Guide

## ⚠️ IMPORTANT: Configure This First!

To receive **OTP codes** instead of magic links, you need to configure Supabase Auth properly.

---

## 📋 Step-by-Step Configuration

### Step 1: Go to Supabase Dashboard

Open your browser and go to:
```
https://supabase.com/dashboard/project/izlvdgjugtcuezzmfuth/auth/providers
```

### Step 2: Configure Email Provider

1. **Click on "Email" provider** in the list
2. **Enable the following:**
   - ✅ Enable Email provider
   - ✅ Confirm email (toggle ON)
   - ✅ Enable Email OTP (toggle ON)

3. **Save changes**

### Step 3: Configure Email Templates

Go to: **Auth → Email Templates**

#### For OTP Template:
1. Click "Magic Link" template
2. Make sure it includes the OTP code variable: `{{ .Token }}`
3. The template should look like this:

```html
<h2>Your verification code</h2>
<p>Enter this code to sign in:</p>
<h1 style="font-size: 48px; font-weight: bold; text-align: center; letter-spacing: 8px;">
  {{ .Token }}
</h1>
<p>This code expires in 5 minutes.</p>
<p>If you didn't request this code, you can safely ignore this email.</p>
```

### Step 4: Configure OTP Settings

Go to: **Auth → Settings**

Set the following:
- **OTP Expiry:** 300 seconds (5 minutes)
- **OTP Length:** 6 digits
- **Rate Limit:** 3 attempts per hour (default is fine)

**Save changes**

---

## 🎯 How It Works Now

### When User Selects "Send OTP":
1. User enters email
2. Clicks "Send OTP"
3. Receives email with **6-digit code only**
4. Enters code in the app
5. Signed in! ✅

### When User Selects "Send Magic Link":
1. User enters email
2. Clicks "Send Magic Link"
3. Receives email with **clickable link**
4. Clicks link
5. Redirected to app and signed in! ✅

---

## 🧪 Test After Configuration

### Test OTP:
1. Open http://localhost:3000
2. Click "Sign In"
3. Stay on "Email" tab
4. Select **"Send OTP"** radio button
5. Enter your email
6. Click "Send OTP"
7. Check email - you should see a **6-digit code**
8. Enter the code
9. You're signed in! ✅

### Test Magic Link:
1. Click "Sign In"
2. Stay on "Email" tab
3. Select **"Send Magic Link"** radio button
4. Enter your email
5. Click "Send Magic Link"
6. Check email - you should see a **clickable link**
7. Click the link
8. You're signed in! ✅

---

## 🔍 Troubleshooting

### Still receiving magic links instead of OTP?

**Check these:**

1. **Email OTP is enabled:**
   - Dashboard → Auth → Providers → Email
   - "Enable Email OTP" should be ON

2. **Correct radio button selected:**
   - Make sure "Send OTP" is selected (not "Send Magic Link")

3. **Clear Supabase cache:**
   - Sometimes Supabase caches the old settings
   - Wait 1-2 minutes after changing settings
   - Try again

4. **Check email template:**
   - Dashboard → Auth → Email Templates → Magic Link
   - Should include `{{ .Token }}` variable

5. **Restart your dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Email not arriving?

1. **Check spam folder**
2. **Wait 1-2 minutes** (Supabase can be slow sometimes)
3. **Check Supabase logs:**
   - Dashboard → Logs → Auth Logs
   - Look for email sending events

4. **Verify email provider is enabled:**
   - Dashboard → Auth → Providers → Email
   - Should be green/enabled

---

## 📧 Email Template Customization (Optional)

You can customize the OTP email to match Ole Hair branding:

### Custom OTP Email Template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .otp-code {
      font-size: 48px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 8px;
      color: #FFCC00;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1 style="color: #FFCC00;">Ole Hair</h1>
    </div>
    
    <h2>Your Verification Code</h2>
    <p>Enter this code to sign in to your Ole Hair account:</p>
    
    <div class="otp-code">
      {{ .Token }}
    </div>
    
    <p>This code will expire in <strong>5 minutes</strong>.</p>
    
    <p>If you didn't request this code, you can safely ignore this email.</p>
    
    <div class="footer">
      <p>© 2025 Ole Hair - Premium Wigs & Hair Bundles</p>
      <p>Kampala, Uganda</p>
    </div>
  </div>
</body>
</html>
```

To add this:
1. Go to: Dashboard → Auth → Email Templates
2. Click "Magic Link" template
3. Replace the HTML with the above
4. Save

---

## ✅ Verification Checklist

After configuration, verify:

- [ ] Email provider is enabled
- [ ] Email OTP is enabled
- [ ] OTP expiry is set to 300 seconds
- [ ] Email template includes `{{ .Token }}`
- [ ] "Send OTP" option shows OTP input screen
- [ ] "Send Magic Link" option shows success message only
- [ ] OTP emails contain 6-digit code
- [ ] Magic link emails contain clickable link
- [ ] Both methods work correctly

---

## 🎯 Summary

**User Flow:**

```
Sign In Button
    ↓
Email Tab (default)
    ↓
┌─────────────────────────────────┐
│ ( ) Send OTP  (•) Send Magic Link│
└─────────────────────────────────┘
    ↓                    ↓
OTP Email           Magic Link Email
(6-digit code)      (clickable link)
    ↓                    ↓
Enter Code          Click Link
    ↓                    ↓
    Signed In! ✅
```

**Perfect! This gives users choice while keeping it simple.** 🚀
