import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import SessionProvider from '@/components/SessionProvider'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ole Hair - Premium Wigs & Hair Bundles in Kampala',
  description: 'Shop premium quality wigs and hair bundles in Kampala, Uganda. Bob wigs, bundles, pixie wigs and more. Free pickup or delivery available.',
  keywords: ['wigs', 'hair bundles', 'kampala', 'uganda', 'bob wig', 'pixie wig', 'hair extensions'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ole Hair',
  },
  openGraph: {
    title: 'Ole Hair - Premium Wigs & Hair Bundles',
    description: 'Shop premium quality wigs and hair bundles in Kampala, Uganda',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFCC00',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans bg-white text-black">
        <SessionProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <PWAInstallPrompt />
        </SessionProvider>
      </body>
    </html>
  )
}
