'use client'

import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { FaEnvelope, FaMobileAlt } from 'react-icons/fa'
import EmailAuthTab from './EmailAuthTab'
import PhoneAuthTab from './PhoneAuthTab'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

type Tab = 'email' | 'phone'

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('email')

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

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess()
    } else {
      // Reload page to update session
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-8 shadow-2xl mx-4 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-bold text-black dark:text-white mb-2 transition-colors">
            Sign In / Sign Up
          </h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">
            Passwordless authentication - no password needed!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-all
              ${activeTab === 'email'
                ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }
            `}
          >
            <FaEnvelope className="w-4 h-4" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('phone')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-all
              ${activeTab === 'phone'
                ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }
            `}
          >
            <FaMobileAlt className="w-4 h-4" />
            Phone
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'email' ? (
            <EmailAuthTab onSuccess={handleSuccess} />
          ) : (
            <PhoneAuthTab onSuccess={handleSuccess} />
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Guest Checkout */}
        <button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-gold bg-transparent px-6 py-3 font-semibold text-gold transition-all hover:bg-gold hover:text-black"
        >
          Continue as Guest
        </button>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
