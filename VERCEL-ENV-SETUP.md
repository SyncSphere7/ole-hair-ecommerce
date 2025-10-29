# Vercel Environment Variables Setup

## 🚀 How to Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
Open: https://vercel.com/syncsphere7s-projects/ole-hair-ecommerce/settings/environment-variables

### Step 2: Add Each Variable

For **each** variable below, click **"Add New"** and:
1. Enter the **Key** (variable name)
2. Enter the **Value**
3. Select **"Production"** environment
4. Click **"Save"**

---

## 📋 Variables to Add:

### Supabase
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://izlvdgjugtcuezzmfuth.supabase.co
```

```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bHZkZ2p1Z3RjdWV6em1mdXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNjIyNzMsImV4cCI6MjA3NjgzODI3M30.Bpdww_Q8MV4gh2eK_Vmgd87e0c3QezyHDydVMEPhnu0
```

### NextAuth
```
Key: NEXTAUTH_SECRET
Value: 7DoFa0QI6emhzlEQ90/O2nDjICtrLuT917CrqxT98Ak=
```

```
Key: NEXTAUTH_URL
Value: https://ole-hair-ecommerce-99t9.vercel.app
```

### Google OAuth
```
Key: GOOGLE_CLIENT_ID
Value: your-google-client-id
```

```
Key: GOOGLE_CLIENT_SECRET
Value: your-google-client-secret
```

### GitHub OAuth (Production)
```
Key: GITHUB_CLIENT_ID
Value: Ov23liv3NIgHEkHvBYvb
```

```
Key: GITHUB_CLIENT_SECRET
Value: 61fc5aaf62d4a4ae9509e99f87d7b48d981fcc5c
```

---

## ⚠️ Important Notes:

1. **Don't commit `.env.production`** to Git (it's in .gitignore)
2. **Redeploy after adding variables**: Vercel needs to rebuild to pick up new env vars
3. **Keep these values secret**: Never share them publicly

---

## 🔄 After Adding Variables:

1. Go to: https://vercel.com/syncsphere7s-projects/ole-hair-ecommerce
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger auto-deployment

---

## ✅ Test Production Auth:

After redeployment, test on your live site:
- https://ole-hair-ecommerce-99t9.vercel.app
- Click "Sign In"
- Try GitHub and Google OAuth

Both should work on production! 🎉
