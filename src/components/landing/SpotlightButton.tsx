'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface SpotlightButtonProps {
  href: string
  children: ReactNode
  className?: string
  /** Tailwind size classes for the drop (default sized for the hero button). */
  dropClassName?: string
}

/**
 * Black pill button with a liquid orange "water drop" that chases the cursor.
 *
 * The drop is a solid, outlined circle (no gradient) with a glossy highlight.
 * A rAF spring makes it lag behind the pointer, and it stretches along its
 * direction of travel — so it reads like a droplet sliding through liquid. It
 * grows in on hover and shrinks out on leave. Touch devices never hover, so the
 * button simply stays solid black.
 */
export function SpotlightButton({
  href,
  children,
  className = '',
  dropClassName = 'h-11 w-11',
}: SpotlightButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const dropRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const drop = dropRef.current
    if (!el || !drop) return

    let tx = 0
    let ty = 0 // target (cursor)
    let x = 0
    let y = 0 // current (springs toward target)
    let s = 0 // scale (0 hidden → 1 shown)
    let active = false
    let raf = 0

    const loop = () => {
      const vx = tx - x
      const vy = ty - y
      x += vx * 0.2
      y += vy * 0.2
      s += ((active ? 1 : 0) - s) * 0.18

      // Stretch along the direction of motion for a liquid, teardrop feel.
      const speed = Math.min(Math.hypot(vx, vy) / 26, 0.4)
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI
      const sx = (1 + speed) * s
      const sy = (1 - speed * 0.55) * s

      drop.style.transform =
        `translate(${x}px, ${y}px) translate(-50%, -50%) ` +
        `rotate(${angle}deg) scale(${sx}, ${sy})`
      raf = requestAnimationFrame(loop)
    }

    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top] as const
    }
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      ;[tx, ty] = local(e)
      x = tx
      y = ty
      active = true
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      ;[tx, ty] = local(e)
      active = true
    }
    const onLeave = () => {
      active = false
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      className={`press group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-900 text-white shadow-[0_12px_34px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(14,145,232,0.55)] ${className}`}
    >
      {/* Liquid water drop — solid, outlined circle (no highlight dot) */}
      <span
        ref={dropRef}
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 rounded-full bg-blue-500 ring-2 ring-blue-200/80 shadow-[inset_0_-3px_6px_rgba(2,113,198,0.45),0_6px_16px_rgba(14,145,232,0.55)] will-change-transform ${dropClassName}`}
        style={{ transform: 'scale(0)' }}
      />
      <span className="relative flex items-center justify-center gap-2">{children}</span>
    </a>
  )
}
