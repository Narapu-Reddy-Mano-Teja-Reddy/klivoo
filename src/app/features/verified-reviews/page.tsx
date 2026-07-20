import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { BadgeCheck, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
  title: 'Verified Client Reviews — Turn Handoffs into Social Proof',
  description: 'Automatically collect verified client testimonials and ratings upon project completion.',
  path: '/features/verified-reviews',
})

export default function VerifiedReviewsFeaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions: Verified Reviews"
        title="Turn completed projects into"
        highlight="credible social proof"
        subtitle="Collect verified star ratings and testimonials automatically upon milestone completion to win new high-ticket clients."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lift-2 space-y-4">
          <BadgeCheck className="h-10 w-10 text-blue-600" />
          <h3 className="font-display text-2xl font-extrabold text-navy">Automated Review Collection Engine</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            When a project milestone is marked complete, CLIV∞ prompts the client inside their portal to leave a verified review. Showcase these authentic reviews on your agency page.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Verified badge for genuine client ratings</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Embeddable review widget for your portfolio website</div>
          </div>
        </div>
      </div>

      <CtaSection title="Build Trust with Authentic Client Reviews" subtitle="Start operating free today on CLIV∞." />
    </PageShell>
  )
}
