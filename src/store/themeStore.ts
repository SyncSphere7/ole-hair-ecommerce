import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  initializeTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      
      setTheme: (theme: Theme) => {
        set({ theme })
        
        // Apply theme immediately
        const root = document.documentElement
        
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          root.classList.toggle('dark', systemTheme === 'dark')
          set({ resolvedTheme: systemTheme })
        } else {
          root.classList.toggle('dark', theme === 'dark')
          set({ resolvedTheme: theme })
        }
      },
      
      initializeTheme: () => {
        const { theme } = get()
        const root = document.documentElement
        
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          root.classList.toggle('dark', systemTheme === 'dark')
          set({ resolvedTheme: systemTheme })
          
          // Listen for system theme changes
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          const handleChange = (e: MediaQueryListEvent) => {
            if (get().theme === 'system') {
              root.classList.toggle('dark', e.matches)
              set({ resolvedTheme: e.matches ? 'dark' : 'light' })
            }
          }
          mediaQuery.addEventListener('change', handleChange)
        } else {
          root.classList.toggle('dark', theme === 'dark')
          set({ resolvedTheme: theme })
        }
      },
    }),
    {
      name: 'ole-hair-theme',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)