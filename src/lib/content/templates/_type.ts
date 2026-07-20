import type { Faq, RelatedLink } from '@/lib/content/types'

/**
 * One `/templates/<slug>` page — a free, copyable template (contract, proposal,
 * checklist, etc.). The template body is rendered as visible, indexable text
 * with a copy button; supporting copy explains how to use it. Legal templates
 * carry a `disclaimer` (not legal advice).
 *
 * Rendered by <TemplatePage>. Lives at /templates/<slug>.
 */
export type TemplateConfig = {
  slug: string
  path: string
  title: string
  tagline: string

  metaTitle: string
  metaDescription: string
  keywords: string[]

  eyebrow: string
  h1: string
  h1Highlight: string
  subheading: string

  /** What this template is + why it matters (2–3 paragraphs). */
  intro: string[]

  /** The copyable template. Plain text with \n line breaks and [PLACEHOLDERS]. */
  templateTitle: string
  templateBody: string

  /** How to use it — short steps. */
  howToUse: string[]
  /** Best-practice tips. */
  tips: string[]

  faqHeading: string
  faqs: Faq[]

  related: RelatedLink[]
  ctaTitle: string
  ctaSubtitle: string

  /** Shown for legal templates (contracts, NDAs). */
  disclaimer?: string
}
