'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/auth/supabase-auth'

export default function AuthSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth error:', error)
          router.push('/auth/error')
          return
        }

        if (session) {
          // User is authenticated, redirect to home
          router.push('/')
        } else {
          // No session, redirect to home (will show sign in button)
          router.push('/')
        }
      } catch (error) {
        console.error('Unexpected error:', error)
        router.push('/')
      }
    }

    handleAuthSuccess()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Authentication Successful!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Redirecting you to Ole Hair...
        </p>
        
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
      </div>
    </div>
  )
}
