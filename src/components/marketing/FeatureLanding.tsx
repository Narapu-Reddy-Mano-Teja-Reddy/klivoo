import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, CreditCard, CalendarX, Download } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { APP_URL } from '@/lib/site'
import { FEATURE_PAGES, type FeaturePageConfig } from '@/lib/feature-pages'
import { Faq } from '@/components/landing/Faq'

const TRUST = [
  { icon: CreditCard, label: 'No credit card to start' },
  { icon: CalendarX, label: 'Cancel anytime' },
  { icon: Download, label: 'Export your data anytime' },
]

/**
 * Renders one in-depth feature explainer page from a config: what it is, how to
 * use it (steps), how it helps, where it fits, what's included, related
 * features, and an FAQ (with FAQPage + Breadcrumb rich-result schema).
 */
export function FeatureLanding({ config }: { config: FeaturePageConfig }) {
  const {
    path,
    navLabel,
    icon: Icon,
    eyebrow,
    h1,
    h1Highlight,
    subheading,
    intro,
    stepsHeading,
    steps,
    helpsHeading,
    helps,
    whereHeading,
    where,
    capabilitiesHeading,
    capabilities,
    faqHeading,
    faqs,
    ctaTitle,
    ctaSubtitle,
  } = config

  const related = FEATURE_PAGES.filter((f) => f.slug !== config.slug).slice(0, 3)

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Features', path: '/features' },
            { name: navLabel, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <Icon className="h-4 w-4" /> {eyebrow}
          </>
        }
        title={h1}
        highlight={h1Highlight}
        subtitle={subheading}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Features', href: '/features' },
          { name: navLabel, href: path },
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
            href="/features"
            className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            See all features
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm text-gray-500">
          {TRUST.map(({ icon: TIcon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <TIcon className="h-4 w-4 text-blue-500" />
              {label}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ── What is it ── */}
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

      {/* ── How to use (numbered steps) ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {stepsHeading}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="flex gap-4 rounded-2xl border border-stone-200/70 bg-white/60 p-6 shadow-soft backdrop-blur-sm">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 font-display text-lg font-bold text-white shadow-lg shadow-blue-500/30">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-gray-600">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it helps ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {helpsHeading}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {helps.map(({ icon: HIcon, title, desc }, i) => (
              <Reveal key={title} delay={i * 90} className="group flex gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <HIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-gray-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where to use + What's included ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {whereHeading}
              </h2>
              <div className="mt-8 space-y-4">
                {where.map((w) => (
                  <div
                    key={w.title}
                    className="rounded-2xl border border-stone-200/70 bg-white/60 p-5 shadow-soft backdrop-blur-sm"
                  >
                    <h3 className="font-display text-base font-bold text-gray-900">{w.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-gray-600">{w.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {capabilitiesHeading}
              </h2>
              <ul className="mt-8 space-y-3.5">
                {capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Related features ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Explore more features
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(({ path: rPath, navLabel: rLabel, navDescription, icon: RIcon }, i) => (
              <Reveal key={rPath} delay={i * 70}>
                <Link
                  href={rPath}
                  className="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white/60 p-5 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft-lg"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <RIcon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-500" />
                  </span>
                  <span className="mt-4 font-display text-base font-bold text-gray-900">{rLabel}</span>
                  <span className="mt-1.5 text-sm leading-relaxed text-gray-500">{navDescription}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              See all features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
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
