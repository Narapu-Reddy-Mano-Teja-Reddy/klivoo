import type { ToolConfig } from './tools/_type'

export type { ToolConfig }

/**
 * All free tools listed in the /tools hub. Calculators and doc generators get a
 * generated /tools/<slug> page (with an interactive island from
 * components/tools); `external` tools (the existing PDF invoice generator) link
 * out to their own route instead of getting a duplicate page.
 */
export const TOOLS: ToolConfig[] = [
  {
    slug: 'invoice-generator',
    path: '/invoice',
    title: 'Invoice Generator',
    tagline: 'Create a professional, GST-ready invoice PDF in seconds.',
    kind: 'external',
    externalHref: '/invoice',
    metaTitle: 'Free Invoice Generator India — CLIV∞',
    metaDescription:
      'Create free, professional GST invoices online and download a PDF in seconds. No signup. Built for Indian freelancers and small businesses.',
    keywords: ['free invoice generator', 'invoice generator india'],
    eyebrow: 'Invoice generator',
    h1: 'Free invoice',
    h1Highlight: 'generator',
    subheading: 'Make a professional invoice and download the PDF in seconds.',
    sections: [],
    faqHeading: 'Invoice generator FAQs',
    faqs: [
      { q: 'Is the invoice generator free?', a: 'Yes, it is free to use with no signup — create an invoice and download the PDF.' },
    ],
    related: [],
    ctaTitle: 'Do more than invoices',
    ctaSubtitle: 'CLIV∞ manages clients, projects, and payments too. Start free.',
  },

  {
    slug: 'freelance-rate-calculator',
    path: '/tools/freelance-rate-calculator',
    title: 'Freelance Rate Calculator',
    tagline: 'Work out the hourly and day rate you actually need to charge.',
    kind: 'calculator',
    metaTitle: 'Freelance Rate Calculator (India) — Hourly & Day Rate',
    metaDescription:
      'Free freelance hourly rate calculator for India. Enter your income goal, costs, and billable hours to get the hourly and day rate you should charge.',
    keywords: ['freelance hourly rate calculator india', 'freelance rate calculator', 'how much to charge freelance'],
    eyebrow: 'Rate calculator',
    h1: 'Freelance rate',
    h1Highlight: 'calculator',
    subheading:
      'Stop guessing your rate. Enter what you want to earn, your costs, and your realistic billable hours, and see the hourly and day rate that actually gets you there.',
    sections: [
      {
        heading: 'How to work out your freelance rate',
        body: [
          'Most freelancers set their rate by copying what someone else charges, then wonder why the money never adds up. The honest way is to work backwards from the income you want. Start with your target take-home for the year, add your real business costs — software, internet, equipment, a phone plan, the occasional course — and then divide by the hours you can genuinely bill.',
          'The trap is billable hours. A 40-hour week is not 40 billable hours: admin, sales, invoicing, and learning eat a big chunk. A realistic figure for a solo freelancer is often 20–30 billable hours a week. Be honest here, because overestimating billable hours is the single biggest reason freelance rates end up too low.',
        ],
      },
      {
        heading: 'Add a buffer for the gaps',
        body: [
          'Freelance income is lumpy. There are quiet weeks, late payments, sick days, and taxes to set aside. The safety buffer in this calculator adds a margin on top of your bare costs so a slow month does not wipe you out, and so there is actual profit left over — not just survival.',
          'Treat the result as a floor, not a ceiling. It tells you the minimum you need to charge to hit your goals; the value you deliver to a client can justify far more. As you build proof and demand, raise your rate — the calculator is there to make sure you never accidentally charge below what your own numbers require.',
        ],
      },
    ],
    faqHeading: 'Rate calculator FAQs',
    faqs: [
      { q: 'How many billable hours should I assume?', a: 'Be realistic — most solo freelancers bill 20–30 hours a week once admin, sales, and invoicing are removed from a full week. Overestimating billable hours is the top reason freelance rates come out too low.' },
      { q: 'Should I charge hourly or a fixed price?', a: 'Use the hourly rate to sanity-check fixed quotes: estimate the hours, multiply by your rate, then present a fixed price. Clients often prefer a fixed number, but your hourly rate keeps that number profitable.' },
      { q: 'Does this include GST or tax?', a: 'The buffer gives you headroom for tax and quiet periods, but it is not a tax calculation. Set money aside for income tax and, if registered, add GST on top of your rate when you invoice.' },
    ],
    related: [
      { href: '/tools/project-cost-calculator', label: 'Project Cost Calculator', desc: 'Price a whole project, not just an hour.' },
      { href: '/tools/retainer-calculator', label: 'Retainer Calculator', desc: 'Price a monthly retainer.' },
      { href: '/for/freelancers', label: 'For Freelancers', desc: 'Run your whole freelance business in one place.' },
      { href: '/glossary/billable-hours', label: 'Billable hours', desc: 'What counts as billable — and what doesn’t.' },
    ],
    ctaTitle: 'Know your rate? Now run the business',
    ctaSubtitle: 'CLIV∞ keeps your clients, projects, and invoices in one place. Start free.',
  },

  {
    slug: 'project-cost-calculator',
    path: '/tools/project-cost-calculator',
    title: 'Project Cost Calculator',
    tagline: 'Estimate a project’s cost and set a profitable quote.',
    kind: 'calculator',
    metaTitle: 'Project Cost Calculator — Estimate & Quote a Project',
    metaDescription:
      'Free project cost estimator for freelancers. Enter hours, rate, materials, and margin to get your total cost and a profitable quote in ₹.',
    keywords: ['project cost calculator', 'project cost estimator', 'how to quote a project'],
    eyebrow: 'Project cost',
    h1: 'Project cost',
    h1Highlight: 'calculator',
    subheading:
      'Estimate what a project really costs you — labour, materials, and a buffer for surprises — then add your margin to get a quote that leaves real profit.',
    sections: [
      {
        heading: 'Why quote from cost, not gut feel',
        body: [
          'A quote pulled out of thin air is how freelancers end up working for free. The reliable method is to build the number: estimate the hours, multiply by your rate, add any materials or subcontractor costs, then pad it with a contingency for the revisions and surprises every project has.',
          'Only then do you add your target margin. Margin is not greed — it is what pays for the unbilled work, the quiet weeks, and the growth of your business. This calculator does the maths so your quote is grounded in your actual costs instead of a number that felt about right.',
        ],
      },
      {
        heading: 'Always add a contingency',
        body: [
          'The scope you agree and the scope you deliver are rarely identical. A client changes their mind, an integration takes longer, a “quick tweak” becomes a redesign. A contingency buffer of 10–20% absorbs that without eating your profit or forcing an awkward mid-project conversation.',
          'If the extra work goes well beyond the buffer, that is a change order — new scope at a new price — not something to quietly absorb. Quote with a buffer, protect it with a written scope, and bill separately for anything outside it.',
        ],
      },
    ],
    faqHeading: 'Project cost FAQs',
    faqs: [
      { q: 'What contingency should I add?', a: 'A 10–20% buffer is typical for freelance projects. Use the higher end for vague briefs or new clients where scope is more likely to shift.' },
      { q: 'What’s the difference between margin and markup?', a: 'Margin is profit as a percentage of the price; markup is profit as a percentage of the cost. This calculator uses margin, so a 25% margin means profit is a quarter of the final quote.' },
      { q: 'How do I handle scope creep?', a: 'Set a written scope, quote with a contingency, and treat anything beyond it as a change order billed separately. CLIV∞ ties budgets to projects so overruns are visible early.' },
    ],
    related: [
      { href: '/tools/freelance-rate-calculator', label: 'Rate Calculator', desc: 'Find the hourly rate this quote should use.' },
      { href: '/tools/profit-margin-calculator', label: 'Profit Margin Calculator', desc: 'Check the margin on any price.' },
      { href: '/glossary/scope-of-work', label: 'Scope of work', desc: 'Define what’s in — and out of — the project.' },
      { href: '/features/project-management', label: 'Project Management', desc: 'Track budgets against every project.' },
    ],
    ctaTitle: 'Quote it, then deliver it',
    ctaSubtitle: 'CLIV∞ connects your quotes, projects, and invoices. Start free.',
  },

  {
    slug: 'gst-calculator',
    path: '/tools/gst-calculator',
    title: 'GST Calculator',
    tagline: 'Add or remove GST and split it into CGST and SGST.',
    kind: 'calculator',
    metaTitle: 'GST Calculator India — Add or Remove GST Online',
    metaDescription:
      'Free GST calculator for India. Add GST to a price or remove it from a GST-inclusive amount, with the CGST and SGST split, at 5%, 12%, 18%, or 28%.',
    keywords: ['gst calculator india', 'gst calculator', 'add remove gst'],
    eyebrow: 'GST calculator',
    h1: 'GST',
    h1Highlight: 'calculator',
    subheading:
      'Add GST to a price or strip it out of a GST-inclusive amount, and see the CGST/SGST split instantly — at every standard Indian GST rate.',
    sections: [
      {
        heading: 'How GST is calculated',
        body: [
          'GST (Goods and Services Tax) is applied as a percentage of the taxable value. To add GST, you multiply the base amount by the rate and add it on. To remove GST from a price that already includes it, you divide by one plus the rate — a step people often get wrong by simply subtracting the percentage, which gives the wrong base.',
          'Within a single state, GST is split equally into CGST (central) and SGST (state) — so 18% GST is 9% CGST plus 9% SGST. For a supply between states, the same total is charged as a single IGST instead. This calculator shows the split so your invoice lines are correct.',
        ],
      },
      {
        heading: 'Which GST rate applies?',
        body: [
          'Services attract different GST rates depending on their category, with 18% being the most common for professional and creative services. Goods vary more widely across the 5%, 12%, 18%, and 28% slabs. The correct rate is tied to the HSN (goods) or SAC (services) code for what you sell.',
          'If you are unsure which rate or code applies to your work, confirm it before invoicing — charging the wrong rate creates problems at filing time. When you are registered and raising a proper tax invoice, quote your GSTIN and the client’s, and show the CGST/SGST or IGST breakup clearly.',
        ],
      },
    ],
    faqHeading: 'GST calculator FAQs',
    faqs: [
      { q: 'How do I remove GST from a total?', a: 'Divide the GST-inclusive amount by one plus the rate. For example, ₹11,800 including 18% GST has a base of ₹11,800 ÷ 1.18 = ₹10,000, so the GST is ₹1,800. Switch this tool to “remove GST” to do it automatically.' },
      { q: 'What is the CGST and SGST split?', a: 'For a supply within one state, GST is split equally into CGST and SGST — so 18% is 9% + 9%. For inter-state supply, the full rate is charged as IGST instead.' },
      { q: 'Do freelancers have to charge GST?', a: 'Only if you are registered for GST, which depends on your turnover and the nature of your supply. Check the current registration thresholds for your situation — if you are not registered, you raise a simple invoice without GST.' },
    ],
    related: [
      { href: '/tools/gst-invoice-generator', label: 'GST Invoice Generator', desc: 'Turn this into a GST invoice draft.' },
      { href: '/tools/tds-calculator', label: 'TDS Calculator', desc: 'Work out TDS on your payments.' },
      { href: '/glossary/gst', label: 'GST', desc: 'GST explained for freelancers.' },
      { href: '/for/indian-freelancers', label: 'For Indian Freelancers', desc: 'GST, UPI, and the India market.' },
    ],
    ctaTitle: 'Invoice with GST, without the headache',
    ctaSubtitle: 'CLIV∞ raises GST-ready invoices automatically. Start free.',
  },

  {
    slug: 'tds-calculator',
    path: '/tools/tds-calculator',
    title: 'TDS Calculator',
    tagline: 'See how much TDS is deducted and what you’ll actually receive.',
    kind: 'calculator',
    metaTitle: 'TDS Calculator for Freelancers (India) — Net Payment',
    metaDescription:
      'Free TDS calculator for Indian freelancers. Enter your invoice amount and TDS rate to see the tax deducted and the net amount you’ll actually receive.',
    keywords: ['tds calculator', 'tds calculator for freelancers', 'tds on professional fees'],
    eyebrow: 'TDS calculator',
    h1: 'TDS',
    h1Highlight: 'calculator',
    subheading:
      'When a client deducts TDS, the money you receive is less than you invoiced. See exactly how much is withheld and what lands in your account.',
    sections: [
      {
        heading: 'What is TDS and why is it deducted?',
        body: [
          'TDS (Tax Deducted at Source) is tax your client withholds from your payment and deposits with the government against your PAN. It is not an extra cost — it is an advance on your income tax, which you later reconcile in your return. But it does mean the cash you receive is lower than the invoice value, which surprises freelancers who did not plan for it.',
          'For professional and technical fees, TDS is commonly deducted under Section 194J. Contractor payments fall under 194C at different rates. The exact section and rate depend on the nature of the work and who is paying, so confirm which applies to you.',
        ],
      },
      {
        heading: 'Claiming your TDS back',
        body: [
          'Because TDS is an advance tax, you are not losing it — the amount deducted shows up against your PAN in Form 26AS and the Annual Information Statement. When you file your income tax return, you claim it as credit against your total tax, and if too much was deducted, you get a refund.',
          'The practical tip: track TDS on every payment so you know your real cash flow and can reconcile at year-end. Rates, sections, and thresholds change, so treat this calculator as indicative and verify the current rules or check with your accountant.',
        ],
      },
    ],
    faqHeading: 'TDS calculator FAQs',
    faqs: [
      { q: 'What TDS rate applies to freelancers?', a: 'Professional and technical fees are commonly deducted under Section 194J. Contractor work falls under 194C. Rates and thresholds change, so confirm the section and rate that applies to your work and the payer.' },
      { q: 'Do I lose the money deducted as TDS?', a: 'No. TDS is an advance on your income tax. It is credited against your PAN (visible in Form 26AS/AIS) and you claim it when filing your return — getting a refund if too much was withheld.' },
      { q: 'Should I invoice before or after TDS?', a: 'You invoice the full (gross) amount. The client deducts TDS from that and pays you the net. Your invoice value stays the gross figure for your records and GST.' },
    ],
    related: [
      { href: '/tools/gst-calculator', label: 'GST Calculator', desc: 'Add or remove GST on an amount.' },
      { href: '/glossary/tds', label: 'TDS', desc: 'TDS explained for freelancers.' },
      { href: '/tools/invoice-number-generator', label: 'Invoice Number Generator', desc: 'Number your invoices correctly.' },
      { href: '/for/indian-freelancers', label: 'For Indian Freelancers', desc: 'Tax, GST, and payments in India.' },
    ],
    ctaTitle: 'Track every rupee, before and after TDS',
    ctaSubtitle: 'CLIV∞ tracks invoices, payments, and dues in one place. Start free.',
  },

  {
    slug: 'profit-margin-calculator',
    path: '/tools/profit-margin-calculator',
    title: 'Profit Margin Calculator',
    tagline: 'Turn revenue and cost into profit, margin, and markup.',
    kind: 'calculator',
    metaTitle: 'Profit Margin Calculator — Margin & Markup in ₹',
    metaDescription:
      'Free profit margin calculator. Enter revenue and cost to get your profit, profit margin percentage, and markup — for any project or your whole business.',
    keywords: ['profit margin calculator', 'margin vs markup', 'profit calculator'],
    eyebrow: 'Profit margin',
    h1: 'Profit margin',
    h1Highlight: 'calculator',
    subheading:
      'Enter what you earned and what it cost, and see your profit, your margin, and your markup — so you know whether a project or the whole business is actually making money.',
    sections: [
      {
        heading: 'Margin vs markup — the difference that trips people up',
        body: [
          'Profit is simple: revenue minus cost. Where freelancers get confused is margin versus markup, because they use the same profit number against a different base. Margin expresses profit as a percentage of the price you charged; markup expresses it as a percentage of what it cost you.',
          'That difference is bigger than it sounds. A 50% markup on a ₹10,000 cost gives a ₹15,000 price — but that is only a 33% margin, because the profit is a third of the price, not half. Mixing them up is how a business that thinks it runs on healthy margins quietly runs on thin ones.',
        ],
      },
      {
        heading: 'Why margin matters for freelancers',
        body: [
          'Even solo freelancers have costs — software, subcontractors, materials, unbilled time — and margin is what is left after all of it. Knowing your margin per project tells you which kinds of work are worth chasing and which quietly lose money once you count the real hours.',
          'Track margin across the business and it becomes a decision-making tool: it tells you when you can afford to hire, when to raise rates, and which clients are actually profitable. CLIV∞ tracks income and expenses per project so this number stays live instead of being reconstructed at year-end.',
        ],
      },
    ],
    faqHeading: 'Profit margin FAQs',
    faqs: [
      { q: 'What is a good profit margin for freelancers?', a: 'It varies by trade, but solo freelancers should aim well above zero after counting all costs including unbilled time. If your margin is thin, either your rate is too low or your costs and unpaid hours are too high.' },
      { q: 'Is margin the same as markup?', a: 'No. Margin is profit as a share of the price; markup is profit as a share of the cost. A 50% markup is only a 33% margin. This calculator shows both so you can’t mix them up.' },
      { q: 'Should I calculate margin per project or overall?', a: 'Both. Per-project margin shows which work is worth doing; overall margin shows if the business is healthy. Track them together to make pricing and hiring decisions on real numbers.' },
    ],
    related: [
      { href: '/tools/project-cost-calculator', label: 'Project Cost Calculator', desc: 'Set a price that hits your target margin.' },
      { href: '/glossary/profit-margin', label: 'Profit margin', desc: 'Profit margin explained.' },
      { href: '/tools/freelance-rate-calculator', label: 'Rate Calculator', desc: 'Set a rate that supports your margins.' },
      { href: '/business-management-software', label: 'Business Management', desc: 'See profit across your whole business.' },
    ],
    ctaTitle: 'See your real profit, live',
    ctaSubtitle: 'CLIV∞ tracks income and expenses per project. Start free.',
  },

  {
    slug: 'retainer-calculator',
    path: '/tools/retainer-calculator',
    title: 'Retainer Calculator',
    tagline: 'Price a monthly retainer and see its effective hourly rate.',
    kind: 'calculator',
    metaTitle: 'Retainer Calculator — Price a Monthly Retainer in ₹',
    metaDescription:
      'Free retainer pricing calculator for freelancers. Enter reserved hours, your rate, and a discount to price a monthly retainer and its total contract value.',
    keywords: ['retainer calculator', 'retainer pricing calculator', 'how to price a retainer'],
    eyebrow: 'Retainer calculator',
    h1: 'Retainer',
    h1Highlight: 'calculator',
    subheading:
      'Price a monthly retainer with confidence — set the hours you’ll reserve, your rate, and a fair discount, and see the monthly fee, effective hourly rate, and total contract value.',
    sections: [
      {
        heading: 'How to price a retainer',
        body: [
          'A retainer is a fixed monthly fee for a set block of your time or output. The starting point is simple: reserved hours multiplied by your hourly rate. From there, most freelancers apply a modest discount — the client is guaranteeing you income every month, and that predictability is worth trading a little rate for.',
          'The effective hourly rate this calculator shows is the number to watch. Discount too heavily and a retainer becomes worse than ad-hoc work; keep the discount modest (often 5–15%) and a retainer gives you stable income at a rate you can still live with.',
        ],
      },
      {
        heading: 'Protect the retainer from creep',
        body: [
          'The risk with retainers is scope creep — the slow expansion of what a client expects for the same fee until you are working far more than the reserved hours. The fix is to cap the hours in writing and track what you deliver each month against that cap.',
          'When a client consistently needs more than the retainer covers, that is a signal to renegotiate to a larger retainer, not to silently absorb the extra work. A retainer should make your income more predictable — not turn into unlimited work for a fixed price.',
        ],
      },
    ],
    faqHeading: 'Retainer FAQs',
    faqs: [
      { q: 'How much discount should I give on a retainer?', a: 'A modest 5–15% is common — enough to reward the client’s commitment without gutting your effective rate. Watch the effective hourly rate this calculator shows and don’t discount below what your work is worth.' },
      { q: 'How do I stop a retainer becoming unlimited work?', a: 'Cap the reserved hours in writing, track delivery against them each month, and treat consistent overflow as a reason to renegotiate to a bigger retainer — not as work to absorb for free.' },
      { q: 'Are retainers better than project pricing?', a: 'Retainers give predictable recurring income and priority for the client; project pricing can capture more upside per job. Many freelancers use a mix — retainers for steady clients, project pricing for one-offs.' },
    ],
    related: [
      { href: '/glossary/retainer', label: 'Retainer', desc: 'What a retainer is and how it works.' },
      { href: '/glossary/retainer-creep', label: 'Retainer creep', desc: 'How retainers quietly expand — and how to stop it.' },
      { href: '/tools/freelance-rate-calculator', label: 'Rate Calculator', desc: 'Set the hourly rate behind your retainer.' },
      { href: '/for/digital-marketing-agencies', label: 'For Agencies', desc: 'Run retainer clients in one workspace.' },
    ],
    ctaTitle: 'Run your retainers without the creep',
    ctaSubtitle: 'CLIV∞ tracks retainer projects and recurring invoices. Start free.',
  },

  {
    slug: 'gst-invoice-generator',
    path: '/tools/gst-invoice-generator',
    title: 'GST Invoice Generator',
    tagline: 'Build a correct GST invoice draft with the CGST/SGST split.',
    kind: 'docgen',
    metaTitle: 'GST Invoice Generator — Free GST Invoice Format (India)',
    metaDescription:
      'Free GST invoice generator for India. Fill your GSTIN, amount, and rate to build a correct GST invoice draft with the CGST/SGST or IGST split. Copy or download.',
    keywords: ['gst invoice generator', 'gst invoice format', 'gst invoice online'],
    eyebrow: 'GST invoice',
    h1: 'GST invoice',
    h1Highlight: 'generator',
    subheading:
      'Fill in your details and get a correctly-structured GST invoice draft — with the CGST/SGST or IGST split worked out — ready to copy, download, or drop into your invoice.',
    sections: [
      {
        heading: 'What a GST invoice must include',
        body: [
          'A valid GST tax invoice is more than a bill with a tax line. It needs your name and GSTIN, the client’s name and GSTIN, a unique and consecutive invoice number, the date, a description of the service, the taxable value, the GST rate, and the tax split — CGST and SGST for supply within a state, or IGST for inter-state supply.',
          'This generator lays out those fields in the right structure and does the tax maths for you, so your draft is correct before you finalise it. For a polished, branded PDF with your logo, use the full invoice generator or CLIV∞, which produces GST invoices automatically.',
        ],
      },
      {
        heading: 'CGST/SGST vs IGST',
        body: [
          'Where the supply happens decides the tax type. If you and your client are in the same state, the GST is split equally into CGST and SGST. If the supply crosses state lines, the same total rate is charged as a single IGST. Getting this right matters because it affects how your client claims input credit.',
          'Set the “inter-state” field to match your situation and the draft updates the tax lines accordingly. If you are unsure whether a supply is inter-state — for example, for services delivered remotely — confirm the place-of-supply rules for your case.',
        ],
      },
    ],
    faqHeading: 'GST invoice FAQs',
    faqs: [
      { q: 'What must a GST invoice contain?', a: 'Your GSTIN and the client’s, a unique consecutive invoice number, the date, a service description, the taxable value, the GST rate, and the CGST/SGST or IGST split. This tool structures all of that for you.' },
      { q: 'When do I charge IGST instead of CGST/SGST?', a: 'Charge CGST + SGST for a supply within your state, and IGST for an inter-state supply. This generator switches the tax lines based on the inter-state field.' },
      { q: 'Can I get a branded PDF invoice?', a: 'Yes — use the full invoice generator or CLIV∞ for a branded PDF with your logo. This tool produces a correct text draft you can copy or download for free.' },
    ],
    related: [
      { href: '/invoice', label: 'PDF Invoice Generator', desc: 'Make a branded invoice PDF.' },
      { href: '/tools/gst-calculator', label: 'GST Calculator', desc: 'Add or remove GST from an amount.' },
      { href: '/glossary/gst', label: 'GST', desc: 'GST explained for freelancers.' },
      { href: '/features/invoicing', label: 'Invoicing', desc: 'Automatic GST invoices in CLIV∞.' },
    ],
    ctaTitle: 'Automate your GST invoices',
    ctaSubtitle: 'CLIV∞ raises GST-ready invoices from your projects. Start free.',
  },

  {
    slug: 'quotation-generator',
    path: '/tools/quotation-generator',
    title: 'Quotation Generator',
    tagline: 'Turn line items into a clean, shareable quotation.',
    kind: 'docgen',
    metaTitle: 'Free Quotation Generator (India) — Make a Quote',
    metaDescription:
      'Free quotation generator for freelancers. Add your line items and terms to build a clean, professional quote in ₹ you can copy or download in seconds.',
    keywords: ['quotation generator', 'quotation generator india', 'free quote maker'],
    eyebrow: 'Quotation',
    h1: 'Quotation',
    h1Highlight: 'generator',
    subheading:
      'List what you’ll do and what it costs, and get a clean, professional quotation ready to send — no design software, no signup.',
    sections: [
      {
        heading: 'What goes into a good quotation',
        body: [
          'A quotation is your offer before the work begins: what you’ll deliver, what it costs, and the terms attached. A clear quote wins trust and prevents disputes, because both sides agree on scope and price up front. At a minimum it needs your details, the client’s, a quote number and date, itemised work with prices, and any terms like advance payment or validity.',
          'This generator adds up your line items and lays it all out cleanly. Keep descriptions specific — “5-page responsive website” rather than “website work” — so there is no ambiguity about what the price covers when it is time to invoice.',
        ],
      },
      {
        heading: 'Quotation vs invoice',
        body: [
          'A quotation is not a tax invoice. It is a proposal of price that the client can accept or negotiate; no tax is due on it and it is not a legal demand for payment. Once the client agrees and you begin (or complete) the work, you raise an invoice — that is the document that requests payment and, if you are registered, carries GST.',
          'A good habit is to set a validity period on your quote so a price you gave three months ago does not come back to haunt you. When the client accepts, convert the quote into an invoice rather than retyping it — in CLIV∞, a quote and its invoice share the same client details automatically.',
        ],
      },
    ],
    faqHeading: 'Quotation FAQs',
    faqs: [
      { q: 'What is the difference between a quotation and an invoice?', a: 'A quotation is your offer of price before the work; an invoice requests payment after (or as) the work is done and, if you’re registered, carries GST. A quote is not a tax document.' },
      { q: 'Should a quotation include GST?', a: 'You can show estimated GST on a quote for clarity, but the actual tax is charged on the invoice. If you are not GST-registered, quote without it.' },
      { q: 'How long should a quote stay valid?', a: 'Set a validity period — often 7–30 days — so an old price doesn’t bind you. This generator includes a “valid until” field for exactly that.' },
    ],
    related: [
      { href: '/tools/proposal-template-generator', label: 'Proposal Generator', desc: 'Turn a quote into a full proposal.' },
      { href: '/tools/gst-invoice-generator', label: 'GST Invoice Generator', desc: 'Convert an accepted quote to an invoice.' },
      { href: '/glossary/quotation', label: 'Quotation', desc: 'Quotation explained.' },
      { href: '/features/invoicing', label: 'Invoicing', desc: 'Quote and invoice in one place.' },
    ],
    ctaTitle: 'Quote, then get paid',
    ctaSubtitle: 'CLIV∞ turns quotes into invoices without retyping. Start free.',
  },

  {
    slug: 'proposal-template-generator',
    path: '/tools/proposal-template-generator',
    title: 'Proposal Generator',
    tagline: 'Build a persuasive project proposal from a few fields.',
    kind: 'docgen',
    metaTitle: 'Free Proposal Template Generator for Freelancers',
    metaDescription:
      'Free project proposal generator. Fill in the goal, scope, timeline, and price to build a persuasive freelance proposal you can copy or download in minutes.',
    keywords: ['free proposal template', 'proposal generator', 'freelance proposal'],
    eyebrow: 'Proposal',
    h1: 'Proposal',
    h1Highlight: 'generator',
    subheading:
      'A proposal that wins the job leads with the client’s goal, not your CV. Fill in the essentials and get a structured, persuasive proposal ready to send.',
    sections: [
      {
        heading: 'What makes a proposal get accepted',
        body: [
          'The proposals that win are not the longest — they are the clearest. They open by showing you understand the client’s problem, then lay out exactly what you’ll deliver, when, and for how much, and finish with a simple next step. A proposal that leads with your understanding of their goal beats one that leads with a list of your services.',
          'This generator structures your proposal in that order: understanding, scope, timeline, investment, and next step. Fill in each section and you get a document that reads like you’ve done this before — because the structure does the persuading for you.',
        ],
      },
      {
        heading: 'Be specific about scope',
        body: [
          'Vague scope is where proposals and projects go wrong. “Website redesign” invites endless interpretation; “discovery, a 5-page responsive design, development, and launch” tells the client exactly what they’re buying. Specific scope protects both sides and makes the price feel justified.',
          'End with a single, easy next step — “approve this proposal to get started” — so the client knows precisely what to do. In CLIV∞ you can send proposals clients accept and e-sign in their portal, turning a yes into a signed agreement without printing anything.',
        ],
      },
    ],
    faqHeading: 'Proposal FAQs',
    faqs: [
      { q: 'How long should a freelance proposal be?', a: 'As short as it can be while covering understanding, scope, timeline, price, and the next step. One to two pages is plenty for most freelance work — clarity beats length.' },
      { q: 'Should a proposal include the price?', a: 'Yes. Hiding the price makes clients hesitate. State the investment and payment terms clearly so the decision is easy. This generator includes both.' },
      { q: 'How is a proposal different from a quote?', a: 'A quote is mostly price; a proposal sells the whole approach — the problem, the plan, the timeline, and the price together. Use a proposal to win the work, a quote for a quick price.' },
    ],
    related: [
      { href: '/tools/quotation-generator', label: 'Quotation Generator', desc: 'Just need a price? Make a quote.' },
      { href: '/tools/contract-template-generator', label: 'Contract Generator', desc: 'Turn a yes into an agreement.' },
      { href: '/glossary/proposal', label: 'Proposal', desc: 'Proposal explained.' },
      { href: '/features/crm-lead-pipeline', label: 'Lead Pipeline', desc: 'Send and track proposals in CLIV∞.' },
    ],
    ctaTitle: 'Send proposals clients can e-sign',
    ctaSubtitle: 'CLIV∞ turns proposals into signed deals in the portal. Start free.',
  },

  {
    slug: 'contract-template-generator',
    path: '/tools/contract-template-generator',
    title: 'Contract Generator',
    tagline: 'Draft a plain-language freelance agreement in minutes.',
    kind: 'docgen',
    metaTitle: 'Free Freelance Contract Template Generator (India)',
    metaDescription:
      'Free freelance contract generator. Fill in the parties, fee, and terms to draft a plain-language service agreement you can copy or download. Not legal advice.',
    keywords: ['freelance contract template india', 'contract generator', 'freelance agreement'],
    eyebrow: 'Contract',
    h1: 'Contract',
    h1Highlight: 'generator',
    subheading:
      'A simple written agreement prevents most freelance disputes. Fill in the essentials and get a plain-language service agreement to adapt and sign.',
    sections: [
      {
        heading: 'Why every freelancer needs a contract',
        body: [
          'Most freelance disputes — unpaid invoices, endless revisions, arguments over who owns the work — come down to nothing being written down. A short agreement fixes the important things in advance: what you’ll deliver, what it costs, when payment is due, how many revisions are included, and who owns the result once it’s paid for.',
          'This generator produces a plain-language draft covering those essentials. It is a starting point, not legal advice — for high-value work or anything unusual, have a professional adapt it to your situation and local law before you rely on it.',
        ],
      },
      {
        heading: 'The clauses that protect you most',
        body: [
          'Three clauses do the heavy lifting. Payment terms (for example, 50% advance) protect your cash flow. A revisions cap stops “just one more change” becoming unlimited free work — anything beyond it is billed separately. And an ownership clause makes clear that IP transfers to the client on full payment, which both protects you until you’re paid and gives the client certainty afterwards.',
          'A termination clause is worth adding too, so either side can end the arrangement cleanly with the client paying for work done to date. Keep the language human — a contract both sides actually understand is more useful than one full of jargon nobody reads.',
        ],
      },
    ],
    faqHeading: 'Contract FAQs',
    faqs: [
      { q: 'Is this contract legally binding?', a: 'A signed agreement can be binding, but this is a plain-language template, not legal advice. For high-value or unusual work, have a professional adapt it to your situation and local law before relying on it.' },
      { q: 'What are the most important clauses?', a: 'Payment terms, a revisions cap, and an IP-ownership-on-payment clause protect freelancers most. A clean termination clause helps too. This generator includes all of these.' },
      { q: 'Do I need a contract for small jobs?', a: 'Even a short written agreement or email confirming scope, price, and payment terms is far better than nothing — most disputes come from things never being written down.' },
    ],
    related: [
      { href: '/tools/proposal-template-generator', label: 'Proposal Generator', desc: 'Win the work first.' },
      { href: '/glossary/scope-of-work', label: 'Scope of work', desc: 'Define what’s in and out.' },
      { href: '/glossary/nda', label: 'NDA', desc: 'When you need a confidentiality agreement.' },
      { href: '/for/freelancers', label: 'For Freelancers', desc: 'Run your freelance business in one place.' },
    ],
    ctaTitle: 'Get it in writing, then get to work',
    ctaSubtitle: 'CLIV∞ handles proposals, e-signatures, and invoices. Start free.',
  },

  {
    slug: 'late-payment-reminder-generator',
    path: '/tools/late-payment-reminder-generator',
    title: 'Payment Reminder Generator',
    tagline: 'Write a polite (or firm) payment reminder in seconds.',
    kind: 'docgen',
    metaTitle: 'Payment Reminder Email Generator for Freelancers',
    metaDescription:
      'Free late-payment reminder generator. Fill in the invoice details and get a polite or firm payment reminder email you can copy and send in seconds.',
    keywords: ['payment reminder email', 'late payment reminder', 'chasing invoice email'],
    eyebrow: 'Payment reminder',
    h1: 'Payment reminder',
    h1Highlight: 'generator',
    subheading:
      'Chasing money is awkward. Fill in the invoice details, choose a friendly or firm tone, and get a professional reminder email that gets you paid without burning the relationship.',
    sections: [
      {
        heading: 'How to chase a late payment (without the awkwardness)',
        body: [
          'The best reminders are calm, specific, and easy to act on. Reference the exact invoice number and amount, state the due date, and make it simple to pay — offer to resend the invoice or share UPI/bank details. A friendly nudge is usually enough the first time; most late payments are oversight, not refusal.',
          'If a friendly reminder goes unanswered, escalate the tone rather than the volume. This generator gives you a warm version and a firmer follow-up — type “firm” in the tone field for the stronger one — so you always have the right words ready without staring at a blank email.',
        ],
      },
      {
        heading: 'Prevent late payments in the first place',
        body: [
          'The best reminder is the one you never have to send. Clear payment terms on every invoice, an advance for larger projects, and a due date that is actually stated all reduce lateness. So does sending the invoice promptly — the longer you wait to bill, the longer the clock takes to start.',
          'When you do need to chase, keeping track of who owes what and for how long makes it far less stressful. CLIV∞ tracks outstanding dues so you know exactly which invoices to follow up on, instead of hunting through your inbox.',
        ],
      },
    ],
    faqHeading: 'Payment reminder FAQs',
    faqs: [
      { q: 'How soon should I send a payment reminder?', a: 'A gentle reminder a few days after the due date is reasonable — many late payments are simple oversight. If that’s ignored, follow up with a firmer message and a short deadline.' },
      { q: 'How do I stay polite but firm?', a: 'Be specific and factual: reference the invoice number, amount, and due date, and make paying easy. This generator’s friendly version stays warm; typing “firm” gives you a stronger, still-professional follow-up.' },
      { q: 'What if the client keeps ignoring me?', a: 'Escalate in writing with a clear deadline, pause ongoing work if appropriate, and keep every message on record. Clear upfront terms and advances prevent most of these situations.' },
    ],
    related: [
      { href: '/tools/invoice-number-generator', label: 'Invoice Number Generator', desc: 'Number invoices so they’re easy to reference.' },
      { href: '/glossary/net-30', label: 'Net 30', desc: 'What payment terms actually mean.' },
      { href: '/glossary/accounts-receivable', label: 'Accounts receivable', desc: 'The money owed to you.' },
      { href: '/features/invoicing', label: 'Invoicing', desc: 'Track dues automatically in CLIV∞.' },
    ],
    ctaTitle: 'Never lose track of who owes you',
    ctaSubtitle: 'CLIV∞ tracks outstanding invoices and dues. Start free.',
  },

  {
    slug: 'invoice-number-generator',
    path: '/tools/invoice-number-generator',
    title: 'Invoice Number Generator',
    tagline: 'Set up a clean, GST-safe invoice numbering scheme.',
    kind: 'docgen',
    metaTitle: 'Invoice Number Generator — Invoice Numbering System',
    metaDescription:
      'Free invoice number generator. Set a prefix, financial year, and sequence to build a clean, consecutive invoice numbering system that’s GST-safe.',
    keywords: ['invoice number generator', 'invoice numbering system', 'invoice number format'],
    eyebrow: 'Invoice numbers',
    h1: 'Invoice number',
    h1Highlight: 'generator',
    subheading:
      'A messy invoice numbering system causes real problems at tax time. Set your prefix, financial year, and starting number, and get a clean, consecutive scheme.',
    sections: [
      {
        heading: 'What makes a good invoice numbering system',
        body: [
          'Under GST, invoice numbers must be consecutive and unique within a financial year, with no gaps — a random or duplicated number is a compliance problem waiting to happen. A good scheme is also human-readable and sorts correctly, which matters the moment you have more than a handful of invoices.',
          'A reliable format combines a short prefix, the financial year, and a zero-padded sequence — for example, INV/2026-27/001. The prefix identifies the document, the year keeps series separate, and the padding keeps everything sorting in order. This generator builds exactly that and shows your next few numbers.',
        ],
      },
      {
        heading: 'Reset the series each financial year',
        body: [
          'A common practice is to restart the sequence at the beginning of each financial year, with the year in the number keeping old and new series distinct. That keeps each year’s invoices self-contained and easy to reconcile at filing time.',
          'The one rule you cannot break is consecutiveness — never skip or reuse a number. If you cancel an invoice, keep the number in the record marked as cancelled rather than reusing it. Doing this by hand is error-prone, which is why CLIV∞ numbers your invoices automatically and consecutively.',
        ],
      },
    ],
    faqHeading: 'Invoice numbering FAQs',
    faqs: [
      { q: 'What is a good invoice number format?', a: 'A prefix, the financial year, and a zero-padded sequence — like INV/2026-27/001. It’s readable, sorts correctly, and keeps each year’s series separate. This tool builds it for you.' },
      { q: 'Do invoice numbers have to be consecutive?', a: 'Yes — GST rules require a consecutive, unique series with no gaps within a financial year. Never skip or reuse a number; mark cancelled invoices as cancelled rather than reusing the number.' },
      { q: 'Should I reset numbers each year?', a: 'Many businesses restart the sequence each financial year, with the year embedded in the number to keep series distinct. Consistency matters most — pick a scheme and stick to it.' },
    ],
    related: [
      { href: '/tools/gst-invoice-generator', label: 'GST Invoice Generator', desc: 'Build a GST invoice draft.' },
      { href: '/invoice', label: 'Invoice Generator', desc: 'Make a branded invoice PDF.' },
      { href: '/glossary/invoice', label: 'Invoice', desc: 'What a valid invoice needs.' },
      { href: '/features/invoicing', label: 'Invoicing', desc: 'Automatic numbering in CLIV∞.' },
    ],
    ctaTitle: 'Let your invoices number themselves',
    ctaSubtitle: 'CLIV∞ handles consecutive, GST-safe invoice numbers. Start free.',
  },

  {
    slug: 'timesheet-generator',
    path: '/tools/timesheet-generator',
    title: 'Timesheet Generator',
    tagline: 'Create a simple weekly timesheet to track billable hours.',
    kind: 'docgen',
    metaTitle: 'Free Timesheet Generator — Weekly Timesheet Template',
    metaDescription:
      'Free weekly timesheet generator for freelancers. Add your name, client, and rate to create a simple timesheet template you can copy, download, and fill in.',
    keywords: ['timesheet generator', 'weekly timesheet template', 'freelance timesheet'],
    eyebrow: 'Timesheet',
    h1: 'Timesheet',
    h1Highlight: 'generator',
    subheading:
      'Track billable hours the simple way. Generate a clean weekly timesheet with your details and rate, ready to fill in and attach to your invoice.',
    sections: [
      {
        heading: 'Why track your hours',
        body: [
          'Even if you charge fixed prices, tracking hours tells you the truth about your work: which projects are profitable, which clients quietly eat your time, and whether your rate holds up against reality. For hourly and retainer work, a timesheet is the record that justifies your invoice and settles any question about what was done.',
          'This generator creates a simple weekly grid — day, task, and hours — with your name, client, and rate at the top. Fill it in as you go, total it at the end of the week, and attach it to your invoice so the client can see exactly what they’re paying for.',
        ],
      },
      {
        heading: 'Turn hours into accurate invoices',
        body: [
          'A timesheet is only useful if it feeds your billing. At the end of a week or month, total the billable hours, multiply by your rate, and that’s your invoice line — no guesswork, no under-billing the hours you actually worked. Keeping the record also protects you if a client questions the bill.',
          'Retyping hours from a timesheet into an invoice is exactly the kind of admin that eats freelance evenings. In CLIV∞, billable work ties to projects and flows into invoices, so the hours you track become the invoice you send without copying anything twice.',
        ],
      },
    ],
    faqHeading: 'Timesheet FAQs',
    faqs: [
      { q: 'Why should freelancers use a timesheet?', a: 'It shows which projects and clients are actually profitable, justifies hourly and retainer invoices, and stops you under-billing the hours you really worked — even if you mostly charge fixed prices.' },
      { q: 'How do I turn a timesheet into an invoice?', a: 'Total the billable hours, multiply by your rate, and that’s your invoice line. Keep the timesheet as the record behind the bill. CLIV∞ ties billable work to invoices so you don’t retype it.' },
      { q: 'Is this timesheet free?', a: 'Yes — generate a weekly timesheet template, then copy or download it as a text file, free and with no signup.' },
    ],
    related: [
      { href: '/tools/freelance-rate-calculator', label: 'Rate Calculator', desc: 'Set the rate your hours bill at.' },
      { href: '/glossary/billable-hours', label: 'Billable hours', desc: 'What counts as billable.' },
      { href: '/glossary/utilization-rate', label: 'Utilization rate', desc: 'How much of your time is billable.' },
      { href: '/features/project-management', label: 'Project Management', desc: 'Tie hours to projects in CLIV∞.' },
    ],
    ctaTitle: 'Track once, invoice automatically',
    ctaSubtitle: 'CLIV∞ turns tracked work into invoices. Start free.',
  },
]

