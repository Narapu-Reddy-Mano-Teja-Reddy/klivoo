'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** The final value to count up to. */
  to: number
  /** Text rendered before the number (e.g. "₹", "~"). */
  prefix?: string
  /** Text rendered after the number (e.g. "%", " min", "-in-1"). */
  suffix?: string
  /** Decimal places to show while counting. */
  decimals?: number
  /** Animation duration in ms. */
  duration?: number
  className?: string
}

/**
 * Counts a number from 0 up to `to` the first time it scrolls into view, with a
 * slow ease-out so it settles like a physical readout. Prefix/suffix ride along
 * so "₹", "%", " min" etc. stay attached. Honors `prefers-reduced-motion` by
 * showing the final value immediately, and never re-renders after it settles.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1400,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || to === 0) {
      setN(to)
      return
    }

    let raf = 0
    let start = 0
    let done = false

    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      // easeOutExpo — quick then gently lands.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setN(to * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true
          raf = requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}
