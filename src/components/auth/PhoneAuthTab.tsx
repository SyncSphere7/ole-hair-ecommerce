'use client'

import { useState } from 'react'
import { FaWhatsapp, FaMobileAlt } from 'react-icons/fa'
import CountrySelector from './CountrySelector'
import OTPInput from './OTPInput'

interface PhoneAuthTabProps {
  onSuccess: () => void
}

export default function PhoneAuthTab({ onSuccess }: PhoneAuthTabProps) {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('UG')
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [preferWhatsApp, setPreferWhatsApp] = useState(true)
  const [canResend, setCanResend] = useState(false)
  const [fullPhone, setFullPhone] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/send-phone-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone, 
          countryCode,
          preferWhatsApp 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setFullPhone(data.phone)
        setMessage(data.message)
        
        // Enable resend after 30 seconds
        setTimeout(() => setCanResend(true), 30000)
      } else {
        setMessage(data.error || 'Failed to send OTP. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/verify-phone-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, token: otp }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Verified! Signing you in...')
        setTimeout(() => onSuccess(), 1000)
      } else {
        setMessage(data.error || 'Invalid OTP. Please try again.')
      }
    } catch (error) {
      setMessage('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    await handleSendOTP(new Event('submit') as any)
  }

  const handleCountryChange = (code: string, dial: string) => {
    setCountryCode(code)
    // dialCode not needed - we don't display it anymore
  }

  if (otpSent) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
            Enter Verification Code
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We sent a 6-digit code to<br />
            <span className="font-medium text-black dark:text-white">{fullPhone}</span>
          </p>
        </div>

        <OTPInput
          length={6}
          onComplete={handleVerifyOTP}
          disabled={isLoading}
        />

        {message && (
          <div className={`text-center text-sm ${
            message.includes('Verified') || message.includes('sent')
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {message}
          </div>
        )}

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || isLoading}
            className="text-gold hover:text-yellow-600 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canResend ? 'Resend OTP' : 'Resend available in 30s'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setOtpSent(false)
            setMessage('')
          }}
          className="w-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm"
        >
          ← Back to phone number
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSendOTP} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <CountrySelector
            value={countryCode}
            onChange={handleCountryChange}
            disabled={isLoading}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="712345678"
            required
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-gold focus:outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={preferWhatsApp}
            onChange={() => setPreferWhatsApp(true)}
            className="w-4 h-4 text-gold focus:ring-gold"
          />
          <FaWhatsapp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">WhatsApp</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!preferWhatsApp}
            onChange={() => setPreferWhatsApp(false)}
            className="w-4 h-4 text-gold focus:ring-gold"
          />
          <FaMobileAlt className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">SMS</span>
        </label>
      </div>

      {message && (
        <div className={`text-sm text-center ${
          message.includes('sent')
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !phone}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {preferWhatsApp ? <FaWhatsapp className="w-5 h-5" /> : <FaMobileAlt className="w-5 h-5" />}
        {isLoading ? 'Sending...' : 'Send OTP'}
      </button>
    </form>
  )
}
