'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { InvoiceData, InvoiceItem, CustomSection } from '@/lib/invoice'
import { computeTotals, formatDisplayDate, formatMoney, emptyItem, emptySection } from '@/lib/invoice'

const DOC_WIDTH = 720

/* ── Editable text helper ─────────────────────────────────────────────
   Renders text that becomes an inline input on click. Falls back to a
   placeholder when empty so the user always has something to click. */

function EditableText({
  value,
  placeholder,
  onChange,
  className = '',
  inputClassName = '',
  as: Tag = 'span',
  type = 'text',
  multiline = false,
}: {
  value: string
  placeholder: string
  onChange: (v: string) => void
  className?: string
  inputClassName?: string
  as?: 'span' | 'p' | 'h1'
  type?: string
  multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing && ref.current) ref.current.focus()
  }, [editing])

  if (editing) {
    const shared = {
      ref: ref as any,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.value),
      onBlur: () => setEditing(false),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) setEditing(false)
      },
      className: `bg-transparent border-none outline-none ring-1 ring-orange-400/60 rounded px-1 -mx-1 ${inputClassName} ${className}`,
      style: { width: '100%', font: 'inherit', color: 'inherit', letterSpacing: 'inherit' } as React.CSSProperties,
      type,
    }
    if (multiline) return <textarea {...shared} rows={3} />
    return <input {...shared} />
  }

  const display = value || placeholder
  const isPlaceholder = !value

  return (
    <Tag
      onClick={() => setEditing(true)}
      className={`cursor-text rounded px-1 -mx-1 transition-colors hover:bg-blue-50/70 hover:ring-1 hover:ring-blue-200 ${className} ${isPlaceholder ? 'text-slate-300 italic' : ''}`}
      title="Click to edit"
    >
      {display}
    </Tag>
  )
}


/**
 * The actual invoice document — same layout as Kliv∞'s in-app invoice PDF.
 * Now interactive: every text field can be clicked directly to edit.
 * The logo is a plain <img>, not next/image: html2canvas requires it.
 */
