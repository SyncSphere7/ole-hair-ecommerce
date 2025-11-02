'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function MagicSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push(callbackUrl)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router, callbackUrl])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Ole Hair!
        </h1>
        
        <p className="text-gray-600 mb-6">
          You've successfully signed in with <strong>{email}</strong>
        </p>
        
        <div className="space-y-3">
          <Link
            href={callbackUrl}
            className="block w-full bg-gold text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Continue Shopping
          </Link>
          
          <p className="text-sm text-gray-500">
            Redirecting automatically in 3 seconds...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function MagicSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <MagicSuccessContent />
    </Suspense>
  )
}