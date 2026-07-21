import type { Metadata } from 'next'
import { FeatureLanding } from '@/components/marketing/FeatureLanding'
import { FEATURE_PAGE_BY_SLUG } from '@/lib/feature-pages'
import { pageMetadata } from '@/lib/site'

const config = FEATURE_PAGE_BY_SLUG['project-management']

export const metadata: Metadata = pageMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: config.path,
  keywords: config.keywords,
})

export default function ProjectManagementFeaturePage() {
  return <FeatureLanding config={config} />
}
