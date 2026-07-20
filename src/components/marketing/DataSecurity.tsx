import Link from 'next/link'
import { ShieldCheck, KeyRound, Ban, Wand2, Download, Lock, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/landing/Reveal'
import { Marquee } from '@/components/landing/Marquee'

/**
 * Compact data-privacy trust band. A short claim on the left, and a single
 * marquee ticker of security guarantees sliding on the right — the in-depth
 * details now live on the dedicated /security page (and the privacy policy),
 * not the homepage.
 *
 * Two looks, one story: the default light card is used on the pricing and SEO
 * landing pages; `variant="editorial"` is the landing page's treatment — no
 * card, just a slim right-to-left marquee strip.
 */
const GUARANTEES: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: 'Row-level security' },
  { icon: KeyRound, label: 'AES-256 encryption' },
  { icon: Ban, label: 'No data sharing, ever' },
  { icon: Wand2, label: 'Magic-link client auth' },
  { icon: Download, label: 'Export anytime' },
  { icon: Lock, label: 'Encrypted in transit' },
  { icon: Lock, label: 'Your data is 100% private' },
]

function Tick({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="mx-4 inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-500">
      <Icon className="h-3.5 w-3.5 text-blue-500" />
      {label}
      <span aria-hidden className="ml-4 h-1 w-1 rounded-full bg-blue-200" />
    </span>
  )
}

export function DataSecurity({
  className = '',
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'editorial'
}) {
  if (variant === 'editorial') {
    return (
      <section className={`border-y border-line/70 py-4 ${className}`}>
        <Marquee speed={38}>
          {GUARANTEES.map((g) => (
            <Tick key={g.label} icon={g.icon} label={g.label} />
          ))}
        </Marquee>
      </section>
    )
  }

  return (
    <section className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/60 shadow-soft-lg backdrop-blur">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-200/25 blur-3xl"
          />

          <div className="relative z-10 grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                <Lock className="h-3.5 w-3.5" /> Security &amp; privacy
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-gray-900">
                Your data is <span className="text-gradient-brand">100% private</span>.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Row-level isolation, encrypted tokens, and zero data-sharing — even we can’t read
                it.{' '}
                <Link
                  href="/security"
                  className="focus-ember rounded font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  See how we protect it →
                </Link>
              </p>
            </div>

            {/* Single sliding ticker of guarantees — fades at both edges. */}
            <div className="relative min-w-0 lg:border-l lg:border-stone-200/70 lg:pl-10">
              <Marquee speed={30}>
                {GUARANTEES.slice(0, -1).map((g) => (
                  <Tick key={g.label} icon={g.icon} label={g.label} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
