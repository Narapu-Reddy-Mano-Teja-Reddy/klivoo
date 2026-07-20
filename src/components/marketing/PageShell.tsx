import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

/**
 * Standard marketing page wrapper: fixed header, page content, footer.
 * Pages render their own sections inside; the header offset is handled per-hero.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
