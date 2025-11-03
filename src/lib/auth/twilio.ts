import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhone = process.env.TWILIO_PHONE_NUMBER
const twilioWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER

let client: ReturnType<typeof twilio> | null = null

if (accountSid && authToken) {
  client = twilio(accountSid, authToken)
}

/**
 * Generate 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Send OTP via WhatsApp
 */
export async function sendWhatsAppOTP(phoneNumber: string, otp: string) {
  if (!client || !twilioWhatsApp) {
    throw new Error('Twilio WhatsApp not configured')
  }

  try {
    const message = await client.messages.create({
      body: `Your Ole Hair verification code is: ${otp}\n\nThis code expires in 5 minutes.\n\nIf you didn't request this, please ignore.`,
      from: twilioWhatsApp,
      to: `whatsapp:${phoneNumber}`,
    })

    return message
  } catch (error: any) {
    // If WhatsApp fails, throw specific error
    if (error.code === 63016) {
      throw new Error('WhatsApp not available for this number')
    }
    throw error
  }
}

/**
 * Send OTP via SMS (fallback)
 */
export async function sendSMSOTP(phoneNumber: string, otp: string) {
  if (!client || !twilioPhone) {
    throw new Error('Twilio SMS not configured')
  }

  const message = await client.messages.create({
    body: `Your Ole Hair verification code is: ${otp}\n\nThis code expires in 5 minutes.`,
    from: twilioPhone,
    to: phoneNumber,
  })

  return message
}

/**
 * Send OTP with automatic WhatsApp/SMS fallback
 */
export async function sendPhoneOTP(phoneNumber: string, otp: string, preferWhatsApp: boolean = true) {
  if (preferWhatsApp) {
    try {
      return await sendWhatsAppOTP(phoneNumber, otp)
    } catch (error: any) {
      console.log('WhatsApp failed, falling back to SMS:', error.message)
      return await sendSMSOTP(phoneNumber, otp)
    }
  } else {
    return await sendSMSOTP(phoneNumber, otp)
  }
}

/**
 * Check if Twilio is configured
 */
export function isTwilioConfigured(): boolean {
  return !!(accountSid && authToken && (twilioPhone || twilioWhatsApp))
}
