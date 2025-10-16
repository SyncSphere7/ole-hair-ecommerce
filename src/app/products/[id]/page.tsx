'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/data/products'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = getProductById(productId)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link href="/products" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    
    setTimeout(() => {
      setIsAdding(false)
      router.push('/cart')
    }, 500)
  }

  return (
    <div className="py-12 bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-gold">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
              {product.inStock ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  In Stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="mb-6 space-y-3">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              {/* Product Details */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Category:</span>
                  <span className="text-gray-700 capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Type:</span>
                  <span className="text-gray-700">{product.type}</span>
                </div>
                {product.size && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Size:</span>
                    <span className="text-gray-700">{product.size}</span>
                  </div>
                )}
                {product.length && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Length:</span>
                    <span className="text-gray-700">{product.length}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 font-semibold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="w-full btn-primary"
              >
                {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
              <Link href="/products" className="block w-full btn-outline text-center">
                Continue Shopping
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100% Virgin Hair
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Pickup in Kampala
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure Payment Options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
