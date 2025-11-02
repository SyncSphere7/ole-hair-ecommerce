'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCurrencyStore } from '@/store/currencyStore'
import { useState } from 'react'
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi'
import QuickViewModal from './QuickViewModal'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const removeFromWishlist = useWishlistStore((state) => state.removeItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id))
  const { formatPrice } = useCurrencyStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addItem(product)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowQuickView(true)
  }

  return (
    <>
      <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {product.image.endsWith('.mp4') ? (
              <video
                src={product.image}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.stockCount !== undefined && product.stockCount <= 3 && product.stockCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Only {product.stockCount} left
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full shadow-lg transition-colors ${
                  isInWishlist ? 'bg-gold text-black' : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gold dark:hover:bg-gold'
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleQuickView}
                className="p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow-lg hover:bg-gold dark:hover:bg-gold transition-colors"
                aria-label="Quick view"
              >
                <FiEye className="w-5 h-5" />
              </button>
            </div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-serif text-lg mb-2 text-black dark:text-white group-hover:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-black dark:text-white">{formatPrice(product.price)}</span>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className="bg-gold text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FiShoppingCart className="w-4 h-4" />
              {isAdding ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  )
}
