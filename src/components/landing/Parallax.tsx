'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  /**
   * Total travel in px across the element's full pass through the viewport.
   * Positive drifts the layer down as you scroll (it lags behind), negative
   * pulls it up (it leads). Keep background glows high and foreground content
   * low — the depth cue breaks the moment it becomes noticeable.
   */
  speed?: number
  as?: ElementType
  className?: string
}

/**
 * Scroll-linked parallax. Writes a `--py` CSS variable that `.parallax-layer`
 * consumes as a translate3d, so every frame stays on the compositor — no
 * layout, no paint, no React re-render while scrolling.
 *
 * Only listens while the element is actually on screen (IntersectionObserver
 * gates the scroll handler), and does nothing at all under
 * `prefers-reduced-motion` — the CSS zeroes the transform there too, so the
 * layer simply sits at its natural position.
 */
export function Parallax({ children, speed = 40, as: Tag = 'div', className = '' }: ParallaxProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Scroll-linked drift is a common source of mobile scroll jank (the URL
    // bar resizing mid-scroll fights the rAF-driven transform); skip it below md.
    if (window.matchMedia('(max-width: 767px)').matches) return

    let raf = 0
    let active = false

    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // 0 when the element's top edge first touches the bottom of the
      // viewport, 1 when its bottom edge leaves the top.
      const progress = (vh - r.top) / (vh + r.height)
      const clamped = Math.min(Math.max(progress, 0), 1)
      el.style.setProperty('--py', `${(clamped - 0.5) * speed}px`)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true
          window.addEventListener('scroll', onScroll, { passive: true })
          onScroll()
        } else if (!entry.isIntersecting && active) {
          active = false
          window.removeEventListener('scroll', onScroll)
        }
      },
      { rootMargin: '10% 0px' }
    )
    observer.observe(el)
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <Tag ref={ref as never} className={`parallax-layer ${className}`}>
      {children}
    </Tag>
  )
}
