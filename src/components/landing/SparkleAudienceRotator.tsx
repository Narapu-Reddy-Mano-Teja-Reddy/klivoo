'use client'

import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const AUDIENCES = [
  'Freelancers',
  'Independent Professionals',
  'Agencies',
  'Companies',
  'Startups',
  'MSMEs',
  'Manufacturing Industries',
  'Training Institutes',
  'Fit for Every Business',
  'Built to connect. Designed to grow.',
]

interface SparkleAudienceRotatorProps {
  className?: string
  interval?: number
}

export function SparkleAudienceRotator({
  className = '',
  interval = 2400,
}: SparkleAudienceRotatorProps) {
  const [index, setIndex] = useState(0)
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('out')
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % AUDIENCES.length)
        setFadeState('in')
      }, 300)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return (
    <span className={`inline-inline-flex items-center justify-center gap-2 relative align-baseline ${className}`}>
      {/* Sparkle icon burst */}
      <span className="relative inline-flex items-center shrink-0">
        <Sparkles className="h-5 w-5 sm:h-7 md:h-8 text-amber-400 animate-spin [animation-duration:8s] inline-block" />
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-400 animate-ping" />
      </span>

      {/* Rotating text with fade in / fade out & logo blue color gradient */}
      <span
        className={`inline-block transition-all duration-300 transform bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm font-extrabold whitespace-nowrap px-1 ${
          fadeState === 'in'
            ? 'opacity-100 translate-y-0 scale-100 filter blur-0'
            : 'opacity-0 -translate-y-2 scale-95 filter blur-xs'
        }`}
      >
        {AUDIENCES[index]}
      </span>

      {/* Trailing sparkle star particle */}
      <span className="relative inline-flex items-center shrink-0">
        <Sparkles className="h-5 w-5 sm:h-7 text-blue-500 animate-bounce [animation-duration:3s] inline-block" />
      </span>
    </span>
  )
}
