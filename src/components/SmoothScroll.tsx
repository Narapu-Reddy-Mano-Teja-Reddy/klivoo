'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ReactLenis } from 'lenis/react'

/** Pages where Lenis smooth scroll should be disabled — these rely on native
 *  overflow scrolling for independently-scrollable panels (e.g. the invoice
 *  form + preview layout, or the time converter's timezone dropdown list). */
const NATIVE_SCROLL_PATHS = ['/invoice', '/time-converter']

/**
 * Site-wide inertia scrolling (the "locomotive" feel), powered by Lenis in
 * `root` mode: it drives the native window scroll rather than wrapping the
 * page in its own scroll container, so window.scrollY-based effects (e.g.
 * the header's scroll-condense state) and hash anchors keep working as-is.
 *
 * Skips smoothing entirely for prefers-reduced-motion, per WCAG guidance.
 * Also skips smoothing on pages listed in NATIVE_SCROLL_PATHS.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const needsNativeScroll = NATIVE_SCROLL_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  if (reducedMotion || needsNativeScroll) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.5,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
