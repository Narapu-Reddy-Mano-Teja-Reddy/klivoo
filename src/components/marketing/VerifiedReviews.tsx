import Link from 'next/link'
import {
  Star,
  BadgeCheck,
  ShieldCheck,
  Code2,
  Sparkles,
  ArrowRight,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/landing/Reveal'
import { Parallax } from '@/components/landing/Parallax'
import { SectionLabel } from '@/components/landing/SectionLabel'

/**
 * Verified Client Reviews — the flagship trust feature. A Trustpilot-style
 * system that turns completed projects into credible, verified reviews the
 * freelancer can show off (public page + embeddable badge).
 *
 * Art direction: the whole band sits on warm cream paper so it reads as a
 * distinct, tangible artefact in the page's light/dark rhythm — the review
 * page is the hero object here, not an illustration beside a list.
 *
 * Note: no ratings/counts are hard-coded as real traction — the mock visual is
 * clearly illustrative, and the copy frames reviews as "coming from real
 * clients" until volume builds, per the launch messaging.
 */
const HOW: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Sparkles,
    title: 'Collected automatically',
    desc: 'Mark a project “completed” and your client is invited to review it — right inside the portal they already use. No links to chase, no extra logins.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuinely verified',
    desc: 'Every review is tied to a real client on a real completed project. You can’t edit or delete them — which is exactly what makes them credible.',
  },
  {
    icon: BadgeCheck,
    title: 'A public page, on us',
    desc: 'Get an auto-generated review page at your own agency slug — your logo, your average rating, every verified review. Free on every plan.',
  },
  {
    icon: Code2,
    title: 'An embeddable badge',
    desc: 'Drop one line of code on your own website to show a live, auto-updating star rating. Your reviews, working for you everywhere.',
  },
]

/** Illustrative mock of the public, verified review page. */
function ReviewCard({
  name,
  stars,
  text,
  date,
}: {
  name: string
  stars: number
  text: string
  date: string
}) {
  return (
    <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-lift-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-600">
            {name[0]}
          </span>
          <span className="text-sm font-semibold text-gray-800">{name}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
          <BadgeCheck className="h-3 w-3" /> Verified
        </span>
      </div>
      <div className="mt-2.5 flex gap-0.5 text-blue-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < stars ? 'fill-current' : 'text-stone-200'}`} />
        ))}
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{text}</p>
      <p className="mt-2 text-[11px] text-stone-400">{date}</p>
    </div>
  )
}

function ReviewPageMock() {
  return (
    <div className="relative">
      {/* Warm bloom, drifting slower than the page so the object sits in space. */}
      <Parallax
        speed={30}
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgba(249,115,22,0.20),transparent_70%)] blur-2xl"
      >
        <span />
      </Parallax>

      {/* A second sheet peeking out behind — the page has depth, it's a real
          artefact rather than a flat screenshot. */}
      <div
        aria-hidden
        className="absolute inset-x-8 -top-3 h-20 rotate-[-2deg] rounded-2xl border border-stone-200/70 bg-white/60 shadow-lift-1"
      />

      <Parallax speed={-18} className="relative">
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-lift-4">
          <div className="flex items-center gap-1.5 border-b border-stone-100 bg-stone-50/60 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <span className="ml-2 truncate text-[11px] font-medium text-gray-400">
              kliv∞.in/your-studio
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {/* Agency header */}
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-base font-bold text-white shadow-ember">
                YS
              </span>
              <div>
                <div className="font-display text-base font-bold text-gray-900">Your Studio</div>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5 text-blue-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">4.9</span>
                  <span className="text-xs text-stone-400">· verified reviews</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-4 space-y-2.5">
              <ReviewCard
                name="Ananya R."
                stars={5}
                text="Delivered ahead of schedule and kept us in the loop the whole way. Would hire again in a heartbeat."
                date="Verified Project · Jun 2026"
              />
              <ReviewCard
                name="Vikram T."
                stars={5}
                text="Professional from the first call to the final invoice. Exactly what a growing brand needs."
                date="Verified Project · May 2026"
              />
            </div>

            <p className="mt-3 text-center text-[10px] text-stone-400">Powered by Kliv∞</p>
          </div>
        </div>
      </Parallax>

      {/* Floating embeddable badge — leads the parallax so it reads as nearest
          to the viewer. */}
      <Parallax
        speed={-42}
        className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-stone-200/80 bg-white/95 p-3.5 shadow-lift-4 backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-blue-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-900">4.9</span>
        </div>
        <p className="mt-1 text-[10px] font-medium text-stone-400">Embeddable badge · your site</p>
      </Parallax>
    </div>
  )
}

export function VerifiedReviews({ className = '' }: { className?: string }) {
  return (
    <section
      className={`grain grain-light relative overflow-hidden border-y border-line/60 bg-cream py-20 sm:py-32 ${className}`}
    >
      {/* Paper texture: a faint dot field, masked so it never reads as a grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-dot-warm opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_80%_20%,black,transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel icon={BadgeCheck}>New · Built-in trust</SectionLabel>
            </Reveal>
            <Reveal variant="mask" delay={90}>
              <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-display-sm lg:text-display">
                Turn finished projects into{' '}
                <span className="text-gradient-brand font-serif-display text-[1.12em] font-normal italic">
                  verified reviews
                </span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 max-w-measure text-lg leading-relaxed text-gray-600">
                Social proof is the hardest thing for a freelancer to build — so Kliv∞ builds it
                for you. Real reviews, from real clients, on real completed projects.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex gap-3 border-l-2 border-blue-500/30 pl-4 text-sm leading-relaxed text-gray-600">
                <Lock className="mt-0.5 h-4 w-4 flex-none text-blue-500" />
                <span>
                  Free on every plan — including Free — because the more agencies embed their badge,
                  the more people discover Kliv∞.
                </span>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <Link
                href="/features#verified-client-reviews"
                className="focus-ember group mt-8 inline-flex items-center gap-2 rounded-full text-sm font-bold uppercase tracking-[0.14em] text-blue-600 transition-colors hover:text-blue-700"
              >
                See how verified reviews work
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-200 transition-all duration-300 group-hover:border-orange-400 group-hover:bg-blue-100/60">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <ReviewPageMock />
          </Reveal>
        </div>

        {/* The four points as a printed index — numbered, hairline-separated,
            running the full width under the artefact. Never a bulleted list. */}
        <div className="mt-24 sm:mt-32">
          <div className="rule-warm" />
          <div className="grid gap-x-8 gap-y-10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100} className="group relative">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute -left-4 top-1 hidden h-14 w-px bg-gradient-to-b from-line to-transparent lg:block"
                  />
                )}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xs font-bold tracking-[0.16em] text-blue-500/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-line/70" />
                  <Icon className="h-4 w-4 flex-none text-blue-500 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
