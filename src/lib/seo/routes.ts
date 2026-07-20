import type { MetadataRoute } from 'next'

export type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency']

export type RouteEntry = {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
  lastModified?: string
}

export const DEFAULT_LAST_MODIFIED = '2026-07-20'

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
]

export function getAllRoutes(): RouteEntry[] {
  return STATIC_ROUTES
}