function InvoiceDocument({
  data,
  innerRef,
  interactive = false,
  onUpdate,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
}: {
  data: InvoiceData
  innerRef?: (node: HTMLDivElement | null) => void
  interactive?: boolean
  onUpdate?: <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => void
  onUpdateItem?: (id: string, patch: Partial<InvoiceItem>) => void
  onAddItem?: () => void
  onRemoveItem?: (id: string) => void
  onAddSection?: () => void
  onUpdateSection?: (id: string, patch: Partial<CustomSection>) => void
  onRemoveSection?: (id: string) => void
}) {
  const { subtotal, taxTotal, total } = computeTotals(data.items)
  const c = data.currency
  const canEdit = interactive && onUpdate

  return (
    <div
      ref={innerRef}
      className={`flex min-h-[1018px] w-[720px] flex-col bg-white text-slate-900`}
    >
      <div className="flex-1 p-14">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div id="pdf-logo-link" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Kliv∞ logo" width={48} height={48} className="h-12 w-12" />
            <div className="ml-3">
              <p className="font-display text-xl font-extrabold leading-none text-slate-900">
                Kliv∞
              </p>
              <p className="mt-1.5 text-[11px] text-slate-400">Professional Project Management</p>
            </div>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900">
            INVOICE
          </h1>
        </div>

        <div className="mt-6 border-t border-slate-100" />

        {/* From + invoice meta */}
        <div className="mt-7 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">From</p>
            <div className="mt-2 text-[15px] font-bold text-slate-900">
              {canEdit ? <EditableText value={String(data.fromName || '')} placeholder="Your business name" onChange={(v) => onUpdate!('fromName', v)} className="text-[15px] font-bold" /> : (data.fromName || 'Your business name')}
            </div>
            <div className="mt-1 text-[13px] text-slate-500">
              {canEdit ? <EditableText value={String(data.fromEmail || '')} placeholder="you@business.com" onChange={(v) => onUpdate!('fromEmail', v)} className="text-[13px]" /> : (data.fromEmail && <p>{data.fromEmail}</p>)}
            </div>
            <div className="mt-1 text-[13px] text-slate-500">
              {canEdit ? <EditableText value={String(data.fromPhone || '')} placeholder="Phone number" onChange={(v) => onUpdate!('fromPhone', v)} className="text-[13px]" /> : (data.fromPhone && <p>{data.fromPhone}</p>)}
            </div>
            <div className="mt-1 text-[13px] text-slate-500">
              {canEdit ? <EditableText value={String(data.fromAddress || '')} placeholder="City, country" onChange={(v) => onUpdate!('fromAddress', v)} className="text-[13px]" /> : (data.fromAddress && <p>{data.fromAddress}</p>)}
            </div>
          </div>

          <div className="min-w-[220px] rounded-lg bg-slate-50 px-5 py-4">
            <p className="text-[11px] text-slate-400">Invoice Number</p>
            <div className="mt-1 text-[13px] font-bold text-slate-900">
              {canEdit ? <EditableText value={String(data.invoiceNumber || '')} placeholder="INV-XXXXXXX" onChange={(v) => onUpdate!('invoiceNumber', v)} className="text-[13px] font-bold" /> : (data.invoiceNumber || '—')}
            </div>
            <p className="mt-3 text-[11px] text-slate-400">Issue Date</p>
            <div className="mt-1 text-[13px] font-bold text-slate-900">
              {interactive && onUpdate ? (
                <EditableText
                  value={data.issueDate}
                  placeholder="YYYY-MM-DD"
                  onChange={(v) => onUpdate('issueDate', v)}
                  className="text-[13px] font-bold"
                  type="date"
                />
              ) : (
                formatDisplayDate(data.issueDate) || '—'
              )}
            </div>
          </div>
        </div>

        {/* Bill to */}
        <div className="mt-7">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Bill To</p>
          <div className="mt-2 text-[15px] font-bold text-slate-900">
            {canEdit ? <EditableText value={String(data.toName || '')} placeholder="Client name" onChange={(v) => onUpdate!('toName', v)} className="text-[15px] font-bold" /> : (data.toName || 'Client name')}
          </div>
          <div className="mt-1 text-[13px] text-slate-500">
            {canEdit ? <EditableText value={String(data.toEmail || '')} placeholder="client@email.com" onChange={(v) => onUpdate!('toEmail', v)} className="text-[13px]" /> : (data.toEmail && <p>{data.toEmail}</p>)}
          </div>
          <div className="mt-1 text-[13px] text-slate-500">
            {canEdit ? <EditableText value={String(data.toPhone || '')} placeholder="Phone number" onChange={(v) => onUpdate!('toPhone', v)} className="text-[13px]" /> : (data.toPhone && <p>{data.toPhone}</p>)}
          </div>
        </div>

        {/* Project banner */}
        {(data.projectName || interactive) && (
          <div className="mt-7 rounded-r-md border-l-4 border-blue-500 bg-amber-50 px-5 py-3">
            <p className="text-[13px] text-slate-700">
              <span className="font-semibold">Project:</span>{' '}
              {canEdit ? (
                <EditableText value={String(data.projectName || '')} placeholder="e.g. Website redesign" onChange={(v) => onUpdate!('projectName', v)} className="text-[13px] font-bold" />
              ) : (
                <span className="font-bold">{data.projectName}</span>
              )}
            </p>
          </div>
        )}

        {/* Line items */}
        <table className="mt-8 w-full border-collapse text-left">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide">
                Description
              </th>
              <th className="px-3 py-3 text-right text-[11px] font-bold uppercase tracking-wide">
                Qty
              </th>
              <th className="px-3 py-3 text-right text-[11px] font-bold uppercase tracking-wide">
                Rate
              </th>
              <th className="px-3 py-3 text-right text-[11px] font-bold uppercase tracking-wide">
                Tax %
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide">
                Amount
              </th>
              {interactive && (
                <th className="w-8 px-1 py-3 text-[11px]" />
              )}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 group">
                <td className="px-4 py-3 text-[13px] font-medium text-slate-800">
                  {interactive && onUpdateItem ? (
                    <EditableText
                      value={item.description}
                      placeholder="What did you deliver?"
                      onChange={(v) => onUpdateItem(item.id, { description: v })}
                      className="text-[13px] font-medium"
                    />
                  ) : (
                    item.description || '—'
                  )}
                </td>
                <td className="px-3 py-3 text-right text-[13px] text-slate-600">
                  {interactive && onUpdateItem ? (
                    <EditableText
                      value={String(item.qty)}
                      placeholder="1"
                      onChange={(v) => onUpdateItem(item.id, { qty: Number(v) || 0 })}
                      className="text-[13px] text-right"
                    />
                  ) : (
                    item.qty.toFixed(2)
                  )}
                </td>
                <td className="px-3 py-3 text-right text-[13px] text-slate-600">
                  {interactive && onUpdateItem ? (
                    <>
                      {c}
                      <EditableText
                        value={String(item.rate)}
                        placeholder="0"
                        onChange={(v) => onUpdateItem(item.id, { rate: Number(v) || 0 })}
                        className="text-[13px] text-right"
                      />
                    </>
                  ) : (
                    <>{c}{formatMoney(item.rate)}</>
                  )}
                </td>
                <td className="px-3 py-3 text-right text-[13px] text-slate-600">
                  {interactive && onUpdateItem ? (
                    <>
                      <EditableText
                        value={String(item.taxPercent)}
                        placeholder="0"
                        onChange={(v) => onUpdateItem(item.id, { taxPercent: Number(v) || 0 })}
                        className="text-[13px] text-right"
                      />
                      %
                    </>
                  ) : (
                    <>{item.taxPercent.toFixed(2)}%</>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-[13px] font-semibold text-slate-900">
                  {c}
                  {formatMoney(item.qty * item.rate)}
                </td>
                {interactive && (
                  <td className="px-1 py-3">
                    <button
                      type="button"
                      onClick={() => onRemoveItem?.(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-opacity p-1 rounded"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add item (interactive only) */}
        {interactive && onAddItem && (
          <button
            type="button"
            onClick={onAddItem}
            className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add line item
          </button>
        )}

        {/* Totals */}
        <div className="mt-4 flex justify-end">
          <div className="w-64">
            <div className="flex items-center justify-between py-1.5 text-[13px]">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-700">
                {c}
                {formatMoney(subtotal)}
              </span>
            </div>
            {taxTotal > 0 && (
              <div className="flex items-center justify-between py-1.5 text-[13px]">
                <span className="text-slate-500">Tax</span>
                <span className="font-medium text-slate-700">
                  {c}
                  {formatMoney(taxTotal)}
                </span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between rounded-md bg-blue-600 px-4 py-3">
              <span className="text-[13px] font-bold uppercase tracking-wide text-white">
                Total
              </span>
              <span className="text-[15px] font-extrabold text-white">
                {c}
                {formatMoney(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Custom sections */}
        {data.customSections.map((section) => (
          <div key={section.id} className="mt-8 group/section relative">
            {interactive && onRemoveSection && (
              <button
                type="button"
                onClick={() => onRemoveSection(section.id)}
                className="absolute -right-2 -top-2 opacity-0 group-hover/section:opacity-100 bg-white border border-slate-200 text-slate-400 hover:text-red-500 rounded-full p-1 shadow-sm transition-all"
                title="Remove section"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
            <div className="text-[13px] font-bold text-slate-800">
              {interactive && onUpdateSection ? (
                <EditableText
                  value={section.title}
                  placeholder="Section title"
                  onChange={(v) => onUpdateSection(section.id, { title: v })}
                  className="text-[13px] font-bold"
                />
              ) : (
                section.title || 'Untitled section'
              )}
            </div>
            <div className="mt-1 max-w-md text-[13px] leading-relaxed text-slate-500">
              {interactive && onUpdateSection ? (
                <EditableText
                  value={section.content}
                  placeholder="Section content..."
                  onChange={(v) => onUpdateSection(section.id, { content: v })}
                  className="text-[13px]"
                  multiline
                />
              ) : (
                section.content
              )}
            </div>
          </div>
        ))}

        {/* Add section (interactive only) */}
        {interactive && onAddSection && (
          <button
            type="button"
            onClick={onAddSection}
            className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-500 hover:text-blue-600 transition-colors rounded-lg border border-dashed border-blue-200 hover:border-orange-400 px-3 py-2 hover:bg-blue-50/50"
          >
            <Plus className="h-3.5 w-3.5" /> Add section
          </button>
        )}

        {/* Notes */}
        {(data.notes || interactive) && (
          <div className="mt-10">
            <p className="text-[13px] font-bold text-slate-800">Notes</p>
            <div className="mt-1 max-w-md text-[13px] leading-relaxed text-slate-500">
              {canEdit ? (
                <EditableText value={String(data.notes || '')} placeholder="Thank you for your business." onChange={(v) => onUpdate!('notes', v)} className="text-[13px]" multiline />
              ) : (
                data.notes
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer — pinned to the bottom of the page, matching the print template */}
      <div className="mt-auto">
        <div id="pdf-footer-link" className="pb-6 text-center">
          <p className="text-[12px] font-semibold text-slate-400">Generated via Kliv∞</p>
          <p className="mt-0.5 text-[11px] text-slate-300">
            Professional project management for freelancers and agencies
          </p>
        </div>
        <div className="h-1.5 w-full bg-blue-600" />
      </div>
    </div>
  )
}

/**
 * Wraps <InvoiceDocument> with a shrink-to-fit thumbnail for on-screen display,
 * plus a full-size off-screen copy that's the real PDF capture target (via the
 * forwarded ref). The two are decoupled on purpose — CSS transform: scale()
 * changes how the visible copy *paints*, but html2canvas needs to capture an
 * element at its true, unscaled layout size, or the export comes out shrunk
 * and blurry. Keeping the capture node off-screen and always at natural size
 * sidesteps that entirely, regardless of how small the thumbnail gets.
 */
export const InvoicePreview = forwardRef<
  HTMLDivElement,
  {
    data: InvoiceData
    onUpdate?: <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => void
    onUpdateItem?: (id: string, patch: Partial<InvoiceItem>) => void
    onAddItem?: () => void
    onRemoveItem?: (id: string) => void
    onAddSection?: () => void
    onUpdateSection?: (id: string, patch: Partial<CustomSection>) => void
    onRemoveSection?: (id: string) => void
  }
>(function InvoicePreview(
  { data, onUpdate, onUpdateItem, onAddItem, onRemoveItem, onAddSection, onUpdateSection, onRemoveSection },
  forwardedRef,
) {
  const slotRef = useRef<HTMLDivElement>(null)
  const captureNodeRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [docHeight, setDocHeight] = useState(1018)

  const setCaptureRef = (node: HTMLDivElement | null) => {
    captureNodeRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useEffect(() => {
    const slot = slotRef.current
    const doc = captureNodeRef.current
    if (!slot || !doc) return

    const recompute = () => {
      const naturalHeight = doc.offsetHeight
      if (!naturalHeight) return
      setDocHeight(naturalHeight)

      // Scale to fit width only — vertical overflow is scrollable
      const containerPadding = 24 // p-3 on each side = 12*2
      const availableWidth = slot.clientWidth - containerPadding
      const widthScale = availableWidth > 0 ? availableWidth / DOC_WIDTH : 1

      setScale(Math.min(1, widthScale))
    }

    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(slot)
    ro.observe(doc)
    window.addEventListener('resize', recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [data])

  const isInteractive = !!(onUpdate && onUpdateItem)

  return (
    <div
      ref={slotRef}
      className="flex w-full items-start justify-center overflow-auto rounded-2xl border border-stone-200/70 bg-stone-100/60 p-3 shadow-soft-lg lg:max-h-[calc(100vh-11rem)]"
    >
      <div style={{ width: DOC_WIDTH * scale, height: docHeight * scale }}>
        <div style={{ width: DOC_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <InvoiceDocument
            data={data}
            interactive={isInteractive}
            onUpdate={onUpdate}
            onUpdateItem={onUpdateItem}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onAddSection={onAddSection}
            onUpdateSection={onUpdateSection}
            onRemoveSection={onRemoveSection}
          />
        </div>
      </div>

      {/* Off-screen, full-size, always-unscaled copy — the real PDF source. */}
      <div style={{ position: 'fixed', top: 0, left: -99999 }} aria-hidden="true">
        <InvoiceDocument data={data} innerRef={setCaptureRef} />
      </div>
    </div>
  )
})
