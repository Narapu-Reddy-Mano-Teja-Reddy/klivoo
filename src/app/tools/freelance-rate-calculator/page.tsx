'use client'

import { useState } from 'react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Calculator, ArrowRight, DollarSign } from 'lucide-react'

export default function RateCalculatorPage() {
  const [targetIncome, setTargetIncome] = useState(1200000)
  const [expenses, setExpenses] = useState(150000)
  const [billableHours, setBillableHours] = useState(25)
  const [vacationWeeks, setVacationWeeks] = useState(4)

  const workingWeeks = 52 - vacationWeeks
  const totalBillableHoursYear = workingWeeks * billableHours
  const totalRevenueNeeded = targetIncome + expenses
  const targetHourlyRate = totalBillableHoursYear > 0 ? totalRevenueNeeded / totalBillableHoursYear : 0
  const targetDailyRate = targetHourlyRate * 8

  return (
    <PageShell>
      <PageHero
        eyebrow="100% Free Tool"
        title="Freelance Hourly & Project Rate Calculator"
        highlight="calculate what to charge"
        subtitle="Work out the exact hourly and daily rates you need to charge to hit your annual income goal and cover business overheads."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lift-3 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Target Take-Home Annual Income (₹ INR)
              </label>
              <input
                type="number"
                value={targetIncome}
                onChange={(e) => setTargetIncome(parseFloat(e.target.value) || 0)}
                className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Annual Business Overhead &amp; Software (₹ INR)
              </label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
                className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Billable Hrs / Wk
                </label>
                <input
                  type="number"
                  value={billableHours}
                  onChange={(e) => setBillableHours(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Vacation Wks / Yr
                </label>
                <input
                  type="number"
                  value={vacationWeeks}
                  onChange={(e) => setVacationWeeks(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recommended Minimum Hourly Rate
              </span>
              <div className="mt-1 font-display text-4xl font-extrabold text-blue-600">
                ₹{Math.round(targetHourlyRate).toLocaleString('en-IN')}<span className="text-sm text-slate-500 font-normal">/hr</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">Recommended Day Rate (8 hrs)</span>
              <div className="mt-1 text-xl font-bold text-slate-900">
                ₹{Math.round(targetDailyRate).toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal">/day</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              Based on {workingWeeks} working weeks/year and {totalBillableHoursYear} total billable client hours required.
            </div>
          </div>
        </div>
      </div>

      <CtaSection
        title="Ready to Invoice at Your Ideal Rate?"
        subtitle="CLIV∞ helps you track time, issue GST invoices, and manage client retainers effortlessly."
      />
    </PageShell>
  )
}
