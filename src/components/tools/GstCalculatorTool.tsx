'use client'

import { useState } from 'react'
import {
  Calculator,
  HelpCircle,
  ChevronDown,
  Info,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { APP_URL } from '@/lib/site'

export function GstCalculatorTool() {
  const [amount, setAmount] = useState<number>(10000)
  const [rate, setRate] = useState<number>(18)
  const [direction, setDirection] = useState<'add' | 'remove'>('add')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Calculate GST components
  let netAmount = 0
  let gstAmount = 0
  let totalAmount = 0

  if (direction === 'add') {
    netAmount = amount
    gstAmount = (amount * rate) / 100
    totalAmount = amount + gstAmount
  } else {
    totalAmount = amount
    netAmount = amount / (1 + rate / 100)
    gstAmount = totalAmount - netAmount
  }

  const cgst = gstAmount / 2
  const sgst = gstAmount / 2

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Main Calculator Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lift-3 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Amount (₹ INR)
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-4 py-3 text-lg font-bold text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* GST Slabs */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              GST Rate Slab
            </label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[5, 12, 18, 28].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(r)}
                  className={`py-2.5 rounded-xl font-bold text-sm transition-all ${
                    rate === r
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          {/* Direction Toggle */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={() => setDirection('add')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${
                  direction === 'add'
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Add GST (Amount is pre-GST)
              </button>
              <button
                type="button"
                onClick={() => setDirection('remove')}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${
                  direction === 'remove'
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Remove GST (Amount incl. GST)
              </button>
            </div>
          </div>
        </div>

        {/* Right Output Display */}
        <div className="lg:col-span-6 bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {direction === 'add' ? 'Total (incl. GST)' : 'Base Amount (pre-GST)'}
            </span>
            <div className="mt-1 font-display text-4xl font-extrabold text-blue-600">
              ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/60">
              <span className="text-slate-500 font-medium">Net Amount (Base)</span>
              <div className="mt-1 text-base font-bold text-slate-900">
                ₹{netAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/60">
              <span className="text-slate-500 font-medium">Total GST Amount ({rate}%)</span>
              <div className="mt-1 text-base font-bold text-blue-600">
                ₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="text-blue-700 font-medium">CGST ({rate / 2}%)</span>
              <div className="mt-1 text-sm font-bold text-slate-900">
                ₹{cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="text-blue-700 font-medium">SGST ({rate / 2}%)</span>
              <div className="mt-1 text-sm font-bold text-slate-900">
                ₹{sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <span>
              CGST/SGST applies for intra-state sales. For inter-state supply, the single total applies as IGST.
            </span>
          </div>
        </div>
      </div>

      {/* Guide Content Section */}
      <div className="grid sm:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
          <h3 className="font-display text-lg font-bold text-navy">
            How GST is Calculated
          </h3>
          <p>
            GST (Goods and Services Tax) is applied as a percentage of the taxable value. To add GST, multiply the base amount by the rate and add it on. To remove GST from a price that already includes it, divide by one plus the rate (e.g. ÷ 1.18 for 18%).
          </p>
          <p>
            Within a single state, GST is split equally into CGST (central) and SGST (state). For inter-state supply, the same total is charged as a single IGST.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
          <h3 className="font-display text-lg font-bold text-navy">
            Which GST Rate Applies?
          </h3>
          <p>
            Services attract different GST rates depending on their category, with <strong>18%</strong> being the most common rate for professional, IT, and creative services in India.
          </p>
          <p>
            Goods vary across the 5%, 12%, 18%, and 28% slabs. The correct rate is tied to the HSN (goods) or SAC (services) code for your business.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
        <h3 className="font-display text-xl font-bold text-navy text-center">
          GST Calculator FAQs
        </h3>

        <div className="space-y-3">
          {[
            {
              q: 'How do I remove GST from a total?',
              a: 'Divide the GST-inclusive total by 1 + (rate ÷ 100). For example, ₹11,800 including 18% GST has a base of ₹11,800 ÷ 1.18 = ₹10,000, and the GST is ₹1,800. Switch this tool to "Remove GST" to calculate it automatically.',
            },
            {
              q: 'What is the CGST and SGST split?',
              a: 'In intra-state sales (within the same state), GST is split equally: 50% CGST (Central GST) and 50% SGST (State GST). For 18% GST, that is 9% CGST and 9% SGST.',
            },
            {
              q: 'Do freelancers have to charge GST in India?',
              a: 'Freelancers in India must register for GST if their aggregate turnover exceeds ₹20 Lakhs per year (₹10 Lakhs in special category states). Once registered, GST must be charged on invoices unless exporting services under LUT.',
            },
          ].map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-slate-900 flex justify-between items-center text-sm"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
