'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Render as a different element (default: div). */
  as?: ElementType
  /** Stagger delay in ms — handy for grids/lists. */
  delay?: number
  /**
   * `rise` (default) fades + slides up. `mask` wipes the content in from
   * below with no movement — reserved for editorial headlines, where a
   * sliding block of large type reads as cheap. `wipeX` draws left-to-right,
   * for connective rules and spines.
   */
  variant?: 'rise' | 'mask' | 'wipeX'
  className?: string
}

const VARIANT_CLASS: Record<NonNullable<RevealProps['variant']>, string> = {
  rise: 'reveal',
  mask: 'reveal-mask',
  wipeX: 'reveal-wipe-x',
}

/**
 * Fades + slides its children into view the first time they enter the
 * viewport. Pairs with the `.reveal` / `.is-visible` styles in globals.css and
 * degrades gracefully when `prefers-reduced-motion` is set.
 *
 * The clip-based variants (`mask`, `wipeX`) animate an inner wrapper rather
 * than the observed element itself. This is not stylistic: a `clip-path` on
 * the observed element collapses its intersection rect to nothing, so the
 * observer that would reveal it never fires and the content stays hidden
 * forever. Keeping the observed element geometric and clipping inside it
 * breaks that deadlock. (`rise` uses opacity/transform, which IntersectionObserver
 * ignores, so it can safely animate the observed element directly.)
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'rise',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const state = visible ? 'is-visible' : ''
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined

  if (variant === 'rise') {
    return (
      <Tag ref={ref as never} className={`reveal ${state} ${className}`} style={style}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as never} className={className}>
      <div className={`${VARIANT_CLASS[variant]} ${state} h-full w-full`} style={style}>
        {children}
      </div>
    </Tag>
  )
}
