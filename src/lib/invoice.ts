/**
 * Pure data model + helpers for the free /invoice generator. No network calls,
 * no server storage — everything here is designed to run entirely client-side
 * so a visitor can create and download an invoice with no account.
 */

export type InvoiceItem = {
  id: string
  description: string
  qty: number
  rate: number
  taxPercent: number
}

export type CustomSection = {
  id: string
  title: string
  content: string
}

export type InvoiceData = {
  fromName: string
  fromEmail: string
  fromPhone: string
  fromAddress: string
  toName: string
  toEmail: string
  toPhone: string
  invoiceNumber: string
  issueDate: string // yyyy-mm-dd, i.e. an <input type="date"> value
  projectName: string
  currency: string
  notes: string
  items: InvoiceItem[]
  customSections: CustomSection[]
}

export const CURRENCIES = [
  { symbol: '₹', label: '₹ INR' },
  { symbol: '$', label: '$ USD' },
  { symbol: '€', label: '€ EUR' },
  { symbol: '£', label: '£ GBP' },
] as const

/** The subset of InvoiceData that belongs to the user's own business, not a
 *  specific client or invoice — the only part worth remembering between visits. */
export type SenderProfile = {
  fromName: string
  fromEmail: string
  fromPhone: string
  fromAddress: string
  currency: string
}

const SENDER_STORAGE_KEY = 'klivoo_invoice_sender'

function makeId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function emptyItem(): InvoiceItem {
  return { id: makeId(), description: '', qty: 1, rate: 0, taxPercent: 0 }
}

export function emptySection(): CustomSection {
  return { id: makeId(), title: '', content: '' }
}

/** Deterministic, SSR-safe seed — no Date/random, so server and first client render match. */
export function emptySeedInvoice(): InvoiceData {
  return {
    fromName: '',
    fromEmail: '',
    fromPhone: '',
    fromAddress: '',
    toName: '',
    toEmail: '',
    toPhone: '',
    invoiceNumber: '',
    issueDate: '',
    projectName: '',
    currency: '₹',
    notes: 'Thank you for your business.',
    items: [{ id: 'seed', description: '', qty: 1, rate: 0, taxPercent: 0 }],
    customSections: [],
  }
}

/** Real defaults (today's date, a fresh invoice number) — only ever called client-side. */
export function defaultInvoice(): InvoiceData {
  return {
    ...emptySeedInvoice(),
    invoiceNumber: generateInvoiceNumber(),
    issueDate: toDateInputValue(new Date()),
    items: [emptyItem()],
    customSections: [],
  }
}

export function generateInvoiceNumber(): string {
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  const suffix = Math.floor(100 + Math.random() * 900)
  return `INV-${y}${m}${d}-${suffix}`
}

export function toDateInputValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** "2026-07-09" -> "09/07/2026", matching the product's invoice template. */
export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return ''
  return `${d}/${m}/${y}`
}

export function formatMoney(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

export function computeTotals(items: InvoiceItem[]) {
  let subtotal = 0
  let taxTotal = 0
  for (const item of items) {
    const lineAmount = item.qty * item.rate
    subtotal += lineAmount
    taxTotal += lineAmount * (item.taxPercent / 100)
  }
  return { subtotal, taxTotal, total: subtotal + taxTotal }
}

export function extractSenderProfile(data: InvoiceData): SenderProfile {
  return {
    fromName: data.fromName,
    fromEmail: data.fromEmail,
    fromPhone: data.fromPhone,
    fromAddress: data.fromAddress,
    currency: data.currency,
  }
}

/** A fresh invoice (new number, today's date, blank client/items) with the
 *  visitor's own remembered business details filled back in, if any. */
export function newInvoiceWithSender(): InvoiceData {
  return { ...defaultInvoice(), ...(loadSenderProfile() ?? {}) }
}

export function loadSenderProfile(): SenderProfile | null {
  try {
    const raw = localStorage.getItem(SENDER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as SenderProfile
  } catch {
    return null
  }
}

export function saveSenderProfile(profile: SenderProfile) {
  try {
    localStorage.setItem(SENDER_STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // Storage full or unavailable (e.g. private browsing) — it just won't be
    // remembered next time; nothing critical is lost.
  }
}
