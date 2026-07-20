import type { Metadata } from 'next'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { KanbanSquare, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = pageMetadata({
  title: 'Project Management — Milestone Kanban Boards',
  description: 'Kanban boards, deadlines, budgets, and tasks for every client deliverable.',
  path: '/features/project-management',
})

export default function ProjectManagementFeaturePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solutions: Project Management"
        title="Deliver client projects on time"
        highlight="with visual Kanban boards"
        subtitle="Organize work into milestones and tasks. Keep your team aligned and clients informed without endless meetings."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lift-2 space-y-4">
          <KanbanSquare className="h-10 w-10 text-blue-600" />
          <h3 className="font-display text-2xl font-extrabold text-navy">Milestone Tracking &amp; Task Assignments</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Break down client projects into clear milestones. Track progress percentages, assign team members, and link milestones directly to invoice triggers.
          </p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Drag-and-drop task Kanban columns</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500" /> Milestone-based invoice triggers</div>
          </div>
        </div>
      </div>

      <CtaSection title="Keep Client Deliverables Right on Schedule" subtitle="Start operating free today on CLIV∞." />
    </PageShell>
  )
}
