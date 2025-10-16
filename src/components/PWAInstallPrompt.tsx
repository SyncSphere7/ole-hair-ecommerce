'use client'

import { useEffect, useState } from 'react'
import { FiX, FiDownload } from 'react-icons/fi'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      const dismissed = localStorage.getItem('pwa-prompt-dismissed')
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white border-2 border-gold rounded-lg shadow-2xl p-4 z-50 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="Dismiss"
      >
        <FiX className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
          <FiDownload className="w-6 h-6 text-black" />
        </div>
        <div className="flex-grow">
          <h3 className="font-serif text-lg mb-1">Install Ole Hair App</h3>
          <p className="text-sm text-gray-600 mb-3">
            Get quick access and a better shopping experience!
          </p>
          <button
            onClick={handleInstall}
            className="w-full btn-primary text-sm py-2"
          >
            Install Now
          </button>
        </div>
      </div>
    </div>
  )
}