// The Time Converter pre-dates the tools hub and has its own page/layout; listed
// here (as external) so it stays linked from the hub and isn't orphaned.
TOOLS.push({
  slug: 'time-converter',
  path: '/time-converter',
  title: 'Time Zone Converter',
  tagline: 'Convert a time across any timezone instantly.',
  kind: 'external',
  externalHref: '/time-converter',
  metaTitle: 'Time Zone Converter — CLIV∞',
  metaDescription: 'Convert time across any timezone instantly. Free, no signup.',
  keywords: ['time zone converter'],
  eyebrow: 'Time converter',
  h1: 'Time zone',
  h1Highlight: 'converter',
  subheading: 'Convert a time across any timezone instantly.',
  sections: [],
  faqHeading: 'Time converter FAQs',
  faqs: [{ q: 'Is it free?', a: 'Yes — convert time across timezones for free, no signup.' }],
  related: [],
  ctaTitle: 'Schedule client meetings across timezones',
  ctaSubtitle: 'CLIV∞ syncs meetings with Google Calendar and Meet. Start free.',
})

export const TOOLS_BY_SLUG: Record<string, ToolConfig> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
)

/** Tools that get their own generated /tools/<slug> page (not external links). */
export const TOOL_PAGES = TOOLS.filter((t) => t.kind !== 'external')
