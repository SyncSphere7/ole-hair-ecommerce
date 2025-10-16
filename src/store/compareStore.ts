import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface CompareStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInCompare: (productId: string) => boolean
  clearCompare: () => void
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items
        const exists = items.find(item => item.id === product.id)
        
        if (!exists && items.length < 3) {
          set({ items: [...items, product] })
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
      },
      
      isInCompare: (productId) => {
        return get().items.some(item => item.id === productId)
      },
      
      clearCompare: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'ole-hair-compare',
    }
  )
)
