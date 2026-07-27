import type { RelatedLink } from '@/lib/content/types'

export type GlossaryTermConfig = {
  slug: string
  term: string
  path: string
  category: string
  definition: string
  body: string[]
  klivooNote?: string
  related: RelatedLink[]
  relatedTerms: { slug: string; term: string }[]
}
