import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { Users, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
  title: 'Client Management Software — Centralized Client Profiles',
  description: 'Every client’s contact details, project history, invoices, and communication notes in one clean profile.',
  path: '/features/client-management',
})

export default function ClientManagementFeaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions: Client Management"
        title="Centralized client records and"
        highlight="complete account history"
        subtitle="Stop digging through WhatsApp and email threads. Keep every client detail, contract, and billing milestone organized."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lift-2 space-y-4">
          <Users className="h-10 w-10 text-blue-600" />
          <h3 className="font-display text-2xl font-extrabold text-navy">Single Source of Client Truth</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            CLIV∞ organizes all active accounts, prospects, and past clients into a unified database. Click any client to view their full timeline: active projects, pending invoices, total lifetime value, and notes.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Custom client status tags (Active, Prospect, Retainer, On-Hold)</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> One-click client portal access link generation</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Lifetime revenue &amp; payment velocity metrics per client</div>
          </div>
        </div>
      </div>

      <CtaSection title="Organize All Your Client Data in Minutes" subtitle="Start operating free today on CLIV∞." />
    </PageShell>
  )
}
