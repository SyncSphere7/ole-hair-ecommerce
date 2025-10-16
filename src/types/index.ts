export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'wig' | 'bundle'
  type: string
  length?: string
  size?: string
  image: string
  images?: string[]
  inStock: boolean
  stockCount?: number
  isNew?: boolean
  videoUrl?: string
  relatedProducts?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface DeliveryInfo {
  method: 'pickup' | 'delivery'
  fee: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address?: string
  city?: string
}

export interface PaymentMethod {
  type: 'mtn' | 'airtel' | 'card'
  phoneNumber?: string
  cardDetails?: {
    number: string
    expiry: string
    cvv: string
  }
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryMethod: 'pickup' | 'delivery'
  customerInfo: CustomerInfo
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed'
  paymentMethod: PaymentMethod
  createdAt: string
}
