'use client'

import { useEffect, useRef } from 'react'

/**
 * Interactive 3D grid backdrop for the light hero.
 *
 * A canvas mesh of warm hairlines + intersection dots. Points within the
 * pointer's influence radius are pushed radially *outward* from the cursor,
 * which magnifies the local cells into a soft lens bulge — the grid appears to
 * pop toward the viewer where the cursor sits. Bulged lines/dots also brighten
 * toward brand-orange, and a soft orange bloom trails the pointer for depth.
 *
 * Scoped to the hero: pointer coords are measured against this element's box
 * and ignored outside it. When idle / touch / off-hero, a light point drifts on
 * a slow lissajous path so the field still breathes. Honors
 * `prefers-reduced-motion` with a single flat frame. Renders behind content and
 * never intercepts pointer events (canvas + a transform-only bloom).
 */

const SPACING = 44
const INFLUENCE = 215
const PUSH = 24 // max outward displacement — the "height" of the 3D pop
const BASE_LINE: [number, number, number] = [190, 172, 152] // warm taupe
const BASE_DOT: [number, number, number] = [176, 156, 134]
const HIGH: [number, number, number] = [249, 115, 22] // orange-500
const FAINT_LINE = `rgba(${BASE_LINE[0]},${BASE_LINE[1]},${BASE_LINE[2]},0.20)`

export function HeroGrid() {
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

    // Per-point displaced coordinates + intensity, filled each frame.
    let X = new Float32Array(0)
    let Y = new Float32Array(0)
    let F = new Float32Array(0)

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
      cols = Math.ceil(w / SPACING) + 2
      rows = Math.ceil(h / SPACING) + 2
      const n = cols * rows
      X = new Float32Array(n)
      Y = new Float32Array(n)
      F = new Float32Array(n)
      if (idle) {
        tx = px = w / 2
        ty = py = h * 0.4
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      const R = INFLUENCE
      const R2 = R * R

      // 1) Displace every point away from the cursor (lens bulge) + record intensity.
      for (let i = 0; i < cols; i++) {
        const bx = i * SPACING
        for (let j = 0; j < rows; j++) {
          const by = j * SPACING
          const idx = i * rows + j
          const dx = bx - px
          const dy = by - py
          const d2 = dx * dx + dy * dy
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 0.0001
            let f = 1 - d / R
            f *= f // ease-in falloff
            const push = f * PUSH
            X[idx] = bx + (dx / d) * push
            Y[idx] = by + (dy / d) * push
            F[idx] = f
          } else {
            X[idx] = bx
            Y[idx] = by
            F[idx] = 0
          }
        }
      }

      ctx.lineWidth = 1

      // 2) Batch all faint (far-from-cursor) segments into a single stroke.
      ctx.strokeStyle = FAINT_LINE
      ctx.beginPath()
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j
          if (i < cols - 1) {
            const r = (i + 1) * rows + j
            if ((F[idx] + F[r]) * 0.5 <= 0.02) {
              ctx.moveTo(X[idx], Y[idx])
              ctx.lineTo(X[r], Y[r])
            }
          }
          if (j < rows - 1) {
            const b = i * rows + (j + 1)
            if ((F[idx] + F[b]) * 0.5 <= 0.02) {
              ctx.moveTo(X[idx], Y[idx])
              ctx.lineTo(X[b], Y[b])
            }
          }
        }
      }
      ctx.stroke()

      // 3) Bright (near-cursor) segments — individually coloured toward orange.
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j
          if (i < cols - 1) {
            const r = (i + 1) * rows + j
            const fm = (F[idx] + F[r]) * 0.5
            if (fm > 0.02) drawBright(X[idx], Y[idx], X[r], Y[r], fm)
          }
          if (j < rows - 1) {
            const b = i * rows + (j + 1)
            const fm = (F[idx] + F[b]) * 0.5
            if (fm > 0.02) drawBright(X[idx], Y[idx], X[b], Y[b], fm)
          }
        }
      }

      // 4) Intersection dots — grow + brighten with the bulge.
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j
          const f = F[idx]
          if (f <= 0.02) continue
          const cr = (BASE_DOT[0] + (HIGH[0] - BASE_DOT[0]) * f) | 0
          const cg = (BASE_DOT[1] + (HIGH[1] - BASE_DOT[1]) * f) | 0
          const cb = (BASE_DOT[2] + (HIGH[2] - BASE_DOT[2]) * f) | 0
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.22 + 0.65 * f})`
          ctx.beginPath()
          ctx.arc(X[idx], Y[idx], 1 + 2.8 * f, 0, 6.283185)
          ctx.fill()
        }
      }

      if (glow) glow.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`
    }

    const drawBright = (x1: number, y1: number, x2: number, y2: number, f: number) => {
      const cr = (BASE_LINE[0] + (HIGH[0] - BASE_LINE[0]) * f) | 0
      const cg = (BASE_LINE[1] + (HIGH[1] - BASE_LINE[1]) * f) | 0
      const cb = (BASE_LINE[2] + (HIGH[2] - BASE_LINE[2]) * f) | 0
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.1 + 0.6 * f})`
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    const loop = () => {
      if (!finePointer || idle) {
        t += 0.006
        tx = w * (0.5 + 0.3 * Math.sin(t))
        ty = h * (0.42 + 0.28 * Math.cos(t * 0.9))
      }
      px += (tx - px) * 0.12
      py += (ty - py) * 0.12
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

    // On touch / no-pointer devices (and reduced-motion), skip the interactive
    // cursor-pop entirely: render a plain static grid, no rAF loop, no drift.
    const staticMode = reduced || !finePointer
    const renderStatic = () => {
      px = -100000
      py = -100000
      render()
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (staticMode) renderStatic()
    })
    ro.observe(wrap)
    const onScroll = () => {
      rect = wrap.getBoundingClientRect()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    if (staticMode) {
      if (glow) glow.style.opacity = '0'
      renderStatic()
      return () => {
        ro.disconnect()
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    // Full-section track; the inner layer sticks to the top of the viewport so
    // the grid stays put while the hero scrolls, then releases with the section.
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        ref={wrapRef}
        className="h-full w-full overflow-hidden [mask-image:radial-gradient(ellipse_88%_78%_at_50%_42%,black_45%,transparent_92%)] md:sticky md:top-0 md:h-[100svh]"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[24rem] w-[24rem] rounded-full opacity-70 will-change-transform"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(251,146,60,0.06) 45%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />
      </div>
    </div>
  )
}
