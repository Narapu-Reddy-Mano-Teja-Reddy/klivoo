'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * Gentle 3D tilt-on-hover wrapper (perspective card) for the hero preview.
 * Mouse-only: touch devices never fire mousemove, so the card simply stays
 * flat. The tilt range is deliberately small — physical, not gimmicky.
 */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1400px) rotateX(${py * -3.5}deg) rotateY(${px * 5}deg) scale3d(1.01, 1.01, 1)`
    })
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
