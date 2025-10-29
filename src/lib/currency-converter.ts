import { Currency, DEFAULT_CURRENCY } from './currencies'

// Exchange rates (UGX as base currency)
// In production, these would come from a real-time API like exchangerate-api.com
export const EXCHANGE_RATES: Record<string, number> = {
  // Base currency
  'UGX': 1,
  
  // Major currencies
  'USD': 0.00027, // 1 UGX = 0.00027 USD (approximately 3,700 UGX = 1 USD)
  'EUR': 0.00025, // 1 UGX = 0.00025 EUR
  'GBP': 0.00021, // 1 UGX = 0.00021 GBP
  
  // African currencies
  'KES': 0.035,   // 1 UGX = 0.035 KES
  'TZS': 0.67,    // 1 UGX = 0.67 TZS
  'RWF': 0.36,    // 1 UGX = 0.36 RWF
  'NGN': 0.43,    // 1 UGX = 0.43 NGN
  'GHS': 0.0032,  // 1 UGX = 0.0032 GHS
  'ZAR': 0.0049,  // 1 UGX = 0.0049 ZAR
  'EGP': 0.013,   // 1 UGX = 0.013 EGP
  'MAD': 0.0027,  // 1 UGX = 0.0027 MAD
  'ETB': 0.033,   // 1 UGX = 0.033 ETB
  
  // Asian currencies
  'JPY': 0.041,   // 1 UGX = 0.041 JPY
  'CNY': 0.0019,  // 1 UGX = 0.0019 CNY
  'INR': 0.023,   // 1 UGX = 0.023 INR
  'KRW': 0.36,    // 1 UGX = 0.36 KRW
  'SGD': 0.00036, // 1 UGX = 0.00036 SGD
  'HKD': 0.0021,  // 1 UGX = 0.0021 HKD
  'THB': 0.0094,  // 1 UGX = 0.0094 THB
  'MYR': 0.0012,  // 1 UGX = 0.0012 MYR
  'IDR': 4.2,     // 1 UGX = 4.2 IDR
  'PHP': 0.015,   // 1 UGX = 0.015 PHP
  'VND': 6.8,     // 1 UGX = 6.8 VND
  
  // Middle Eastern currencies
  'AED': 0.00099, // 1 UGX = 0.00099 AED
  'SAR': 0.001,   // 1 UGX = 0.001 SAR
  'QAR': 0.00098, // 1 UGX = 0.00098 QAR
  'KWD': 0.000083, // 1 UGX = 0.000083 KWD
  'BHD': 0.0001,  // 1 UGX = 0.0001 BHD
  'OMR': 0.0001,  // 1 UGX = 0.0001 OMR
  'JOD': 0.00019, // 1 UGX = 0.00019 JOD
  'LBP': 0.41,    // 1 UGX = 0.41 LBP
  'ILS': 0.001,   // 1 UGX = 0.001 ILS
  'TRY': 0.0092,  // 1 UGX = 0.0092 TRY
  
  // European currencies
  'CHF': 0.00024, // 1 UGX = 0.00024 CHF
  'NOK': 0.0029,  // 1 UGX = 0.0029 NOK
  'SEK': 0.0029,  // 1 UGX = 0.0029 SEK
  'DKK': 0.0018,  // 1 UGX = 0.0018 DKK
  'PLN': 0.0011,  // 1 UGX = 0.0011 PLN
  'CZK': 0.0062,  // 1 UGX = 0.0062 CZK
  'HUF': 0.097,   // 1 UGX = 0.097 HUF
  'RON': 0.0012,  // 1 UGX = 0.0012 RON
  'RUB': 0.026,   // 1 UGX = 0.026 RUB
  
  // Americas currencies
  'CAD': 0.00037, // 1 UGX = 0.00037 CAD
  'MXN': 0.0046,  // 1 UGX = 0.0046 MXN
  'BRL': 0.0016,  // 1 UGX = 0.0016 BRL
  'ARS': 0.27,    // 1 UGX = 0.27 ARS
  'CLP': 0.26,    // 1 UGX = 0.26 CLP
  'COP': 1.18,    // 1 UGX = 1.18 COP
  'PEN': 0.001,   // 1 UGX = 0.001 PEN
  
  // Oceania currencies
  'AUD': 0.00041, // 1 UGX = 0.00041 AUD
  'NZD': 0.00045, // 1 UGX = 0.00045 NZD
  
  // More currencies (approximate rates)
  'BWP': 0.0037,  'NAD': 0.0049,  'SZL': 0.0049,  'LSL': 0.0049,
  'MWK': 0.46,    'ZMW': 0.007,   'MZN': 0.017,   'AOA': 0.22,
  'DZD': 0.036,   'TND': 0.00084, 'LYD': 0.0013,  'SDG': 0.16,
  'BDT': 0.029,   'PKR': 0.075,   'LKR': 0.088,   'NPR': 0.036,
  'AFN': 0.019,   'UZS': 3.4,     'KZT': 0.12,    'KGS': 0.024,
  'AZN': 0.00046, 'GEL': 0.00073, 'AMD': 0.11,    'BYN': 0.00088,
  'JMD': 0.042,   'TTD': 0.0018,  'BBD': 0.00054, 'BSD': 0.00027,
  'BZD': 0.00054, 'GTQ': 0.0021,  'HNL': 0.0067,  'NIO': 0.0099,
  'CRC': 0.14,    'PAB': 0.00027, 'DOP': 0.016,   'HTG': 0.036,
  'WST': 0.00074, 'TOP': 0.00063, 'VUV': 0.032,   'SBD': 0.0023,
  'PGK': 0.00107, 'FJD': 0.00061, 'XOF': 0.16,    'XAF': 0.16,
  
  // Cryptocurrencies (highly volatile - these are just examples)
  'BTC': 0.0000000062, // 1 UGX = 0.0000000062 BTC
  'ETH': 0.00000011,   // 1 UGX = 0.00000011 ETH
}

