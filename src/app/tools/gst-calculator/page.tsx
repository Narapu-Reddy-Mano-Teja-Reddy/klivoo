import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { GstCalculatorTool } from '@/components/tools/GstCalculatorTool'
import { CtaSection } from '@/components/marketing/CtaSection'
import { JsonLd } from '@/components/marketing/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = pageMetadata({
  title: 'Free GST Calculator — Add or Remove GST Instantly',
  description:
    'Calculate GST amounts, net base values, and CGST/SGST splits instantly. Supports 5%, 12%, 18%, and 28% Indian GST rate slabs.',
  path: '/tools/gst-calculator',
  keywords: [
    'GST calculator India',
    'remove GST calculator',
    'CGST SGST calculator',
    'freelancer GST calculator',
  ],
})

export default function GstCalculatorPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Free Tools', path: '/tools' },
            { name: 'GST Calculator', path: '/tools/gst-calculator' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="100% Free Tool"
        title="Instant Indian GST Calculator for"
        highlight="freelancers & businesses"
        subtitle="Add GST to a base price or strip it out of a GST-inclusive amount. View exact CGST, SGST, and IGST breakdowns."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <GstCalculatorTool />
      </div>

      <CtaSection
        title="Ready to Automate GST Invoicing Every Month?"
        subtitle="CLIV∞ generates GST-compliant invoices with automatic HSN lookup, UPI links, and instant settlement tracking."
      />
    </PageShell>
  )
}
