/**
 * Specs for the document-generator tools. Each has form fields and a `render`
 * that merges the values into a ready-to-copy plain-text document. Pure
 * client-side; nothing is uploaded. Money in ₹.
 */

export type DocField = {
  key: string
  label: string
  kind: 'text' | 'textarea' | 'date' | 'number'
  placeholder?: string
  default?: string
}

export type DocGenSpec = {
  fields: DocField[]
  render: (v: Record<string, string>) => string
  outputTitle: string
  note?: string
}

const or = (v: string | undefined, fallback: string) => (v && v.trim() ? v.trim() : fallback)

export const DOCGEN_SPECS: Record<string, DocGenSpec> = {
  'quotation-generator': {
    outputTitle: 'Your quotation',
    fields: [
      { key: 'business', label: 'Your name / business', kind: 'text', placeholder: 'Rajesh Design Studio' },
      { key: 'client', label: 'Client name', kind: 'text', placeholder: 'Acme Pvt Ltd' },
      { key: 'quoteNo', label: 'Quotation no.', kind: 'text', placeholder: 'QUO-2026-001' },
      { key: 'date', label: 'Date', kind: 'date' },
      { key: 'items', label: 'Line items (one per line: description - amount)', kind: 'textarea', placeholder: 'Landing page design - 25000\nLogo design - 8000' },
      { key: 'notes', label: 'Notes / terms', kind: 'textarea', placeholder: '50% advance to start. Valid for 15 days.' },
      { key: 'validity', label: 'Valid until', kind: 'date' },
    ],
    render: (v) => {
      const lines = or(v.items, 'Service - 0').split('\n').filter(Boolean)
      let total = 0
      const rows = lines.map((l) => {
        const parts = l.split('-')
        const amt = Number(parts[parts.length - 1]?.replace(/[^0-9.]/g, '')) || 0
        total += amt
        const desc = parts.slice(0, -1).join('-').trim() || l.trim()
        return `  • ${desc} — ₹${amt.toLocaleString('en-IN')}`
      })
      return [
        `QUOTATION`,
        ``,
        `From: ${or(v.business, 'Your business')}`,
        `To:   ${or(v.client, 'Client name')}`,
        `Quotation no: ${or(v.quoteNo, 'QUO-2026-001')}`,
        `Date: ${or(v.date, '____-__-__')}`,
        ``,
        `Items:`,
        ...rows,
        ``,
        `Estimated total: ₹${total.toLocaleString('en-IN')}`,
        ``,
        `Terms: ${or(v.notes, 'Payment terms as agreed.')}`,
        `Valid until: ${or(v.validity, '____-__-__')}`,
        ``,
        `This is a quotation, not a tax invoice.`,
      ].join('\n')
    },
    note: 'For a branded PDF quote or a GST tax invoice, use Kliv∞ or the invoice generator.',
  },

  'gst-invoice-generator': {
    outputTitle: 'Your GST invoice draft',
    fields: [
      { key: 'business', label: 'Your business name', kind: 'text', placeholder: 'Rajesh Design Studio' },
      { key: 'gstin', label: 'Your GSTIN', kind: 'text', placeholder: '22ABCDE1234F1Z5' },
      { key: 'client', label: 'Client name', kind: 'text', placeholder: 'Acme Pvt Ltd' },
      { key: 'clientGstin', label: 'Client GSTIN (optional)', kind: 'text', placeholder: '27WXYZ9876K1Z2' },
      { key: 'invNo', label: 'Invoice no.', kind: 'text', placeholder: 'INV/2026-27/001' },
      { key: 'date', label: 'Invoice date', kind: 'date' },
      { key: 'desc', label: 'Description of service', kind: 'text', placeholder: 'Website design services' },
      { key: 'amount', label: 'Taxable amount (₹)', kind: 'number', placeholder: '50000' },
      { key: 'rate', label: 'GST rate (%)', kind: 'number', placeholder: '18' },
      { key: 'interState', label: 'Inter-state? (yes/no)', kind: 'text', placeholder: 'no' },
    ],
    render: (v) => {
      const amount = Number(v.amount) || 0
      const rate = Number(v.rate) || 0
      const gst = (amount * rate) / 100
      const inter = (v.interState || '').toLowerCase().startsWith('y')
      const taxLines = inter
        ? [`IGST @ ${rate}%: ₹${gst.toLocaleString('en-IN')}`]
        : [
            `CGST @ ${rate / 2}%: ₹${(gst / 2).toLocaleString('en-IN')}`,
            `SGST @ ${rate / 2}%: ₹${(gst / 2).toLocaleString('en-IN')}`,
          ]
      return [
        `TAX INVOICE`,
        ``,
        `${or(v.business, 'Your business')}`,
        `GSTIN: ${or(v.gstin, '______________')}`,
        ``,
        `Bill to: ${or(v.client, 'Client name')}`,
        v.clientGstin ? `Client GSTIN: ${v.clientGstin}` : `Client GSTIN: —`,
        ``,
        `Invoice no: ${or(v.invNo, 'INV/2026-27/001')}`,
        `Date: ${or(v.date, '____-__-__')}`,
        ``,
        `Description: ${or(v.desc, 'Professional services')}`,
        `Taxable value: ₹${amount.toLocaleString('en-IN')}`,
        ...taxLines,
        `Total: ₹${(amount + gst).toLocaleString('en-IN')}`,
        ``,
        `Amount in words: (fill on final invoice)`,
      ].join('\n')
    },
    note: 'A GST invoice draft to copy or print. For a branded PDF with your logo, use the full invoice generator or Kliv∞. Confirm the correct GST rate (HSN/SAC) for your service.',
  },

  'proposal-template-generator': {
    outputTitle: 'Your proposal',
    fields: [
      { key: 'business', label: 'Your name / business', kind: 'text', placeholder: 'Rajesh Design Studio' },
      { key: 'client', label: 'Client name', kind: 'text', placeholder: 'Acme Pvt Ltd' },
      { key: 'project', label: 'Project title', kind: 'text', placeholder: 'Marketing website redesign' },
      { key: 'problem', label: 'The problem / goal', kind: 'textarea', placeholder: 'Acme’s current site is slow and off-brand…' },
      { key: 'scope', label: 'What you’ll deliver (one per line)', kind: 'textarea', placeholder: 'Discovery & sitemap\n5-page responsive design\nDevelopment & launch' },
      { key: 'timeline', label: 'Timeline', kind: 'text', placeholder: '4 weeks from kickoff' },
      { key: 'price', label: 'Investment (₹)', kind: 'text', placeholder: '75000' },
      { key: 'terms', label: 'Payment terms', kind: 'text', placeholder: '50% advance, 50% on delivery' },
    ],
    render: (v) => {
      const scope = or(v.scope, 'Deliverable one\nDeliverable two').split('\n').filter(Boolean).map((s) => `  • ${s.trim()}`)
      return [
        `PROJECT PROPOSAL`,
        `${or(v.project, 'Project title')}`,
        ``,
        `Prepared for: ${or(v.client, 'Client name')}`,
        `Prepared by: ${or(v.business, 'Your business')}`,
        ``,
        `1. Understanding`,
        `${or(v.problem, 'A short summary of the client’s goal and why this project matters.')}`,
        ``,
        `2. Scope of work`,
        ...scope,
        ``,
        `3. Timeline`,
        `${or(v.timeline, 'To be agreed')}`,
        ``,
        `4. Investment`,
        `₹${(Number(v.price) || v.price || '0').toLocaleString?.('en-IN') ?? or(v.price, '0')}`,
        `Payment terms: ${or(v.terms, '50% advance, 50% on delivery')}`,
        ``,
        `5. Next step`,
        `Approve this proposal to get started. Questions? Just reply.`,
      ].join('\n')
    },
    note: 'A starting proposal you can copy and refine. In Kliv∞ you can send proposals clients accept and e-sign in their portal.',
  },

  'contract-template-generator': {
    outputTitle: 'Your agreement draft',
    fields: [
      { key: 'freelancer', label: 'Your name / business', kind: 'text', placeholder: 'Rajesh Talagana' },
      { key: 'client', label: 'Client name', kind: 'text', placeholder: 'Acme Pvt Ltd' },
      { key: 'service', label: 'Service / project', kind: 'text', placeholder: 'Website design and development' },
      { key: 'fee', label: 'Fee (₹)', kind: 'text', placeholder: '75000' },
      { key: 'terms', label: 'Payment terms', kind: 'text', placeholder: '50% advance, 50% on delivery' },
      { key: 'start', label: 'Start date', kind: 'date' },
      { key: 'revisions', label: 'Revisions included', kind: 'text', placeholder: '2 rounds' },
    ],
    render: (v) => [
      `FREELANCE SERVICE AGREEMENT`,
      ``,
      `This agreement is between ${or(v.freelancer, 'the Freelancer')} (“Freelancer”) and ${or(v.client, 'the Client')} (“Client”), effective ${or(v.start, '____-__-__')}.`,
      ``,
      `1. Services`,
      `The Freelancer will provide: ${or(v.service, 'the agreed services')}.`,
      ``,
      `2. Fees & payment`,
      `Total fee: ₹${or(v.fee, '0')}. Payment terms: ${or(v.terms, '50% advance, 50% on delivery')}.`,
      ``,
      `3. Revisions`,
      `Included revisions: ${or(v.revisions, '2 rounds')}. Additional work is billed separately.`,
      ``,
      `4. Ownership`,
      `On full payment, deliverables and their IP transfer to the Client. The Freelancer may show the work in their portfolio unless agreed otherwise.`,
      ``,
      `5. Confidentiality`,
      `Both parties keep each other’s confidential information private.`,
      ``,
      `6. Termination`,
      `Either party may end this agreement with written notice; the Client pays for work completed to date.`,
      ``,
      `Signed:`,
      `Freelancer: ______________________   Date: __________`,
      `Client:     ______________________   Date: __________`,
    ].join('\n'),
    note: 'A plain-language starting point, NOT legal advice. For high-value work, have a professional adapt it to your situation and local law.',
  },

  'late-payment-reminder-generator': {
    outputTitle: 'Your reminder email',
    fields: [
      { key: 'client', label: 'Client contact name', kind: 'text', placeholder: 'Priya' },
      { key: 'business', label: 'Your name', kind: 'text', placeholder: 'Rajesh' },
      { key: 'invNo', label: 'Invoice no.', kind: 'text', placeholder: 'INV/2026-27/014' },
      { key: 'amount', label: 'Amount due (₹)', kind: 'text', placeholder: '25000' },
      { key: 'dueDate', label: 'Due date', kind: 'date' },
      { key: 'tone', label: 'Tone (friendly / firm)', kind: 'text', placeholder: 'friendly' },
    ],
    render: (v) => {
      const firm = (v.tone || '').toLowerCase().startsWith('f') && (v.tone || '').toLowerCase() !== 'friendly'
      const amount = or(v.amount, '0')
      if (firm) {
        return [
          `Subject: Overdue invoice ${or(v.invNo, 'INV-____')} — payment required`,
          ``,
          `Hi ${or(v.client, 'there')},`,
          ``,
          `Invoice ${or(v.invNo, 'INV-____')} for ₹${amount} was due on ${or(v.dueDate, 'the agreed date')} and is now overdue.`,
          `Please arrange payment within 3 working days to avoid a pause on ongoing work.`,
          ``,
          `If it’s already been paid, kindly share the payment reference so I can update my records.`,
          ``,
          `Thanks,`,
          `${or(v.business, 'Your name')}`,
        ].join('\n')
      }
      return [
        `Subject: Quick reminder — invoice ${or(v.invNo, 'INV-____')}`,
        ``,
        `Hi ${or(v.client, 'there')},`,
        ``,
        `Just a gentle nudge that invoice ${or(v.invNo, 'INV-____')} for ₹${amount} was due on ${or(v.dueDate, 'the agreed date')}.`,
        `Could you let me know when I can expect payment? Happy to resend the invoice or share UPI/bank details if that helps.`,
        ``,
        `Thanks so much,`,
        `${or(v.business, 'Your name')}`,
      ].join('\n')
    },
    note: 'Type “firm” in the tone field for a stronger follow-up. Kliv∞ can track dues and remind you who to chase.',
  },

  'invoice-number-generator': {
    outputTitle: 'Your invoice numbering',
    fields: [
      { key: 'prefix', label: 'Prefix', kind: 'text', placeholder: 'INV' },
      { key: 'fy', label: 'Financial year', kind: 'text', placeholder: '2026-27' },
      { key: 'start', label: 'Starting number', kind: 'number', placeholder: '1' },
      { key: 'pad', label: 'Digits (padding)', kind: 'number', placeholder: '3' },
    ],
    render: (v) => {
      const prefix = or(v.prefix, 'INV')
      const fy = or(v.fy, '2026-27')
      const start = Number(v.start) || 1
      const pad = Math.min(Math.max(Number(v.pad) || 3, 1), 6)
      const fmt = (n: number) => `${prefix}/${fy}/${String(n).padStart(pad, '0')}`
      const seq = Array.from({ length: 5 }, (_, i) => `  ${fmt(start + i)}`)
      return [
        `INVOICE NUMBERING SCHEME`,
        ``,
        `Format: ${prefix}/${fy}/${'0'.repeat(pad - 1)}N`,
        ``,
        `Your next five invoice numbers:`,
        ...seq,
        ``,
        `Rules of a good scheme:`,
        `  • Sequential, with no gaps (required for GST).`,
        `  • Unique per financial year; reset the counter each new FY.`,
        `  • Same format every time so numbers sort correctly.`,
      ].join('\n')
    },
    note: 'GST rules require a consecutive, unique invoice number series. Kliv∞ numbers your invoices automatically.',
  },

  'timesheet-generator': {
    outputTitle: 'Your weekly timesheet',
    fields: [
      { key: 'name', label: 'Your name', kind: 'text', placeholder: 'Rajesh' },
      { key: 'client', label: 'Client / project', kind: 'text', placeholder: 'Acme — website' },
      { key: 'weekStart', label: 'Week starting', kind: 'date' },
      { key: 'rate', label: 'Hourly rate (₹, optional)', kind: 'number', placeholder: '1000' },
    ],
    render: (v) => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const rows = days.map((d) => `  ${d}  | ____________________ | ____ hrs`)
      const rate = Number(v.rate) || 0
      return [
        `WEEKLY TIMESHEET`,
        ``,
        `Name: ${or(v.name, '______________')}`,
        `Client/Project: ${or(v.client, '______________')}`,
        `Week starting: ${or(v.weekStart, '____-__-__')}`,
        ``,
        `  Day  | Task                 | Hours`,
        `  -----+----------------------+------`,
        ...rows,
        `  -----+----------------------+------`,
        `  Total hours: ______`,
        rate ? `  At ₹${rate.toLocaleString('en-IN')}/hr → bill: ₹______` : ``,
        ``,
        `Fill in tasks and hours, total it, and attach to your invoice.`,
      ].filter((l) => l !== '').join('\n')
    },
    note: 'A simple copyable timesheet. Kliv∞ ties billable work to projects and invoices so you don’t retype it.',
  },
}
