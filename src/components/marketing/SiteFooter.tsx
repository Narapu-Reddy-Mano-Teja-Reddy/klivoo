import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Linkedin, Twitter, ArrowUpRight } from 'lucide-react'
import { FOOTER_NAV, SOCIALS, SITE_NAME } from '@/lib/site'
import { ParticleTextEffect } from '@/components/landing/ParticleTextEffect'

const SOCIAL_ICONS = [
  { href: SOCIALS.instagram, label: 'Instagram', Icon: Instagram },
  { href: SOCIALS.youtube, label: 'YouTube', Icon: Youtube },
  { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: SOCIALS.twitter, label: 'X (Twitter)', Icon: Twitter },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-900">
      {/* Particle Text Effect Container */}
      <div className="relative max-w-5xl mx-auto pt-10">
        <ParticleTextEffect words={["SIMPLIFY", "ORGANIZE", "SCALE", "SUCCEED", "CLIV\u221e", "TENSPICK"]} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Column with HUGE Prominent Logo (Crystal Clear on White Background) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block group p-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <Image
                src="/clivoo logo.png"
                alt="CLIV∞ logo"
                width={550}
                height={140}
                priority
                className="h-32 sm:h-40 md:h-44 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              The Infinite Client Operations Platform. Engineered by Tenspick Labs to empower independent creators, freelancers, and studios with automated billing, lead tracking, and white-label client portals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_ICONS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Categorized Link Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_NAV.map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                      >
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar & Required Credit Styling */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200/80 pt-8 text-center sm:text-left">
          <p className="text-xs font-semibold text-slate-500">
            © 2026 {SITE_NAME}. All rights reserved. Operating platform built by Tenspick Labs.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              built with ❤️ in India by
            </span>
            <a
              href="https://www.tenspick.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-black tracking-widest text-blue-600 hover:text-blue-700 transition-colors uppercase inline-flex items-center gap-1"
            >
              <span>TENSPICK</span>
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
