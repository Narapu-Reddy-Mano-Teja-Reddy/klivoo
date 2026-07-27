import type { Metadata } from 'next'

/**
 * Single source of truth for the public marketing site.
 *
 * Everything SEO-facing — the canonical domain, brand copy, founder identity,
 * social links, nav/footer structure, and the per-page metadata helper — lives
 * here so titles, descriptions, canonical URLs, and structured data stay
 * consistent across every page and never drift.
 *
 * TODO(owner): the social URLs below are best-guess placeholders. Replace them
 * with your real profile URLs — they appear in the footer, the About page, and
 * the Organization `sameAs` structured data that Google uses to connect your
 * brand to its social presence.
 */

/** Canonical production origin — drives metadataBase, canonical tags, sitemap, OG. */
export const SITE_URL = 'https://kliv∞.in'

/** Where the actual app lives (login / signup / dashboard). */
export const APP_URL = 'https://app.kliv∞.in'

export const SITE_NAME = 'Kliv∞'
export const SITE_TAGLINE = 'The Infinite Client Operations Platform'
export const SITE_DESCRIPTION =
  'Kliv∞ empowers freelancers, studios, and modern agencies with automated client onboarding, intelligent invoice management, real-time lead tracking, and collaborative workspaces — all under one unified platform. Built by Tenspick Labs.'

/** Founder — shown on About / founder note and used in author structured data. */
export const FOUNDER = {
  name: 'Tenspick Labs',
  role: 'Built by Tenspick Labs',
  // The handle people know him by across his content.
  contentHandle: '@tenspick',
  // Founder photo, served from /public.
  photo: '/logo.png',
}

// TODO(owner): kliv∞.in mailboxes aren't receiving mail yet. Every public
// contact address routes to the founder's personal inbox until that's set up.
export const CONTACT = {
  general: 'hello@talaganarajesh.in',
  support: 'hello@talaganarajesh.in',
  privacy: 'hello@talaganarajesh.in',
  legal: 'hello@talaganarajesh.in',
}

/**
 * Legal/business identity, referenced across the policy pages so the entity we
 * name, the grievance contact, the governing law, and the effective date stay
 * consistent everywhere. Kliv∞ is operated by an individual (sole proprietor)
 * — there is no separate registered company yet.
 *
 * TODO(owner): two things to confirm before / shortly after going live —
 *  1. No postal address is published (email-only contact). Razorpay usually
 *     requires a business address shown on the site for LIVE payments — add one
 *     here (e.g. `address: 'City, State, India'`) and surface it on /contact and
 *     in the policies when you have it.
 *  2. If you register a company/LLP later, update `entityType`, `operator`, and
 *     the Grievance Officer details below.
 */
export const LEGAL = {
  /** The natural person who operates Kliv∞. */
  operator: FOUNDER.name,
  /** How the business is constituted, for the "who we are" clauses. */
  entityType: 'an individual operating as a sole proprietor',
  /** Public trading name. */
  tradeName: SITE_NAME,
  /**
   * Grievance Officer / privacy contact. India's DPDP Act, 2023 and the IT Rules
   * require a named, reachable contact for data and content grievances.
   */
  grievanceOfficer: {
    name: FOUNDER.name,
    title: 'Grievance Officer',
    email: CONTACT.legal,
  },
  /** Country whose law governs the Terms (no city published — email-only contact). */
  governingCountry: 'India',
  /** Date the current legal documents take effect / were last updated. */
  effectiveDate: '26 June 2026',
} as const

/** Social / content profiles. Used in the footer + Organization `sameAs`. */
export const SOCIALS = {
  linkedin:
    'https://www.linkedin.com/company/tenspick/?utm_source=website&utm_medium=footer&utm_campaign=social_links',
  facebook:
    'https://www.facebook.com/61578558935956/?utm_source=website&utm_medium=footer&utm_campaign=social_links',
  twitter:
    'https://x.com/_tenspick_?t=1_VSDleR_7jLBI5ChDowJg&s=09&utm_source=website&utm_medium=footer&utm_campaign=social_links',
  instagram:
    'https://www.instagram.com/tenspick_/?utm_source=website&utm_medium=footer&utm_campaign=social_links',
  googleReview:
    'https://share.google/L7oP14GEdwp3RjjsD?utm_source=website&utm_medium=footer&utm_campaign=social_links',
}

/** Flat list of social URLs for structured-data `sameAs`. */
export const SOCIAL_URLS = Object.values(SOCIALS)

/**
 * Marketing routes that must render WITHOUT the authenticated app chrome
 * (sidebar / bottom nav). AppLayout reads this to keep these pages full-screen.
 * Keep in sync when adding a new marketing page.
 */
export const MARKETING_PATHS = [
  '/about',
  '/invoice',
  '/tools',
  '/tools/gst-calculator',
  '/tools/freelance-rate-calculator',
  '/templates',
  '/features/client-management',
  '/features/crm-lead-pipeline',
  '/features/project-management',
  '/features/invoicing',
  '/features/client-portal',
  '/features/verified-reviews',
] as const

