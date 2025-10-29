'use client'

import { signIn } from 'next-auth/react'
import { FaGoogle, FaFacebook, FaTimes, FaEnvelope } from 'react-icons/fa'
import { useEffect, useState } from 'react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    setMessage('')
    try {
      const result = await signIn(provider, { 
        callbackUrl: '/',
        redirect: false 
      })
      if (result?.error) {
        setMessage('Sign in failed. Please try again.')
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setMessage('Sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/auth/magic-link-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          callbackUrl: '/',
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('Check your email for a sign-in link!')
        setEmail('')
      } else {
        setMessage(data.error || 'Failed to send email. Please try again.')
      }
    } catch (error) {
      console.error('Email sign in error:', error)
      setMessage('Failed to send email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Note: We'll show both Google and Facebook since they're configured
  // The auth system will handle provider availability on the server side

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
          disabled={isLoading}
        >
          <FaTimes className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-black mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to track orders, save your wishlist, and checkout faster
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes('Check your email') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Social Sign In Buttons */}
        <div className="space-y-3">
          {/* Facebook Sign In - Always show since we have credentials */}
          <button
            onClick={() => handleSignIn('facebook')}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaFacebook className="h-5 w-5 text-blue-600" />
            {isLoading ? 'Signing in...' : 'Continue with Facebook'}
          </button>

          {/* Google Sign In */}
          <button
            onClick={() => handleSignIn('google')}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="h-5 w-5 text-red-500" />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>

        {/* Email Magic Link - Custom implementation with Resend */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-gold focus:outline-none"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !email}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaEnvelope className="h-4 w-4" />
            {isLoading ? 'Sending...' : 'Sign in with Email'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Guest Checkout */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="w-full rounded-lg border-2 border-gold bg-transparent px-6 py-3 font-semibold text-gold transition-all hover:bg-gold hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue as Guest
        </button>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
