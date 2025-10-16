'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addItem(product)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-lg mb-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="bg-gold text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
