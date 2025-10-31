'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { FiFilter, FiSearch } from 'react-icons/fi'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedLength, setSelectedLength] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Get search query from URL
  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Filter products based on selected filters and search query
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const searchMatch = !searchQuery || [
        product.name,
        product.description,
        product.category,
        product.type,
        product.length || '',
        product.size || ''
      ].join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      
      // Category filter
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
      
      // Price filter
      const priceMatch = selectedPriceRange === 'all' || (
        selectedPriceRange === 'under-200k' && product.price < 200000 ||
        selectedPriceRange === '200k-300k' && product.price >= 200000 && product.price <= 300000 ||
        selectedPriceRange === 'over-300k' && product.price > 300000
      )
      
      // Length filter
      const lengthMatch = selectedLength === 'all' || product.length === selectedLength
      
      return searchMatch && categoryMatch && priceMatch && lengthMatch
    })
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedLength])

  const availableLengths = ['10"', '14"', '18"', '20"']
  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'wig', label: 'Wigs' },
    { value: 'bundle', label: 'Bundles' }
  ]
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-200k', label: 'Under ₦200,000' },
    { value: '200k-300k', label: '₦200,000 - ₦300,000' },
    { value: 'over-300k', label: 'Over ₦300,000' }
  ]

  return (
    <div className="py-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif">
              {searchQuery ? `Search Results` : 'Our Products'}
            </h1>
            {searchQuery && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <FiSearch className="inline w-4 h-4 mr-2" />
                Showing results for "{searchQuery}" ({filteredProducts.length} products)
              </p>
            )}
          </div>
        </div>

        {/* Mobile Search & Filters */}
        <div className="lg:hidden mb-6 space-y-4">
          {/* Mobile Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
            />
          </div>
          
          {/* Mobile Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg font-semibold"
          >
            <FiFilter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Desktop Filters */}
        <div className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8 ${showFilters || !showFilters ? 'hidden lg:block' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Length Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Length</label>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="all">All Lengths</option>
                {availableLengths.map((length) => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Length Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Length</label>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="all">All Lengths</option>
                {availableLengths.map((length) => (
                  <option key={length} value={length}>{length}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Clear Search/Filters */}
        {(searchQuery || selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedLength !== 'all') && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 bg-gold bg-opacity-20 text-gold rounded-full text-sm hover:bg-opacity-30 transition-colors"
              >
                Search: "{searchQuery}" ×
              </button>
            )}
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-3 py-1 bg-gold bg-opacity-20 text-gold rounded-full text-sm hover:bg-opacity-30 transition-colors"
              >
                {categories.find(c => c.value === selectedCategory)?.label} ×
              </button>
            )}
            {selectedPriceRange !== 'all' && (
              <button
                onClick={() => setSelectedPriceRange('all')}
                className="px-3 py-1 bg-gold bg-opacity-20 text-gold rounded-full text-sm hover:bg-opacity-30 transition-colors"
              >
                {priceRanges.find(p => p.value === selectedPriceRange)?.label} ×
              </button>
            )}
            {selectedLength !== 'all' && (
              <button
                onClick={() => setSelectedLength('all')}
                className="px-3 py-1 bg-gold bg-opacity-20 text-gold rounded-full text-sm hover:bg-opacity-30 transition-colors"
              >
                {selectedLength} ×
              </button>
            )}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedPriceRange('all')
                setSelectedLength('all')
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? 'No products found' : 'No products match your filters'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
              {searchQuery 
                ? `We couldn't find any products matching "${searchQuery}".`
                : 'Try adjusting your filters to see more products.'
              }
            </p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedPriceRange('all')
                  setSelectedLength('all')
                }}
                className="btn-primary"
              >
                Clear all filters
              </button>
              <a href="/products" className="btn-outline">
                View all products
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
