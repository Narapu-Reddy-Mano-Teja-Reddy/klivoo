import type { LucideIcon } from 'lucide-react'

/**
 * Shared content primitives for the SEO content systems (audience pages,
 * comparisons, alternatives, blog, glossary, tools, templates). Keeping these in
 * one place means every template and config speaks the same vocabulary.
 */

export type Faq = { q: string; a: string }

export type IconItem = { icon: LucideIcon; title: string; desc: string }

export type PlainItem = { title: string; desc: string }

export type RelatedLink = { href: string; label: string; desc: string }

/** The "old way vs with Kliv∞" two-column ledger used across landing pages. */
export type CompareLedger = {
  heading: string
  sub: string
  old: string[]
  calm: string[]
}

/** A row in a feature-comparison table (Kliv∞ vs a competitor). */
export type CompareRow = {
  feature: string
  klivoo: string
  other: string
}
