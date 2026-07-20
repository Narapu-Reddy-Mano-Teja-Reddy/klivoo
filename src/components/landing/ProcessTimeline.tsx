'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  UserPlus,
  KanbanSquare,
  FileCheck,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Reveal } from '@/components/landing/Reveal'

const STEPS = [
  {
    step: '01',
    title: 'Onboard Clients Seamlessly',
    icon: UserPlus,
    badge: 'Step 1: Intake & CRM',
    description:
      'Import client contacts or let new prospects fill out your custom intake link. All details, notes, and currency preferences are organized automatically.',
    detail: 'Automated welcome emails and intake form synchronization.',
  },
  {
    step: '02',
    title: 'Track Pipeline & Manage Work',
    icon: KanbanSquare,
    badge: 'Step 2: Project Delivery',
    description:
      'Create project milestones, drag tasks across Kanban columns, and track time spent. Keep your team aligned without daily status meetings.',
    detail: 'Visual Kanban boards with automated milestone notifications.',
  },
  {
    step: '03',
    title: 'Generate GST Invoices & Collect Payments',
    icon: CreditCard,
    badge: 'Step 3: Billing & Revenue',
    description:
      'Issue PDF invoices with pre-configured GST rates, UPI QR codes, and online payment links. Watch invoice statuses update automatically.',
    detail: 'Instant settlement tracking and automated payment reminders.',
  },
  {
    step: '04',
    title: 'Share Client Portals & Collect Reviews',
    icon: FileCheck,
    badge: 'Step 4: Handoff & Reputation',
    description:
      'Provide your clients with a dedicated white-label portal link to download deliverables, review progress, and leave verified testimonials.',
    detail: 'White-label client portal link with built-in rating engine.',
  },
]

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const active = STEPS[activeStep]
  const StepIcon = active.icon

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <Reveal>
            <Image
              src="/clivoo logo.png"
              alt="CLIV∞ logo"
              width={360}
              height={90}
              className="h-18 sm:h-24 w-auto mb-4"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Interactive Workflow Journey
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-5xl">
              From Prospect to Paid in 4 Smooth Steps
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Experience the end-to-end client lifecycle designed for clarity, speed, and professionalism.
            </p>
          </Reveal>
        </div>

        {/* Step Navigation Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {STEPS.map((s, idx) => {
            const isSelected = idx === activeStep
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/80 shadow-sm ring-1 ring-blue-500/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                    {s.step}
                  </span>
                  {isSelected && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                </div>
                <div className={`mt-2 font-display text-sm font-bold ${isSelected ? 'text-navy' : 'text-slate-700'}`}>
                  {s.title}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Step Visual Showcase Card */}
        <Reveal key={active.step} className="mt-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-lift-3 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                {active.badge}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy">
                {active.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {active.description}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                <span>{active.detail}</span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-8 border border-slate-200/60 flex flex-col items-center justify-center text-center min-h-[260px]">
              <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                <StepIcon className="h-10 w-10" />
              </div>
              <div className="mt-4 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Stage {active.step} Preview
              </div>
              <div className="mt-1 font-display text-lg font-bold text-navy">
                {active.title}
              </div>
              <div className="mt-2 text-xs text-slate-500 max-w-xs">
                Real-time automatic sync across dashboard, email, and mobile notifications.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
