'use client'

import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react'

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  disabled?: boolean
}

export default function OTPInput({ length = 6, onComplete, disabled = false }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (disabled) return

    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '')
    
    if (numericValue.length > 1) {
      // Handle paste
      handlePaste(numericValue, index)
      return
    }

    const newOtp = [...otp]
    newOtp[index] = numericValue
    setOtp(newOtp)

    // Move to next input
    if (numericValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if complete
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (pastedData: string, startIndex: number = 0) => {
    if (disabled) return

    const digits = pastedData.replace(/[^0-9]/g, '').split('')
    const newOtp = [...otp]

    digits.forEach((digit, i) => {
      const index = startIndex + i
      if (index < length) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus last filled input
    const lastFilledIndex = Math.min(startIndex + digits.length - 1, length - 1)
    inputRefs.current[lastFilledIndex]?.focus()

    // Check if complete
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''))
    }
  }

  const handlePasteEvent = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    handlePaste(pastedData, index)
  }

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePasteEvent(e, index)}
          disabled={disabled}
          className={`
            w-12 h-14 text-center text-2xl font-bold rounded-lg
            border-2 transition-all
            ${digit 
              ? 'border-gold bg-gold/10 dark:bg-gold/5' 
              : 'border-gray-300 dark:border-gray-600'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:border-gold focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20'
            }
            bg-white dark:bg-gray-800
            text-black dark:text-white
          `}
          autoComplete="off"
        />
      ))}
    </div>
  )
}
