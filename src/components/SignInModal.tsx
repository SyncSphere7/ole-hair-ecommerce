'use client'

import { signIn } from 'next-auth/react'
import { FaGoogle, FaFacebook, FaGithub, FaTimes } from 'react-icons/fa'
import { useEffect } from 'react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
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
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <FaTimes className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-gold-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to track orders, save your wishlist, and checkout faster
          </p>
        </div>

        {/* Social Sign In Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleSignIn('google')}
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gold-500 hover:bg-gold-50"
          >
            <FaGoogle className="h-5 w-5 text-red-500" />
            Continue with Google
          </button>

          <button
            onClick={() => handleSignIn('facebook')}
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gold-500 hover:bg-gold-50"
          >
            <FaFacebook className="h-5 w-5 text-blue-600" />
            Continue with Facebook
          </button>

          <button
            onClick={() => handleSignIn('github')}
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gold-500 hover:bg-gold-50"
          >
            <FaGithub className="h-5 w-5 text-gray-800" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Guest Checkout */}
        <button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-gold-500 bg-transparent px-6 py-3 font-semibold text-gold-600 transition-all hover:bg-gold-500 hover:text-white"
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
