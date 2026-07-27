import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, X, Sparkles, Info } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Faq } from '@/components/landing/Faq'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { APP_URL } from '@/lib/site'
import type { AlternativePageConfig } from '@/lib/content/alternative/_type'

/** Renders one `/alternatives/<slug>` page from its config. */
export function AlternativeLanding({ config }: { config: AlternativePageConfig }) {
  const {
    path,
    competitor,
    breadcrumbLabel,
    eyebrow,
    h1,
    h1Highlight,
    subheading,
    intro,
    whySwitch,
    klivooFit,
    otherOptions,
    compare,
    pricing,
    faqHeading,
    faqs,
    related,
    ctaTitle,
    ctaSubtitle,
    asOf,
  } = config

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Alternatives', path: '/compare' },
            { name: breadcrumbLabel, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <Sparkles className="h-4 w-4" /> {eyebrow}
          </>
        }
        title={h1}
        highlight={h1Highlight}
        subtitle={subheading}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Alternatives', href: '/compare' },
          { name: breadcrumbLabel, href: path },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`${APP_URL}/signup`}
            className="press group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-800 sm:w-auto"
          >
            Try Kliv∞ free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            See pricing
          </Link>
        </div>
      </PageHero>

      {/* ── Intro ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {intro.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {intro.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why switch ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {whySwitch.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{whySwitch.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whySwitch.items.map(({ title, desc }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-stone-200/70 bg-white/60 p-6 shadow-soft backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                    <X className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-gray-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kliv∞ fit ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {klivooFit.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{klivooFit.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {klivooFit.items.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-stone-200/70 bg-white/60 p-6 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-soft-lg">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-gray-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other options (optional, listicle intent) ── */}
      {otherOptions && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {otherOptions.heading}
              </h2>
              <p className="mt-4 text-lg text-gray-600">{otherOptions.sub}</p>
            </Reveal>
            <div className="mt-12 space-y-4">
              {otherOptions.items.map(({ name, desc }, i) => (
                <Reveal key={name} delay={i * 50}>
                  <div className="rounded-2xl border border-stone-200/70 bg-white/60 p-6 shadow-soft backdrop-blur-sm">
                    <h3 className="font-display text-lg font-bold text-gray-900">{name}</h3>
                    <p className="mt-1.5 leading-relaxed text-gray-600">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-2 text-xs text-stone-400">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-none" />
              <span>
                Details on other tools are our fair reading as of {asOf} and can change — check each
                tool’s own site for current features and pricing.
              </span>
            </p>
          </div>
        </section>
      )}

      {/* ── Compare ledger ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {compare.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{compare.sub}</p>
          </Reveal>
          <Reveal className="mt-14">
            <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white/60 shadow-soft-lg backdrop-blur-sm">
              <div className="grid grid-cols-2 text-sm font-semibold">
                <div className="flex items-center gap-2 px-5 py-4 text-gray-400 sm:px-8">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-gray-400">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {competitor}
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50/60 to-amber-50/40 px-5 py-4 text-blue-600 sm:px-8">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  With Kliv∞
                </div>
              </div>
              {compare.old.map((oldItem, i) => (
                <div key={oldItem} className="group grid grid-cols-2 border-t border-stone-200/70 text-[15px]">
                  <div className="flex items-start gap-3 px-5 py-4 text-gray-500 sm:px-8">
                    <X className="mt-0.5 h-4 w-4 flex-none text-stone-300" />
                    <span>{oldItem}</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gradient-to-r from-orange-50/60 to-amber-50/40 px-5 py-4 text-gray-800 transition-colors group-hover:from-orange-100/70 sm:px-8">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-blue-500" />
                    <span className="font-medium">{compare.calm[i]}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {pricing.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {pricing.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Keep exploring
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(({ href, label, desc }, i) => (
              <Reveal key={href} delay={i * 70}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white/60 p-5 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft-lg"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-display text-base font-bold text-gray-900">{label}</span>
                    <ArrowUpRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-500" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-gray-500">{desc}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {faqHeading}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={faqs} />
        </div>
      </section>

      <CtaSection title={ctaTitle} subtitle={ctaSubtitle} />
    </PageShell>
  )
}
