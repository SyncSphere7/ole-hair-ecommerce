# Pesapal Integration Setup Guide

## ⚠️ SECURITY WARNING
**NEVER commit your actual Pesapal credentials to git!**
Keep your Consumer Key and Consumer Secret in `.env.local` ONLY (this file is gitignored).

---

## Quick Setup Steps

### 1. Add Your Credentials to `.env.local`

Create a file named `.env.local` in the root directory (if it doesn't exist) and add:

```bash
# Pesapal Payment Gateway Credentials
PESAPAL_CONSUMER_KEY=AgSKwORd2uhV2GqKoMjgjtt1KUrAl6xv
PESAPAL_CONSUMER_SECRET=VtCPOTOTrr8mOTXRd+vLQmQ9tmg=
NEXT_PUBLIC_PESAPAL_ENVIRONMENT=sandbox

# Base URL (update for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Copy your other existing environment variables from Vercel/production
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
AUTH_RESEND_KEY=your-resend-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Run the Database Migration

Apply the orders table migration to Supabase:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL from:
# supabase/migrations/20251104000000_create_orders_table.sql
# in your Supabase dashboard SQL editor
```

### 3. Register IPN with Pesapal

Start your development server:

```bash
npm run dev
```

Then register the IPN URL by making a POST request:

```bash
curl -X POST http://localhost:3000/api/pesapal/register-ipn
```

You'll get a response like:

```json
{
  "success": true,
  "ipn_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "ipn_url": "http://localhost:3000/api/pesapal/ipn",
  "message": "IPN registered successfully. Add this IPN ID to your .env.local file as PESAPAL_IPN_ID"
}
```

Copy the `ipn_id` and add it to your `.env.local`:

```bash
PESAPAL_IPN_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 4. Test the Payment Flow

1. Add items to cart
2. Go to checkout page
3. Fill in all required information
4. Click "Pay Now"
5. You'll be redirected to Pesapal's payment page (sandbox)
6. Complete payment using test credentials
7. You'll be redirected back to the confirmation page

---

## Testing in Sandbox

### Test Phone Numbers (Sandbox):
- **MTN Mobile Money**: Use any valid Uganda MTN number format
- **Airtel Money**: Use any valid Uganda Airtel number format

### Test Cards (Sandbox):
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

## Production Deployment

### 1. Update Environment Variables

In your production environment (Vercel, etc.):

```bash
PESAPAL_CONSUMER_KEY=AgSKwORd2uhV2GqKoMjgjtt1KUrAl6xv
PESAPAL_CONSUMER_SECRET=VtCPOTOTrr8mOTXRd+vLQmQ9tmg=
PESAPAL_IPN_ID=your-production-ipn-id
NEXT_PUBLIC_PESAPAL_ENVIRONMENT=production
NEXT_PUBLIC_BASE_URL=https://www.olehair.com
```

### 2. Register Production IPN

After deploying, register the production IPN:

```bash
curl -X POST https://www.olehair.com/api/pesapal/register-ipn
```

Add the returned IPN ID to your production environment variables.

### 3. Test with Real Payment

Make a small real payment to verify everything works:

1. Use a real phone number with actual money
2. Complete a small transaction (e.g., 1000 UGX)
3. Verify the payment appears in your Pesapal dashboard
4. Check that the order status updates correctly in your database

---

## API Endpoints Created

- **POST /api/pesapal/initiate** - Initiate payment and get redirect URL
- **GET /api/pesapal/callback** - Handle redirect after payment
- **GET /api/pesapal/ipn** - Receive payment status webhooks
- **POST /api/pesapal/register-ipn** - Register IPN URL (setup only)
- **GET /api/pesapal/auth** - Get OAuth token (internal use)

---

## Payment Flow

1. **User clicks "Pay Now"**
   - Checkout page validates form
   - Calls `/api/pesapal/initiate` with order details
   - Order saved to database with status "PENDING"

2. **Redirect to Pesapal**
   - User redirected to Pesapal payment page
   - Selects payment method (MTN, Airtel, Card)
   - Completes payment

3. **Payment Verification**
   - Pesapal redirects back to `/api/pesapal/callback`
   - We verify payment status with Pesapal API
   - Order status updated in database
   - User redirected to confirmation page

4. **Webhook (IPN)**
   - Pesapal sends payment status to `/api/pesapal/ipn`
   - We verify and update order status
   - This ensures we don't miss any status updates

---

## Monitoring Orders

View orders in Supabase dashboard:

```sql
-- View all orders
SELECT * FROM orders ORDER BY created_at DESC;

-- View completed orders
SELECT * FROM orders WHERE status = 'COMPLETED';

-- View pending orders
SELECT * FROM orders WHERE status = 'PENDING';

-- View orders for specific user
SELECT * FROM orders WHERE user_id = 'user-uuid-here';
```

---

## Troubleshooting

### Error: "Pesapal credentials not configured"
- Ensure `.env.local` exists with correct credentials
- Restart your development server after adding credentials

### Error: "Missing OrderTrackingId"
- Check Pesapal sandbox is working
- Verify your Consumer Key/Secret are correct

### Order stuck in PENDING status
- Check IPN is registered correctly
- Verify IPN URL is publicly accessible (use ngrok for local testing)
- Check Pesapal dashboard for payment status

### Payment shows COMPLETED but cart not cleared
- This is correct behavior - cart only clears on confirmation page
- User can review their payment status first

---

## Security Best Practices

✅ **DO:**
- Keep credentials in `.env.local` (gitignored)
- Use server-side API routes for all Pesapal calls
- Validate all payment callbacks
- Use HTTPS in production
- Monitor failed payments

❌ **DON'T:**
- Commit credentials to git
- Expose credentials in client-side code
- Trust client-side payment status
- Skip payment verification
- Use sandbox credentials in production

---

## Next Steps

After completing this setup:

1. ✅ Test payments in sandbox thoroughly
2. ✅ Update checkout page UI with loading states
3. ✅ Add email notifications for successful orders
4. ✅ Add admin dashboard to view orders
5. ✅ Set up monitoring/alerts for failed payments
6. ✅ Deploy to production and register production IPN

---

## Support

- **Pesapal Documentation**: https://developer.pesapal.com/
- **Pesapal Support**: support@pesapal.com
- **Sandbox Dashboard**: https://demo.pesapal.com/
- **Production Dashboard**: https://www.pesapal.com/

---

**Last Updated**: November 2024
**Status**: ✅ Integration Complete - Ready for Testing
