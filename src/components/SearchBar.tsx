'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiSearch, FiX } from 'react-icons/fi'
import { products } from '@/data/products'
import { formatCurrency } from '@/lib/utils'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState(() => products.slice(0, 4))
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered.slice(0, 5))
    } else {
      setResults(products.slice(0, 4))
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.length > 0 ? (
            <>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-sm truncate text-black dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{formatCurrency(product.price)}</p>
                  </div>
                </Link>
              ))}
              {query && (
                <Link
                  href={`/products?search=${encodeURIComponent(query)}`}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className="block p-3 text-center text-sm text-gold hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                >
                  View all results for &quot;{query}&quot;
                </Link>
              )}
            </>
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p>No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}