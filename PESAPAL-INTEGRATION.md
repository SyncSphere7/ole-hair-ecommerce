/**
 * Pesapal Payment Integration Template
 * 
 * This file contains template code for integrating Pesapal payments.
 * Follow the steps below to complete the integration.
 */

// Step 1: Install Pesapal SDK (if using)
// npm install pesapal-node-sdk

// Step 2: Create environment variables
// Add to .env.local:
/*
NEXT_PUBLIC_PESAPAL_CONSUMER_KEY=your_consumer_key_here
NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET=your_consumer_secret_here
NEXT_PUBLIC_PESAPAL_CALLBACK_URL=https://yourdomain.com/api/pesapal/callback
PESAPAL_API_URL=https://demo.pesapal.com/API/ (sandbox)
// For production: https://www.pesapal.com/API/
*/

// Step 3: Create API route for initiating payment
// File: src/app/api/pesapal/initiate/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, description, phone_number, payment_method, order_id, customer_info } = body

    // Pesapal payment request parameters
    const pesapalData = {
      Amount: amount,
      Description: description,
      Type: 'MERCHANT',
      Reference: order_id,
      
      // Customer details
      FirstName: customer_info.name.split(' ')[0],
      LastName: customer_info.name.split(' ').slice(1).join(' '),
      Email: customer_info.email,
      PhoneNumber: phone_number || customer_info.phone,
      
      // Payment method specific
      PaymentMethod: payment_method === 'mtn' ? 'MTN_MOBILE_MONEY_UGANDA' : 
                     payment_method === 'airtel' ? 'AIRTEL_MONEY_UGANDA' : 
                     'CARD',
      
      // Callback URLs
      Currency: 'UGX',
      callback_url: process.env.NEXT_PUBLIC_PESAPAL_CALLBACK_URL,
    }

    // TODO: Implement Pesapal API call
    // const response = await fetch(`${process.env.PESAPAL_API_URL}PostPesapalDirectOrderV4`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${generatePesapalToken()}` // Implement OAuth
    //   },
    //   body: JSON.stringify(pesapalData)
    // })

    // For now, return mock response for development
    return Response.json({
      success: true,
      iframe_url: 'https://demo.pesapal.com/API/PostPesapalDirectOrderV4',
      transaction_id: 'TXN' + Date.now(),
      message: 'Payment initiated successfully'
    })

  } catch (error) {
    console.error('Pesapal initiation error:', error)
    return Response.json({ success: false, error: 'Payment initiation failed' }, { status: 500 })
  }
}

// Step 4: Create callback handler
// File: src/app/api/pesapal/callback/route.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get('OrderTrackingId')
  const merchant_reference = searchParams.get('OrderMerchantReference')
  
  // TODO: Query Pesapal to verify payment status
  // const status = await verifyPesapalPayment(reference)
  
  // Redirect to confirmation page
  return Response.redirect(`/confirmation?order=${merchant_reference}&status=completed`)
}

// Step 5: Create IPN (Instant Payment Notification) handler
// File: src/app/api/pesapal/ipn/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { OrderTrackingId, OrderMerchantReference, Status } = body
    
    // TODO: Verify and update order status in your database
    // await updateOrderPaymentStatus(OrderMerchantReference, Status)
    
    return Response.json({ success: true, message: 'IPN received' })
  } catch (error) {
    console.error('IPN processing error:', error)
    return Response.json({ success: false }, { status: 500 })
  }
}

// Step 6: Helper function to generate OAuth token
function generatePesapalToken() {
  // TODO: Implement OAuth 1.0 signature generation
  // Pesapal uses OAuth 1.0 for authentication
  // Reference: https://developer.pesapal.com/how-to-integrate/authentication
  
  const consumerKey = process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY
  const consumerSecret = process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET
  
  // Implement OAuth signature
  return 'oauth_token_here'
}

// Step 7: Helper function to verify payment
async function verifyPesapalPayment(transactionId: string) {
  // TODO: Call Pesapal query API
  // const response = await fetch(`${process.env.PESAPAL_API_URL}QueryPaymentDetails`, {
  //   method: 'GET',
  //   params: {
  //     pesapal_merchant_reference: merchantRef,
  //     pesapal_transaction_tracking_id: transactionId
  //   }
  // })
  
  return {
    status: 'COMPLETED',
    method: 'MTN_MOBILE_MONEY_UGANDA',
    amount: 0,
  }
}

// Step 8: Update checkout page to call the API
// In src/app/checkout/page.tsx, replace the setTimeout with:

/*
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsProcessing(true)

  try {
    const orderNumber = generateOrderNumber()
    
    const response = await fetch('/api/pesapal/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        description: `Ole Hair Order #${orderNumber}`,
        phone_number: phoneNumber,
        payment_method: paymentMethod,
        order_id: orderNumber,
        customer_info: customerInfo,
      })
    })

    const data = await response.json()

    if (data.success) {
      // Store order data
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderNumber,
        items,
        subtotal,
        deliveryFee,
        total,
        deliveryMethod,
        customerInfo,
        paymentMethod,
        phoneNumber,
        createdAt: new Date().toISOString(),
      }))

      // For iframe payment
      if (data.iframe_url) {
        // Open payment iframe/modal
        window.location.href = data.iframe_url
      }
    } else {
      alert('Payment initiation failed. Please try again.')
      setIsProcessing(false)
    }
  } catch (error) {
    console.error('Payment error:', error)
    alert('An error occurred. Please try again.')
    setIsProcessing(false)
  }
}
*/

// Step 9: Testing
// 1. Use Pesapal sandbox credentials
// 2. Test MTN Mobile Money with test numbers
// 3. Test Airtel Money with test numbers  
// 4. Test card payments with test cards
// 5. Verify IPN notifications are received

// Step 10: Go Live
// 1. Get production credentials from Pesapal
// 2. Update environment variables
// 3. Change PESAPAL_API_URL to production
// 4. Test with small real transaction
// 5. Monitor for issues

// Pesapal Test Credentials (Sandbox):
// MTN Test Number: 256772123456 (any PIN)
// Airtel Test Number: 256752123456 (any PIN)
// Test Card: 4242 4242 4242 4242 (any expiry/CVV)

// Resources:
// - Pesapal API Docs: https://developer.pesapal.com
// - Dashboard: https://www.pesapal.com/merchant
// - Support: support@pesapal.com