export class CurrencyConverter {
  private rates: Record<string, number>
  
  constructor(rates: Record<string, number> = EXCHANGE_RATES) {
    this.rates = rates
  }
  
  /**
   * Convert amount from base currency (UGX) to target currency
   */
  convert(amountInUGX: number, targetCurrency: string): number {
    if (targetCurrency === DEFAULT_CURRENCY) {
      return amountInUGX
    }
    
    const rate = this.rates[targetCurrency]
    if (!rate) {
      console.warn(`Exchange rate not found for ${targetCurrency}, using UGX`)
      return amountInUGX
    }
    
    return amountInUGX * rate
  }
  
  /**
   * Convert amount from any currency back to base currency (UGX)
   */
  convertToBase(amount: number, fromCurrency: string): number {
    if (fromCurrency === DEFAULT_CURRENCY) {
      return amount
    }
    
    const rate = this.rates[fromCurrency]
    if (!rate) {
      console.warn(`Exchange rate not found for ${fromCurrency}`)
      return amount
    }
    
    return amount / rate
  }
  
  /**
   * Convert between any two currencies
   */
  convertBetween(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) {
      return amount
    }
    
    // Convert to base currency first, then to target currency
    const baseAmount = this.convertToBase(amount, fromCurrency)
    return this.convert(baseAmount, toCurrency)
  }
  
  /**
   * Get exchange rate for a currency
   */
  getRate(currency: string): number {
    return this.rates[currency] || 1
  }
  
  /**
   * Update exchange rates (for real-time updates)
   */
  updateRates(newRates: Record<string, number>) {
    this.rates = { ...this.rates, ...newRates }
  }
}

// Global converter instance
export const currencyConverter = new CurrencyConverter()

/**
 * Fetch live exchange rates from API (optional enhancement)
 */
export async function fetchLiveRates(): Promise<Record<string, number>> {
  try {
    // Example using exchangerate-api.com (you'd need to sign up for API key)
    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/UGX`)
    // const data = await response.json()
    // return data.rates
    
    // For now, return static rates
    return EXCHANGE_RATES
  } catch (error) {
    console.error('Failed to fetch live exchange rates:', error)
    return EXCHANGE_RATES
  }
}

/**
 * Format currency amount with proper locale and symbol
 */
export function formatCurrencyAmount(amount: number, currency: Currency): string {
  try {
    // Handle special cases for currencies with different formatting
    if (currency.code === 'JPY' || currency.code === 'KRW' || currency.code === 'VND') {
      // These currencies typically don't use decimal places
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    }
    
    if (currency.code === 'BTC' || currency.code === 'ETH') {
      // Cryptocurrencies need more decimal places
      return `${currency.symbol}${amount.toFixed(8)}`
    }
    
    // Standard formatting for most currencies
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    return `${currency.symbol}${amount.toLocaleString()}`
  }
}