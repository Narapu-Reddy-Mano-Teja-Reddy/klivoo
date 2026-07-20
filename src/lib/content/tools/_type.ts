import type { Faq, RelatedLink } from '@/lib/content/types'

/**
 * One `/tools/<slug>` free-tool page. The interactive tool itself (a calculator
 * or a document generator) is a client component chosen by `kind` + `slug` in
 * <ToolInteractive>; THIS config only carries the copy that wraps it, so the
 * page is server-rendered with full, indexable HTML and 600+ words of genuine
 * supporting content below the tool.
 *
 * Rendered by <ToolPage>. Lives at /tools/<slug>.
 */
export type ToolKind = 'calculator' | 'docgen' | 'external'

export type ToolConfig = {
  slug: string
  path: string
  /** Short label for the tools hub + nav, e.g. "GST Calculator". */
  title: string
  /** One-liner for the hub card. */
  tagline: string
  kind: ToolKind
  /** For kind: 'external' (e.g. the existing /invoice generator), where it lives. */
  externalHref?: string

  metaTitle: string
  metaDescription: string
  keywords: string[]

  eyebrow: string
  h1: string
  h1Highlight: string
  subheading: string

  /** SEO/support content shown BELOW the tool — 600+ words across sections. */
  sections: { heading: string; body: string[] }[]

  faqHeading: string
  faqs: Faq[]

  related: RelatedLink[]
  ctaTitle: string
  ctaSubtitle: string
}
