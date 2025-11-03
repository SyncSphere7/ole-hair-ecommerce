'use client'

import { useState } from 'react'
import { FaEnvelope, FaGoogle } from 'react-icons/fa'
import { supabase } from '@/lib/auth/supabase-auth'

interface EmailAuthTabProps {
  onSuccess: () => void
}

export default function EmailAuthTab({ onSuccess }: EmailAuthTabProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [canResend, setCanResend] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/success`,
        },
      })

      if (error) {
        setMessage('Google sign-in failed. Please try again.')
        setIsLoading(false)
      }
      // If successful, user will be redirected to Google
    } catch (error) {
      setMessage('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/send-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          useMagicLink: true
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Magic link sent! Check your email and click the link to sign in.')
        
        // Enable resend after 30 seconds
        setTimeout(() => setCanResend(true), 30000)
      } else {
        setMessage(data.error || 'Failed to send. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  const handleResend = async () => {
    setCanResend(false)
    await handleSendMagicLink(new Event('submit') as any)
  }

  return (
    <div className="space-y-4">
      {/* Google Sign-In Button - Top */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        <FaGoogle className="w-5 h-5 text-blue-500" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* Magic Link Form - Below */}
      <form onSubmit={handleSendMagicLink} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-gold focus:outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {message && (
          <div className={`text-sm text-center ${
            message.includes('✅')
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaEnvelope className="w-4 h-4" />
          {isLoading ? 'Sending...' : 'Send Magic Link'}
        </button>

        {canResend && (
          <button
            type="button"
            onClick={handleResend}
            className="w-full text-sm text-gold hover:text-yellow-600 font-medium"
          >
            Resend Magic Link
          </button>
        )}
      </form>
    </div>
  )
}
