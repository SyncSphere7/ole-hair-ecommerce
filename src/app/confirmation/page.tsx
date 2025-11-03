'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { FaWhatsapp, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'
import { supabase } from '@/lib/auth/supabase-auth'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const statusParam = searchParams.get('status')
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderNumber) {
        setLoading(false)
        return
      }

      try {
        // Fetch order from database
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', orderNumber)
          .single()

        if (error) {
          console.error('Error fetching order:', error)
          setLoading(false)
          return
        }

        setOrderData(data)

        // Clear cart if payment was successful
        if (data?.status === 'COMPLETED') {
          clearCart()
          sessionStorage.removeItem('lastOrderNumber')
          sessionStorage.removeItem('orderTrackingId')
        }
      } catch (error) {
        console.error('Error loading order:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderData()
  }, [orderNumber, clearCart])

  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <FaSpinner className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-serif mb-4 text-black dark:text-white">Verifying Payment...</h1>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we confirm your payment status.</p>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-serif mb-4 text-black dark:text-white">Order Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find your order details.</p>
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold transition-colors">
            Payment Successful
          </span>
        )
      case 'PENDING':
        return (
          <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold transition-colors">
            Pending Verification
          </span>
        )
      case 'FAILED':
        return (
          <span className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-semibold transition-colors">
            Payment Failed
          </span>
        )
      default:
        return (
          <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-semibold transition-colors">
            {status}
          </span>
        )
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <FaCheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
      case 'FAILED':
        return <FaExclamationCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      default:
        return <FaSpinner className="w-10 h-10 text-yellow-600 dark:text-yellow-400 animate-spin" />
    }
  }

  const getStatusTitle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Order Confirmed!'
      case 'FAILED':
        return 'Payment Failed'
      case 'PENDING':
        return 'Payment Pending'
      default:
        return 'Order Status'
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Ole Hair! I just placed order #${orderNumber}. I'd like to confirm the details.`
  )

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container-custom max-w-3xl">
        {/* Success/Status Icon */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            orderData.status === 'COMPLETED' ? 'bg-green-100 dark:bg-green-900' :
            orderData.status === 'FAILED' ? 'bg-red-100 dark:bg-red-900' :
            'bg-yellow-100 dark:bg-yellow-900'
          } transition-colors`}>
            {getStatusIcon(orderData.status)}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif mb-2 text-black dark:text-white transition-colors">
            {getStatusTitle(orderData.status)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">
            {orderData.status === 'COMPLETED' && 'Thank you for your purchase'}
            {orderData.status === 'FAILED' && 'There was a problem processing your payment'}
            {orderData.status === 'PENDING' && 'Your payment is being verified'}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 md:p-8 mb-6 transition-colors">
          {/* Order Number */}
          <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors">Order Number</p>
            <p className="text-2xl font-bold text-gold">{orderNumber}</p>
          </div>

          {/* Payment Status */}
          <div className="py-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 font-semibold transition-colors">Payment Status</span>
              {getStatusBadge(orderData.status)}
            </div>
            {orderData.payment_status_description && (
              <div className="flex justify-between items-center mt-3">
                <span className="text-gray-700 dark:text-gray-300 font-semibold transition-colors">Status Details</span>
                <span className="text-gray-900 dark:text-gray-100 transition-colors">{orderData.payment_status_description}</span>
              </div>
            )}
            {orderData.payment_method && (
              <div className="flex justify-between items-center mt-3">
                <span className="text-gray-700 dark:text-gray-300 font-semibold transition-colors">Payment Method</span>
                <span className="text-gray-900 dark:text-gray-100 capitalize transition-colors">
                  {orderData.payment_method}
                </span>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="py-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <h2 className="font-serif text-xl mb-4 text-black dark:text-white transition-colors">Order Items</h2>
            <div className="space-y-3">
              {orderData.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 transition-colors">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-black dark:text-white transition-colors">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="py-6 border-b border-gray-200 dark:border-gray-700 transition-colors">
            <h2 className="font-serif text-xl mb-4 text-black dark:text-white transition-colors">Delivery Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors">Method</span>
                <span className="font-semibold text-black dark:text-white capitalize transition-colors">
                  {orderData.customer_info?.deliveryMethod || 'Pickup'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors">Name</span>
                <span className="font-semibold text-black dark:text-white transition-colors">
                  {orderData.customer_info?.firstName} {orderData.customer_info?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors">Phone</span>
                <span className="font-semibold text-black dark:text-white transition-colors">
                  {orderData.customer_info?.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 transition-colors">Email</span>
                <span className="font-semibold text-black dark:text-white transition-colors">
                  {orderData.customer_info?.email}
                </span>
              </div>
              {orderData.customer_info?.deliveryMethod === 'delivery' && orderData.customer_info?.deliveryAddress && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 transition-colors">Address</span>
                  <span className="font-semibold text-black dark:text-white text-right transition-colors">
                    {orderData.customer_info.deliveryAddress.address}, {orderData.customer_info.deliveryAddress.city}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Order Total */}
          <div className="py-6">
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-gray-700 dark:text-gray-300 transition-colors">
                <span>Amount</span>
                <span>{formatCurrency(orderData.amount)}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300 transition-colors">
                <span>Currency</span>
                <span>{orderData.currency}</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-gray-300 dark:border-gray-600 pt-3 transition-colors">
              <span className="text-black dark:text-white">Total Paid</span>
              <span className="text-gold">{formatCurrency(orderData.amount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {orderData.status === 'FAILED' && (
            <Link href="/checkout" className="btn-primary w-full text-center">
              Try Payment Again
            </Link>
          )}
          
          <a
            href={`https://wa.me/256758774233?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-md transition-colors"
          >
            <FaWhatsapp className="w-5 h-5" />
            Contact Support on WhatsApp
          </a>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/products" className="btn-outline text-center">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary text-center">
              Back to Home
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`mt-8 p-6 rounded-lg text-sm transition-colors ${
          orderData.status === 'COMPLETED' ? 'bg-blue-50 dark:bg-blue-900 text-gray-700 dark:text-gray-300' :
          orderData.status === 'FAILED' ? 'bg-red-50 dark:bg-red-900 text-gray-700 dark:text-gray-300' :
          'bg-yellow-50 dark:bg-yellow-900 text-gray-700 dark:text-gray-300'
        }`}>
          <h3 className="font-semibold mb-2">What happens next?</h3>
          {orderData.status === 'COMPLETED' && (
            <ul className="space-y-1 list-disc list-inside">
              <li>You will receive a confirmation email shortly</li>
              <li>We will contact you to confirm your order</li>
              {orderData.customer_info?.deliveryMethod === 'pickup' ? (
                <li>Your order will be ready for pickup within 24 hours</li>
              ) : (
                <li>Your order will be delivered within 1-2 business days</li>
              )}
              <li>Feel free to contact us on WhatsApp for any questions</li>
            </ul>
          )}
          {orderData.status === 'FAILED' && (
            <ul className="space-y-1 list-disc list-inside">
              <li>Your payment was not successful</li>
              <li>Please try again with a different payment method</li>
              <li>Contact us on WhatsApp if you need assistance</li>
              <li>Your cart items have been preserved</li>
            </ul>
          )}
          {orderData.status === 'PENDING' && (
            <ul className="space-y-1 list-disc list-inside">
              <li>Your payment is being verified with the payment provider</li>
              <li>This usually takes a few minutes</li>
              <li>You will receive a confirmation once verified</li>
              <li>Contact us on WhatsApp if payment doesn't update soon</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-20 text-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
