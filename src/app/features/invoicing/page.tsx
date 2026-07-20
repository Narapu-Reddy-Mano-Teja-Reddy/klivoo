import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
  title: 'Invoicing & Payments — Automated GST Billing',
  description: 'GST-ready invoices, PDF exports, UPI payment links, and automated payment reminders.',
  path: '/features/invoicing',
})

export default function InvoicingFeaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions: Invoicing & Payments"
        title="Automated GST invoicing &amp;"
        highlight="instant UPI payment links"
        subtitle="Issue professional invoices in seconds, collect payments 3x faster, and automate recurring retainer billing."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lift-2 space-y-4">
          <FileText className="h-10 w-10 text-blue-600" />
          <h3 className="font-display text-2xl font-extrabold text-navy">Compliant Billing Engine</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Generate GST-ready PDF invoices with CGST, SGST, and IGST breakdowns, HSN/SAC codes, UPI QR code integration, and automated overdue payment follow-ups.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> One-click WhatsApp &amp; Email invoice delivery</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Multi-currency support (INR ₹, USD $, EUR €, GBP £)</div>
          </div>
        </div>
      </div>

      <CtaSection title="Get Paid Faster with Automated Billing" subtitle="Start operating free today on CLIV∞." />
    </PageShell>
  )
}
