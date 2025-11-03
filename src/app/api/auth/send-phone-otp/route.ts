import { NextRequest, NextResponse } from 'next/server'
import { checkOTPRateLimit, storeOTP } from '@/lib/auth/rate-limiter'
import { generateOTP, sendPhoneOTP, isTwilioConfigured } from '@/lib/auth/twilio'
import { formatPhoneNumber, validatePhoneNumber } from '@/lib/auth/phone-formatter'

export async function POST(request: NextRequest) {
  try {
    const { phone, countryCode = 'UG', preferWhatsApp = true } = await request.json()

    // Check if Twilio is configured
    if (!isTwilioConfigured()) {
      return NextResponse.json(
        { error: 'Phone authentication is not available at this time' },
        { status: 503 }
      )
    }

    // Validate phone
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Format and validate phone number
    let formattedPhone: string
    try {
      formattedPhone = formatPhoneNumber(phone, countryCode as any)
      
      if (!validatePhoneNumber(phone, countryCode as any)) {
        return NextResponse.json(
          { error: 'Invalid phone number' },
          { status: 400 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    // Check rate limiting
    const rateLimit = await checkOTPRateLimit(formattedPhone, 'phone')
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: rateLimit.message,
          retryAfter: rateLimit.retryAfterSeconds 
        },
        { status: 429 }
      )
    }

    // Generate OTP
    const otp = generateOTP()

    // Store OTP in database
    await storeOTP(formattedPhone, otp, 'phone')

    // Send OTP via Twilio (WhatsApp or SMS)
    try {
      const message = await sendPhoneOTP(formattedPhone, otp, preferWhatsApp)
      
      return NextResponse.json({
        success: true,
        message: preferWhatsApp ? 'OTP sent via WhatsApp' : 'OTP sent via SMS',
        method: message.to.startsWith('whatsapp:') ? 'whatsapp' : 'sms',
        attemptsRemaining: rateLimit.attemptsRemaining,
        phone: formattedPhone
      })
    } catch (twilioError: any) {
      console.error('Twilio error:', twilioError)
      
      // If WhatsApp failed, try SMS
      if (twilioError.message.includes('WhatsApp not available')) {
        try {
          await sendPhoneOTP(formattedPhone, otp, false)
          return NextResponse.json({
            success: true,
            message: 'OTP sent via SMS (WhatsApp unavailable)',
            method: 'sms',
            attemptsRemaining: rateLimit.attemptsRemaining,
            phone: formattedPhone
          })
        } catch (smsError) {
          console.error('SMS fallback error:', smsError)
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Send phone OTP error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