/** A nav link — optionally has children that render as a dropdown. */
export type NavLink = {
  href: string
  label: string
  description?: string
  children?: { href: string; label: string; description: string }[]
}

/** Primary nav links (used in header + footer). */
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    href: '#',
    label: 'Solutions',
    children: [
      {
        href: '/features/client-management',
        label: 'Client Management',
        description: 'Every client’s details, projects & history in one profile',
      },
      {
        href: '/features/crm-lead-pipeline',
        label: 'CRM & Lead Pipeline',
        description: 'Track leads on a visual sales pipeline before they become clients',
      },
      {
        href: '/features/project-management',
        label: 'Project Management',
        description: 'Kanban boards, deadlines, budgets & tasks for every project',
      },
      {
        href: '/features/invoicing',
        label: 'Invoicing & Payments',
        description: 'GST-ready invoices, PDF export & payment tracking',
      },
      {
        href: '/features/client-portal',
        label: 'Client Portal',
        description: 'A white-label login where clients view work & pay',
      },
      {
        href: '/features/verified-reviews',
        label: 'Verified Reviews',
        description: 'Turn completed projects into credible public reviews',
      },
    ],
  },
  {
    href: '/tools',
    label: 'Free Tools',
    children: [
      {
        href: '/invoice',
        label: 'Invoice Generator',
        description: 'Create professional GST invoices in seconds',
      },
      {
        href: '/tools/gst-calculator',
        label: 'GST Calculator',
        description: 'Add or remove GST and split CGST/SGST',
      },
      {
        href: '/tools/freelance-rate-calculator',
        label: 'Rate Calculator',
        description: 'Work out the rate you should charge',
      },
      {
        href: '/templates',
        label: 'Templates',
        description: 'Free contract, proposal & invoice templates',
      },
    ],
  },
]

/** Footer link columns. */
export const FOOTER_NAV = [
  {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Us' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { href: '/features/client-management', label: 'Client Management' },
      { href: '/features/crm-lead-pipeline', label: 'CRM & Lead Pipeline' },
      { href: '/features/project-management', label: 'Project Management' },
      { href: '/features/invoicing', label: 'Invoicing & Payments' },
      { href: '/features/client-portal', label: 'Client Portal' },
      { href: '/features/verified-reviews', label: 'Verified Reviews' },
    ],
  },
  {
    title: 'Free Tools',
    links: [
      { href: '/invoice', label: 'Invoice Generator' },
      { href: '/tools/gst-calculator', label: 'GST Calculator' },
      { href: '/tools/freelance-rate-calculator', label: 'Rate Calculator' },
      { href: '/templates', label: 'Templates' },
    ],
  },
] as const

/**
 * Build a complete, SEO-correct Metadata object for a marketing page.
 *
 * - Sets a templated title, canonical URL, and full OpenGraph + Twitter cards.
 * - The root layout supplies metadataBase + the default OG image, so individual
 *   pages only need their path, title, and description.
 */
export function pageMetadata(opts: {
  title: string
  description: string
  /** Path beginning with "/" — used for the canonical + OG URL. */
  path: string
  /** Override the social-card image (defaults to the generated OG image). */
  image?: string
  /** Mark a page as noindex (e.g. thin/utility pages). */
  noindex?: boolean
  keywords?: string[]
  /** Override the OpenGraph/Twitter title (defaults to `title`). */
  ogTitle?: string
  /** Override the OpenGraph/Twitter description (defaults to `description`). */
  ogDescription?: string
  /** OG type — "article" for blog posts, "website" (default) elsewhere. */
  ogType?: 'website' | 'article'
}): Metadata {
  const url = opts.path === '/' ? SITE_URL : `${SITE_URL}${opts.path}`
  const ogTitle = opts.ogTitle ?? opts.title
  const ogDescription = opts.ogDescription ?? opts.description

  // Full crawler directives. IMPORTANT: because Next.js replaces (does not deep
  // -merge) the `robots` field when a page sets it, we must repeat the detailed
  // googleBot block here — otherwise every page would silently drop the
  // max-image-preview / max-snippet / max-video-preview hints set in the root
  // layout, shrinking our search snippets and image thumbnails.
  const robots: Metadata['robots'] = opts.noindex
    ? { index: false, follow: true, googleBot: { index: false, follow: true } }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }

  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: {
      canonical: url,
      // We serve one language (Indian English). Declaring en-IN + x-default on
      // the same URL tells Google this page is the canonical target for both
      // Indian-English searchers and everyone else, with no duplicate variants.
      languages: { 'en-IN': url, 'x-default': url },
    },
    robots,
    openGraph: {
      type: opts.ogType ?? 'website',
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      title: ogTitle,
      description: ogDescription,
      ...(opts.image ? { images: [{ url: opts.image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      creator: '@talaganaRajesh',
      ...(opts.image ? { images: [opts.image] } : {}),
    },
  }
}
