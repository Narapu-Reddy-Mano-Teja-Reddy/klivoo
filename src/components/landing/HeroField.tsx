'use client'

import { useEffect, useRef } from 'react'

/**
 * Interactive hero backdrop for the light theme.
 *
 * A canvas grid of faint warm dots. Dots within the pointer's influence
 * radius brighten toward brand-orange and grow, so a pool of light tracks the
 * cursor across the grid; a soft orange bloom (the div) trails just behind it.
 * The effect is scoped to the hero — pointer coordinates are measured against
 * this element's box and ignored when the cursor is outside it.
 *
 * When the pointer is idle, absent (touch), or off the hero, a light point
 * drifts on a slow lissajous path so the field still feels alive. Honors
 * `prefers-reduced-motion` with a single static frame. Renders behind content,
 * never intercepts pointer events, and animates on the GPU-friendly canvas +
 * a transform-only bloom.
 */

const BASE: [number, number, number] = [193, 180, 168] // warm taupe (soft on cream)
const HIGH: [number, number, number] = [249, 115, 22] // orange-500
const SPACING = 30
const INFLUENCE = 168
const DOT_MIN = 1.1
const DOT_MAX = 3.3

export function HeroField() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const glow = glowRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let tx = 0
    let ty = 0
    let px = 0
    let py = 0
    let idle = true
    let t = 0
    let raf = 0
    let rect = wrap.getBoundingClientRect()

    const resize = () => {
      rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / SPACING) + 1
      rows = Math.ceil(h / SPACING) + 1
      if (idle) {
        tx = px = w / 2
        ty = py = h * 0.4
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      const inf2 = INFLUENCE * INFLUENCE
      for (let i = 0; i < cols; i++) {
        const x = i * SPACING
        const dx2 = (x - px) * (x - px)
        for (let j = 0; j < rows; j++) {
          const y = j * SPACING
          const dy = y - py
          const d2 = dx2 + dy * dy
          let f = 0
          if (d2 < inf2) {
            f = 1 - Math.sqrt(d2) / INFLUENCE
            f *= f // ease-in falloff
          }
          if (f > 0.01) {
            const cr = (BASE[0] + (HIGH[0] - BASE[0]) * f) | 0
            const cg = (BASE[1] + (HIGH[1] - BASE[1]) * f) | 0
            const cb = (BASE[2] + (HIGH[2] - BASE[2]) * f) | 0
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.34 + 0.56 * f})`
          } else {
            ctx.fillStyle = `rgba(${BASE[0]},${BASE[1]},${BASE[2]},0.32)`
          }
          ctx.beginPath()
          ctx.arc(x, y, DOT_MIN + (DOT_MAX - DOT_MIN) * f, 0, 6.283185)
          ctx.fill()
        }
      }
      if (glow) glow.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`
    }

    const loop = () => {
      if (!finePointer || idle) {
        t += 0.006
        tx = w * (0.5 + 0.3 * Math.sin(t))
        ty = h * (0.45 + 0.28 * Math.cos(t * 0.9))
      }
      px += (tx - px) * 0.1
      py += (ty - py) * 0.1
      render()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        tx = x
        ty = y
        idle = false
      } else {
        idle = true
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const onScroll = () => {
      rect = wrap.getBoundingClientRect()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reduced) {
      px = w / 2
      py = h * 0.35
      render()
      return () => {
        ro.disconnect()
        window.removeEventListener('scroll', onScroll)
      }
    }

    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_52%,transparent_90%)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full opacity-70 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(251,146,60,0.05) 45%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  )
}
