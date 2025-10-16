'use client'

import { FiX, FiShoppingCart, FiHeart } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

interface QuickViewModalProps {
  product: Product
  onClose: () => void
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id))

  const handleAddToCart = () => {
    addToCart(product)
    onClose()
  }

  const handleWishlist = () => {
    addToWishlist(product)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-serif">Quick View</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
            aria-label="Close"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
              <p className="text-3xl font-bold text-gold">{formatCurrency(product.price)}</p>
            </div>

            {product.stockCount !== undefined && (
              <div className="text-sm">
                {product.stockCount > 5 ? (
                  <span className="text-green-600">In Stock</span>
                ) : product.stockCount > 0 ? (
                  <span className="text-orange-600">Only {product.stockCount} left!</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Category:</span> {product.category === 'wig' ? 'Wig' : 'Hair Bundle'}</p>
              <p><span className="font-semibold">Type:</span> {product.type}</p>
              {product.size && <p><span className="font-semibold">Size:</span> {product.size}</p>}
              {product.length && <p><span className="font-semibold">Length:</span> {product.length}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 border-2 rounded-lg transition-colors ${
                  isInWishlist ? 'border-gold bg-gold text-black' : 'border-gray-300 hover:border-gold'
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              href={`/products/${product.id}`}
              onClick={onClose}
              className="block text-center text-gold hover:text-yellow-600 font-medium text-sm"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
