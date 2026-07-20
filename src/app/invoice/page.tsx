import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { InvoiceGeneratorTool } from '@/components/tools/InvoiceGeneratorTool'
import { CtaSection } from '@/components/marketing/CtaSection'
import { JsonLd } from '@/components/marketing/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = pageMetadata({
  title: 'Free GST Invoice Generator — Instant PDF Invoices',
  description:
    'Generate professional GST invoices in seconds with line items, tax calculations, UPI links, and instant PDF download. 100% free with zero sign-up required.',
  path: '/invoice',
  keywords: [
    'GST invoice generator',
    'free invoice generator India',
    'freelancer PDF invoice tool',
    'UPI invoice maker',
  ],
})

export default function InvoiceGeneratorPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Invoice Generator', path: '/invoice' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="100% Free Tool"
        title="Instant GST Invoice Generator for"
        highlight="freelancers & studios"
        subtitle="Create itemized, professional invoices with automated tax calculations and instant PDF download. No account required."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <InvoiceGeneratorTool />
      </div>

      <CtaSection
        title="Need Invoices Automated Every Month?"
        subtitle="CLIV∞ tracks clients, projects, and payments and sends recurring invoices automatically — no manual re-typing needed."
      />
    </PageShell>
  )
}
