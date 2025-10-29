'use client'

import { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiSearch, FiGlobe } from 'react-icons/fi'
import { Currency, getPopularCurrencies, getAllCurrencies } from '@/lib/currencies'
import { useCurrencyStore } from '@/store/currencyStore'

interface CurrencySelectorProps {
  className?: string
  showLabel?: boolean
  compact?: boolean
}

export default function CurrencySelector({ 
  className = '', 
  showLabel = true, 
  compact = false 
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllCurrencies, setShowAllCurrencies] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore()
  
  const popularCurrencies = getPopularCurrencies()
  const allCurrencies = getAllCurrencies()
  
  // Filter currencies based on search term
  const filteredCurrencies = (showAllCurrencies ? allCurrencies : popularCurrencies)
    .filter(currency => 
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
        setShowAllCurrencies(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency)
    setIsOpen(false)
    setSearchTerm('')
    setShowAllCurrencies(false)
  }
  
  if (compact) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <span className="text-lg">{selectedCurrency.flag}</span>
          <span className="font-medium">{selectedCurrency.code}</span>
          <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search currencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {!showAllCurrencies && (
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Popular</p>
                </div>
              )}
              
              {filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                    selectedCurrency.code === currency.code ? 'bg-gold bg-opacity-10' : ''
                  }`}
                >
                  <span className="text-lg">{currency.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{currency.code}</span>
                      <span className="text-xs text-gray-500 truncate">{currency.name}</span>
                    </div>
                  </div>
                </button>
              ))}
              
              {!showAllCurrencies && (
                <button
                  onClick={() => setShowAllCurrencies(true)}
                  className="w-full px-3 py-2 text-sm text-gold hover:bg-gray-50 border-t border-gray-100"
                >
                  Show all currencies ({allCurrencies.length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gold transition-colors"
      >
        <FiGlobe className="w-4 h-4 text-gray-500" />
        <span className="text-lg">{selectedCurrency.flag}</span>
        <div className="text-left">
          {showLabel && <div className="text-xs text-gray-500">Currency</div>}
          <div className="font-medium">{selectedCurrency.code}</div>
        </div>
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Select Currency</h3>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="max-h-72 overflow-y-auto">
            {!showAllCurrencies && (
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Popular Currencies</p>
              </div>
            )}
            
            {filteredCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencySelect(currency)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  selectedCurrency.code === currency.code ? 'bg-gold bg-opacity-10 border-r-2 border-gold' : ''
                }`}
              >
                <span className="text-xl">{currency.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{currency.code}</span>
                    <span className="text-sm text-gray-500">{currency.symbol}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{currency.name}</p>
                </div>
                {selectedCurrency.code === currency.code && (
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                )}
              </button>
            ))}
            
            {!showAllCurrencies && (
              <button
                onClick={() => setShowAllCurrencies(true)}
                className="w-full px-4 py-3 text-gold hover:bg-gray-50 border-t border-gray-100 font-medium"
              >
                Show all {allCurrencies.length} currencies
              </button>
            )}
            
            {showAllCurrencies && filteredCurrencies.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No currencies found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}