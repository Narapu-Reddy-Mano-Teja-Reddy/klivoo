'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { HOME_FAQS, type Faq as FaqItem } from '@/lib/faq-data'

/**
 * Accordion FAQ.
 *
 * Three looks, all sharing one behaviour:
 * - default  — the boxed light card used across the marketing pages.
 * - `dark`   — glass-on-black for dark surfaces.
 * - `variant="editorial"` — the landing page treatment: no outer box, just
 *   hairline rules and generous type, so the questions sit directly on the
 *   page like a printed index.
 */
export function Faq({
  items = HOME_FAQS,
  dark = false,
  variant = 'default',
}: {
  items?: FaqItem[]
  dark?: boolean
  variant?: 'default' | 'editorial'
}) {
  const [open, setOpen] = useState<number | null>(0)
  const editorial = variant === 'editorial'

  return (
    <div
      className={
        editorial
          ? 'mx-auto max-w-3xl'
          : `mx-auto max-w-3xl rounded-2xl border ${
              dark
                ? 'divide-y divide-white/[0.08] border-white/[0.08] bg-white/[0.03] backdrop-blur-sm'
                : 'divide-y divide-gray-200 border-gray-200 bg-white'
            }`
      }
    >
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className={
              editorial
                ? 'group/faq relative border-t border-line/70 last:border-b'
                : 'px-5 sm:px-6'
            }
          >
            {editorial && (
              // A warm wash that only lifts while the row is open or hovered.
              // Fades out at both ends so it reads as light falling on the row,
              // never as a box — the hairlines are the only structure here.
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-[-2rem] inset-y-0 -z-10 bg-[linear-gradient(to_right,transparent,rgba(255,237,213,0.55)_22%,rgba(255,237,213,0.28)_60%,transparent)] transition-opacity duration-500 ${
                  isOpen ? 'opacity-100' : 'opacity-0 group-hover/faq:opacity-60'
                }`}
              />
            )}
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={
                editorial
                  ? 'focus-ember flex w-full items-center justify-between gap-6 rounded-lg py-6 text-left'
                  : 'flex w-full items-center justify-between gap-4 py-5 text-left'
              }
            >
              <span
                className={
                  editorial
                    ? `font-display text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl ${
                        isOpen ? 'text-blue-700' : 'text-gray-900 group-hover/faq:text-blue-700'
                      }`
                    : `font-display text-base font-semibold sm:text-lg ${
                        dark ? 'text-white' : 'text-gray-900'
                      }`
                }
              >
                {item.q}
              </span>
              <span
                className={`flex flex-none items-center justify-center rounded-full border transition-all duration-300 ${
                  editorial ? 'h-9 w-9' : 'h-8 w-8'
                } ${
                  isOpen
                    ? dark
                      ? 'rotate-45 border-blue-500/30 bg-blue-500/10 text-blue-400'
                      : 'rotate-45 border-blue-500/30 bg-blue-500 text-white'
                    : dark
                      ? 'border-white/10 text-stone-400'
                      : editorial
                        ? 'border-line text-stone-400 group-hover/faq:border-orange-300 group-hover/faq:text-blue-600'
                        : 'border-gray-200 text-gray-500'
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={
                    editorial
                      ? 'max-w-measure pb-7 pr-12 text-[15px] leading-[1.75] text-gray-600'
                      : `pb-5 pr-12 text-[15px] leading-relaxed ${
                          dark ? 'text-stone-400' : 'text-gray-600'
                        }`
                  }
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
