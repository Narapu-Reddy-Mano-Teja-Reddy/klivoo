'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AutoScrollingCarouselProps {
  children: React.ReactNode[]
  speed?: number // pixels per frame (default 0.75)
  direction?: 'left' | 'right'
  className?: string
  pauseOnHover?: boolean
}

export function AutoScrollingCarousel({
  children,
  speed = 0.75,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: AutoScrollingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const hasDraggedRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  // Update ref when state changes
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationFrameId: number

    const animate = () => {
      if (container && !isPausedRef.current && !isDraggingRef.current) {
        if (direction === 'left') {
          container.scrollLeft += speed
          // If we scrolled past the first half (original items), loop back
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft -= container.scrollWidth / 2
          }
        } else {
          container.scrollLeft -= speed
          if (container.scrollLeft <= 0) {
            container.scrollLeft += container.scrollWidth / 2
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [speed, direction])

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container) return
    isDraggingRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.pageX - container.offsetLeft
    scrollLeftRef.current = container.scrollLeft
  }

  const handleMouseLeave = () => {
    isDraggingRef.current = false
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const container = scrollRef.current
    if (!container) return
    const x = e.pageX - container.offsetLeft
    const distance = Math.abs(x - startXRef.current)
    if (distance > 5) {
      hasDraggedRef.current = true
    }
    if (hasDraggedRef.current) {
      e.preventDefault()
      const walk = (x - startXRef.current) * 1.5
      container.scrollLeft = scrollLeftRef.current - walk
    }
  }

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const flatChildren = React.Children.toArray(children)

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
        handleMouseLeave()
        if (pauseOnHover) setIsPaused(false)
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
      onTouchStart={() => pauseOnHover && setIsPaused(true)}
      onTouchEnd={() => pauseOnHover && setIsPaused(false)}
      className={`flex flex-row items-stretch gap-6 overflow-x-auto select-none cursor-grab active:cursor-grabbing pb-6 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {/* Render original items */}
      {flatChildren.map((child, index) => (
        <div key={`orig-${index}`} className="shrink-0 flex items-stretch">
          {child}
        </div>
      ))}
      {/* Render duplicate items for seamless infinite loop */}
      {flatChildren.map((child, index) => (
        <div key={`dup-${index}`} className="shrink-0 flex items-stretch" aria-hidden="true">
          {child}
        </div>
      ))}
    </div>
  )
}
