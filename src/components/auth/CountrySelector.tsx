'use client'

import { useState } from 'react'
import { COMMON_COUNTRIES } from '@/lib/auth/phone-formatter'

interface CountrySelectorProps {
  value: string
  onChange: (countryCode: string, dialCode: string) => void
  disabled?: boolean
}

export default function CountrySelector({ value, onChange, disabled = false }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedCountry = COMMON_COUNTRIES.find(c => c.code === value) || COMMON_COUNTRIES[0]

  const handleSelect = (country: typeof COMMON_COUNTRIES[0]) => {
    onChange(country.code, country.dialCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center gap-2 px-3 py-3 rounded-lg
          border-2 border-gray-200 dark:border-gray-600
          bg-white dark:bg-gray-800
          hover:border-gold transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span className="text-2xl">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {selectedCountry.dialCode}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto">
            {COMMON_COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left
                  hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                  ${country.code === value ? 'bg-gold/10 dark:bg-gold/5' : ''}
                `}
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-black dark:text-white">{country.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{country.dialCode}</div>
                </div>
                {country.code === value && (
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
