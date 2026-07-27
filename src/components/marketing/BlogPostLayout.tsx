import Link from 'next/link'
import { ArrowUpRight, Clock, Calendar, ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Faq } from '@/components/landing/Faq'
import { Reveal } from '@/components/landing/Reveal'
import { JsonLd } from '@/components/marketing/JsonLd'
import { BlogContent } from '@/components/marketing/BlogContent'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { FOUNDER } from '@/lib/site'
import type { BlogPost } from '@/lib/content/blog/_type'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${d} ${months[(m ?? 1) - 1]} ${y}`
}

/** Renders one blog post: hero, TOC, body, FAQ, related posts. */
export function BlogPostLayout({
  post,
  minutes,
  related,
}: {
  post: BlogPost
  minutes: number
  related: BlogPost[]
}) {
  const toc = post.body.filter((b): b is Extract<typeof b, { type: 'h2' }> => b.type === 'h2')

  return (
    <PageShell>
      <JsonLd
        data={[
          articleSchema({
            headline: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            authorName: post.author,
          }),
          faqSchema(post.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.category, path: `/blog/category/${post.categorySlug}` },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* Header */}
      <header className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="absolute inset-x-0 top-0 -z-10 h-[380px] bg-gradient-to-b from-orange-50/80 via-amber-50/30 to-white" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span className="text-gray-300">/</span>
            <Link href={`/blog/category/${post.categorySlug}`} className="hover:text-blue-600">{post.category}</Link>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-500" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-500" />
              {minutes} min read
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Table of contents */}
        {toc.length > 2 && (
          <nav className="mb-10 rounded-2xl border border-stone-200/70 bg-white/60 p-5 shadow-soft backdrop-blur-sm">
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-stone-400">On this page</p>
            <ul className="mt-3 space-y-2">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-[15px] text-gray-600 transition-colors hover:text-blue-600">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Intro */}
        <p className="text-xl font-medium leading-relaxed text-gray-800">{post.intro}</p>

        {/* Body */}
        <div className="mt-8">
          <BlogContent blocks={post.body} />
        </div>

        {/* Inline CTA */}
        <div className="my-12 rounded-3xl border border-blue-200 bg-gradient-to-br from-orange-50 to-amber-50 p-7 text-center">
          <h2 className="font-display text-xl font-extrabold text-gray-900">Run your freelance business in one place</h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-gray-600">
            Kliv∞ brings clients, projects, invoices, and payments together — free to start.
          </p>
          <Link
            href="/pricing"
            className="press mt-5 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            See pricing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Author box */}
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white/60 p-5">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-display text-lg font-bold text-white">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-display font-bold text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500">{FOUNDER.role}</p>
          </div>
        </div>

        {/* FAQ */}
        {post.faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <Faq items={post.faqs} />
            </div>
          </section>
        )}

        {/* Related links */}
        {post.related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-stone-400">Related in Kliv∞</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {post.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group rounded-xl border border-stone-200/70 bg-white/60 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <span className="font-display text-sm font-bold text-gray-900 group-hover:text-blue-600">{r.label}</span>
                  <span className="mt-1 block text-xs text-gray-500">{r.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Keep reading
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white/60 p-5 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft-lg"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-500">{p.category}</span>
                    <span className="mt-2 flex items-start justify-between gap-2">
                      <span className="font-display text-base font-bold leading-snug text-gray-900">{p.title}</span>
                      <ArrowUpRight className="h-4 w-4 flex-none text-gray-300 transition-colors group-hover:text-blue-500" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title="Ready to run your business without the chaos?"
        subtitle="Create your free Kliv∞ account and bring clients, projects, and invoices together."
      />
    </PageShell>
  )
}
