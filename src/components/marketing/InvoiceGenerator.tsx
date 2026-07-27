'use client'

import { useEffect, useRef, useState } from 'react'
import { Download, Loader2, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { InvoicePreview } from './InvoicePreview'
import {
  CURRENCIES,
  computeTotals,
  emptyItem,
  emptySection,
  emptySeedInvoice,
  extractSenderProfile,
  newInvoiceWithSender,
  saveSenderProfile,
  type CustomSection,
  type InvoiceData,
  type InvoiceItem,
} from '@/lib/invoice'

const inputClass =
  'h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60'
const labelClass = 'mb-0.5 block text-[11px] font-medium text-gray-500 uppercase tracking-wide'

function TextField({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={inputClass} {...props} />
    </div>
  )
}

function toNumber(raw: string): number {
  const n = Number(raw)
  return Number.isNaN(n) ? 0 : n
}

export function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData>(emptySeedInvoice)
  const [hydrated, setHydrated] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)

  // Restore the visitor's remembered business details (only) once we're on
  // the client — kept out of the initial render so server and first client
  // paint match exactly (no Date/Math.random in useState). `hydrated` is
  // state (not a ref) on purpose: the save effect below closes over it from
  // the *same* render as the initial seed, so it must only flip to true on
  // the next render — a ref would already read true in that first effect
  // flush and let the save effect persist the empty seed, wiping out
  // whatever business details were previously saved.
  useEffect(() => {
    setInvoice(newInvoiceWithSender())
    setHydrated(true)
  }, [])

  // Deliberately scoped to just the sender fields (not the whole `invoice`
  // object) — saving on every keystroke in toName/items/notes would work, but
  // would also mean writing to localStorage far more often than necessary.
  const senderProfile = extractSenderProfile(invoice)
  const senderProfileKey = JSON.stringify(senderProfile)
  useEffect(() => {
    if (!hydrated) return
    saveSenderProfile(senderProfile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, senderProfileKey])

  function updateField<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setInvoice((prev) => ({ ...prev, [key]: value }))
  }

  function updateItem(id: string, patch: Partial<InvoiceItem>) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }))
  }

  function addItem() {
    setInvoice((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }))
  }

  function removeItem(id: string) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }))
  }

  function addSection() {
    setInvoice((prev) => ({
      ...prev,
      customSections: [...prev.customSections, emptySection()],
    }))
  }

  function updateSection(id: string, patch: Partial<CustomSection>) {
    setInvoice((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  }

  function removeSection(id: string) {
    setInvoice((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
    }))
  }

  function handleNewInvoice() {
    setDownloadError('')
    setInvoice(newInvoiceWithSender())
  }

  async function handleDownload() {
    const node = previewRef.current
    if (!node || downloading) return

    setDownloading(true)
    setDownloadError('')
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      })

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      const pageWidthMm = pdf.internal.pageSize.getWidth()
      const pageHeightMm = pdf.internal.pageSize.getHeight()
      const pxPerMm = canvas.width / pageWidthMm
      const pageHeightPx = Math.floor(pageHeightMm * pxPerMm)

      let renderedPx = 0
      let pageIndex = 0
      while (renderedPx < canvas.height) {
        const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedPx)
        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = canvas.width
        sliceCanvas.height = sliceHeightPx
        const ctx = sliceCanvas.getContext('2d')
        if (!ctx) break
        ctx.drawImage(
          canvas,
          0,
          renderedPx,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          canvas.width,
          sliceHeightPx
        )

        if (pageIndex > 0) pdf.addPage()
        // jsPDF stores images essentially uncompressed unless told otherwise —
        // 'SLOW' applies real compression. Worth the extra CPU time here since
        // this only runs once, on an explicit user click, and cuts the file
        // from several MB down to well under a megabyte.
        pdf.addImage(
          sliceCanvas.toDataURL('image/png'),
          'PNG',
          0,
          0,
          pageWidthMm,
          sliceHeightPx / pxPerMm,
          undefined,
          'SLOW'
        )

        renderedPx += sliceHeightPx
        pageIndex += 1
      }

      // Add clickable links to the PDF for the logo and footer
      const scale = 2
      const addPdfLink = (elementId: string) => {
        const el = node?.querySelector(`#${elementId}`)
        if (!el || !node) return
        
        const elRect = el.getBoundingClientRect()
        const nodeRect = node.getBoundingClientRect()
        
        // Coordinates in scaled canvas pixels
        const xPx = (elRect.left - nodeRect.left) * scale
        const yPx = (elRect.top - nodeRect.top) * scale
        const wPx = elRect.width * scale
        const hPx = elRect.height * scale
        
        // Convert to mm
        const xMm = xPx / pxPerMm
        const yMm = yPx / pxPerMm
        const wMm = wPx / pxPerMm
        const hMm = hPx / pxPerMm
        
        // Determine which page the link falls on (1-indexed)
        const linkPageIndex = Math.floor(yMm / pageHeightMm) + 1
        if (linkPageIndex <= pdf.getNumberOfPages()) {
          pdf.setPage(linkPageIndex)
          const pageYMm = yMm - ((linkPageIndex - 1) * pageHeightMm)
          pdf.link(xMm, pageYMm, wMm, hMm, { url: 'https://kliv∞.in' })
        }
      }
      
      addPdfLink('pdf-logo-link')
      addPdfLink('pdf-footer-link')

      // Revert back to the last page just in case
      pdf.setPage(pdf.getNumberOfPages())

      const filename = invoice.invoiceNumber.trim().replace(/[^\w.-]+/g, '_') || 'invoice'
      pdf.save(`${filename}.pdf`)
    } catch (err) {
      console.error('Failed to generate invoice PDF', err)
      setDownloadError('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const { total } = computeTotals(invoice.items)

  return (
    <div>
      {/* Toolbar — sticky so it's always reachable, even deep in a long form */}
      <div className="sticky top-16 z-30 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/95 px-5 py-2.5 shadow-soft backdrop-blur">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {invoice.invoiceNumber || 'New invoice'}
          </p>
          <p className="text-[11px] text-gray-500">
            Your business details are remembered in this browser — nothing is uploaded anywhere.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleNewInvoice}
            className="press inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <RotateCcw className="h-3.5 w-3.5" /> New invoice
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="press inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {downloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {downloadError && (
        <p className="mb-4 text-sm font-medium text-red-600" role="alert">
          {downloadError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[420px_1fr] xl:grid-cols-[460px_1fr] lg:items-start">
        {/* Form — compact layout: business + invoice details share one row */}
        <div className="space-y-3 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-1 no-scrollbar">
          {/* Row 1: Your business + Invoice details side-by-side */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Your business card */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="font-display text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Your business
              </h2>
              <div className="mt-2.5 space-y-2">
                <TextField
                  id="from-name"
                  label="Name"
                  placeholder="Business or brand"
                  value={invoice.fromName}
                  onChange={(e) => updateField('fromName', e.target.value)}
                />
                <TextField
                  id="from-email"
                  label="Email"
                  type="email"
                  placeholder="you@business.com"
                  value={invoice.fromEmail}
                  onChange={(e) => updateField('fromEmail', e.target.value)}
                />
                <TextField
                  id="from-phone"
                  label="Phone"
                  type="tel"
                  placeholder="Phone number"
                  value={invoice.fromPhone}
                  onChange={(e) => updateField('fromPhone', e.target.value)}
                />
                <TextField
                  id="from-address"
                  label="Address"
                  placeholder="City, country"
                  value={invoice.fromAddress}
                  onChange={(e) => updateField('fromAddress', e.target.value)}
                />
              </div>
            </div>

            {/* Invoice details card */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="font-display text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Invoice details
              </h2>
              <div className="mt-2.5 space-y-2">
                <TextField
                  id="invoice-number"
                  label="Invoice #"
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateField('invoiceNumber', e.target.value)}
                />
                <TextField
                  id="issue-date"
                  label="Issue date"
                  type="date"
                  value={invoice.issueDate}
                  onChange={(e) => updateField('issueDate', e.target.value)}
                />
                <TextField
                  id="project-name"
                  label="Project"
                  placeholder="e.g. Website redesign"
                  value={invoice.projectName}
                  onChange={(e) => updateField('projectName', e.target.value)}
                />
                <div>
                  <label htmlFor="currency" className={labelClass}>
                    Currency
                  </label>
                  <select
                    id="currency"
                    className={inputClass}
                    value={invoice.currency}
                    onChange={(e) => updateField('currency', e.target.value)}
                  >
                    {CURRENCIES.map((cur) => (
                      <option key={cur.symbol} value={cur.symbol}>
                        {cur.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bill to */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <h2 className="font-display text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Bill to
            </h2>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
              <TextField
                id="to-name"
                label="Client name"
                placeholder="Client or company"
                value={invoice.toName}
                onChange={(e) => updateField('toName', e.target.value)}
              />
              <TextField
                id="to-email"
                label="Email"
                type="email"
                placeholder="client@email.com"
                value={invoice.toEmail}
                onChange={(e) => updateField('toEmail', e.target.value)}
              />
              <TextField
                id="to-phone"
                label="Phone"
                type="tel"
                placeholder="Phone number"
                value={invoice.toPhone}
                onChange={(e) => updateField('toPhone', e.target.value)}
              />
            </div>
          </div>

          {/* Items */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Line items
              </h2>
              <span className="text-xs font-bold text-gray-500 tabular-nums">
                Total: {invoice.currency}
                {total.toFixed(2)}
              </span>
            </div>

            <div className="mt-2.5 space-y-2.5">
              {invoice.items.map((item, idx) => {
                const labelOrSr = idx === 0 ? labelClass : 'sr-only'
                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-50 bg-gray-50/50 p-2.5"
                  >
                    <label htmlFor={`item-${item.id}-description`} className={labelOrSr}>
                      Description
                    </label>
                    <input
                      id={`item-${item.id}-description`}
                      className={inputClass}
                      placeholder="What did you deliver?"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    />

                    <div className="mt-1.5 grid grid-cols-[1fr_1fr_1fr_2rem] gap-1.5">
                      <div>
                        <label htmlFor={`item-${item.id}-qty`} className={labelOrSr}>
                          Qty
                        </label>
                        <input
                          id={`item-${item.id}-qty`}
                          type="number"
                          min={0}
                          step="any"
                          className={`no-spinner ${inputClass}`}
                          placeholder="Qty"
                          value={item.qty}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) => updateItem(item.id, { qty: toNumber(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label htmlFor={`item-${item.id}-rate`} className={labelOrSr}>
                          Rate
                        </label>
                        <input
                          id={`item-${item.id}-rate`}
                          type="number"
                          min={0}
                          step="any"
                          className={`no-spinner ${inputClass}`}
                          placeholder="Rate"
                          value={item.rate}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) =>
                            updateItem(item.id, { rate: toNumber(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor={`item-${item.id}-tax`} className={labelOrSr}>
                          Tax %
                        </label>
                        <input
                          id={`item-${item.id}-tax`}
                          type="number"
                          min={0}
                          step="any"
                          className={`no-spinner ${inputClass}`}
                          placeholder="Tax %"
                          value={item.taxPercent}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) =>
                            updateItem(item.id, { taxPercent: toNumber(e.target.value) })
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        {idx === 0 && <div className={labelClass}>&nbsp;</div>}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={invoice.items.length === 1}
                          aria-label="Remove item"
                          className="flex h-9 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:pointer-events-none disabled:opacity-30"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="press mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-3.5 w-3.5" /> Add item
            </button>
          </div>

          {/* Custom sections */}
          {invoice.customSections.map((section) => (
            <div key={section.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  Custom section
                </h2>
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  aria-label="Remove section"
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2.5 space-y-2">
                <TextField
                  id={`section-${section.id}-title`}
                  label="Title"
                  placeholder="e.g. Payment terms"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                />
                <div>
                  <label htmlFor={`section-${section.id}-content`} className={labelClass}>
                    Content
                  </label>
                  <textarea
                    id={`section-${section.id}-content`}
                    rows={2}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Section content..."
                    value={section.content}
                    onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Notes + Add section */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <h2 id="notes-heading" className="font-display text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Notes
            </h2>
            <textarea
              aria-labelledby="notes-heading"
              rows={2}
              className="mt-2.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={addSection}
            className="press w-full inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 bg-white/50 py-2.5 text-xs font-semibold text-gray-500 transition-all hover:border-orange-300 hover:text-blue-600 hover:bg-blue-50/30"
          >
            <Plus className="h-3.5 w-3.5" /> Add custom section
          </button>

          {/* Spacer for bottom padding */}
          <div className="h-4" />
        </div>

        {/* Live preview — interactive: user can click directly to edit */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-2 flex items-center gap-2 text-[11px] text-gray-400 font-medium">
            <span className="h-px flex-1 bg-gray-100" />
            <span>Click directly on the invoice to edit • Changes sync both ways</span>
            <span className="h-px flex-1 bg-gray-100" />
          </div>
          <InvoicePreview
            ref={previewRef}
            data={invoice}
            onUpdate={updateField}
            onUpdateItem={updateItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onAddSection={addSection}
            onUpdateSection={updateSection}
            onRemoveSection={removeSection}
          />
        </div>
      </div>
    </div>
  )
}
