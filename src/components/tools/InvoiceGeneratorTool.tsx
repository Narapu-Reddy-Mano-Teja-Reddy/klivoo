'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  FileText,
  Printer,
} from 'lucide-react'
import { APP_URL, SITE_NAME } from '@/lib/site'
import { SpotlightButton } from '@/components/landing/SpotlightButton'

type LineItem = {
  id: string
  description: string
  qty: number
  rate: number
  taxPct: number
}

const STORAGE_KEY = 'clivoo_business_details'

export function InvoiceGeneratorTool() {
  // Business details state (auto-remembered in localStorage)
  const [businessName, setBusinessName] = useState('Your business or brand')
  const [businessEmail, setBusinessEmail] = useState('you@business.com')
  const [businessPhone, setBusinessPhone] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')

  // Invoice fields
  const [invoiceNum, setInvoiceNum] = useState(`INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-832`)
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10))
  const [projectName, setProjectName] = useState('Website redesign')
  const [currencySymbol, setCurrencySymbol] = useState('₹')
  const [currencyCode, setCurrencyCode] = useState('INR')

  // Client bill-to
  const [clientName, setClientName] = useState('Client or company')
  const [clientEmail, setClientEmail] = useState('client@email.com')
  const [clientPhone, setClientPhone] = useState('')

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      description: 'UI/UX Design & Frontend Development',
      qty: 1,
      rate: 25000,
      taxPct: 18,
    },
  ])

  const [notes, setNotes] = useState('Thank you for your business.')

  // Load business details from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.name) setBusinessName(parsed.name)
        if (parsed.email) setBusinessEmail(parsed.email)
        if (parsed.phone) setBusinessPhone(parsed.phone)
        if (parsed.address) setBusinessAddress(parsed.address)
      }
    } catch (e) {
      // Ignore
    }
  }, [])

  // Auto-save business details
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: businessName,
          email: businessEmail,
          phone: businessPhone,
          address: businessAddress,
        })
      )
    } catch (e) {
      // Ignore
    }
  }, [businessName, businessEmail, businessPhone, businessAddress])

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        description: 'New deliverable item',
        qty: 1,
        rate: 0,
        taxPct: 18,
      },
    ])
  }

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      })
    )
  }

  // Calculate Subtotal & Total
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0)
  const totalTax = items.reduce((acc, item) => acc + (item.qty * item.rate * (item.taxPct || 0)) / 100, 0)
  const total = subtotal + totalTax

  const handlePrintDownload = () => {
    window.print()
  }

  const handleNewInvoice = () => {
    setInvoiceNum(`INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`)
    setItems([
      {
        id: Math.random().toString(36).substring(2, 9),
        description: 'New deliverable item',
        qty: 1,
        rate: 0,
        taxPct: 18,
      },
    ])
  }

  return (
    <div className="space-y-12">
      {/* Top Banner & Quick Controls */}
      <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>100% Free • No Account Needed</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-navy">
            Create a Professional GST Invoice
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Fill in your details, add line items, and print or save a polished PDF — nothing you type ever leaves your browser.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNewInvoice}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4 text-slate-500" /> New Invoice
          </button>
          <button
            type="button"
            onClick={handlePrintDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
          >
            <Download className="h-4 w-4" /> Download PDF / Print
          </button>
        </div>
      </div>

      {/* Editor & Live Invoice Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel Form */}
        <div className="lg:col-span-5 space-y-6 bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80">
          <h3 className="font-display text-base font-bold text-navy flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" /> Invoice Form Editor
          </h3>

          {/* Business Details */}
          <div className="space-y-3 pt-2 border-t border-slate-200/60">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Your Business Details
            </label>
            <div>
              <span className="text-xs text-slate-500 font-medium">Business / Brand Name</span>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Email</span>
              <input
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-slate-500 font-medium">Phone</span>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">City, Country</span>
                <input
                  type="text"
                  placeholder="Mumbai, India"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Invoice Setup */}
          <div className="space-y-3 pt-4 border-t border-slate-200/60">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Invoice Meta
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-slate-500 font-medium">Invoice Number</span>
                <input
                  type="text"
                  value={invoiceNum}
                  onChange={(e) => setInvoiceNum(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Issue Date</span>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Project Name</span>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Currency</span>
              <select
                value={currencyCode}
                onChange={(e) => {
                  const val = e.target.value
                  setCurrencyCode(val)
                  if (val === 'INR') setCurrencySymbol('₹')
                  else if (val === 'USD') setCurrencySymbol('$')
                  else if (val === 'EUR') setCurrencySymbol('€')
                  else if (val === 'GBP') setCurrencySymbol('£')
                }}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="INR">₹ INR (Indian Rupee)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="EUR">€ EUR (Euro)</option>
                <option value="GBP">£ GBP (British Pound)</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3 pt-4 border-t border-slate-200/60">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Bill To (Client)
            </label>
            <div>
              <span className="text-xs text-slate-500 font-medium">Client Name</span>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Client Email</span>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Printable Invoice Live Sheet */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lift-3 printable-area">
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <Image
                src="/clivoo logo.png"
                alt="CLIV∞ Logo"
                width={280}
                height={75}
                className="h-16 sm:h-20 w-auto"
              />
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">
                Tax Invoice
              </div>
            </div>

            <div className="text-right">
              <h2 className="font-display text-2xl font-black text-navy uppercase tracking-wider">
                INVOICE
              </h2>
              <div className="mt-2 text-xs text-slate-500">
                <div><strong className="text-slate-700">Invoice #:</strong> {invoiceNum}</div>
                <div><strong className="text-slate-700">Date:</strong> {issueDate}</div>
              </div>
            </div>
          </div>

          {/* Billing Info Grid */}
          <div className="grid sm:grid-cols-2 gap-8 py-8 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                From
              </div>
              <div className="mt-2 font-display text-base font-bold text-navy">
                {businessName}
              </div>
              <div className="text-xs text-slate-600 space-y-0.5 mt-1">
                <div>{businessEmail}</div>
                {businessPhone && <div>{businessPhone}</div>}
                {businessAddress && <div>{businessAddress}</div>}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Bill To
              </div>
              <div className="mt-2 font-display text-base font-bold text-navy">
                {clientName}
              </div>
              <div className="text-xs text-slate-600 space-y-0.5 mt-1">
                <div>{clientEmail}</div>
                {projectName && <div><strong className="text-slate-700">Project:</strong> {projectName}</div>}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-center">Qty</th>
                  <th className="pb-3 text-right">Rate</th>
                  <th className="pb-3 text-right">Tax %</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {items.map((item) => {
                  const lineTotal = item.qty * item.rate * (1 + (item.taxPct || 0) / 100)
                  return (
                    <tr key={item.id} className="group hover:bg-slate-50/50">
                      <td className="py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          className="w-full bg-transparent font-medium text-slate-900 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 text-center">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', parseFloat(e.target.value) || 0)}
                          className="w-12 text-center bg-transparent font-medium focus:outline-none"
                        />
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-0.5">
                          <span>{currencySymbol}</span>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-20 text-right bg-transparent font-medium focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <input
                          type="number"
                          value={item.taxPct}
                          onChange={(e) => handleItemChange(item.id, 'taxPct', parseFloat(e.target.value) || 0)}
                          className="w-12 text-right bg-transparent font-medium focus:outline-none"
                        />
                        %
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900">
                        {currencySymbol}
                        {lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" /> Add line item
              </button>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="border-t border-slate-200 pt-6 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">
                  {currencySymbol}
                  {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Est. Tax (GST):</span>
                <span className="font-semibold text-slate-900">
                  {currencySymbol}
                  {totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-extrabold text-navy">
                <span>Total Due:</span>
                <span className="text-blue-600">
                  {currencySymbol}
                  {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Notes & Footer Tag */}
          <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500 space-y-2">
            <div><strong className="text-slate-700">Notes:</strong></div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none"
            />
            <div className="pt-4 text-center text-[11px] text-slate-400 border-t border-slate-100">
              Generated via {SITE_NAME} • The Infinite Client Operations Platform (Tenspick Labs)
            </div>
          </div>
        </div>
      </div>

      {/* Product Highlight Features Grid */}
      <div className="grid sm:grid-cols-4 gap-6 pt-12 border-t border-slate-200">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">Private by Design</h4>
          <p className="mt-1 text-xs text-slate-500">
            Everything runs in your browser. Nothing you type is ever uploaded or stored.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <Sparkles className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">No Sign-up, No Watermark</h4>
          <p className="mt-1 text-xs text-slate-500">
            No account required. Create clean, unwatermarked PDF invoices instantly.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <RefreshCw className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">Remembers Your Business</h4>
          <p className="mt-1 text-xs text-slate-500">
            Your details are remembered in your browser so you only type them once.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <CheckCircle2 className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">Free Forever Plan</h4>
          <p className="mt-1 text-xs text-slate-500">
            Automate invoicing and client tracking effortlessly with CLIV∞.
          </p>
        </div>
      </div>
    </div>
  )
}
