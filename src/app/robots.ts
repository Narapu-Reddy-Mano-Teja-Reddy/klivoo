import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Robots policy. Marketing pages are crawlable; private app surfaces, auth
 * pages, the admin panel, and API routes are kept out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/admin/',
          '/dashboard',
          '/portal',
          '/clients',
          '/projects',
          '/meetings',
          '/tasks',
          '/payments',
          '/billing',
          '/settings',
          '/team',
          '/teammate',
          '/onboarding',
          '/login',
          '/signup',
          '/team-login',
          '/auth',
          '/diagnostics',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
