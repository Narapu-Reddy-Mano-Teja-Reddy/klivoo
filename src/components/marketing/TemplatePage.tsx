import Link from 'next/link'
import { ArrowUpRight, FileText, Check, Info } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Faq } from '@/components/landing/Faq'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { CopyButton } from '@/components/marketing/CopyButton'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import type { TemplateConfig } from '@/lib/content/templates/_type'

/** Renders one `/templates/<slug>` page: intro, copyable template, how-to, FAQ. */
export function TemplatePage({ config }: { config: TemplateConfig }) {
  const {
    path,
    title,
    eyebrow,
    h1,
    h1Highlight,
    subheading,
    intro,
    templateTitle,
    templateBody,
    howToUse,
    tips,
    faqHeading,
    faqs,
    related,
    ctaTitle,
    ctaSubtitle,
    disclaimer,
  } = config

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Templates', path: '/templates' },
            { name: title, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <FileText className="h-4 w-4" /> {eyebrow}
          </>
        }
        title={h1}
        highlight={h1Highlight}
        subtitle={subheading}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Templates', href: '/templates' },
          { name: title, href: path },
        ]}
      />

      {/* Intro */}
      <section className="pt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="space-y-4">
              {intro.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The template */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white/70 shadow-soft-lg backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/70 bg-stone-50/60 px-5 py-4 sm:px-7">
                <h2 className="font-display text-base font-bold text-gray-900">{templateTitle}</h2>
                <CopyButton text={templateBody} filename={`${config.slug}.txt`} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-6 font-mono text-[13px] leading-relaxed text-gray-800 sm:px-7">
                {templateBody}
              </pre>
            </div>
            {disclaimer && (
              <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-stone-400">
                <Info className="mt-0.5 h-3.5 w-3.5 flex-none" />
                <span>{disclaimer}</span>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* How to use */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              How to use this template
            </h2>
            <ol className="mt-6 space-y-3">
              {howToUse.map((step, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-gray-700">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 font-display text-xs font-bold text-blue-600">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-10">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-stone-400">Tips</h3>
            <ul className="mt-4 space-y-2.5">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[15px] text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-blue-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                More free templates & tools
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
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
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
