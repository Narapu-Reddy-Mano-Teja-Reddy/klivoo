import type { Faq, RelatedLink } from '@/lib/content/types'

export type BlogBlock =
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; text: string }
  | { type: 'quote'; text: string }

export type BlogPost = {
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  tags: string[]
  author: string
  date: string
  updated?: string
  intro: string
  body: BlogBlock[]
  faqs: Faq[]
  related: RelatedLink[]
}
