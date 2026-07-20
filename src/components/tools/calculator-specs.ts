/**
 * Formula specs for the free calculator tools. Each spec is pure data + a
 * `compute` function; the generic <CalculatorTool> renders the inputs and
 * outputs. Kept in one client-imported module so the maths lives in one place
 * and is easy to audit. All money is in ₹ (INR).
 */

export type CalcField = {
  key: string
  label: string
  kind: 'number' | 'select'
  default: number
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  options?: { label: string; value: number }[]
  help?: string
}

export type CalcOutput = {
  key: string
  label: string
  format: 'inr' | 'number' | 'percent' | 'hours'
  primary?: boolean
  help?: string
}

export type CalcSpec = {
  fields: CalcField[]
  outputs: CalcOutput[]
  compute: (v: Record<string, number>) => Record<string, number>
  /** Small print under the tool (e.g. "verify current TDS rates"). */
  note?: string
}

const safe = (n: number) => (Number.isFinite(n) ? n : 0)

export const CALCULATOR_SPECS: Record<string, CalcSpec> = {
  'freelance-rate-calculator': {
    fields: [
      { key: 'income', label: 'Take-home income you want', kind: 'number', default: 1200000, min: 0, step: 10000, prefix: '₹', help: 'What you want to earn in a year, after business costs.' },
      { key: 'expenses', label: 'Yearly business expenses', kind: 'number', default: 150000, min: 0, step: 5000, prefix: '₹', help: 'Software, internet, equipment, subscriptions, etc.' },
      { key: 'hoursPerWeek', label: 'Billable hours per week', kind: 'number', default: 25, min: 1, max: 80, step: 1, suffix: 'hrs', help: 'Actual client-billable hours — not total hours worked.' },
      { key: 'weeks', label: 'Working weeks per year', kind: 'number', default: 46, min: 1, max: 52, step: 1, suffix: 'wks', help: 'Subtract holidays, leave, and sick days.' },
      { key: 'buffer', label: 'Safety buffer / profit', kind: 'number', default: 15, min: 0, max: 100, step: 1, suffix: '%', help: 'Covers unpaid gaps, taxes headroom, and profit.' },
    ],
    outputs: [
      { key: 'hourly', label: 'Suggested hourly rate', format: 'inr', primary: true },
      { key: 'day', label: 'Suggested day rate', format: 'inr', help: 'Based on 8 billable hours.' },
      { key: 'revenue', label: 'Annual revenue target', format: 'inr' },
      { key: 'billableHours', label: 'Billable hours / year', format: 'hours' },
    ],
    compute: (v) => {
      const revenue = (safe(v.income) + safe(v.expenses)) * (1 + safe(v.buffer) / 100)
      const billableHours = safe(v.hoursPerWeek) * safe(v.weeks)
      const hourly = billableHours > 0 ? revenue / billableHours : 0
      return { hourly, day: hourly * 8, revenue, billableHours }
    },
    note: 'A starting point, not a ceiling — price on the value you deliver, and raise rates as you gain proof and demand.',
  },

  'project-cost-calculator': {
    fields: [
      { key: 'hours', label: 'Estimated hours', kind: 'number', default: 40, min: 0, step: 1, suffix: 'hrs' },
      { key: 'rate', label: 'Your hourly rate', kind: 'number', default: 1000, min: 0, step: 50, prefix: '₹' },
      { key: 'materials', label: 'Materials / other costs', kind: 'number', default: 5000, min: 0, step: 500, prefix: '₹', help: 'Stock assets, tools, subcontractors, hosting, etc.' },
      { key: 'contingency', label: 'Contingency buffer', kind: 'number', default: 15, min: 0, max: 100, step: 1, suffix: '%', help: 'For scope surprises and revisions.' },
      { key: 'margin', label: 'Target profit margin', kind: 'number', default: 25, min: 0, max: 90, step: 1, suffix: '%' },
    ],
    outputs: [
      { key: 'price', label: 'Suggested quote', format: 'inr', primary: true },
      { key: 'cost', label: 'Your total cost', format: 'inr' },
      { key: 'profit', label: 'Your profit', format: 'inr' },
    ],
    compute: (v) => {
      const labor = safe(v.hours) * safe(v.rate)
      const base = labor + safe(v.materials)
      const cost = base * (1 + safe(v.contingency) / 100)
      const m = Math.min(safe(v.margin), 89) / 100
      const price = m < 1 ? cost / (1 - m) : cost
      return { price, cost, profit: price - cost }
    },
  },

  'gst-calculator': {
    fields: [
      { key: 'amount', label: 'Amount', kind: 'number', default: 10000, min: 0, step: 100, prefix: '₹' },
      { key: 'rate', label: 'GST rate', kind: 'select', default: 18, options: [
        { label: '0%', value: 0 },
        { label: '5%', value: 5 },
        { label: '12%', value: 12 },
        { label: '18%', value: 18 },
        { label: '28%', value: 28 },
      ] },
      { key: 'mode', label: 'Direction', kind: 'select', default: 0, options: [
        { label: 'Add GST (amount is pre-GST)', value: 0 },
        { label: 'Remove GST (amount includes GST)', value: 1 },
      ] },
    ],
    outputs: [
      { key: 'total', label: 'Total (incl. GST)', format: 'inr', primary: true },
      { key: 'base', label: 'Net amount', format: 'inr' },
      { key: 'gst', label: 'GST amount', format: 'inr' },
      { key: 'cgst', label: 'CGST', format: 'inr' },
      { key: 'sgst', label: 'SGST', format: 'inr' },
    ],
    compute: (v) => {
      const rate = safe(v.rate) / 100
      const amount = safe(v.amount)
      let base: number
      let total: number
      if (safe(v.mode) === 1) {
        base = 1 + rate > 0 ? amount / (1 + rate) : amount
        total = amount
      } else {
        base = amount
        total = amount * (1 + rate)
      }
      const gst = total - base
      return { total, base, gst, cgst: gst / 2, sgst: gst / 2 }
    },
    note: 'CGST/SGST applies within a state; for inter-state supply it is a single IGST at the same total rate. Confirm the correct HSN/SAC rate for your service.',
  },

  'tds-calculator': {
    fields: [
      { key: 'amount', label: 'Payment amount (gross)', kind: 'number', default: 50000, min: 0, step: 500, prefix: '₹' },
      { key: 'rate', label: 'TDS rate', kind: 'select', default: 10, options: [
        { label: '10% — professional/technical fees (194J)', value: 10 },
        { label: '2% — contractor (194C, companies)', value: 2 },
        { label: '1% — contractor (194C, individual/HUF)', value: 1 },
        { label: '5%', value: 5 },
        { label: '0% — no TDS', value: 0 },
      ] },
    ],
    outputs: [
      { key: 'tds', label: 'TDS deducted', format: 'inr', primary: true },
      { key: 'net', label: 'Net you receive', format: 'inr' },
      { key: 'gross', label: 'Gross invoice', format: 'inr' },
    ],
    compute: (v) => {
      const tds = safe(v.amount) * safe(v.rate) / 100
      return { tds, net: safe(v.amount) - tds, gross: safe(v.amount) }
    },
    note: 'Indicative only. TDS sections, rates, and thresholds change — confirm the section that applies to you and claim the credit in your return via Form 26AS/AIS.',
  },

  'profit-margin-calculator': {
    fields: [
      { key: 'revenue', label: 'Revenue / price', kind: 'number', default: 100000, min: 0, step: 1000, prefix: '₹' },
      { key: 'cost', label: 'Total cost', kind: 'number', default: 65000, min: 0, step: 1000, prefix: '₹' },
    ],
    outputs: [
      { key: 'profit', label: 'Profit', format: 'inr', primary: true },
      { key: 'margin', label: 'Profit margin', format: 'percent' },
      { key: 'markup', label: 'Markup', format: 'percent' },
    ],
    compute: (v) => {
      const profit = safe(v.revenue) - safe(v.cost)
      const margin = safe(v.revenue) > 0 ? (profit / safe(v.revenue)) * 100 : 0
      const markup = safe(v.cost) > 0 ? (profit / safe(v.cost)) * 100 : 0
      return { profit, margin, markup }
    },
  },

  'retainer-calculator': {
    fields: [
      { key: 'hours', label: 'Hours reserved per month', kind: 'number', default: 20, min: 1, step: 1, suffix: 'hrs' },
      { key: 'rate', label: 'Your hourly rate', kind: 'number', default: 1200, min: 0, step: 50, prefix: '₹' },
      { key: 'discount', label: 'Retainer discount', kind: 'number', default: 10, min: 0, max: 50, step: 1, suffix: '%', help: 'A modest discount in exchange for guaranteed monthly income.' },
      { key: 'months', label: 'Commitment length', kind: 'number', default: 12, min: 1, max: 36, step: 1, suffix: 'mo' },
    ],
    outputs: [
      { key: 'monthly', label: 'Monthly retainer', format: 'inr', primary: true },
      { key: 'effective', label: 'Effective hourly rate', format: 'inr' },
      { key: 'contract', label: 'Total contract value', format: 'inr' },
    ],
    compute: (v) => {
      const gross = safe(v.hours) * safe(v.rate)
      const monthly = gross * (1 - safe(v.discount) / 100)
      const effective = safe(v.hours) > 0 ? monthly / safe(v.hours) : 0
      return { monthly, effective, contract: monthly * safe(v.months) }
    },
    note: 'Cap the reserved hours in writing so a retainer doesn’t quietly turn into unlimited work for a fixed fee.',
  },
}
