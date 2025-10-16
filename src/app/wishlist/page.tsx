'use client'

import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi'

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items)
  const removeItem = useWishlistStore((state) => state.removeItem)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = (product: any) => {
    addToCart(product)
    removeItem(product.id)
  }

  if (items.length === 0) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <FiHeart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-serif mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save your favorite products for later!</p>
          <Link href="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif">My Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-serif text-lg mb-2 hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xl font-bold text-gold mb-4">
                  {formatCurrency(product.price)}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
