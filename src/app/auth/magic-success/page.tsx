'use client''use client''use client'



import { useEffect, Suspense } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useSession } from 'next-auth/react'import { useEffect, Suspense } from 'react'import { useEffect, Suspense } from 'react'

import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'import { useRouter, useSearchParams } from 'next/navigation'

function MagicSuccessContent() {

  const router = useRouter()import { useSession } from 'next-auth/react'import Link from 'next/link'

  const searchParams = useSearchParams()

  const { data: session, status } = useSession()import Link from 'next/link'

  const callbackUrl = searchParams.get('callbackUrl') || '/'

function MagicSuccessContent() {

  useEffect(() => {

    // Wait for session to loadfunction MagicSuccessContent() {  const router = useRouter()

    if (status === 'loading') return

  const router = useRouter()  const searchParams = useSearchParams()

    // If user is authenticated, redirect after 3 seconds

    if (session?.user) {  const searchParams = useSearchParams()  const email = searchParams.get('email')

      const timer = setTimeout(() => {

        router.push(callbackUrl)  const { data: session, status } = useSession()  const callbackUrl = searchParams.get('callbackUrl') || '/'

      }, 3000)

      return () => clearTimeout(timer)  const callbackUrl = searchParams.get('callbackUrl') || '/'

    }

  }, [session, status, router, callbackUrl])  useEffect(() => {



  // Still loading session  useEffect(() => {    // Auto-redirect after 3 seconds

  if (status === 'loading') {

    return (    // Wait for session to load    const timer = setTimeout(() => {

      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">

        <div className="text-center">    if (status === 'loading') return      router.push(callbackUrl)

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>

          <p className="text-gray-600 dark:text-gray-400">Signing you in...</p>    }, 3000)

        </div>

      </div>    // If user is authenticated, redirect after 3 seconds

    )

  }    if (session?.user) {    return () => clearTimeout(timer)



  // User is authenticated      const timer = setTimeout(() => {  }, [router, callbackUrl])

  if (session?.user) {

    return (        router.push(callbackUrl)

      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors">

        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors">      }, 3000)  return (

          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">

            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">      return () => clearTimeout(timer)    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

            </svg>    }      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">

          </div>

            }, [session, status, router, callbackUrl])        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">

          <h1 className="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">

            Welcome back, {session.user.name || 'there'}! 🎉          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          </h1>

            // Still loading session            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">

            You've successfully signed in with <strong>{session.user.email}</strong>  if (status === 'loading') {          </svg>

          </p>

              return (        </div>

          <div className="space-y-3">

            <Link      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">        

              href={callbackUrl}

              className="block w-full bg-gold text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"        <div className="text-center">        <h1 className="text-2xl font-bold text-gray-900 mb-2">

            >

              Continue Shopping          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>          Welcome to Ole Hair!

            </Link>

                      <p className="text-gray-600 dark:text-gray-400">Signing you in...</p>        </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">

              Redirecting automatically in 3 seconds...        </div>        

            </p>

          </div>      </div>        <p className="text-gray-600 mb-6">

        </div>

      </div>    )          You've successfully signed in with <strong>{email}</strong>

    )

  }  }        </p>



  // Email sent confirmation (before clicking link)        

  return (

    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors">  // User is authenticated        <div className="space-y-3">

      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors">

        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">  if (session?.user) {          <Link

          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />    return (            href={callbackUrl}

          </svg>

        </div>      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors">            className="block w-full bg-gold text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"

        

        <h1 className="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors">          >

          Check Your Email! 📧

        </h1>          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">            Continue Shopping

        

        <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">          </Link>

          We've sent you a magic link to sign in. Click the link in your email to continue.

        </p>              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />          

        

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">            </svg>          <p className="text-sm text-gray-500">

          <p className="text-sm text-yellow-800 dark:text-yellow-200">

            <strong>💡 Tip:</strong> Can't find the email? Check your <strong>spam or junk folder</strong>.           </div>            Redirecting automatically in 3 seconds...

            The email might take a minute to arrive.

          </p>                    </p>

        </div>

                  <h1 className="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">        </div>

        <Link

          href="/"            Welcome back, {session.user.name || 'there'}! 🎉      </div>

          className="block w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"

        >          </h1>    </div>

          Back to Home

        </Link>            )

      </div>

    </div>          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">}

  )

}            You've successfully signed in with <strong>{session.user.email}</strong>



export default function MagicSuccessPage() {          </p>export default function MagicSuccessPage() {

  return (

    <Suspense fallback={            return (

      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">

        <div className="text-center">          <div className="space-y-3">    <Suspense fallback={

          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>

          <p className="text-gray-600 dark:text-gray-400">Loading...</p>            <Link      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        </div>

      </div>              href={callbackUrl}        <div className="text-center">

    }>

      <MagicSuccessContent />              className="block w-full bg-gold text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>

    </Suspense>

  )            >          <p>Loading...</p>

}

              Continue Shopping        </div>

            </Link>      </div>

                }>

            <p className="text-sm text-gray-500 dark:text-gray-400">      <MagicSuccessContent />

              Redirecting automatically in 3 seconds...    </Suspense>

            </p>  )

          </div>}
        </div>
      </div>
    )
  }

  // Email sent confirmation (before clicking link)
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transition-colors">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">
          Check Your Email! 📧
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">
          We've sent you a magic link to sign in. Click the link in your email to continue.
        </p>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>💡 Tip:</strong> Can't find the email? Check your <strong>spam or junk folder</strong>. 
            The email might take a minute to arrive.
          </p>
        </div>
        
        <Link
          href="/"
          className="block w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
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
