'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  FileText,
  Check,
  Info,
  Download,
  Printer,
  RotateCcw,
  Sparkles,
  Edit3,
  Eye,
  CheckCircle2,
  Copy,
} from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Faq } from '@/components/landing/Faq'
import { Reveal } from '@/components/landing/Reveal'
import { AutoScrollingCarousel } from '@/components/marketing/AutoScrollingCarousel'
import { JsonLd } from '@/components/marketing/JsonLd'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import type { TemplateConfig } from '@/lib/content/templates/_type'

export function TemplatePage({ config }: { config: TemplateConfig }) {
  const {
    path,
    title,
    eyebrow,
    h1,
    h1Highlight,
    subheading,
    intro,
    templateTitle,
    templateBody,
    howToUse,
    tips,
    faqHeading,
    faqs,
    related,
    ctaTitle,
    ctaSubtitle,
    disclaimer,
  } = config

  // Quick fill form state
  const [yourName, setYourName] = useState('')
  const [clientName, setClientName] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState('')
  const [projectTitle, setProjectTitle] = useState('')

  // The editable text state
  const [customText, setCustomText] = useState(templateBody)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [copied, setCopied] = useState(false)

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`klivoo_tpl_${config.slug}`)
      if (saved) {
        setCustomText(saved)
      } else {
        setCustomText(templateBody)
      }
    } catch (e) {
      // Ignore
    }
  }, [config.slug, templateBody])

  // Save to localStorage when edited
  const handleTextChange = (newText: string) => {
    setCustomText(newText)
    try {
      localStorage.setItem(`klivoo_tpl_${config.slug}`, newText)
    } catch (e) {
      // Ignore
    }
  }

  // Apply quick fill variables into the text
  const handleApplyQuickFill = () => {
    let updated = customText
    if (yourName) {
      updated = updated.replace(/\[YOUR NAME \/ BUSINESS\]|\[YOUR NAME\]|\[PARTY A NAME\]/g, yourName)
    }
    if (clientName) {
      updated = updated.replace(/\[CLIENT NAME\]|\[PARTY B NAME\]/g, clientName)
    }
    if (date) {
      updated = updated.replace(/\[DATE\]/g, date)
    }
    if (amount) {
      updated = updated.replace(/\[AMOUNT\]/g, amount)
    }
    if (projectTitle) {
      updated = updated.replace(/\[PROJECT TITLE\]|\[PROJECT NAME\]|\[DESCRIBE THE WORK[^\]]*\]/g, projectTitle)
    }
    handleTextChange(updated)
  }

  const handleReset = () => {
    setYourName('')
    setClientName('')
    setAmount('')
    setProjectTitle('')
    handleTextChange(templateBody)
    try {
      localStorage.removeItem(`klivoo_tpl_${config.slug}`)
    } catch (e) {
      // Ignore
    }
  }

  const handleDownloadTxt = () => {
    const blob = new Blob([customText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${config.slug}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(customText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageShell>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Templates', path: '/templates' },
            { name: title, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <FileText className="h-4 w-4" /> {eyebrow}
          </>
        }
        title={h1}
        highlight={h1Highlight}
        subtitle={subheading}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Templates', href: '/templates' },
          { name: title, href: path },
        ]}
      />

      {/* Intro */}
      <section className="pt-8 pb-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="space-y-4">
              {intro.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-slate-600">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive Customizer Section */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Quick Fill Form */}
            <div className="lg:col-span-5 bg-slate-50/90 p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h3 className="font-display text-base font-bold text-navy">Quick-Fill Details</h3>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Enter your details here and click <strong>Apply to Template</strong> to automatically replace the bracketed placeholders.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name / Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Studios / Rahul Sharma"
                    value={yourName}
                    onFocus={() => {
                      if (yourName === 'e.g. Acme Studios / Rahul Sharma') setYourName('')
                    }}
                    onChange={(e) => setYourName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Client Name / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Horizon Tech Pvt Ltd"
                    value={clientName}
                    onFocus={() => {
                      if (clientName === 'e.g. Horizon Tech Pvt Ltd') setClientName('')
                    }}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Fee / Amount
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 75,000"
                      value={amount}
                      onFocus={() => {
                        if (amount === 'e.g. 75,000') setAmount('')
                      }}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Title / Scope
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Website Redesign & Development"
                    value={projectTitle}
                    onFocus={() => {
                      if (projectTitle === 'e.g. Website Redesign & Development') setProjectTitle('')
                    }}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleApplyQuickFill}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" /> Apply to Template
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-navy shadow-sm hover:bg-blue-50/60 hover:border-blue-300 transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="h-4 w-4 text-blue-600" /> Print / Save as PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-navy shadow-sm hover:bg-blue-50/60 hover:border-blue-300 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4 text-blue-600" /> Download .TXT Document
                </button>
              </div>
            </div>

            {/* Right Column: Live Document Editor & Preview (.printable-area) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
              {/* Header with Tabs and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('edit')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'edit'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === 'preview'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" /> Print Preview
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:bg-blue-50 transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-500" /> Copy Text
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editable / Preview Area (This gets printed clean) */}
              <div className="p-6 sm:p-8 flex-1 printable-area">
                <div className="mb-4 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {templateTitle}
                  </span>
                  <span className="text-xs text-slate-400">Kliv∞ Templates</span>
                </div>

                {activeTab === 'edit' ? (
                  <textarea
                    value={customText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    rows={26}
                    className="w-full font-mono text-sm leading-relaxed text-slate-800 bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors resize-y"
                    placeholder="Type or edit your agreement here..."
                  />
                ) : (
                  <div className="font-mono text-sm leading-relaxed text-slate-900 whitespace-pre-wrap py-2 px-1">
                    {customText}
                  </div>
                )}
              </div>

              {disclaimer && (
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                  <Info className="mt-0.5 h-3.5 w-3.5 flex-none text-slate-400" />
                  <span>{disclaimer}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              How to use this template
            </h2>
            <ol className="mt-6 space-y-3">
              {howToUse.map((step, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 font-display text-xs font-bold text-blue-600">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-10">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Tips</h3>
            <ul className="mt-4 space-y-2.5">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[15px] text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-blue-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-slate-50/50 border-t border-slate-200/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                More free templates & tools
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(({ href, label, desc }, i) => (
                <Reveal key={href} delay={i * 70}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-display text-base font-bold text-navy">{label}</span>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-500" />
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {faqHeading}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={faqs} />
        </div>
      </section>

      {/* Upgrade to Pro & Workspace Plans Showcase inside Customizer */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="rounded-3xl bg-gradient-to-br from-navy via-slate-900 to-blue-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-extrabold tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Kliv∞ PRO UPGRADE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
              Upgrade to Pro to E-Sign & White-Label This Template
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Stop copying and pasting into Word or PDFs. With <strong className="text-white">Kliv∞ Pro</strong>, send your <strong className="text-blue-300">{title}</strong> directly to your client&apos;s branded portal for 1-click legal e-signature, automatic payment milestone tracking, and permanent cloud sync.
            </p>
          </div>

          {/* Horizontal Scrolling Related E-Signable Templates Carousel */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              <span>⚡ Explore Pro Workflows Across All Templates (Auto-Scrolling)</span>
              <span className="text-blue-400">Auto-Scroll Effect →</span>
            </div>

            <AutoScrollingCarousel speed={0.65} direction="left" className="-mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { label: 'Freelance Contract', path: '/templates/freelance-contract-template', tag: 'E-Signable' },
                { label: 'Project Proposal', path: '/templates/project-proposal-template', tag: 'Interactive' },
                { label: 'Onboarding Checklist', path: '/templates/client-onboarding-checklist', tag: 'File Uploads' },
                { label: 'Scope of Work (SOW)', path: '/templates/scope-of-work-template', tag: 'Milestone Lock' },
                { label: 'Freelancer NDA', path: '/templates/nda-template-freelancers', tag: 'Mutual Sign' },
                { label: 'Invoice (India GST)', path: '/templates/invoice-template-india', tag: 'Auto-Tax & UPI' },
                { label: 'Quotation Template', path: '/templates/quotation-template', tag: '1-Click Convert' },
                { label: 'Retainer Agreement', path: '/templates/retainer-agreement-template', tag: 'Recurring Billing' },
              ].map((t, idx) => (
                <Link
                  key={idx}
                  href={t.path}
                  className="min-w-[220px] snap-start rounded-2xl bg-slate-800/90 border border-slate-700/80 p-4 text-left flex flex-col justify-between shrink-0 hover:border-blue-500 hover:bg-slate-800 transition-all shadow-md group block cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/20">
                      {t.tag}
                    </span>
                    <div className="mt-2.5 font-display text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {t.label}
                    </div>
                  </div>
                  <span className="mt-4 text-[11px] font-extrabold text-slate-300 group-hover:text-white flex items-center gap-1 uppercase tracking-wider">
                    Open Template <ArrowRight className="h-3 w-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </AutoScrollingCarousel>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-slate-900">
            <div className="rounded-2xl bg-white/95 p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Starter</div>
                <div className="mt-1 font-display text-xl font-black text-navy">Free Forever (₹0)</div>
                <p className="mt-2 text-xs text-slate-600">Manual text and PDF downloads for single templates.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-slate-500 text-center">
                Current Plan
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-700 p-6 flex flex-col justify-between text-white shadow-xl scale-105 border border-blue-400/30">
              <div>
                <div className="text-[11px] font-black uppercase tracking-widest text-blue-200">Most Popular</div>
                <div className="mt-1 font-display text-xl font-black text-white">Kliv∞ Pro (₹1,499/mo)</div>
                <p className="mt-2 text-xs text-blue-100">1-Click Client E-Signatures, White-Label Portal & Auto-Invoicing.</p>
              </div>
              <Link
                href="/signup"
                className="mt-4 pt-3 block text-center rounded-xl bg-white text-blue-700 text-xs font-extrabold py-2.5 hover:bg-blue-50 transition-colors shadow"
              >
                Upgrade to Pro <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white/95 p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Scale</div>
                <div className="mt-1 font-display text-xl font-black text-navy">Agency (₹3,999/mo)</div>
                <p className="mt-2 text-xs text-slate-600">Multi-seat team workflows, subcontractor agreements & custom domain portals.</p>
              </div>
              <Link
                href="/signup"
                className="mt-4 pt-3 block text-center rounded-xl bg-slate-900 text-white text-xs font-extrabold py-2.5 hover:bg-slate-800 transition-colors"
              >
                Start Agency Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection title={ctaTitle} subtitle={ctaSubtitle} />
    </PageShell>
  )
}
