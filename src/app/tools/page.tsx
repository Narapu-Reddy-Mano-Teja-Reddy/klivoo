import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Calculator, DollarSign, ArrowRight, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Free Tools for Freelancers & Agencies — No Account Needed',
  description:
    'Free tools for independent creators: GST Invoice Generator, Indian GST Calculator, and Freelance Rate Calculator. 100% free with zero sign-up required.',
  path: '/tools',
  keywords: ['free freelancer tools', 'GST invoice generator', 'GST calculator', 'rate calculator'],
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
]

export default function ToolsHubPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="100% Free Tools"
        title="Free productivity tools for"
        highlight="freelancers & studios"
        subtitle="Designed by Tenspick Labs to help independent creators invoice, calculate taxes, and price services with zero friction."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {TOOLS.map((t) => {
            const Icon = t.icon
            return (
              <div
                key={t.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lift-2 flex flex-col justify-between hover:border-blue-400 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-navy group-hover:text-blue-600 transition-colors">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={t.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Open Tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <CtaSection
        title="Want All Your Client Operations Automated?"
        subtitle="CLIV∞ combines client CRM, project boards, GST invoicing, and client portals into one connected app."
      />
    </PageShell>
  )
}
