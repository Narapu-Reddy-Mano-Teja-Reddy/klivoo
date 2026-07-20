/**
 * Central SEO configuration.
 *
 * This is the façade the rest of the SEO layer (metadata builder, structured
 * data, sitemap) reads from. It re-exports the canonical site constants from
 * `@/lib/site` (the long-standing single source of truth that ~30 pages already
 * import) and adds a structured `siteConfig` object plus SEO-specific defaults,
 * so nothing about titles, canonicals, or Open Graph can drift between pages.
 *
 * Canonical-host decision (see SEO_OVERHAUL_REPORT.md): the production site is
 * already indexed on the non-www apex `https://clivoo.co.in`. We keep that as
 * the single canonical host and 301-redirect www → non-www in next.config.js,
 * rather than migrate an already-indexed site to www. To flip to www later,
 * change SITE_URL in `@/lib/site` and the redirect direction in next.config.js.
 */
import {
  SITE_URL,
  APP_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  FOUNDER,
  CONTACT,
  SOCIALS,
  SOCIAL_URLS,
  LEGAL,
} from '@/lib/site'

export {
  SITE_URL,
  APP_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  FOUNDER,
  CONTACT,
  SOCIALS,
  SOCIAL_URLS,
  LEGAL,
}

/** Locale we target — Indian English is the primary market. */
export const SITE_LOCALE = 'en_IN'
export const SITE_LANG = 'en-IN'

/** Default social-sharing image (Next.js auto-serves /opengraph-image at 1200×630). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`

/** X / Twitter handle used on summary_large_image cards. */
export const TWITTER_HANDLE = '@talaganaRajesh'

/**
 * One structured object for anything that wants the whole config at once
 * (JSON-LD builders, tests). Individual named exports above stay the ergonomic
 * way to import a single value.
 */
export const siteConfig = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  appUrl: APP_URL,
  locale: SITE_LOCALE,
  lang: SITE_LANG,
  ogImage: DEFAULT_OG_IMAGE,
  twitter: TWITTER_HANDLE,
  founder: FOUNDER,
  contact: CONTACT,
  socials: SOCIAL_URLS,
} as const

/** Absolute URL for a site-relative path (or SITE_URL for "/"). */
export function absoluteUrl(path: string): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
