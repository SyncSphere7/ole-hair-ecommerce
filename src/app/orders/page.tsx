'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye, FiShoppingBag } from 'react-icons/fi'
import { useCurrencyStore } from '@/store/currencyStore'

// TypeScript interfaces for order data
interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'processing' | 'shipped' | 'delivered'
  total: number
  items: OrderItem[]
  deliveryMethod: 'pickup' | 'delivery'
  deliveryAddress: string
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { formatPrice } = useCurrencyStore()
  const [orders, setOrders] = useState<Order[]>([]) // Real orders will be loaded from database

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/')
      return
    }
  }, [session, status, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <FiClock className="w-5 h-5 text-yellow-500" />
      case 'shipped':
        return <FiTruck className="w-5 h-5 text-blue-500" />
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <FiPackage className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'Processing'
      case 'shipped':
        return 'Shipped'
      case 'delivered':
        return 'Delivered'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'shipped':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-colors">Order History</h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">Track and manage your Ole Hair orders</p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center transition-colors">
            <FiShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4 transition-colors" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">No Orders Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors">You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Order #{order.orderNumber}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="font-semibold text-lg text-black dark:text-white transition-colors">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 transition-colors">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate transition-colors">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black dark:text-white transition-colors">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                          <strong>Delivery:</strong> {order.deliveryMethod === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                          <strong>Address:</strong> {order.deliveryAddress}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-black dark:text-white">
                          <FiEye className="w-4 h-4" />
                          View Details
                        </button>
                        {order.status === 'delivered' && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-yellow-500 transition-colors">
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Profile */}
        <div className="mt-8 text-center">
          <Link
            href="/profile"
            className="inline-flex items-center text-gold hover:text-yellow-600 transition-colors"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  )
}