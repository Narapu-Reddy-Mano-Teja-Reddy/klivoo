import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Download,
  Printer,
  ShieldCheck,
  Briefcase,
  Layers,
} from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { AutoScrollingCarousel } from '@/components/marketing/AutoScrollingCarousel'
import { pageMetadata } from '@/lib/site'
import { TEMPLATES } from '@/lib/content/templates'

export const metadata: Metadata = pageMetadata({
  title: 'Free Business, Contract & Invoice Templates — Customizable & Printable',
  description:
    'Free, editable, and printable templates for freelancers, agencies, and businesses. 15 ready-made templates across Contracts, Proposals, and Invoices. Customize online and print instantly.',
  path: '/templates',
  keywords: [
    'freelance contract templates',
    'proposal templates',
    'GST invoice templates',
    'free business templates india',
    'editable contracts',
    'printable agreements',
  ],
})

export default function TemplatesPage() {
  const contracts = TEMPLATES.filter((t) => t.category === 'contracts')
  const proposals = TEMPLATES.filter((t) => t.category === 'proposals')
  const invoices = TEMPLATES.filter((t) => t.category === 'invoices')

  return (
    <PageShell>
      <PageHero
        eyebrow="100% Free & Customizable"
        title="Free Business, Contract & Proposal Templates"
        highlight="ready to customize & print"
        subtitle="15 professional, ready-made templates across 3 core categories. Fill in your details online, edit text directly, print instantly, or download as PDF/TXT."
      />

      {/* Feature badges */}
      <div className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-navy bg-blue-50/70 border border-blue-200/60 rounded-2xl py-4 px-6 shadow-sm backdrop-blur-md">
          <span className="inline-flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-4 w-4 text-blue-600" /> Free Forever
          </span>
          <span className="inline-flex items-center gap-2 font-bold">
            <Sparkles className="h-4 w-4 text-blue-600" /> Live Interactive Editor
          </span>
          <span className="inline-flex items-center gap-2 font-bold">
            <Printer className="h-4 w-4 text-blue-600" /> One-Click Print & PDF
          </span>
          <span className="inline-flex items-center gap-2 font-bold">
            <Download className="h-4 w-4 text-blue-600" /> Zero Sign-up Needed
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Contracts & Agreements (Horizontal Scrolling Cards) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-navy">
                  Contracts & Agreements
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  5 ready-made service contracts, retainers, NDAs, and sub-agreements. Scroll horizontally to explore →
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-full self-start sm:self-auto shadow-sm">
              Horizontal Scroll Effect
            </span>
          </div>

          <AutoScrollingCarousel speed={0.65} direction="left" className="-mx-4 px-4 sm:mx-0 sm:px-0">
            {contracts.map((tpl) => (
              <Link
                key={tpl.slug}
                href={tpl.path}
                className="group min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-start p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shrink-0 shadow-md cursor-pointer block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      Contract
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy group-hover:text-blue-600 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {tpl.tagline || tpl.subheading}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                    Customize & Download <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </AutoScrollingCarousel>
        </section>

        {/* Section 2: Project Proposals (Horizontal Scrolling Cards) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-navy">
                  Project Proposals
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  5 specialized proposal templates for web design, SEO, software engineering, and branding. Scroll horizontally →
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-full self-start sm:self-auto shadow-sm">
              Auto-Scrolling Effect
            </span>
          </div>

          <AutoScrollingCarousel speed={0.65} direction="right" className="-mx-4 px-4 sm:mx-0 sm:px-0">
            {proposals.map((tpl) => (
              <Link
                key={tpl.slug}
                href={tpl.path}
                className="group min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-start p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shrink-0 shadow-md cursor-pointer block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      Proposal
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy group-hover:text-blue-600 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {tpl.tagline || tpl.subheading}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                    Customize & Download <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </AutoScrollingCarousel>
        </section>

        {/* Section 3: Invoices & Scope Documents (Horizontal Scrolling Cards) */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-navy">
                  Invoices & Scope Documents
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  5 essential templates for quotations, statements of work, onboarding checklists, and project sign-offs. Scroll horizontally →
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-3 py-1.5 rounded-full self-start sm:self-auto shadow-sm">
              Auto-Scrolling Effect
            </span>
          </div>

          <AutoScrollingCarousel speed={0.65} direction="left" className="-mx-4 px-4 sm:mx-0 sm:px-0">
            {invoices.map((tpl) => (
              <Link
                key={tpl.slug}
                href={tpl.path}
                className="group min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-start p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shrink-0 shadow-md cursor-pointer block"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                      Scope & Invoice
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy group-hover:text-blue-600 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {tpl.tagline || tpl.subheading}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                    Customize & Download <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </AutoScrollingCarousel>
        </section>

        {/* Upgrade to Pro & Supercharge Your Templates (Horizontal Scrolling Featured Showcase + Plans) */}
        <section id="upgrade-plans" className="mt-20 pt-16 border-t-2 border-slate-200 space-y-14">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-extrabold shadow-sm tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" /> UPGRADE TO PRO & SUPERCHARGE YOUR TEMPLATES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight">
              Enjoy Zero-Friction Cloud Workflows Across All Templates
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Scroll horizontally below to see how upgrading to <strong className="text-navy font-extrabold">Kliv∞ Pro</strong> turns each of your standalone templates into a live, interactive operating system with <strong className="text-blue-600">1-click legal e-signatures, white-label client portals, and automated billing triggers</strong>.
            </p>
          </div>

          {/* Horizontal Scrolling Pro Workflow Cards Showcase */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>⚡ Pro Cloud Enhancement Showcase (Auto-Scrolling)</span>
              <span className="text-blue-600">All 8+ Core Templates Highlighted →</span>
            </div>

            <AutoScrollingCarousel speed={0.8} direction="left" className="-mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                {
                  title: 'Freelance Contract Template',
                  tagline: 'A plain-language service agreement you can copy and adapt.',
                  path: '/templates/freelance-contract-template',
                  proBenefit: '1-Click Client E-Signatures right inside your branded portal (`yourbrand.kliv∞.in`).',
                  badgeColor: 'bg-blue-600 text-white',
                },
                {
                  title: 'Project Proposal Template',
                  tagline: 'A proposal structure that leads with the client’s goal.',
                  path: '/templates/project-proposal-template',
                  proBenefit: 'Clients can accept, sign, and trigger automatic advance invoice issuance instantly.',
                  badgeColor: 'bg-navy text-white',
                },
                {
                  title: 'Client Onboarding Checklist',
                  tagline: 'Everything to collect and confirm before a project starts.',
                  path: '/templates/client-onboarding-checklist',
                  proBenefit: 'Interactive client intake portal with secure file upload for logos, logins & assets.',
                  badgeColor: 'bg-blue-600 text-white',
                },
                {
                  title: 'Scope of Work Template',
                  tagline: 'Define exactly what’s in — and out of — a project.',
                  path: '/templates/scope-of-work-template',
                  proBenefit: 'Locks agreed deliverables to prevent scope creep with automated change-order requests.',
                  badgeColor: 'bg-navy text-white',
                },
                {
                  title: 'NDA Template for Freelancers',
                  tagline: 'A simple mutual confidentiality agreement.',
                  path: '/templates/nda-template-freelancers',
                  proBenefit: 'Secure mutual digital signing before sharing sensitive project briefs or source code.',
                  badgeColor: 'bg-blue-600 text-white',
                },
                {
                  title: 'Invoice Template (India)',
                  tagline: 'A clean invoice layout with all the fields you need.',
                  path: '/templates/invoice-template-india',
                  proBenefit: 'Auto-calculates CGST/SGST/IGST, tracks UPI/bank payments, and auto-reminds clients.',
                  badgeColor: 'bg-navy text-white',
                },
                {
                  title: 'Quotation Template',
                  tagline: 'A clean quote layout to price work before it starts.',
                  path: '/templates/quotation-template',
                  proBenefit: 'Convert accepted price quotations directly into GST-ready invoices without retyping.',
                  badgeColor: 'bg-blue-600 text-white',
                },
                {
                  title: 'Retainer Agreement Template',
                  tagline: 'Lock in recurring work with a clear monthly agreement.',
                  path: '/templates/retainer-agreement-template',
                  proBenefit: 'Automates monthly recurring invoices and subscription billing cycles automatically.',
                  badgeColor: 'bg-navy text-white',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[310px] sm:min-w-[360px] max-w-[360px] snap-start rounded-3xl bg-gradient-to-b from-white to-blue-50/30 border-2 border-blue-100 p-6 shadow-xl flex flex-col justify-between shrink-0 hover:border-blue-600 hover:-translate-y-2 transition-all duration-300 relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${item.badgeColor}`}>
                        Pro Workflow #{idx + 1}
                      </span>
                      <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                    </div>

                    <h3 className="font-display text-xl font-black text-navy group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">
                      {item.tagline}
                    </p>

                    <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-200/70 p-4">
                      <div className="flex items-center gap-1.5 text-xs font-black text-blue-900 uppercase tracking-wider mb-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Cloud Power-Up:
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {item.proBenefit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/70 grid grid-cols-2 gap-2.5">
                    <Link
                      href={item.path}
                      className="py-2.5 px-3 text-center rounded-xl bg-slate-100 text-navy text-xs font-bold hover:bg-blue-50 transition-all border border-slate-300/60 flex items-center justify-center gap-1"
                    >
                      <FileText className="h-3.5 w-3.5 text-blue-600" /> Free Editor
                    </Link>
                    <Link
                      href="/signup"
                      className="py-2.5 px-3 text-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1"
                    >
                      ⚡ E-Sign in Pro
                    </Link>
                  </div>
                </div>
              ))}

              {/* Card 9: Explore All */}
              <div className="min-w-[310px] sm:min-w-[360px] max-w-[360px] snap-start rounded-3xl bg-navy text-white p-8 shadow-2xl flex flex-col justify-between shrink-0 hover:bg-blue-900 transition-all duration-300 border border-blue-500/30">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                    Complete Suite
                  </span>
                  <h3 className="font-display text-2xl font-black text-white">
                    And Many More Templates!
                  </h3>
                  <p className="text-xs text-blue-100 font-medium leading-relaxed">
                    Explore all 15+ ready-made business frameworks, GST tax invoices, master agreements, and quotation sheets included in Kliv∞.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/tools"
                    className="block w-full py-3.5 text-center rounded-xl bg-white text-navy text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-all shadow-lg"
                  >
                    View All Free Tools & OS →
                  </Link>
                </div>
              </div>
            </AutoScrollingCarousel>
          </div>

          {/* Pricing Plans Breakdown */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch pt-4">
            {/* Tier 1: Free Forever */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Starter / Free</div>
                <h3 className="font-display text-2xl font-black text-navy">Free Forever</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-xs font-bold text-slate-500">/ forever</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  Perfect for independent freelancers needing quick access to individual templates and basic downloads.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> All 15+ Ready-Made Templates
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Live Interactive Browser Editor
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Instant Single-Page PDF / TXT Export
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> GST Invoice & Tax Calculators
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/tools"
                  className="block w-full py-3 text-center rounded-xl bg-slate-100 text-slate-800 text-xs font-extrabold hover:bg-slate-200 transition-colors"
                >
                  Current Free Tier
                </Link>
              </div>
            </div>

            {/* Tier 2: Pro (Featured) */}
            <div className="rounded-3xl border-2 border-blue-600 bg-gradient-to-b from-blue-50/50 to-white p-8 shadow-2xl relative flex flex-col justify-between scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow">
                Most Popular Tier
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Kliv∞ Pro</div>
                <h3 className="font-display text-2xl font-black text-navy">Client OS Engine</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹1,499</span>
                  <span className="text-xs font-bold text-slate-500">/ month billed annually</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  Turn templates into live e-signable contracts and client portals. Never chase emails again.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-slate-800">
                  <li className="flex items-center gap-2 font-bold text-blue-900">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> 1-Click Client E-Signatures on Contracts
                  </li>
                  <li className="flex items-center gap-2 font-bold text-blue-900">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> White-Label Client Portal (Your Brand & Logo)
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Auto-Saved Proposals, SOWs & Retainers
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> GST-Ready Invoicing with Payment Tracking
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" /> Unlimited Active Client Workspaces
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-100">
                <Link
                  href="/signup"
                  className="block w-full py-3 text-center rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
                >
                  Upgrade to Pro OS <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Tier 3: Agency & Studio */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">Agency / Studio</div>
                <h3 className="font-display text-2xl font-black text-navy">Tenspick Scale</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹3,999</span>
                  <span className="text-xs font-bold text-slate-500">/ month billed annually</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  For growing agencies managing teams, subcontractors, and multi-lakh retainers seamlessly.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" /> Everything in Pro + Multi-Seat Team Access
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" /> Subcontractor Agreement & IP Workflows
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" /> Custom Domain Portal (`clients.youragency.com`)
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" /> Priority API, Webhooks & Custom Reporting
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/signup"
                  className="block w-full py-3 text-center rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 transition-colors"
                >
                  Start Agency Trial
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaSection
        title="Need to Send E-Signable Proposals & Contracts?"
        subtitle="Kliv∞ lets your clients review, e-sign contracts, and pay invoices directly inside their branded white-label portal."
      />
    </PageShell>
  )
}
