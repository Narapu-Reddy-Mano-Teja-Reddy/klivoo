import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { name: string; href: string }

/**
 * Consistent page header for marketing sub-pages: soft branded backdrop, an
 * optional eyebrow label, breadcrumb, an H1, and a lead paragraph.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow?: React.ReactNode
  title: string
  /** Trailing portion of the title rendered in the brand gradient. */
  highlight?: string
  subtitle?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-grid-faint" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-orange-50/80 via-amber-50/30 to-white" />
      <div className="absolute -left-24 top-10 -z-10 h-64 w-64 animate-blob rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute -right-20 top-24 -z-10 h-64 w-64 animate-blob rounded-full bg-amber-300/20 blur-3xl [animation-delay:3s]" />

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-1 text-sm text-gray-500"
          >
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-300" />}
                {i === crumbs.length - 1 ? (
                  <span className="font-medium text-gray-700">{c.name}</span>
                ) : (
                  <Link href={c.href} className="transition-colors hover:text-blue-600">
                    {c.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="text-gradient-brand animate-gradient-pan">{highlight}</span>
            </>
          )}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}
