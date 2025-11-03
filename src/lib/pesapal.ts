/**
 * Pesapal Payment Gateway Integration
 * Handles OAuth authentication and API requests to Pesapal
 */

const PESAPAL_SANDBOX_URL = 'https://cybqa.pesapal.com/pesapalv3'
const PESAPAL_PRODUCTION_URL = 'https://pay.pesapal.com/v3'

const isProd = process.env.NEXT_PUBLIC_PESAPAL_ENVIRONMENT === 'production'
const PESAPAL_BASE_URL = isProd ? PESAPAL_PRODUCTION_URL : PESAPAL_SANDBOX_URL

interface PesapalTokenResponse {
  token: string
  expiryDate: string
  error?: string
  message?: string
}

interface PesapalOrderRequest {
  id: string
  currency: string
  amount: number
  description: string
  callback_url: string
  notification_id: string
  billing_address: {
    email_address: string
    phone_number: string
    country_code: string
    first_name: string
    middle_name?: string
    last_name: string
    line_1?: string
    line_2?: string
    city?: string
    state?: string
    postal_code?: string
    zip_code?: string
  }
}

interface PesapalOrderResponse {
  order_tracking_id: string
  merchant_reference: string
  redirect_url: string
  error?: string
  message?: string
}

/**
 * Get OAuth access token from Pesapal
 */
export async function getPesapalToken(): Promise<string> {
  try {
    const response = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get Pesapal token: ${response.statusText}`)
    }

    const data: PesapalTokenResponse = await response.json()

    if (data.error) {
      throw new Error(`Pesapal error: ${data.message || data.error}`)
    }

    return data.token
  } catch (error) {
    console.error('Error getting Pesapal token:', error)
    throw error
  }
}

/**
 * Register IPN (Instant Payment Notification) URL with Pesapal
 */
export async function registerPesapalIPN(ipnUrl: string, token: string): Promise<string> {
  try {
    const response = await fetch(`${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: ipnUrl,
        ipn_notification_type: 'GET',
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to register IPN: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`Pesapal IPN error: ${data.message || data.error}`)
    }

    return data.ipn_id
  } catch (error) {
    console.error('Error registering Pesapal IPN:', error)
    throw error
  }
}

/**
 * Submit order request to Pesapal
 */
export async function submitPesapalOrder(
  orderData: PesapalOrderRequest,
  token: string
): Promise<PesapalOrderResponse> {
  try {
    const response = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error(`Failed to submit order: ${response.statusText}`)
    }

    const data: PesapalOrderResponse = await response.json()

    if (data.error) {
      throw new Error(`Pesapal order error: ${data.message || data.error}`)
    }

    return data
  } catch (error) {
    console.error('Error submitting Pesapal order:', error)
    throw error
  }
}

/**
 * Get transaction status from Pesapal
 */
export async function getPesapalTransactionStatus(
  orderTrackingId: string,
  token: string
): Promise<any> {
  try {
    const response = await fetch(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to get transaction status: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`Pesapal status error: ${data.message || data.error}`)
    }

    return data
  } catch (error) {
    console.error('Error getting Pesapal transaction status:', error)
    throw error
  }
}

/**
 * Payment status codes from Pesapal
 */
export const PESAPAL_STATUS = {
  INVALID: 0,
  COMPLETED: 1,
  FAILED: 2,
  REVERSED: 3,
} as const

export type PesapalStatus = typeof PESAPAL_STATUS[keyof typeof PESAPAL_STATUS]
