'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  /** How far the element is allowed to lean toward the cursor, in px. */
  strength?: number
  className?: string
}

/**
 * Springy magnetic hover: the element leans toward the cursor while it's
 * inside, then releases back with an ease-out settle. Writes `--mgx`/`--mgy`
 * for `.magnetic-layer` to consume, so the transform never round-trips
 * through React state.
 *
 * Pointer-type aware — touch never triggers it (a "hover" that fires on tap
 * just makes buttons feel loose), and `prefers-reduced-motion` zeroes the
 * transform in CSS.
 */
export function Magnetic({ children, strength = 8, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    // -1..1 from the element's centre, scaled to `strength`.
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
    el.dataset.active = 'true'
    el.style.setProperty('--mgx', `${dx * strength}px`)
    el.style.setProperty('--mgy', `${dy * strength}px`)
  }

  const release = () => {
    const el = ref.current
    if (!el) return
    el.dataset.active = 'false'
    el.style.setProperty('--mgx', '0px')
    el.style.setProperty('--mgy', '0px')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      onPointerCancel={release}
      className={`magnetic-layer ${className}`}
    >
      {children}
    </div>
  )
}
