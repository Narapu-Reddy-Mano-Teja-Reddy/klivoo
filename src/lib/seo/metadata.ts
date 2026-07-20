import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'

/**
 * `buildMetadata` — the single Next.js Metadata builder every page uses.
 *
 * This is the SEO-layer entry point named in the overhaul brief. It delegates
 * to `pageMetadata` in `@/lib/site` (the original implementation ~30 pages
 * already import) so there is exactly one implementation: canonical URL,
 * hreflang (en-IN + x-default), full googleBot directives, Open Graph (en_IN),
 * and a summary_large_image Twitter card. New pages should import from here.
 *
 * Guidelines enforced by convention (not code) when calling this:
 *  - title: 50–60 characters, primary keyword near the front
 *  - description: 140–158 characters, primary keyword + a benefit + a soft CTA
 *  - keywords: a small, relevant set (one primary + 2–4 secondary) — never stuff
 */
export const buildMetadata = pageMetadata

export type BuildMetadataOpts = Parameters<typeof pageMetadata>[0]

/**
 * Article metadata for blog posts. Adds `article` OG type and, via the returned
 * object, the published/modified times that Google and social cards use.
 * (Article JSON-LD is emitted separately by the blog post template.)
 */
export function buildArticleMetadata(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  image?: string
}): Metadata {
  const base = pageMetadata({
    title: opts.title,
    description: opts.description,
    path: opts.path,
    keywords: opts.keywords,
    image: opts.image,
    ogType: 'article',
  })
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
      ...(opts.authors ? { authors: opts.authors } : {}),
    },
  }
}
