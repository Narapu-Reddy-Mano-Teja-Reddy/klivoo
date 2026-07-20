import type { Faq, IconItem, PlainItem, RelatedLink } from '@/lib/content/types'

export type AudiencePageConfig = {
  path: string
  breadcrumbLabel: string
  eyebrow: string
  h1: string
  h1Highlight: string
  subheading: string
  intro: {
    heading: string
    body: string[]
  }
  pains: {
    heading: string
    sub: string
    items: PlainItem[]
  }
  workflow: {
    heading: string
    sub: string
    steps: PlainItem[]
  }
  features: {
    heading: string
    sub: string
    items: IconItem[]
  }
  compare: {
    heading: string
    sub: string
    old: string[]
    calm: string[]
  }
  pricing: {
    heading: string
    body: string[]
  }
  faqHeading: string
  faqs: Faq[]
  related: RelatedLink[]
  ctaTitle: string
  ctaSubtitle: string
}
