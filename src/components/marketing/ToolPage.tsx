import Link from 'next/link'
import { ArrowUpRight, Wrench } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Faq } from '@/components/landing/Faq'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { ToolInteractive } from '@/components/tools/ToolInteractive'
import type { ToolConfig } from '@/lib/content/tools/_type'

/** Renders one `/tools/<slug>` page: the tool (client island) + SEO content. */
export function ToolPage({ config }: { config: ToolConfig }) {
  const { slug, path, kind, eyebrow, h1, h1Highlight, subheading, sections, faqHeading, faqs, related, ctaTitle, ctaSubtitle } = config

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Free Tools', path: '/tools' },
            { name: config.title, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <Wrench className="h-4 w-4" /> {eyebrow}
          </>
        }
        title={h1}
        highlight={h1Highlight}
        subtitle={subheading}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Free Tools', href: '/tools' },
          { name: config.title, href: path },
        ]}
      />

      {/* The tool itself */}
      <section className="pt-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ToolInteractive slug={slug} kind={kind} />
        </div>
      </section>

      {/* Supporting SEO content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {sections.map((s, i) => (
            <Reveal key={s.heading} className={i > 0 ? 'mt-12' : ''}>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="text-lg leading-relaxed text-gray-600">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                More free tools & guides
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
