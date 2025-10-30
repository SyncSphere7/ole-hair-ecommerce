'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency, generateOrderNumber, DELIVERY_FEE } from '@/lib/utils'
import { CustomerInfo, PaymentMethod } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)
  
  const subtotal = getTotal()
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const deliveryFee = deliveryMethod === 'delivery' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'airtel' | 'card'>('mtn')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    // In production, this would call Pesapal API
    const orderNumber = generateOrderNumber()
    
    // Store order details in sessionStorage for confirmation page
    const orderData = {
      orderNumber,
      items,
      subtotal,
      deliveryFee,
      total,
      deliveryMethod,
      customerInfo,
      paymentMethod,
      phoneNumber,
      createdAt: new Date().toISOString(),
    }

    sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
    
    // Simulate payment delay
    setTimeout(() => {
      clearCart()
      router.push(`/confirmation?order=${orderNumber}`)
    }, 2000)
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-serif mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="input-field"
                    placeholder="+256 700 000 000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-serif mb-4">Delivery Method</h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'pickup')}
                    className="mt-1"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">Free Pickup</p>
                    <p className="text-sm text-gray-600">Pick up your order in Kampala</p>
                  </div>
                  <span className="font-bold text-gold">FREE</span>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'delivery')}
                    className="mt-1"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">Home Delivery</p>
                    <p className="text-sm text-gray-600">Delivery within Kampala (1-2 days)</p>
                  </div>
                  <span className="font-bold">{formatCurrency(DELIVERY_FEE)}</span>
                </label>
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="input-field"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="input-field"
                      placeholder="Kampala"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-serif mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="mtn"
                    checked={paymentMethod === 'mtn'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'mtn')}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">MTN Mobile Money</p>
                  </div>
                  <div className="w-12 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 48 32" className="w-12 h-8">
                      <rect width="48" height="32" rx="4" fill="#FFCC00"/>
                      <text x="24" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#000">MTN</text>
                    </svg>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="airtel"
                    checked={paymentMethod === 'airtel'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'airtel')}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">Airtel Money</p>
                  </div>
                  <div className="w-16 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 64 32" className="w-16 h-8">
                      <rect width="64" height="32" rx="4" fill="#E60012"/>
                      <text x="32" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFF">airtel</text>
                    </svg>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gold transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">Visa / Mastercard</p>
                  </div>
                  <div className="flex gap-2">
                    {/* Visa Logo */}
                    <svg viewBox="0 0 40 24" className="w-10 h-6">
                      <rect width="40" height="24" rx="3" fill="#1A1F71"/>
                      <text x="20" y="15" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFF">VISA</text>
                    </svg>
                    {/* Mastercard Logo */}
                    <svg viewBox="0 0 40 24" className="w-10 h-6">
                      <rect width="40" height="24" rx="3" fill="#FFF" stroke="#DDD"/>
                      <circle cx="14" cy="12" r="5" fill="#EB001B"/>
                      <circle cx="26" cy="12" r="5" fill="#F79E1B"/>
                      <path d="M20 8 A5 5 0 0 1 20 16 A5 5 0 0 1 20 8" fill="#FF5F00"/>
                    </svg>
                  </div>
                </label>
              </div>

              {(paymentMethod === 'mtn' || paymentMethod === 'airtel') && (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} Mobile Money Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-field"
                    placeholder="+256 700 000 000"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    You will receive a prompt on your phone to enter your PIN and complete the payment.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Card Number *</label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV *</label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-serif mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span>{deliveryFee > 0 ? formatCurrency(deliveryFee) : 'FREE'}</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary mt-6"
              >
                {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(total)}`}
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                By placing your order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
