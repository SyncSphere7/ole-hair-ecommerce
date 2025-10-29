'use client'

import { useCurrencyStore } from '@/store/currencyStore'
import CurrencySelector from '@/components/CurrencySelector'
import { products } from '@/data/products'

export default function CurrencyTestPage() {
  const { selectedCurrency, formatPrice } = useCurrencyStore()
  
  // Sample prices in UGX
  const samplePrices = [
    { label: '5x5 Bob Wig', price: 400000 },
    { label: '4x4 Bob Wig', price: 350000 },
    { label: '14-inch Bundle', price: 130000 },
    { label: 'Delivery Fee', price: 10000 },
  ]
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Multi-Currency System Test</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Currency Selector</h2>
        <div className="flex flex-wrap gap-4">
          <CurrencySelector showLabel />
          <CurrencySelector compact />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Current Currency: {selectedCurrency.flag} {selectedCurrency.name} ({selectedCurrency.code})
        </h2>
        <p className="text-gray-600 mb-4">
          Symbol: {selectedCurrency.symbol} | Locale: {selectedCurrency.locale}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Price Conversion Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {samplePrices.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{item.label}</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  Original: {item.price.toLocaleString()} UGX
                </p>
                <p className="text-lg font-bold text-gold">
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Product Catalog Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  Base: {product.price.toLocaleString()} UGX
                </p>
                <p className="text-lg font-bold text-gold">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <a href="/" className="text-gold hover:underline">
          ← Back to Home
        </a>
      </div>
    </div>
  )
}