export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-UG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' UGX'
}

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `OH${timestamp}${random}`
}

export const DELIVERY_FEE = 10000 // 10,000 UGX for delivery
