'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

export default function AuthTestPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: '/auth-test' })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: '/auth-test' })
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Authentication Test</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Session Status</h2>
        <div className="space-y-2">
          <p><strong>Status:</strong> {status}</p>
          {session?.user && (
            <>
              <p><strong>Name:</strong> {session.user.name}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              {session.user.image && (
                <div className="flex items-center gap-2">
                  <strong>Image:</strong>
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        
        {!session ? (
          <div className="space-y-3">
            <button
              onClick={() => handleSignIn('facebook')}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Sign in with Facebook'}
            </button>
            
            <button
              onClick={() => handleSignIn('google')}
              disabled={isLoading}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Sign in with Google'}
            </button>
            
            <div className="border-t pt-3">
              <p className="text-sm text-gray-600 mb-2">Email Magic Link:</p>
              <form onSubmit={(e) => {
                e.preventDefault()
                const email = (e.target as any).email.value
                handleSignIn('resend')
              }} className="space-y-2">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Send Magic Link'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Sign Out'}
          </button>
        )}
      </div>

      <div className="mt-6 text-center">
        <a href="/" className="text-gold hover:underline">
          ← Back to Home
        </a>
      </div>
    </div>
  )
}