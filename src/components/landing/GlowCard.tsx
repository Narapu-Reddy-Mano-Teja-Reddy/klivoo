'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * White card with a cursor-tracked spotlight: a soft warm-orange highlight
 * follows the mouse inside the card and fades in on hover, and the card lifts
 * and warms its border. Children render in a relative layer above the effect.
 *
 * Pass the border radius via className (e.g. `rounded-2xl`) so callers can
 * match their context; the spotlight clips to it via overflow-hidden.
 */
export function GlowCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group/glow relative h-full overflow-hidden border border-stone-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft-lg ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--mx, 50%) var(--my, 50%), rgba(249,115,22,0.10), transparent 65%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
