import { NextRequest, NextResponse } from 'next/server'

// This route delegates to the appropriate send route based on type
export async function POST(request: NextRequest) {
  try {
    const { type, ...rest } = await request.json()

    if (type === 'email') {
      // Forward to send-email-otp
      const response = await fetch(`${request.nextUrl.origin}/api/auth/send-email-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      })

      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    } else if (type === 'phone') {
      // Forward to send-phone-otp
      const response = await fetch(`${request.nextUrl.origin}/api/auth/send-phone-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      })

      const data = await response.json()
      return NextResponse.json(data, { status: response.status })
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "email" or "phone"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Resend OTP error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
