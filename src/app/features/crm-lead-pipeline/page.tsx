import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { Filter, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
  title: 'CRM & Lead Pipeline — Visual Sales Funnel',
  description: 'Track prospects on a visual sales pipeline before they become paying clients.',
  path: '/features/crm-lead-pipeline',
})

export default function CrmLeadPipelineFeaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions: Lead Pipeline"
        title="Track prospects on a visual"
        highlight="Kanban sales pipeline"
        subtitle="Never let a lead slip through the cracks. Drag prospects from initial contact to won deal seamlessly."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lift-2 space-y-4">
          <Filter className="h-10 w-10 text-blue-600" />
          <h3 className="font-display text-2xl font-extrabold text-navy">Visual Deal Stages &amp; Conversion</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Move leads across customizable columns (New Lead, Discovery, Proposal Sent, Negotiation, Won). Once a lead is won, convert them into an active client profile in one click.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Estimated deal value &amp; win-probability tracking</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> One-click conversion to active client &amp; project</div>
          </div>
        </div>
      </div>

      <CtaSection title="Turn More Leads Into Paying Clients" subtitle="Start operating free today on CLIV∞." />
    </PageShell>
  )
}
