'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getProductById, products } from '@/data/products'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import ImageGallery from '@/components/ImageGallery'
import ProductCard from '@/components/ProductCard'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = getProductById(productId)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const removeFromWishlist = useWishlistStore((state) => state.removeItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(productId))

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

  const relatedProducts = product.relatedProducts
    ? products.filter(p => product.relatedProducts?.includes(p.id))
    : []

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

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(product)
    }
  }

  const images = product.images || [product.image]

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
          {/* Product Images */}
          <div>
            <ImageGallery images={images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-serif">{product.name}</h1>
              <button
                onClick={handleWishlist}
                className={`p-3 border-2 rounded-lg transition-colors ${
                  isInWishlist ? 'border-gold bg-gold text-black' : 'border-gray-300 hover:border-gold'
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
              {product.isNew && (
                <span className="px-3 py-1 bg-gold text-black rounded-full text-sm font-bold">
                  NEW
                </span>
              )}
            </div>

            {product.stockCount !== undefined && (
              <div className="mb-4">
                {product.stockCount > 5 ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : product.stockCount > 0 ? (
                  <span className="text-orange-600 font-medium">Only {product.stockCount} left in stock!</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            )}

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

            {product.videoUrl && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Product Video</h3>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={product.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

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

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
