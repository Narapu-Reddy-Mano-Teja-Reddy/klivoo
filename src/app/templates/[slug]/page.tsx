import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TemplatePage } from '@/components/marketing/TemplatePage'
import { TEMPLATES, TEMPLATE_BY_SLUG } from '@/lib/content/templates'
import { pageMetadata } from '@/lib/site'

interface RouteProps {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({
    slug: t.slug,
  }))
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params)
  const config = TEMPLATE_BY_SLUG[slug]
  if (!config) return {}

  return pageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: config.path,
    keywords: config.keywords,
  })
}

export default async function TemplateRoute({ params }: RouteProps) {
  const { slug } = await Promise.resolve(params)
  const config = TEMPLATE_BY_SLUG[slug]
  if (!config) {
    notFound()
  }

  return <TemplatePage config={config} />
}
