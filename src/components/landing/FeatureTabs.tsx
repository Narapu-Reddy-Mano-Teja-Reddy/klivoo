'use client'

import { useState } from 'react'
import {
  Users,
  FileText,
  KanbanSquare,
  PanelsTopLeft,
  TrendingUp,
  Check,
  ArrowRight,
} from 'lucide-react'
import { Reveal } from '@/components/landing/Reveal'

const FEATURES = [
  {
    id: 'crm',
    label: 'Client CRM',
    icon: Users,
    title: 'Centralize Client Intelligence & Lead Pipeline',
    desc: 'Keep track of every lead, active client, contact person, project history, and communication note in one organized CRM database.',
    points: [
      'Visual lead stage pipeline (Lead -> Contacted -> Proposal -> Won)',
      'Custom client tags, budget tracking, and contract history',
      'One-click client portal invite generation',
    ],
  },
  {
    id: 'invoicing',
    label: 'GST Invoicing',
    icon: FileText,
    title: 'Automated GST & Multi-Currency Billing',
    desc: 'Create professional PDF invoices with pre-calculated CGST, SGST, IGST, automated HSN codes, custom branding, and online payment links.',
    points: [
      'Instant UPI QR codes & credit card payment gateway integration',
      'Automated overdue payment reminder notifications',
      'Support for INR ₹, USD $, EUR €, and GBP £ currencies',
    ],
  },
  {
    id: 'projects',
    label: 'Project Kanban',
    icon: KanbanSquare,
    title: 'Visual Milestone & Task Management',
    desc: 'Break down complex projects into actionable milestones and tasks. Keep deliverables on schedule with interactive Kanban boards.',
    points: [
      'Drag-and-drop task workflow customization',
      'Team member assignment and workload tracking',
      'Milestone-based billing trigger automation',
    ],
  },
  {
    id: 'portal',
    label: 'Client Portal',
    icon: PanelsTopLeft,
    title: 'Dedicated White-Label Client Hubs',
    desc: 'Impress clients with a private, branded portal where they can view project status, download invoices, approve assets, and leave reviews.',
    points: [
      'Custom branding & white-label URL link',
      'Client asset upload & milestone approval workspace',
      'Post-project verified testimonial collector',
    ],
  },
  {
    id: 'analytics',
    label: 'Revenue Analytics',
    icon: TrendingUp,
    title: 'Real-Time Financial Health Insights',
    desc: 'Get immediate clarity on your business revenue, outstanding receivables, monthly recurring revenue (MRR), and payment collection speed.',
    points: [
      'Live cash flow and pending invoice summary dashboards',
      'Monthly revenue velocity trends & project profitability',
      'One-click CSV financial data exports',
    ],
  },
]

export function FeatureTabs() {
  const [activeId, setActiveId] = useState('crm')
  const activeFeature = FEATURES.find((f) => f.id === activeId) || FEATURES[0]

  return (
    <section className="relative py-20 sm:py-28 bg-slate-50/50 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Complete Operational Suite
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-5xl">
              Everything Needed to Run a Serious Agency
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Explore the 5 core modules that power CLIV∞. No third-party plugins or complex extensions needed.
            </p>
          </Reveal>
        </div>

        {/* Feature Tab Selector */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {FEATURES.map((f) => {
            const Icon = f.icon
            const isActive = f.id === activeId
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveId(f.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{f.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active Feature Showcase */}
        <Reveal key={activeFeature.id} className="mt-10">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-lift-2 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Module Deep-Dive
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy">
                {activeFeature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {activeFeature.desc}
              </p>

              <div className="pt-4 space-y-3">
                {activeFeature.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100/80 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                <activeFeature.icon className="h-8 w-8" />
              </div>
              <h4 className="mt-4 font-display text-lg font-bold text-navy">
                {activeFeature.label} Feature Engine
              </h4>
              <p className="mt-2 text-xs text-slate-500 max-w-xs mx-auto">
                Designed for speed, clarity, and instant client collaboration.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
