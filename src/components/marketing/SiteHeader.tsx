'use client'

import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Users,
  Filter,
  KanbanSquare,
  ReceiptText,
  PanelsTopLeft,
  BadgeCheck,
  Clock,
  FileText,
  Calculator,
  DollarSign,
  FileCode,
} from 'lucide-react'
import { NAV_LINKS } from '@/lib/site'
import { SpotlightButton } from '@/components/landing/SpotlightButton'

const NAV_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  '/features/client-management': Users,
  '/features/crm-lead-pipeline': Filter,
  '/features/project-management': KanbanSquare,
  '/features/invoicing': ReceiptText,
  '/features/client-portal': PanelsTopLeft,
  '/features/verified-reviews': BadgeCheck,
  '/invoice': FileText,
  '/tools/gst-calculator': Calculator,
  '/tools/freelance-rate-calculator': DollarSign,
  '/templates': FileCode,
}

/**
 * Global site header: a floating glass pill. Fully
 * transparent at the top, it condenses into a blurred white capsule with a
 * hairline border once the page scrolls.
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 20) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scrolling DOWN -> hide header/navbar
        setVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> reveal header/navbar again
        setVisible(true)
      }
      lastScrollY = currentScrollY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 transition-all duration-300 ease-in-out ${
        visible || menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="mx-auto flex h-24 sm:h-28 max-w-7xl items-center justify-between bg-transparent border-transparent shadow-none pl-4 pr-4">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/klivoo logo.png"
            alt="Kliv∞ logo"
            width={420}
            height={110}
            priority
            className="h-16 sm:h-24 md:h-28 w-auto transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) =>
            l.children ? (
              (() => {
                const wide = l.children.length > 3
                return (
                  <div key={l.label} className="group relative py-2">
                    <button className="flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors hover:text-blue-600">
                      {l.label}
                      <ChevronDown className="h-4 w-4 text-slate-700 transition-transform duration-200 group-hover:rotate-180 group-hover:text-blue-600" />
                    </button>
                    <div
                      className={`invisible absolute top-full -mt-1 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                        wide
                          ? 'left-1/2 w-[42rem] -translate-x-1/2 group-hover:translate-x-[-50%]'
                          : 'left-1/2 w-80 -translate-x-1/2 group-hover:translate-x-[-50%]'
                      }`}
                    >
                      {/* Invisible hover bridge */}
                      <div className="absolute inset-x-0 -top-4 h-4 bg-transparent" />
                      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl">
                        <div className="px-3 pb-2 pt-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-blue-600">
                          {l.label}
                        </div>
                        <div className={wide ? 'grid grid-cols-2 gap-1.5' : 'grid grid-cols-1 gap-1.5'}>
                          {l.children.map((child) => {
                            const Icon = NAV_ICONS[child.href]
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group/item flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-blue-50/80"
                              >
                                {Icon && (
                                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600 transition-colors group-hover/item:bg-blue-600 group-hover/item:text-white">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                )}
                                <div>
                                  <div className="text-sm font-extrabold text-slate-900 group-hover/item:text-blue-600">
                                    {child.label}
                                  </div>
                                  <div className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                                    {child.description}
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-extrabold text-slate-900 transition-colors hover:text-blue-600"
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-base font-extrabold text-slate-900 transition-colors hover:text-blue-600"
          >
            Sign in
          </Link>
          <SpotlightButton
            href="/login"
            className="px-4 py-2 text-sm font-semibold"
            dropClassName="h-8 w-8"
          >
            Get started
            <ArrowRight className="h-3.5 w-3.5" />
          </SpotlightButton>
        </div>

        <button
          type="button"
          onClick={() => {
            setMenuOpen((o) => !o)
            setOpenGroup(null)
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors hover:bg-stone-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="animate-fade-in mx-auto mt-2 max-w-5xl rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-[0_16px_48px_-12px_rgba(28,25,23,0.25)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) =>
              l.children ? (
                <div key={l.label} className="flex flex-col py-1">
                  <button
                    type="button"
                    onClick={() => setOpenGroup((g) => (g === l.label ? null : l.label))}
                    aria-expanded={openGroup === l.label}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-stone-50"
                  >
                    {l.label}
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                        openGroup === l.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openGroup === l.label && (
                    <div className="mt-1 flex flex-col pl-4">
                      {l.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-stone-50 hover:text-gray-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-stone-50 hover:text-gray-900"
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-stone-100 pt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-gray-700 hover:bg-stone-50"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 px-4 py-3 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_20px_-6px_rgba(14,145,232,0.7)]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
