/**
 * Schema.org structured-data builders (JSON-LD). Rendered via <JsonLd>.
 *
 * These power rich results in Google: the Organization/WebSite graph helps the
 * brand panel and sitelinks search box; SoftwareApplication can surface price +
 * rating; FAQPage can show expandable Q&A directly in search results.
 */
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SOCIAL_URLS,
  CONTACT,
  FOUNDER,
} from '@/lib/site'

const LOGO = `${SITE_URL}/logo.png`

/** The brand entity. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO,
    description: SITE_DESCRIPTION,
    email: CONTACT.general,
    founder: { '@type': 'Person', name: FOUNDER.name },
    sameAs: SOCIAL_URLS,
    areaServed: 'IN',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT.support,
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

/** The site itself (enables the sitelinks search box). */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
    // Sitelinks search box → our blog search (which reads the `q` query param).
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** The product — with the three-tier pricing offers. */
export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    operatingSystem: 'Web, iOS, Android',
    applicationCategory: 'BusinessApplication',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: LOGO,
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'INR',
        description: 'Up to 5 clients and 10 projects, full leads & CRM pipeline, free forever.',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '199',
        priceCurrency: 'INR',
        description:
          'Launch offer (was ₹499): up to 30 clients, 60 projects, and 5 team members per month.',
      },
      {
        '@type': 'Offer',
        name: 'Ultra',
        price: '799',
        priceCurrency: 'INR',
        description:
          'Launch offer (was ₹1,999): unlimited clients, projects, and team members per month.',
      },
    ],
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

/** Q&A rich result. Pass plain-text questions/answers. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

/** Breadcrumb trail. Pass [{ name, path }] from home to the current page. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path === '/' ? SITE_URL : `${SITE_URL}${c.path}`,
    })),
  }
}

/**
 * Blog-post Article schema. datePublished/dateModified are ISO dates; author is
 * a plain name. Publisher resolves to our Organization node.
 */
export function articleSchema(opts: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  authorName: string
  image?: string
}) {
  const url = `${SITE_URL}${opts.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: opts.image ?? LOGO,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@type': 'Person', name: opts.authorName },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-IN',
  }
}

/**
 * Product + AggregateOffer for the pricing page. Prices are the current launch
 * offer (Free ₹0 / Pro ₹199 / Ultra ₹799). aggregateRating is deliberately
 * omitted — we do not fabricate ratings without real, verifiable reviews.
 */
export function pricingProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${SITE_NAME} — Client Management Software`,
    description: SITE_DESCRIPTION,
    brand: { '@type': 'Brand', name: SITE_NAME },
    image: LOGO,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '0',
      highPrice: '799',
      offerCount: 3,
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Pro', price: '199', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Ultra', price: '799', priceCurrency: 'INR' },
      ],
    },
  }
}

/**
 * ItemList for hub/index pages (blog index, tools hub, glossary hub, comparisons
 * hub). Helps Google understand the page as a curated list of links.
 */
export function itemListSchema(items: { name: string; path: string }[], listName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(listName ? { name: listName } : {}),
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: `${SITE_URL}${it.path}`,
    })),
  }
}
