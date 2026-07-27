'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  FileText,
  Printer,
  Upload,
  X,
  Palette,
  CreditCard,
  Percent,
  Eraser,
} from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

type LineItem = {
  id: string
  description: string
  qty: number
  rate: number
  taxPct: number
}

type CustomField = {
  id: string
  label: string
  value: string
}

type ThemeColor = 'navy' | 'emerald' | 'purple' | 'charcoal' | 'amber'
type GstMode = 'cgst_sgst' | 'igst' | 'custom' | 'none'
type DiscountType = 'none' | 'percent' | 'fixed'

const STORAGE_KEY = 'klivoo_business_details'

export function InvoiceGeneratorTool() {
  // Business details state
  const [businessName, setBusinessName] = useState('Your Business or Brand')
  const [businessEmail, setBusinessEmail] = useState('contact@yourbusiness.com')
  const [businessPhone, setBusinessPhone] = useState('+91 98765 43210')
  const [businessAddress, setBusinessAddress] = useState('Mumbai, Maharashtra, India')
  const [businessGstin, setBusinessGstin] = useState('')
  const [businessPan, setBusinessPan] = useState('')

  // Custom Logo State
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  // Invoice Theme & Meta
  const [themeColor, setThemeColor] = useState<ThemeColor>('navy')
  const [invoiceNum, setInvoiceNum] = useState(`INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-101`)
  const [refNumber, setRefNumber] = useState('PO-2026-8891')
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10))
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 15)
    return d.toISOString().slice(0, 10)
  })
  const [paymentTerms, setPaymentTerms] = useState('Net 15 Days')
  const [projectName, setProjectName] = useState('UI/UX Design & Development')
  const [currencySymbol, setCurrencySymbol] = useState('₹')
  const [currencyCode, setCurrencyCode] = useState('INR')

  // Dynamic Custom Fields for Ref / Meta
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'c1', label: 'Project Code', value: 'UI-882' },
  ])

  // Client bill-to
  const [clientName, setClientName] = useState('Acme Corporation Pvt Ltd')
  const [clientEmail, setClientEmail] = useState('accounts@acmecorp.com')
  const [clientAddress, setClientAddress] = useState('Bengaluru, Karnataka')
  const [clientGstin, setClientGstin] = useState('')

  // Tax & Discount Settings
  const [gstMode, setGstMode] = useState<GstMode>('cgst_sgst')
  const [defaultTaxRate, setDefaultTaxRate] = useState(18)
  const [discountType, setDiscountType] = useState<DiscountType>('none')
  const [discountValue, setDiscountValue] = useState(0)

  // Payment Instructions
  const [upiId, setUpiId] = useState('yourname@icici')
  const [bankDetails, setBankDetails] = useState('A/C: 123456789012 • IFSC: ICIC0001234 • ICICI Bank')

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    {
      id: '1',
      description: 'Website Redesign & Responsive Frontend Development',
      qty: 1,
      rate: 65000,
      taxPct: 18,
    },
    {
      id: '2',
      description: 'Performance Optimization & SEO Setup',
      qty: 1,
      rate: 15000,
      taxPct: 18,
    },
  ])

  const [notes, setNotes] = useState('Thank you for your business! Payment is due according to the terms specified above.')

  // Load saved details on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.name) setBusinessName(parsed.name)
        if (parsed.email) setBusinessEmail(parsed.email)
        if (parsed.phone) setBusinessPhone(parsed.phone)
        if (parsed.address) setBusinessAddress(parsed.address)
        if (parsed.gstin) setBusinessGstin(parsed.gstin)
        if (parsed.pan) setBusinessPan(parsed.pan)
        if (parsed.upiId) setUpiId(parsed.upiId)
        if (parsed.bankDetails) setBankDetails(parsed.bankDetails)
        if (parsed.logoUrl) setLogoUrl(parsed.logoUrl)
      }
    } catch (e) {
      // Ignore
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: businessName,
          email: businessEmail,
          phone: businessPhone,
          address: businessAddress,
          gstin: businessGstin,
          pan: businessPan,
          upiId,
          bankDetails,
          logoUrl,
        })
      )
    } catch (e) {
      // Ignore
    }
  }, [businessName, businessEmail, businessPhone, businessAddress, businessGstin, businessPan, upiId, bankDetails, logoUrl])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoUrl(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  // Custom Fields Handler
  const handleAddCustomField = () => {
    setCustomFields((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        label: 'Custom Ref / Label',
        value: 'Value',
      },
    ])
  }

  const handleRemoveCustomField = (id: string) => {
    setCustomFields((prev) => prev.filter((cf) => cf.id !== id))
  }

  const handleCustomFieldChange = (id: string, field: 'label' | 'value', val: string) => {
    setCustomFields((prev) =>
      prev.map((cf) => {
        if (cf.id === id) return { ...cf, [field]: val }
        return cf
      })
    )
  }

  // Line Items Handler
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        description: 'New deliverable item',
        qty: 1,
        rate: 0,
        taxPct: gstMode === 'none' ? 0 : defaultTaxRate,
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

  // Calculate Subtotal, Discount & Taxes
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0)
  
  let discountAmount = 0
  if (discountType === 'percent') {
    discountAmount = (subtotal * discountValue) / 100
  } else if (discountType === 'fixed') {
    discountAmount = discountValue
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount)

  const totalTax = items.reduce((acc, item) => {
    if (gstMode === 'none') return acc
    const itemSubtotal = item.qty * item.rate
    const discountedItemAmount = subtotal > 0 ? itemSubtotal * (taxableAmount / subtotal) : itemSubtotal
    return acc + (discountedItemAmount * (item.taxPct || 0)) / 100
  }, 0)

  const total = taxableAmount + totalTax

  const handlePrintDownload = () => {
    window.print()
  }

  // Reset / New Invoice — Preserves Business Details, clears sample client & ref fields
  const handleNewInvoice = () => {
    setInvoiceNum(`INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`)
    setRefNumber('')
    setClientName('')
    setClientEmail('')
    setClientAddress('')
    setClientGstin('')
    setProjectName('')
    setCustomFields([])
    setDiscountValue(0)
    setItems([
      {
        id: Math.random().toString(36).substring(2, 9),
        description: '',
        qty: 1,
        rate: 0,
        taxPct: gstMode === 'none' ? 0 : defaultTaxRate,
      },
    ])
  }

  // Clear Sample Client & Custom Fields in 1 Click
  const handleClearSampleData = () => {
    setClientName('')
    setClientEmail('')
    setClientAddress('')
    setClientGstin('')
    setRefNumber('')
    setProjectName('')
    setCustomFields([])
  }

  // Theme styling dictionaries
  const themeStyles = {
    navy: {
      border: 'border-blue-600',
      text: 'text-blue-600',
      bg: 'bg-blue-600 text-white',
      badge: 'bg-blue-50 text-blue-700',
      headerBg: 'bg-slate-50',
    },
    emerald: {
      border: 'border-emerald-600',
      text: 'text-emerald-600',
      bg: 'bg-emerald-600 text-white',
      badge: 'bg-emerald-50 text-emerald-700',
      headerBg: 'bg-emerald-50/40',
    },
    purple: {
      border: 'border-purple-600',
      text: 'text-purple-600',
      bg: 'bg-purple-600 text-white',
      badge: 'bg-purple-50 text-purple-700',
      headerBg: 'bg-purple-50/40',
    },
    charcoal: {
      border: 'border-slate-800',
      text: 'text-slate-800',
      bg: 'bg-slate-800 text-white',
      badge: 'bg-slate-100 text-slate-800',
      headerBg: 'bg-slate-100/60',
    },
    amber: {
      border: 'border-amber-600',
      text: 'text-amber-600',
      bg: 'bg-amber-600 text-white',
      badge: 'bg-amber-50 text-amber-700',
      headerBg: 'bg-amber-50/40',
    },
  }[themeColor]

  return (
    <div className="space-y-10">
      {/* Top Banner & Quick Controls */}
      <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>100% Free • Custom Ref Fields • Single Page Print</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-navy">
            Professional Invoice Generator
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
            Customize with your brand colors, add reference & custom fields, and download a crisp single-page PDF with zero unnecessary blank pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleClearSampleData}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/70 px-4 py-3 text-xs font-bold text-red-700 shadow-sm transition-all hover:bg-red-100"
            title="Clear sample client details & custom ref fields"
          >
            <Eraser className="h-4 w-4 text-red-500" /> Clear Sample Client Data
          </button>
          <button
            type="button"
            onClick={handleNewInvoice}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            title="Start fresh invoice while keeping your Business details"
          >
            <RefreshCw className="h-4 w-4 text-slate-500" /> Reset / New Invoice
          </button>
          <button
            type="button"
            onClick={handlePrintDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
          >
            <Printer className="h-4 w-4" /> Download PDF / Print
          </button>
        </div>
      </div>

      {/* Editor Panels & Live Invoice Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel Form (No Print) */}
        <div className="lg:col-span-5 space-y-6 bg-slate-50/90 p-6 rounded-3xl border border-slate-200 shadow-sm no-print">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="font-display text-base font-bold text-navy flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" /> Invoice Settings & Options
            </h3>
          </div>

          {/* 1. Branding & Theme Options */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5" /> Branding & Theme Colors
            </label>

            {/* Logo Upload */}
            <div>
              <span className="text-xs text-slate-600 font-medium block mb-1.5">Company Logo</span>
              <div className="flex items-center gap-3">
                {logoUrl ? (
                  <div className="relative border border-slate-200 rounded-xl p-2 bg-white flex items-center gap-2">
                    <img src={logoUrl} alt="Logo Preview" className="h-10 w-auto object-contain" />
                    <button
                      type="button"
                      onClick={() => setLogoUrl(null)}
                      className="p-1 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove custom logo"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                    <Upload className="h-4 w-4" /> Upload Custom Logo
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Theme Picker */}
            <div>
              <span className="text-xs text-slate-600 font-medium block mb-1.5">Accent Color Theme</span>
              <div className="flex items-center gap-2.5">
                {(['navy', 'emerald', 'purple', 'charcoal', 'amber'] as ThemeColor[]).map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setThemeColor(col)}
                    className={`h-7 w-7 rounded-full border-2 transition-transform ${
                      themeColor === col ? 'scale-125 border-slate-900 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor:
                        col === 'navy'
                          ? '#2563eb'
                          : col === 'emerald'
                          ? '#059669'
                          : col === 'purple'
                          ? '#7c3aed'
                          : col === 'charcoal'
                          ? '#1e293b'
                          : '#d97706',
                    }}
                    title={`Theme: ${col}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. Business Details */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Your Business Details (Auto-Saved)
            </label>
            <div>
              <span className="text-xs text-slate-500 font-medium">Business / Brand Name</span>
              <input
                type="text"
                placeholder="Your Business or Brand"
                value={businessName}
                onFocus={() => {
                  if (businessName === 'Your Business or Brand') setBusinessName('')
                }}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Email</span>
                <input
                  type="email"
                  placeholder="contact@yourbusiness.com"
                  value={businessEmail}
                  onFocus={() => {
                    if (businessEmail === 'contact@yourbusiness.com') setBusinessEmail('')
                  }}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Phone</span>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={businessPhone}
                  onFocus={() => {
                    if (businessPhone === '+91 98765 43210') setBusinessPhone('')
                  }}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <span className="text-xs text-slate-500 font-medium">GSTIN (Optional)</span>
                <input
                  type="text"
                  placeholder="27ABCDE1234F1Z5"
                  value={businessGstin}
                  onChange={(e) => setBusinessGstin(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">PAN / Tax ID</span>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={businessPan}
                  onChange={(e) => setBusinessPan(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Address / City</span>
              <input
                type="text"
                placeholder="Mumbai, Maharashtra, India"
                value={businessAddress}
                onFocus={() => {
                  if (businessAddress === 'Mumbai, Maharashtra, India') setBusinessAddress('')
                }}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 3. Invoice Meta, Reference Number & Custom Fields */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Invoice Meta & Ref Fields
              </label>
              <button
                type="button"
                onClick={handleAddCustomField}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-lg"
              >
                <Plus className="h-3 w-3" /> Add Custom Field
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
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
                <span className="text-xs text-slate-500 font-medium">PO / Ref Number</span>
                <input
                  type="text"
                  placeholder="e.g. PO-2026-8891"
                  value={refNumber}
                  onFocus={() => {
                    if (refNumber === 'PO-2026-8891') setRefNumber('')
                  }}
                  onChange={(e) => setRefNumber(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Dynamic Custom Fields List */}
            {customFields.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Custom Header Fields</span>
                {customFields.map((cf) => (
                  <div key={cf.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Label (e.g. Project Code)"
                      value={cf.label}
                      onFocus={() => {
                        if (cf.label === 'Project Code' || cf.label === 'Custom Ref / Label') {
                          handleCustomFieldChange(cf.id, 'label', '')
                        }
                      }}
                      onChange={(e) => handleCustomFieldChange(cf.id, 'label', e.target.value)}
                      className="w-1/2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. UI-882)"
                      value={cf.value}
                      onFocus={() => {
                        if (cf.value === 'UI-882' || cf.value === 'Value') {
                          handleCustomFieldChange(cf.id, 'value', '')
                        }
                      }}
                      onChange={(e) => handleCustomFieldChange(cf.id, 'value', e.target.value)}
                      className="w-1/2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(cf.id)}
                      className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                      title="Remove custom field"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Issue Date</span>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Due Date</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-medium">Payment Terms</span>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Net 15 Days">Net 15 Days</option>
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="50% Advance, 50% on Delivery">50% Advance, 50% on Delivery</option>
              </select>
            </div>
          </div>

          {/* 4. Tax & Discount Options */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5" /> Taxes & Discounts
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <span className="text-xs text-slate-500 font-medium">GST / Tax Mode</span>
                <select
                  value={gstMode}
                  onChange={(e) => setGstMode(e.target.value as GstMode)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  <option value="cgst_sgst">CGST + SGST (Same State)</option>
                  <option value="igst">IGST (Inter-State)</option>
                  <option value="custom">Single Flat Tax %</option>
                  <option value="none">No Tax (0%)</option>
                </select>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Discount Type</span>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  <option value="none">No Discount</option>
                  <option value="percent">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ({currencySymbol})</option>
                </select>
              </div>
            </div>

            {discountType !== 'none' && (
              <div>
                <span className="text-xs text-slate-500 font-medium">
                  Discount Value ({discountType === 'percent' ? '%' : currencySymbol})
                </span>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* 5. Client Bill-To */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Bill To (Client Details)
              </label>
              <button
                type="button"
                onClick={handleClearSampleData}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50/80 px-2.5 py-1 rounded-lg flex items-center gap-1"
                title="Clear all sample client data fields"
              >
                <Eraser className="h-3 w-3" /> Clear Client
              </button>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Client Name</span>
              <input
                type="text"
                placeholder="Acme Corporation Pvt Ltd"
                value={clientName}
                onFocus={() => {
                  if (clientName === 'Acme Corporation Pvt Ltd') setClientName('')
                }}
                onChange={(e) => setClientName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <span className="text-xs text-slate-500 font-medium">Client Email</span>
                <input
                  type="email"
                  placeholder="accounts@acmecorp.com"
                  value={clientEmail}
                  onFocus={() => {
                    if (clientEmail === 'accounts@acmecorp.com') setClientEmail('')
                  }}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Client GSTIN</span>
                <input
                  type="text"
                  placeholder="Optional GSTIN"
                  value={clientGstin}
                  onChange={(e) => setClientGstin(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Client Address / City</span>
              <input
                type="text"
                placeholder="Bengaluru, Karnataka"
                value={clientAddress}
                onFocus={() => {
                  if (clientAddress === 'Bengaluru, Karnataka') setClientAddress('')
                }}
                onChange={(e) => setClientAddress(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Project Name / Reference</span>
              <input
                type="text"
                placeholder="UI/UX Design & Development"
                value={projectName}
                onFocus={() => {
                  if (projectName === 'UI/UX Design & Development') setProjectName('')
                }}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 6. Bank & Payment Notes */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" /> Payment & Bank Instructions
            </label>
            <div>
              <span className="text-xs text-slate-500 font-medium">UPI ID / VPA</span>
              <input
                type="text"
                placeholder="yourname@icici"
                value={upiId}
                onFocus={() => {
                  if (upiId === 'yourname@icici') setUpiId('')
                }}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Bank Account & IFSC</span>
              <input
                type="text"
                placeholder="A/C: 123456789012 • IFSC: ICIC0001234 • ICICI Bank"
                value={bankDetails}
                onFocus={() => {
                  if (bankDetails === 'A/C: 123456789012 • IFSC: ICIC0001234 • ICICI Bank') setBankDetails('')
                }}
                onChange={(e) => setBankDetails(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Printable Invoice Live Sheet (.printable-area) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl printable-area flex flex-col justify-between">
          <div>
            {/* Top Header Section */}
            <div className={`flex flex-wrap items-start justify-between border-b-2 ${themeStyles.border} pb-6`}>
              <div className="space-y-2 max-w-sm">
                {logoUrl ? (
                  <img src={logoUrl} alt="Company Logo" className="h-14 sm:h-16 w-auto object-contain" />
                ) : (
                  <Image
                    src="/klivoo logo.png"
                    alt="Kliv∞ Logo"
                    width={240}
                    height={64}
                    className="h-12 sm:h-14 w-auto"
                  />
                )}
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pt-1">
                  Tax Invoice • {businessName}
                </div>
              </div>

              <div className="text-right sm:mt-0 mt-4">
                <h2 className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-wider ${themeStyles.text}`}>
                  INVOICE
                </h2>
                <div className="mt-2 text-xs text-slate-600 space-y-1">
                  <div><strong className="text-slate-800">Invoice #:</strong> {invoiceNum}</div>
                  {refNumber && <div><strong className="text-slate-800">PO / Ref #:</strong> {refNumber}</div>}
                  {customFields.map((cf) => cf.label && cf.value && (
                    <div key={cf.id}><strong className="text-slate-800">{cf.label}:</strong> {cf.value}</div>
                  ))}
                  <div><strong className="text-slate-800">Issue Date:</strong> {issueDate}</div>
                  <div><strong className="text-slate-800">Due Date:</strong> {dueDate}</div>
                  <div><span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold mt-1 ${themeStyles.badge}`}>{paymentTerms}</span></div>
                </div>
              </div>
            </div>

            {/* Billing Grid */}
            <div className="grid grid-cols-2 gap-6 py-6 border-b border-slate-100">
              <div>
                <div className={`text-[11px] font-bold uppercase tracking-wider ${themeStyles.text}`}>
                  From (Supplier)
                </div>
                <div className="mt-1.5 font-display text-sm font-bold text-slate-900">
                  {businessName || 'Supplier Name'}
                </div>
                <div className="text-xs text-slate-600 space-y-0.5 mt-1 leading-relaxed">
                  <div>{businessEmail}</div>
                  {businessPhone && <div>{businessPhone}</div>}
                  {businessAddress && <div>{businessAddress}</div>}
                  {businessGstin && <div className="font-semibold text-slate-700">GSTIN: {businessGstin}</div>}
                  {businessPan && <div>PAN: {businessPan}</div>}
                </div>
              </div>

              <div>
                <div className={`text-[11px] font-bold uppercase tracking-wider ${themeStyles.text}`}>
                  Bill To (Client)
                </div>
                <div className="mt-1.5 font-display text-sm font-bold text-slate-900">
                  {clientName || 'Client Name'}
                </div>
                <div className="text-xs text-slate-600 space-y-0.5 mt-1 leading-relaxed">
                  <div>{clientEmail}</div>
                  {clientAddress && <div>{clientAddress}</div>}
                  {clientGstin && <div className="font-semibold text-slate-700">GSTIN: {clientGstin}</div>}
                  {projectName && <div className="pt-1"><strong className="text-slate-700">Project:</strong> {projectName}</div>}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 ${themeStyles.headerBg}`}>
                    <th className="py-2.5 px-3 rounded-l-lg">Description</th>
                    <th className="py-2.5 px-2 text-center">Qty</th>
                    <th className="py-2.5 px-2 text-right">Rate</th>
                    {gstMode !== 'none' && <th className="py-2.5 px-2 text-right">Tax %</th>}
                    <th className="py-2.5 px-3 text-right rounded-r-lg">Amount</th>
                    <th className="py-2.5 w-6 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                  {items.map((item) => {
                    const lineSubtotal = item.qty * item.rate
                    const itemTax = gstMode === 'none' ? 0 : (lineSubtotal * (item.taxPct || 0)) / 100
                    const lineTotal = lineSubtotal + itemTax
                    return (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            placeholder="Deliverable / Item Description"
                            value={item.description}
                            onFocus={() => {
                              if (
                                item.description === 'Website Redesign & Responsive Frontend Development' ||
                                item.description === 'Performance Optimization & SEO Setup' ||
                                item.description === 'New deliverable item'
                              ) {
                                handleItemChange(item.id, 'description', '')
                              }
                            }}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            className="w-full bg-transparent font-medium text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1 -ml-1"
                          />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleItemChange(item.id, 'qty', parseFloat(e.target.value) || 0)}
                            className="w-12 text-center bg-transparent font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded"
                          />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-0.5">
                            <span>{currencySymbol}</span>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                              className="w-20 text-right bg-transparent font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded"
                            />
                          </div>
                        </td>
                        {gstMode !== 'none' && (
                          <td className="py-3 px-2 text-right">
                            <input
                              type="number"
                              value={item.taxPct}
                              onChange={(e) => handleItemChange(item.id, 'taxPct', parseFloat(e.target.value) || 0)}
                              className="w-12 text-right bg-transparent font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded"
                            />
                            %
                          </td>
                        )}
                        <td className="py-3 px-3 text-right font-bold text-slate-900">
                          {currencySymbol}
                          {lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-center no-print">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="mt-3 no-print">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/60 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add Line Item
                </button>
              </div>
            </div>

            {/* Totals & Payment Instructions Grid */}
            <div className="grid sm:grid-cols-12 gap-6 pt-4 border-t border-slate-200">
              {/* Payment Details Box */}
              <div className="sm:col-span-7 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Payment Instructions</div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 shrink-0">UPI / VPA:</span>
                  <input
                    type="text"
                    placeholder="yourname@icici"
                    value={upiId}
                    onFocus={() => {
                      if (upiId === 'yourname@icici') setUpiId('')
                    }}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="font-mono bg-transparent hover:bg-slate-50 focus:bg-white px-2 py-0.5 rounded border border-transparent hover:border-slate-200 focus:border-blue-500 text-slate-900 font-bold w-full focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    placeholder="A/C: 123456789012 • IFSC: ICIC0001234 • ICICI Bank"
                    value={bankDetails}
                    onFocus={() => {
                      if (bankDetails === 'A/C: 123456789012 • IFSC: ICIC0001234 • ICICI Bank') setBankDetails('')
                    }}
                    onChange={(e) => setBankDetails(e.target.value)}
                    className="w-full leading-relaxed bg-slate-50/80 hover:bg-slate-100/80 focus:bg-white p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 focus:border-blue-500 text-slate-700 font-medium focus:outline-none transition-all resize-none"
                  />
                </div>
                <div className="pt-2">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Notes / Terms</div>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent hover:bg-slate-50 focus:bg-white text-xs text-slate-600 focus:outline-none rounded p-1 -ml-1 border border-transparent hover:border-slate-200 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Totals Summary */}
              <div className="sm:col-span-5 flex justify-end">
                <div className="w-full max-w-xs space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900">
                      {currencySymbol}
                      {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({discountType === 'percent' ? `${discountValue}%` : 'Fixed'}):</span>
                      <span className="font-semibold">
                        -{currencySymbol}
                        {discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  {gstMode === 'cgst_sgst' && (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>CGST ({defaultTaxRate / 2}%):</span>
                        <span className="font-semibold text-slate-900">
                          {currencySymbol}
                          {(totalTax / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>SGST ({defaultTaxRate / 2}%):</span>
                        <span className="font-semibold text-slate-900">
                          {currencySymbol}
                          {(totalTax / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </>
                  )}

                  {gstMode === 'igst' && (
                    <div className="flex justify-between text-slate-600">
                      <span>IGST ({defaultTaxRate}%):</span>
                      <span className="font-semibold text-slate-900">
                        {currencySymbol}
                        {totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  {gstMode === 'custom' && totalTax > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Total Tax:</span>
                      <span className="font-semibold text-slate-900">
                        {currencySymbol}
                        {totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  <div className={`flex justify-between border-t-2 ${themeStyles.border} pt-3 text-sm font-black text-slate-900`}>
                    <span>Total Due:</span>
                    <span className={themeStyles.text}>
                      {currencySymbol}
                      {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Credit Line inside Printable Area */}
          <div className="pt-8 mt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] font-semibold text-slate-400 tracking-wide">
              Kliv∞ by Tenspick Labs
            </p>
          </div>
        </div>
      </div>

      {/* Product Highlight Features Grid (No Print) */}
      <div className="grid sm:grid-cols-4 gap-6 pt-12 border-t border-slate-200 no-print">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">Private by Design</h4>
          <p className="mt-1 text-xs text-slate-500">
            Everything runs inside your browser. Nothing you type is ever uploaded or stored.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <Sparkles className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">No Sign-up, No Watermark</h4>
          <p className="mt-1 text-xs text-slate-500">
            No account required. Create clean, single-page PDF invoices right away.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <RefreshCw className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">Remembers Your Business</h4>
          <p className="mt-1 text-xs text-slate-500">
            Your details, bank notes, and logo are saved in localStorage so you only set them once.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <CheckCircle2 className="h-6 w-6 text-blue-600 mb-2" />
          <h4 className="font-display text-sm font-bold text-navy">Free Forever Plan</h4>
          <p className="mt-1 text-xs text-slate-500">
            Automate invoicing and client tracking effortlessly with Kliv∞ by Tenspick Labs.
          </p>
        </div>
      </div>
    </div>
  )
}
