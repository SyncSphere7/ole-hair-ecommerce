'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const getItemCount = useCartStore((state) => state.getItemCount)
  const cartCount = getItemCount()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/olehair-big-logo.jpg"
              alt="Ole Hair"
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-black hover:text-gold transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-black hover:text-gold transition-colors font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-black hover:text-gold transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-gold transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 text-black hover:text-gold transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            <Link
              href="/"
              className="block text-black hover:text-gold transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block text-black hover:text-gold transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block text-black hover:text-gold transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-black hover:text-gold transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
