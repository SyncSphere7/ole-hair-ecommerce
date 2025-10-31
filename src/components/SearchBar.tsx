'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiSearch, FiX } from 'react-icons/fi'
import { products } from '@/data/products'
import { useCurrencyStore } from '@/store/currencyStore'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { formatPrice } = useCurrencyStore()

  // Enhanced search with better matching
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchTerm = query.toLowerCase().trim()
      
      const filtered = products.filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.category,
          product.type,
          product.length || '',
          product.size || ''
        ].join(' ').toLowerCase()
        
        return searchableText.includes(searchTerm)
      })
      
      // Sort by relevance (name matches first, then description)
      const sorted = filtered.sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(searchTerm)
        const bNameMatch = b.name.toLowerCase().includes(searchTerm)
        
        if (aNameMatch && !bNameMatch) return -1
        if (!aNameMatch && bNameMatch) return 1
        return 0
      })
      
      setResults(sorted.slice(0, 6)) // Show up to 6 results
      setSelectedIndex(-1)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/products/${results[selectedIndex].id}`
        } else if (results.length > 0) {
          window.location.href = `/products/${results[0].id}`
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleResultClick = (productId: string) => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Clear search"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                index === selectedIndex 
                  ? 'bg-gold bg-opacity-10 dark:bg-gold dark:bg-opacity-20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleResultClick(product.id)}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-medium text-sm text-black dark:text-white truncate">{product.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{formatPrice(product.price)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">{product.category} • {product.type}</p>
              </div>
            </Link>
          ))}
          
          {/* View All Results */}
          {results.length >= 6 && (
            <Link
              href={`/products?search=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-gold hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-sm transition-colors"
              onClick={() => handleResultClick('')}
            >
              View all results for "{query}"
            </Link>
          )}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
            No products found for "{query}"
          </p>
          <Link
            href="/products"
            className="text-gold hover:underline text-sm"
            onClick={() => setIsOpen(false)}
          >
            Browse all products
          </Link>
        </div>
      )}

      {/* Search Hint */}
      {isOpen && query.length === 1 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-3 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Type at least 2 characters to search
          </p>
        </div>
      )}
    </div>
  )
}
