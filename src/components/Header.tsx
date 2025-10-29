'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FiShoppingCart, FiMenu, FiX, FiHeart, FiUser, FiLogOut } from 'react-icons/fi'
import { useSession, signOut } from 'next-auth/react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import SearchBar from './SearchBar'
import SignInModal from './SignInModal'
import CurrencySelector from './CurrencySelector'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const getItemCount = useCartStore((state) => state.getItemCount)
  const cartCount = getItemCount()
  const wishlistItems = useWishlistStore((state) => state.items)
  const wishlistCount = wishlistItems.length

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

          {/* Search, Currency, Wishlist, Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <SearchBar />
            </div>
            <div className="hidden md:block">
              <CurrencySelector compact />
            </div>
            <Link href="/wishlist" className="relative hidden md:block">
              <FiHeart className="w-6 h-6 text-black hover:text-gold transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 text-black hover:text-gold transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Authentication */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session?.user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-gold"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <FiUser className="w-5 h-5 text-black" />
                    </div>
                  )}
                </button>
                
                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-semibold text-sm">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        signOut()
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSignInModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors"
              >
                <FiUser className="w-4 h-4" />
                Sign In
              </button>
            )}

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
            
            {/* Mobile Sign In */}
            {!session?.user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSignInModalOpen(true)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors w-full justify-center"
              >
                <FiUser className="w-4 h-4" />
                Sign In
              </button>
            )}
            
            {/* Mobile User Info */}
            {session?.user && (
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-gold"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-black" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block py-2 text-sm hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 text-sm hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Order History
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut()
                  }}
                  className="flex items-center gap-2 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      
      {/* Sign In Modal */}
      <SignInModal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} />
    </header>
  )
}
