'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'MissingToken':
        return 'Invalid or missing authentication token.'
      case 'Token expired':
        return 'This sign-in link has expired. Please request a new one.'
      case 'Invalid token':
        return 'This sign-in link is invalid. Please request a new one.'
      case 'VerificationFailed':
        return 'Authentication failed. Please try again.'
      default:
        return 'An error occurred during sign-in. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Sign-in Failed
        </h1>
        
        <p className="text-gray-600 mb-6">
          {getErrorMessage(error)}
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gold text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Try Again
          </Link>
          
          <Link
            href="/contact"
            className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
          >
            Need Help? Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}