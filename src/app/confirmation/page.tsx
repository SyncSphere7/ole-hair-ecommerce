'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { FaWhatsapp, FaCheckCircle } from 'react-icons/fa'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder')
    if (stored) {
      setOrderData(JSON.parse(stored))
    }
  }, [])

  if (!orderData) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-serif mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find your order details.</p>
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
      </div>
    )
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Ole Hair! I just placed order #${orderNumber}. I'd like to confirm the details.`
  )

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom max-w-3xl">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6">
          {/* Order Number */}
          <div className="text-center pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-gold">{orderNumber}</p>
          </div>

          {/* Payment Status */}
          <div className="py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Payment Status</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Completed
              </span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-700 font-semibold">Payment Method</span>
              <span className="text-gray-900 capitalize">
                {orderData.paymentMethod === 'mtn' && 'MTN Mobile Money'}
                {orderData.paymentMethod === 'airtel' && 'Airtel Money'}
                {orderData.paymentMethod === 'card' && 'Visa/Mastercard'}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="py-6 border-b border-gray-200">
            <h2 className="font-serif text-xl mb-4">Order Items</h2>
            <div className="space-y-3">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="py-6 border-b border-gray-200">
            <h2 className="font-serif text-xl mb-4">Delivery Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-semibold capitalize">{orderData.deliveryMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-semibold">{orderData.customerInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-semibold">{orderData.customerInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold">{orderData.customerInfo.email}</span>
              </div>
              {orderData.deliveryMethod === 'delivery' && orderData.customerInfo.address && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Address</span>
                  <span className="font-semibold text-right">{orderData.customerInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Total */}
          <div className="py-6">
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatCurrency(orderData.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery</span>
                <span>{orderData.deliveryFee > 0 ? formatCurrency(orderData.deliveryFee) : 'FREE'}</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-gray-300 pt-3">
              <span>Total Paid</span>
              <span className="text-gold">{formatCurrency(orderData.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
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
        <div className="mt-8 p-6 bg-blue-50 rounded-lg text-sm text-gray-700">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>You will receive a confirmation email shortly</li>
            <li>We will contact you to confirm your order</li>
            {orderData.deliveryMethod === 'pickup' ? (
              <li>Your order will be ready for pickup within 24 hours</li>
            ) : (
              <li>Your order will be delivered within 1-2 business days</li>
            )}
            <li>Feel free to contact us on WhatsApp for any questions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
