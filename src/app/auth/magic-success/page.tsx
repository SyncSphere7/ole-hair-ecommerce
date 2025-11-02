'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Magic link success page with session detection
function MagicSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    if (status === 'loading') return
    if (session?.user) {
      const timer = setTimeout(() => {
        router.push(callbackUrl)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [session, status, router, callbackUrl])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Signing you in...</p>
        </div>
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">
            Welcome back, {session.user.name || 'there'}! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">
            Successfully signed in with <strong>{session.user.email}</strong>
          </p>
          <div className="space-y-3">
            <Link href={callbackUrl} className="block w-full bg-gold text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
              Continue Shopping
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting in 3 seconds...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">Check Your Email! 📧</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">
          We sent you a magic link. Click it to sign in.
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>💡 Tip:</strong> Check your <strong>spam or junk folder</strong> if you don't see it.
          </p>
        </div>
        <Link href="/" className="block w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function MagicSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <MagicSuccessContent />
    </Suspense>
  )
}
