'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Reveal } from '@/components/landing/Reveal'

const FAQS = [
  {
    q: 'How does the free tier work? Is it really free forever?',
    a: 'Yes, 100%. Our Free Starter plan includes up to 5 active client profiles, GST invoice generation, and basic project boards with zero time limits or hidden charges. You only upgrade when your client base scales.',
  },
  {
    q: 'Can I generate GST-compliant invoices for Indian businesses?',
    a: 'Absolutely. Kliv∞ natively supports CGST, SGST, and IGST calculations, HSN/SAC codes, state code validation, and UPI QR code embedding so your clients can pay you instantly via Google Pay, PhonePe, or Paytm.',
  },
  {
    q: 'What makes Kliv∞ different from tools like Notion or Excel?',
    a: 'Notion and Excel require manual setup, formula management, and separate tools for billing. Kliv∞ combines lead tracking, project management, GST billing, and client portals into one connected app built for freelancers.',
  },
  {
    q: 'Can my clients view project progress without creating an account?',
    a: 'Yes! Every project has an optional secure White-Label Client Portal link. You can share this single link with your client so they can track deliverables, approve milestones, download invoices, and leave reviews.',
  },
  {
    q: 'Is my business data secure and exportable?',
    a: 'Your data belongs entirely to you. All information is encrypted in transit and at rest. You can export all your client records, project histories, and financial logs to CSV/Excel at any time with zero vendor lock-in.',
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="relative py-20 sm:py-28 bg-slate-50/60 border-t border-slate-200/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Got Questions?
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600">
              Everything you need to know about setting up Kliv∞ for your business.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <Reveal key={idx} delay={idx * 50}>
                <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display text-base font-bold text-navy hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-blue-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
