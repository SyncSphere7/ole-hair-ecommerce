// Legacy function - kept for backward compatibility
// Use useCurrencyStore().formatPrice() for new implementations
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-UG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' UGX'
}

// New currency-aware formatting function
export const formatPrice = (priceInUGX: number, currencyCode: string = 'UGX'): string => {
  // This will be used by components that can't access the store directly
  // For components with store access, use useCurrencyStore().formatPrice()
  return formatCurrency(priceInUGX)
}

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `OH${timestamp}${random}`
}

export const DELIVERY_FEE = 10000 // 10,000 UGX for delivery
