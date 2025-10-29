import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Currency, DEFAULT_CURRENCY, getCurrency } from '@/lib/currencies'
import { currencyConverter } from '@/lib/currency-converter'

interface CurrencyStore {
  selectedCurrency: Currency
  setSelectedCurrency: (currency: Currency) => void
  convertPrice: (priceInUGX: number) => number
  formatPrice: (priceInUGX: number) => string
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      selectedCurrency: getCurrency(DEFAULT_CURRENCY)!,
      isLoading: false,
      
      setSelectedCurrency: (currency: Currency) => {
        set({ selectedCurrency: currency })
      },
      
      convertPrice: (priceInUGX: number): number => {
        const { selectedCurrency } = get()
        return currencyConverter.convert(priceInUGX, selectedCurrency.code)
      },
      
      formatPrice: (priceInUGX: number): string => {
        const { selectedCurrency } = get()
        const convertedPrice = currencyConverter.convert(priceInUGX, selectedCurrency.code)
        
        try {
          // Handle special formatting cases
          if (selectedCurrency.code === 'JPY' || selectedCurrency.code === 'KRW' || selectedCurrency.code === 'VND') {
            // No decimal places for these currencies
            return new Intl.NumberFormat(selectedCurrency.locale, {
              style: 'currency',
              currency: selectedCurrency.code,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(convertedPrice)
          }
          
          if (selectedCurrency.code === 'BTC' || selectedCurrency.code === 'ETH') {
            // Cryptocurrencies need more decimal places
            return `${selectedCurrency.symbol}${convertedPrice.toFixed(8)}`
          }
          
          // Standard formatting
          return new Intl.NumberFormat(selectedCurrency.locale, {
            style: 'currency',
            currency: selectedCurrency.code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(convertedPrice)
        } catch (error) {
          // Fallback formatting
          if (convertedPrice < 1) {
            return `${selectedCurrency.symbol}${convertedPrice.toFixed(4)}`
          } else if (convertedPrice < 100) {
            return `${selectedCurrency.symbol}${convertedPrice.toFixed(2)}`
          } else {
            return `${selectedCurrency.symbol}${Math.round(convertedPrice).toLocaleString()}`
          }
        }
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'ole-hair-currency',
      partialize: (state) => ({ selectedCurrency: state.selectedCurrency }),
    }
  )
)