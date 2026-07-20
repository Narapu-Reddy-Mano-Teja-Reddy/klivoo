'use client'

import { type ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  /** Scroll direction. */
  reverse?: boolean
  /** Seconds for one full loop — bigger is slower. */
  speed?: number
  className?: string
}

/**
 * Seamless infinite marquee. Renders its children twice back-to-back and slides
 * the track by exactly -50%, so the loop is invisible. Pauses on hover, fades
 * out at both edges, and pins to a single static row when the visitor prefers
 * reduced motion (the CSS animation simply doesn't run). GPU-only transform.
 */
export function Marquee({ children, reverse = false, speed = 34, className = '' }: MarqueeProps) {
  return (
    <div className={`group/marquee mask-fade-edges overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee items-center motion-reduce:animate-none group-hover/marquee:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
