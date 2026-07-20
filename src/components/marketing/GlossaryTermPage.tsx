import Link from 'next/link'
import { ArrowUpRight, BookText, ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import type { GlossaryTermConfig } from '@/lib/content/glossary/_type'

/** Renders one `/glossary/<slug>` term page from its config. */
export function GlossaryTermPage({ config }: { config: GlossaryTermConfig }) {
  const { term, path, category, definition, body, clivooNote, related, relatedTerms } = config

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema([{ q: `What is ${term}?`, a: definition }]),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
            { name: term, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <BookText className="h-4 w-4" /> {category}
          </>
        }
        title={term}
        subtitle={definition}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Glossary', href: '/glossary' },
          { name: term, href: path },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="space-y-5">
              {body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {clivooNote && (
            <Reveal className="mt-10">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
                <h2 className="font-display text-lg font-bold text-gray-900">How it works in CLIV∞</h2>
                <p className="mt-2 leading-relaxed text-gray-700">{clivooNote}</p>
                <Link
                  href="/features"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Explore CLIV∞’s features
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          )}

          {relatedTerms.length > 0 && (
            <Reveal className="mt-12">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-stone-400">
                Related terms
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {relatedTerms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    className="rounded-full border border-stone-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600"
                  >
                    {t.term}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Put it into practice
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

      <CtaSection
        title="Run the whole thing in one place"
        subtitle="CLIV∞ turns these concepts into a workflow — clients, projects, invoices, and payments together. Start free."
      />
    </PageShell>
  )
}
