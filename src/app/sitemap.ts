import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { getAllRoutes, DEFAULT_LAST_MODIFIED } from '@/lib/seo/routes'

/**
 * XML sitemap for the public marketing site, generated from the central route
 * registry (`lib/seo/routes.ts`) so every page — static, keyword landing,
 * feature, audience, comparison, blog, tool, template, and glossary — appears
 * automatically. Only indexable, public pages are listed; app/auth/admin routes
 * never are (see robots.ts).
 *
 * Kept as a SINGLE sitemap rather than a sitemap index: the site has ~200 URLs,
 * far below Google's 50,000-URL / 50 MB per-file limit, so splitting would add
 * moving parts (index file, per-section routes) for no crawl benefit. Revisit
 * only if the URL count approaches five figures.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map(({ path, priority, changeFrequency, lastModified }) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: lastModified ?? DEFAULT_LAST_MODIFIED,
    changeFrequency,
    priority,
  }))
}
