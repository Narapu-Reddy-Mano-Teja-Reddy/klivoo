import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { PanelsTopLeft, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
  title: 'White-Label Client Portal — Dedicated Client Workspace',
  description: 'Provide clients with a branded portal to view project status, download invoices, and pay online.',
  path: '/features/client-portal',
})

export default function ClientPortalFeaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions: Client Portal"
        title="Deliver a white-label client portal"
        highlight="that builds lasting trust"
        subtitle="Give every client a dedicated portal link to track project milestones, sign agreements, and view invoice receipts."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lift-2 space-y-4">
          <PanelsTopLeft className="h-10 w-10 text-blue-600" />
          <h3 className="font-display text-2xl font-extrabold text-navy">Dedicated White-Label Client Hubs</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Eliminate back-and-forth status emails. Clients get a secure login to view live milestone progress, download deliverables, and submit reviews.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Custom branding &amp; logo display</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Digital milestone approvals &amp; asset handoffs</div>
          </div>
        </div>
      </div>

      <CtaSection title="Elevate Your Client Experience Today" subtitle="Start operating free today on CLIV∞." />
    </PageShell>
  )
}
