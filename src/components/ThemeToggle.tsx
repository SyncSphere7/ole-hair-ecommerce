'use client'

import { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'
import { useThemeStore, Theme } from '@/store/themeStore'

interface ThemeToggleProps {
  className?: string
  compact?: boolean
}

export default function ThemeToggle({ className = '', compact = false }: ThemeToggleProps) {
  const { theme, setTheme, initializeTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    initializeTheme()
  }, [initializeTheme])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ${className}`} />
    )
  }

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <FiSun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <FiMoon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <FiMonitor className="w-4 h-4" />, label: 'System' },
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[0]

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => {
            const currentIndex = themes.findIndex(t => t.value === theme)
            const nextIndex = (currentIndex + 1) % themes.length
            setTheme(themes[nextIndex].value)
          }}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          title={`Current: ${currentTheme.label}. Click to cycle themes.`}
        >
          {currentTheme.icon}
        </button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              theme === themeOption.value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            title={`Switch to ${themeOption.label} theme`}
          >
            {themeOption.icon}
            <span className="hidden sm:inline">{themeOption.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}