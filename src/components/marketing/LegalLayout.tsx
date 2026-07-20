import { PageShell } from './PageShell'
import { Prose } from './Prose'
import { JsonLd } from './JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'

/**
 * Shared chrome for policy/legal pages: header with title + last-updated date,
 * readable prose body, and breadcrumb structured data.
 */
export function LegalLayout({
  title,
  updated,
  path,
  intro,
  children,
}: {
  title: string
  updated: string
  path: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: title, path },
        ])}
      />

      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-orange-50/70 to-white" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {updated}</p>
          {intro && <p className="mt-6 text-lg leading-relaxed text-gray-600">{intro}</p>}
        </div>
      </section>

      <div className="py-12">
        <Prose>{children}</Prose>
      </div>
    </PageShell>
  )
}
