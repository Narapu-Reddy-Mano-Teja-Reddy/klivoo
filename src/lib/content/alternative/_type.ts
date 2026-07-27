import type { Faq, IconItem, PlainItem, RelatedLink } from '@/lib/content/types'

export type AlternativePageConfig = {
  path: string
  competitor: string
  breadcrumbLabel: string
  eyebrow: string
  h1: string
  h1Highlight: string
  subheading: string
  intro: {
    heading: string
    body: string[]
  }
  whySwitch: {
    heading: string
    sub: string
    items: PlainItem[]
  }
  klivooFit: {
    heading: string
    sub: string
    items: IconItem[]
  }
  otherOptions?: {
    heading: string
    sub: string
    items: { name: string; desc: string }[]
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
  asOf: string
}
