'use client'

import { useState } from 'react'
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { APP_URL } from '@/lib/site'
import { SpotlightButton } from '@/components/landing/SpotlightButton'
import { Reveal } from '@/components/landing/Reveal'

export function PricingCalculator() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative py-20 sm:py-28 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Predictable Investment
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-5xl">
              Transparent Plans Designed to Scale
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Choose the ideal operating plan for your business. Zero hidden transaction fees or surprise charges.
            </p>
          </Reveal>

          {/* Billing Switcher Toggle */}
          <Reveal delay={100} className="mt-8">
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  !annual ? 'bg-white text-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  annual ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold">
                  Save 10%
                </span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Pricing Cards 3-Tier Grid */}
        <div className="mt-14 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Starter Plan - ₹899 */}
          <Reveal delay={200}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-soft hover:shadow-lift-2 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Starter Tier
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy">Starter Suite</h3>
                <p className="mt-2 text-xs text-slate-500">
                  For solo creators and independent freelancers launching operations.
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-navy">
                    {annual ? '₹809' : '₹899'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                {annual && (
                  <div className="mt-1 text-[11px] text-blue-600 font-semibold">
                    Billed annually (₹9,708/yr • 10% off)
                  </div>
                )}

                <div className="mt-8 space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Up to 10 active client profiles
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Unlimited GST invoices &amp; PDF downloads
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Visual Kanban project boards
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> UPI QR code &amp; link payments
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href={`${APP_URL}/signup`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50"
                >
                  Choose Starter
                </a>
              </div>
            </div>
          </Reveal>

          {/* Pro Growth Plan - ₹1,199 (Popular) */}
          <Reveal delay={300}>
            <div className="h-full relative rounded-3xl border-2 border-blue-500 bg-white p-8 flex flex-col justify-between shadow-ember">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-cyan-300" />
                <span>Most Popular</span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Pro Growth Tier
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy">Pro Growth</h3>
                <p className="mt-2 text-xs text-slate-500">
                  Built for growing freelancers, studios, and expanding teams.
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-navy">
                    {annual ? '₹1,079' : '₹1,199'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                {annual && (
                  <div className="mt-1 text-[11px] text-blue-600 font-semibold">
                    Billed annually (₹12,948/yr • 10% off)
                  </div>
                )}

                <div className="mt-8 space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Unlimited active clients &amp; projects
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> White-label client portals &amp; domain
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Automated recurring retainers &amp; reminders
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Multi-currency billing (INR, USD, EUR, GBP)
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Verified testimonial collector engine
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <SpotlightButton
                  href={`${APP_URL}/signup`}
                  className="w-full py-3.5 text-sm font-semibold"
                >
                  Choose Pro Growth
                  <ArrowRight className="h-4 w-4" />
                </SpotlightButton>
              </div>
            </div>
          </Reveal>

          {/* Enterprise Agency Plan - ₹1,599 */}
          <Reveal delay={400}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-soft hover:shadow-lift-2 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Enterprise Agency Tier
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy">Agency Scale</h3>
                <p className="mt-2 text-xs text-slate-500">
                  For boutique agencies requiring advanced team seats and priority support.
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-navy">
                    {annual ? '₹1,439' : '₹1,599'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                {annual && (
                  <div className="mt-1 text-[11px] text-blue-600 font-semibold">
                    Billed annually (₹17,268/yr • 10% off)
                  </div>
                )}

                <div className="mt-8 space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Everything in Pro Growth
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Unlimited team member seats &amp; roles
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Advanced revenue &amp; cash flow analytics
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" /> Dedicated 24/7 account manager
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href={`${APP_URL}/signup`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50"
                >
                  Choose Agency Scale
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
