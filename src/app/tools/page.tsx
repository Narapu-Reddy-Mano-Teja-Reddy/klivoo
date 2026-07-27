import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  Calculator,
  DollarSign,
  ArrowRight,
  Sparkles,
  FileCode,
  ShieldCheck,
  Briefcase,
  Layers,
} from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'
import { TEMPLATES } from '@/lib/content/templates'

export const metadata: Metadata = pageMetadata({
  title: 'Free Tools & Templates for Freelancers & Agencies — No Account Needed',
  description:
    'Free tools for independent creators: GST Invoice Generator, Indian GST Calculator, Freelance Rate Calculator, plus 15 free contract, proposal & invoice templates.',
  path: '/tools',
  keywords: [
    'free freelancer tools',
    'GST invoice generator',
    'GST calculator',
    'rate calculator',
    'free contract proposal and invoice templates',
    'freelance agreement templates',
  ],
})

const TOOLS = [
  {
    title: 'GST Invoice Generator',
    desc: 'Create itemized GST invoices with custom branding, tax %, and instant PDF download. Nothing typed ever leaves your browser.',
    href: '/invoice',
    icon: FileText,
    badge: 'Most Popular',
  },
  {
    title: 'Indian GST Calculator',
    desc: 'Add GST to a base amount or strip it out of a total. View exact CGST, SGST, and IGST breakdowns for 5%, 12%, 18%, and 28% slabs.',
    href: '/tools/gst-calculator',
    icon: Calculator,
    badge: 'Tax Tool',
  },
  {
    title: 'Freelance Rate Calculator',
    desc: 'Calculate the exact hourly and daily rates you need to charge to hit your annual income goals and cover business expenses.',
    href: '/tools/freelance-rate-calculator',
    icon: DollarSign,
    badge: 'Pricing Tool',
  },
  {
    title: 'Templates',
    desc: 'Free contract, proposal & invoice templates. 15 battle-tested legal, proposal, and scope frameworks ready to fill out online and print instantly.',
    href: '/templates',
    icon: FileCode,
    badge: '15 Templates',
  },
]

export default function ToolsHubPage() {
  const contracts = TEMPLATES.filter((t) => t.category === 'contracts')
  const proposals = TEMPLATES.filter((t) => t.category === 'proposals')
  const invoices = TEMPLATES.filter((t) => t.category === 'invoices')

  return (
    <PageShell>
      <PageHero
        eyebrow="100% Free Tools & Templates"
        title="Free productivity tools &"
        highlight="ready-made templates"
        subtitle="Designed by Tenspick Labs to help independent creators invoice, calculate taxes, price services, and send bulletproof contracts with zero friction."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
        {/* Core Interactive Tools Grid */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
            <div>
              <h2 className="font-display text-2xl font-black text-navy">Interactive Calculators & Generators</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                100% browser-based tools with zero sign-up required.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <div
                  key={t.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                        {t.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy group-hover:text-blue-600 transition-colors">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={t.href}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1"
                    >
                      Open Tool <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Templates Showcase Section Right Inside Tools Page */}
        <div id="templates-showcase" className="space-y-14 pt-8 border-t-2 border-slate-200">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Free Contract, Proposal & Invoice Templates
            </span>
            <h2 className="font-display text-3xl font-extrabold text-navy">
              Ready-Made Templates You Can Customize & Print
            </h2>
            <p className="text-sm text-slate-600">
              Pick any template below to launch the interactive live editor. Fill in your client details, customize the clauses online, and save as a single-page PDF or text document.
            </p>
          </div>

          {/* Section 1: Contracts & Agreements */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-navy">
                  1. Contracts & Agreements (`5` Templates)
                </h3>
                <p className="text-xs text-slate-500">
                  Protect your work, payments, and IP with these battle-tested legal agreements.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts.map((tpl) => (
                <div
                  key={tpl.slug}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                        Contract
                      </span>
                      <span className="text-xs font-medium text-slate-400">Free Forever</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-navy group-hover:text-blue-600 transition-colors">
                      {tpl.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {tpl.tagline || tpl.subheading}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={tpl.path}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                    >
                      Customize Template <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Project Proposals */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-navy">
                  2. Project Proposals (`5` Templates)
                </h3>
                <p className="text-xs text-slate-500">
                  Win high-value clients with structured scopes, deliverables, and project timelines.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposals.map((tpl) => (
                <div
                  key={tpl.slug}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                        Proposal
                      </span>
                      <span className="text-xs font-medium text-slate-400">Free Forever</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-navy group-hover:text-emerald-600 transition-colors">
                      {tpl.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {tpl.tagline || tpl.subheading}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={tpl.path}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-1 transition-transform"
                    >
                      Customize Template <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Invoices & Scope Documents */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-navy">
                  3. Invoices & Scope Documents (`5` Templates)
                </h3>
                <p className="text-xs text-slate-500">
                  Quotations, SOWs, client onboarding checklists, and project delivery sign-offs.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invoices.map((tpl) => (
                <div
                  key={tpl.slug}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                        Scope & Invoice
                      </span>
                      <span className="text-xs font-medium text-slate-400">Free Forever</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-navy group-hover:text-purple-600 transition-colors">
                      {tpl.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {tpl.tagline || tpl.subheading}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={tpl.path}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 group-hover:translate-x-1 transition-transform"
                    >
                      Customize Template <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <CtaSection
        title="Want All Your Client Operations Automated?"
        subtitle="Kliv∞ combines client CRM, project boards, GST invoicing, and client portals into one connected app."
      />
    </PageShell>
  )
}
