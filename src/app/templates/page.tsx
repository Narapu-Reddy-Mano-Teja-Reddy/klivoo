import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Free Freelance Contract & Proposal Templates',
  description:
    'Free contract, proposal, and invoice templates for freelancers and agencies. 100% free with zero sign-up required.',
  path: '/templates',
  keywords: ['freelance contract templates', 'proposal templates', 'GST invoice templates'],
})

const TEMPLATES = [
  {
    title: 'Master Service Agreement (MSA)',
    desc: 'Comprehensive contract template covering scope, payment terms, IP ownership, and liability for design & engineering projects.',
  },
  {
    title: 'Web Design & Development Proposal',
    desc: 'Structured proposal framework with project milestones, deliverables, payment breakdown, and client sign-off fields.',
  },
  {
    title: 'Monthly Retainer Agreement',
    desc: 'Legal agreement template for ongoing monthly design, maintenance, or marketing retainers.',
  },
]

export default function TemplatesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="100% Free Resources"
        title="Free Freelance Contract & Proposal Templates"
        highlight="ready for client use"
        subtitle="Battle-tested document frameworks to protect your business, set expectations, and get paid on time."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.title} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <FileText className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-display text-lg font-bold text-navy">{tpl.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{tpl.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link href="/invoice" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
                  Use in Generator <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CtaSection
        title="Send E-Signable Proposals in CLIV∞"
        subtitle="CLIV∞ lets your clients sign contracts and pay milestones directly inside their branded portal."
      />
    </PageShell>
  )
}
