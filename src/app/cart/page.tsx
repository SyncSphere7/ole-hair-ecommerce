'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { useCurrencyStore } from '@/store/currencyStore'
import { FiTrash2 } from 'react-icons/fi'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotal = useCartStore((state) => state.getTotal)
  const { formatPrice } = useCurrencyStore()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif mb-4 text-black dark:text-white transition-colors">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors">Add some products to get started!</p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-black dark:text-white transition-colors">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 sm:gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 transition-colors">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0 transition-colors">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <Link href={`/products/${item.id}`} className="font-serif text-base sm:text-lg hover:text-gold mb-1 block text-black dark:text-white transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors">
                    {item.size && `Size: ${item.size}`}
                    {item.length && `Length: ${item.length}`}
                  </p>
                  <p className="font-bold text-black dark:text-white transition-colors">{formatPrice(item.price)}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-sm text-black dark:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-black dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-sm text-black dark:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-lg text-black dark:text-white transition-colors">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24 transition-colors">
              <h2 className="text-2xl font-serif mb-6 text-black dark:text-white transition-colors">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300 transition-colors">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-black dark:text-white transition-colors">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full btn-primary text-center mb-4">
                Proceed to Checkout
              </Link>

              <Link href="/products" className="block w-full btn-outline text-center">
                Continue Shopping
              </Link>

              <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 space-y-2 transition-colors">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure checkout
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multiple payment options
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
