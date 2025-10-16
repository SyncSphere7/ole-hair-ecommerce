'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wig' | 'bundle'>('all')
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all')
  const [selectedLength, setSelectedLength] = useState<'all' | string>('all')

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false
    }

    // Price filter
    if (priceRange === 'low' && product.price > 200000) return false
    if (priceRange === 'mid' && (product.price <= 200000 || product.price > 300000)) return false
    if (priceRange === 'high' && product.price <= 300000) return false

    // Length filter (for bundles)
    if (selectedLength !== 'all' && product.length !== selectedLength) {
      return false
    }

    return true
  })

  const availableLengths = ['10"', '14"', '18"', '20"']

  return (
    <div className="py-12 bg-white">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">Shop Our Collection</h1>

        {/* Filters */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Products</option>
                <option value="wig">Wigs</option>
                <option value="bundle">Hair Bundles</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="input-field"
              >
                <option value="all">All Prices</option>
                <option value="low">Under 200,000 UGX</option>
                <option value="mid">200,000 - 300,000 UGX</option>
                <option value="high">Above 300,000 UGX</option>
              </select>
            </div>

            {/* Length Filter (for bundles) */}
            <div>
              <label className="block text-sm font-semibold mb-2">Length (Bundles)</label>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="input-field"
                disabled={selectedCategory === 'wig'}
              >
                <option value="all">All Lengths</option>
                {availableLengths.map((length) => (
                  <option key={length} value={length}>
                    {length}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setPriceRange('all')
                setSelectedLength('all')
              }}
              className="mt-4 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
