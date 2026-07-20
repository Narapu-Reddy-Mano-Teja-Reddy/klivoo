import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, X, Sparkles, CreditCard, CalendarX, Download } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { DataSecurity } from '@/components/marketing/DataSecurity'
import { Faq } from '@/components/landing/Faq'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { APP_URL } from '@/lib/site'
import type { AudiencePageConfig } from '@/lib/content/audience/_type'

const TRUST = [
  { icon: CreditCard, label: 'No credit card to start' },
  { icon: CalendarX, label: 'Cancel anytime' },
  { icon: Download, label: 'Export your data anytime' },
]

/**
 * Renders one `/for/<audience>` page from its config. Shares the site's premium
 * marketing design while carrying entirely audience-specific copy, its own H1,
 * its own FAQ (with FAQPage schema), and its own internal links.
 */
export function AudienceLanding({ config }: { config: AudiencePageConfig }) {
  const {
    path,
    breadcrumbLabel,
    eyebrow,
    h1,
    h1Highlight,
    subheading,
    intro,
    pains,
    workflow,
    features,
    compare,
    pricing,
    faqHeading,
    faqs,
    related,
    ctaTitle,
    ctaSubtitle,
  } = config

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'For', path: '/for/freelancers' },
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
          { name: breadcrumbLabel, href: path },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`${APP_URL}/signup`}
            className="press group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-800 sm:w-auto"
          >
            Start for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            See pricing
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm text-gray-500">
          {TRUST.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-blue-500" />
              {label}
            </li>
          ))}
        </ul>
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

      {/* ── Pain points ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {pains.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{pains.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pains.items.map(({ title, desc }, i) => (
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

      {/* ── Workflow steps ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {workflow.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{workflow.sub}</p>
          </Reveal>
          <ol className="mt-12 space-y-6">
            {workflow.steps.map(({ title, desc }, i) => (
              <Reveal key={title} delay={i * 60}>
                <li className="flex gap-5 rounded-2xl border border-stone-200/70 bg-white/60 p-6 shadow-soft backdrop-blur-sm">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 font-display text-lg font-bold text-white shadow-lg shadow-blue-500/25">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">{title}</h3>
                    <p className="mt-1 leading-relaxed text-gray-600">{desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Feature map ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {features.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{features.sub}</p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.items.map(({ icon: Icon, title, desc }, i) => (
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
                  The old way
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50/60 to-amber-50/40 px-5 py-4 text-blue-600 sm:px-8">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  With CLIV∞
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

      {/* ── Pricing note ── */}
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
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700"
            >
              See full pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Data privacy ── */}
      <DataSecurity className="pb-4" />

      {/* ── Related pages ── */}
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
