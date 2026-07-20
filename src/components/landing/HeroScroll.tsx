'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface HeroScrollProps {
  children: ReactNode
  className?: string
  /**
   * `squeeze` — content scales down, lifts up, and fades as the page scrolls,
   * so the hero recedes into the background instead of just sliding away.
   * `parallax` — the layer drifts at a fraction of the scroll speed (`speed`),
   * adding depth to background elements like the grid.
   */
  mode?: 'squeeze' | 'parallax'
  /** Parallax drift factor (only used in `parallax` mode). */
  speed?: number
  /** Scroll distance (px) over which the effect fully plays out. */
  distance?: number
}

/**
 * Scroll-driven transform wrapper for the hero. Reads `window.scrollY` inside a
 * single rAF-throttled listener and writes transform/opacity directly to the
 * element — never triggers React re-renders. Honors `prefers-reduced-motion`
 * (renders a static frame) and only animates GPU-friendly properties.
 */
export function HeroScroll({
  children,
  className = '',
  mode = 'squeeze',
  speed = 0.2,
  distance = 640,
}: HeroScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Skip the transform-pin effect on small viewports: mobile browsers resize
    // the visual viewport as the URL bar shows/hides mid-scroll, which fights
    // the scrollY-driven transform here and reads as a stuck/glitchy scroll.
    if (window.matchMedia('(max-width: 767px)').matches) return

    let raf = 0

    const update = () => {
      raf = 0
      const y = window.scrollY

      if (mode === 'parallax') {
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`
        return
      }

      // squeeze: a transform-only "fake sticky" — translate the copy down by the
      // scroll amount (capped at `distance`) so it stays visually pinned while
      // the dashboard rises and stacks over it, meanwhile zooming out + fading.
      // Pure transform means no CSS-sticky jank and no dependence on ancestor
      // overflow. Past `distance` the offset holds, so it releases seamlessly.
      const pin = Math.min(Math.max(y, 0), distance)
      const p = pin / distance
      const eased = 1 - (1 - p) * (1 - p) // easeOutQuad
      const scale = 1 - eased * 0.14
      el.style.transform = `translate3d(0, ${pin}px, 0) scale(${scale})`
      el.style.opacity = String(1 - eased * 0.98)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [mode, speed, distance])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  )
}
