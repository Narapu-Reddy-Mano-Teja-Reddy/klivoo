'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Layers,
  Receipt,
  ShieldCheck,
  Zap,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react'
import { Reveal } from '@/components/landing/Reveal'

const PILLARS = [
  {
    id: 'unified',
    icon: Layers,
    title: 'Unified Workspace Architecture',
    subtitle: 'Consolidate 6+ scattered apps into a single high-performance cockpit.',
    description:
      'Stop context switching between Notion, WhatsApp, Excel, and Word. CLIV∞ unifies client records, project scopes, billing milestones, and communication histories under one clean interface.',
    bullets: [
      'Single client CRM record for all project notes & billing history',
      'Centralized asset vault with role-based client access',
      'Unified activity log for all team interactions',
    ],
    metric: '65% less admin time spent weekly',
  },
  {
    id: 'billing',
    icon: Receipt,
    title: 'Intelligent Invoicing & GST Automation',
    subtitle: 'Compliant GST invoices, UPI links, and automated payment reminders.',
    description:
      'Engineered specifically for Indian freelancers and studios. Generate professional GST-compliant PDF invoices in seconds, collect instant payments via UPI/Razorpay, and automate overdue follow-ups.',
    bullets: [
      'Automatic CGST / SGST / IGST calculation & HSN code lookup',
      'One-click WhatsApp & email invoice delivery with payment links',
      'Auto-recurring retainer billing with zero manual intervention',
    ],
    metric: '3x faster invoice settlement',
  },
  {
    id: 'portal',
    icon: ShieldCheck,
    title: 'Branded Client Portals',
    subtitle: 'Give clients a dedicated white-label portal that builds trust.',
    description:
      'Deliver a Fortune-500 experience to every client. Share live project progress, review milestones, sign contracts electronically, and gather verified reviews without sending endless email threads.',
    bullets: [
      'Custom subdomains for your agency or freelance brand',
      'Live milestone progress tracker with client approval flow',
      'Built-in verified review collection after project handoff',
    ],
    metric: '99.4% client satisfaction rating',
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Zero-Lag Operating Velocity',
    subtitle: 'Lightning fast Next.js architecture designed for high focus.',
    description:
      'Software should get out of your way. CLIV∞ is built from the ground up for maximum speed, instant keyboard shortcuts, and zero page reloads, ensuring your workflow stays fluid.',
    bullets: [
      'Sub-100ms global search across all client data',
      'Instant offline-resilient draft auto-saving',
      'Full data exportability whenever you need it',
    ],
    metric: '100% data ownership & privacy',
  },
]

export function WhyChooseUs() {
  const [activePillar, setActivePillar] = useState(PILLARS[0].id)
  const current = PILLARS.find((p) => p.id === activePillar) || PILLARS[0]
  const IconComponent = current.icon

  return (
    <section className="relative py-20 sm:py-28 bg-slate-50/60 border-y border-slate-200/60">
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
              Why Freelancers &amp; Agencies Switch
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-5xl">
              Engineered for Calm, High-Growth Operations
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              See why modern independent professionals choose CLIV∞ over legacy CRMs and bloated software suites.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
          {/* Pillar Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              const isActive = pillar.id === activePillar
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillar(pillar.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? 'border-blue-500/80 bg-white shadow-soft-md ring-1 ring-blue-500/20'
                      : 'border-slate-200/80 bg-white/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl flex-none ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className={`font-display text-lg font-bold ${isActive ? 'text-blue-700' : 'text-slate-900'}`}>
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Pillar Detail Card */}
          <div className="lg:col-span-7">
            <Reveal key={current.id}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lift-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Pillar Highlight
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {current.metric}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  {current.description}
                </p>

                <div className="mt-8 space-y-3">
                  {current.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
