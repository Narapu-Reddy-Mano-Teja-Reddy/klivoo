import type { TemplateConfig } from './templates/_type'

export type { TemplateConfig }

const LEGAL_DISCLAIMER =
  'This is a plain-language starting template, not legal advice. Adapt it to your situation and, for high-value or unusual work, have a qualified professional review it under your local law before you rely on it.'

export const TEMPLATES: TemplateConfig[] = [
  {
    slug: 'freelance-contract-template',
    path: '/templates/freelance-contract-template',
    title: 'Freelance Contract Template',
    tagline: 'A plain-language service agreement you can copy and adapt.',
    metaTitle: 'Free Freelance Contract Template (India) — Copy & Use',
    metaDescription:
      'A free, plain-language freelance contract template for India. Copy the service agreement, fill in your details, and protect your payment, scope, and IP.',
    keywords: ['freelance contract template india', 'freelance contract template', 'freelance service agreement'],
    eyebrow: 'Contract template',
    h1: 'Freelance contract',
    h1Highlight: 'template',
    subheading:
      'A short, readable service agreement that covers the things freelance disputes actually turn on — payment, scope, revisions, and who owns the work.',
    intro: [
      'Most freelance problems — unpaid invoices, endless revisions, arguments over ownership — happen because nothing was written down. A simple contract fixes the important terms in advance so both sides know where they stand.',
      'This template is deliberately plain-language: no jargon, just the clauses that matter. Copy it, replace the bracketed placeholders with your details, and you have a working agreement in minutes.',
    ],
    templateTitle: 'Freelance Service Agreement',
    templateBody: `FREELANCE SERVICE AGREEMENT

This Agreement is made on [DATE] between:
  Freelancer: [YOUR NAME / BUSINESS], [ADDRESS] ("Freelancer")
  Client: [CLIENT NAME], [ADDRESS] ("Client")

1. SERVICES
The Freelancer will provide the following services:
  [DESCRIBE THE WORK — be specific, e.g. "design and development of a 5-page responsive website"].

2. FEES & PAYMENT
Total fee: ₹[AMOUNT].
Payment schedule: [e.g. 50% advance to begin, 50% on delivery].
Invoices are due within [7/15/30] days. Late payments may pause ongoing work.

3. REVISIONS
This fee includes [NUMBER] rounds of revisions. Additional revisions or new scope are billed at ₹[RATE] or by a separate quote.

4. TIMELINE
Estimated delivery: [TIMEFRAME] from receipt of advance and required materials from the Client. Delays caused by late Client feedback extend the timeline accordingly.

5. INTELLECTUAL PROPERTY
On receipt of full payment, ownership of the final deliverables transfers to the Client. Until then, all work remains the Freelancer's property. The Freelancer may display the work in their portfolio unless agreed otherwise in writing.

6. CONFIDENTIALITY
Each party will keep the other's confidential information private and use it only for this project.

7. TERMINATION
Either party may end this Agreement with [NUMBER] days' written notice. The Client pays for all work completed up to the termination date.

8. GOVERNING LAW
This Agreement is governed by the laws of India.

Signed:
Freelancer: __________________________  Date: __________
Client:     __________________________  Date: __________`,
    howToUse: [
      'Copy the template and paste it into your document editor or email.',
      'Replace every [BRACKETED] placeholder with your specific details.',
      'Adjust the payment schedule, revisions, and notice periods to match what you agreed.',
      'Both parties sign (a typed name in an email, or an e-signature, is often enough for smaller jobs).',
    ],
    tips: [
      'Always take an advance for larger projects — it filters out non-serious clients.',
      'Cap revisions explicitly so “one more change” doesn’t become unlimited free work.',
      'Keep the IP-transfers-on-payment clause — it protects you until you’re actually paid.',
      'For high-value or unusual work, have a professional review it first.',
    ],
    faqHeading: 'Freelance contract FAQs',
    faqs: [
      { q: 'Is a freelance contract legally binding in India?', a: 'A signed agreement between two competent parties for a lawful purpose can be binding. This template is a plain-language starting point, not legal advice — for significant work, have a professional adapt it to your situation and local law.' },
      { q: 'Do I need a contract for small jobs?', a: 'Even a short written agreement or an email confirming scope, price, revisions, and payment terms is far safer than nothing. Most disputes come from things never being written down.' },
      { q: 'Can I use an e-signature?', a: 'Yes — for most freelance work an e-signature or even a typed confirmation in email is practical. CLIV∞ lets clients accept and e-sign agreements in their portal.' },
    ],
    related: [
      { href: '/tools/contract-template-generator', label: 'Contract Generator', desc: 'Auto-fill this contract with your details.' },
      { href: '/templates/scope-of-work-template', label: 'Scope of Work Template', desc: 'Define exactly what’s included.' },
      { href: '/glossary/e-signature', label: 'E-signature', desc: 'How digital signing works.' },
    ],
    ctaTitle: 'Send contracts clients can e-sign',
    ctaSubtitle: 'CLIV∞ handles proposals, e-signatures, and invoices in one place. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  {
    slug: 'project-proposal-template',
    path: '/templates/project-proposal-template',
    title: 'Project Proposal Template',
    tagline: 'A proposal structure that leads with the client’s goal.',
    metaTitle: 'Free Project Proposal Template for Freelancers',
    metaDescription:
      'A free project proposal template for freelancers. Copy the structure, fill in the goal, scope, timeline, and price, and send a proposal that gets accepted.',
    keywords: ['project proposal template', 'freelance proposal template', 'proposal example'],
    eyebrow: 'Proposal template',
    h1: 'Project proposal',
    h1Highlight: 'template',
    subheading:
      'The proposals that win aren’t the longest — they’re the clearest. This structure leads with the client’s goal and ends with an easy yes.',
    intro: [
      'A proposal is your pitch in writing. The ones that get accepted show you understand the client’s problem, lay out exactly what you’ll deliver and when, state the price plainly, and make the next step obvious.',
      'This template follows that proven order. Fill each section, keep the scope specific, and you’ll send something that reads like you’ve done this many times before.',
    ],
    templateTitle: 'Project Proposal',
    templateBody: `PROJECT PROPOSAL
[PROJECT TITLE]

Prepared for: [CLIENT NAME]
Prepared by: [YOUR NAME / BUSINESS]
Date: [DATE]

1. UNDERSTANDING
[In 2–3 sentences, show you understand the client's goal and why this project matters to them. Mirror their own words.]

2. SCOPE OF WORK
What you'll deliver:
  • [Deliverable 1]
  • [Deliverable 2]
  • [Deliverable 3]
Not included: [state what's out of scope to prevent creep].

3. TIMELINE
[Milestone 1] — [date/week]
[Milestone 2] — [date/week]
Final delivery — [date/week], from receipt of advance and materials.

4. INVESTMENT
Total: ₹[AMOUNT]
Payment terms: [e.g. 50% advance, 50% on delivery].

5. WHY ME
[2–3 lines: relevant experience or results, kept short and specific.]

6. NEXT STEP
Approve this proposal to get started. Questions? Just reply and we'll sort them out.`,
    howToUse: [
      'Copy the template and fill in each section for your client.',
      'Rewrite the Understanding section in the client’s own language — it’s the part that wins trust.',
      'List scope as specific deliverables, and state what’s NOT included.',
      'Send it, then follow up if you don’t hear back within a few days.',
    ],
    tips: [
      'Keep it to one or two pages — clarity beats length.',
      'Always include the price; hiding it makes clients hesitate.',
      'State what’s out of scope to prevent scope creep later.',
      'End with a single, easy next step.',
    ],
    faqHeading: 'Proposal template FAQs',
    faqs: [
      { q: 'How long should a proposal be?', a: 'One to two pages is plenty for most freelance work. Cover understanding, scope, timeline, price, and the next step — then stop.' },
      { q: 'Should the proposal include the price?', a: 'Yes. Stating the investment and payment terms clearly makes the decision easy; hiding the price creates hesitation.' },
      { q: 'What’s the difference between a proposal and a quote?', a: 'A quote is mostly a price; a proposal sells the whole approach — the problem, the plan, the timeline, and the price together.' },
    ],
    related: [
      { href: '/tools/proposal-template-generator', label: 'Proposal Generator', desc: 'Auto-fill this proposal.' },
      { href: '/templates/quotation-template', label: 'Quotation Template', desc: 'Just need a price? Use a quote.' },
      { href: '/glossary/proposal', label: 'Proposal', desc: 'Proposal explained.' },
    ],
    ctaTitle: 'Turn a yes into a signed deal',
    ctaSubtitle: 'CLIV∞ sends proposals clients accept and e-sign in their portal. Start free.',
  },

  {
    slug: 'client-onboarding-checklist',
    path: '/templates/client-onboarding-checklist',
    title: 'Client Onboarding Checklist',
    tagline: 'Everything to collect and confirm before a project starts.',
    metaTitle: 'Free Client Onboarding Checklist for Freelancers',
    metaDescription:
      'A free client onboarding checklist for freelancers and agencies. Copy the steps to collect details, set expectations, and start every project on the right foot.',
    keywords: ['client onboarding checklist', 'freelance onboarding', 'onboarding new clients'],
    eyebrow: 'Onboarding checklist',
    h1: 'Client onboarding',
    h1Highlight: 'checklist',
    subheading:
      'A smooth start sets the tone for the whole project. This checklist makes sure nothing important is missed before you begin the work.',
    intro: [
      'The first week with a new client decides how the rest of the project feels. A structured onboarding collects everything you need, sets expectations, and makes you look organised and professional from day one.',
      'Copy this checklist and work through it for every new client. It prevents the mid-project scramble for logins, brand files, or “wait, who approves this?”',
    ],
    templateTitle: 'New Client Onboarding Checklist',
    templateBody: `NEW CLIENT ONBOARDING CHECKLIST

BEFORE YOU START
  [ ] Signed agreement / accepted proposal
  [ ] Advance payment received
  [ ] Kickoff call scheduled

COLLECT FROM THE CLIENT
  [ ] Main point of contact + who approves work
  [ ] Project goals and success criteria
  [ ] Brand assets (logo, colours, fonts, guidelines)
  [ ] Required logins / access (with a secure method)
  [ ] Content, copy, images, or data you need
  [ ] Deadlines and any fixed dates

CONFIRM & SET EXPECTATIONS
  [ ] Scope and deliverables (and what's out of scope)
  [ ] Number of revision rounds
  [ ] How and how often you'll communicate
  [ ] Feedback turnaround the client will commit to
  [ ] Payment schedule and invoice dates

SET UP YOUR SIDE
  [ ] Create the client + project in your system
  [ ] Create the project board / tasks
  [ ] Add the client to their portal (if you use one)
  [ ] Diarise milestones and the first check-in

FIRST WEEK
  [ ] Send a welcome note with next steps
  [ ] Confirm you have everything to begin
  [ ] Deliver a small early win if possible`,
    howToUse: [
      'Copy the checklist and keep a master copy you reuse for every client.',
      'Work top to bottom before any real work begins.',
      'Send the “collect from the client” items as a single clear request, not scattered messages.',
      'Tick off expectations together on the kickoff call so nothing is assumed.',
    ],
    tips: [
      'Get the advance and agreement before collecting access — it confirms commitment.',
      'Ask for a feedback turnaround commitment; slow client feedback is the top cause of delays.',
      'Deliver one small early win to build confidence.',
      'Never share passwords in plain email — use a secure method.',
    ],
    faqHeading: 'Onboarding FAQs',
    faqs: [
      { q: 'Why does client onboarding matter?', a: 'A structured start collects everything you need, sets clear expectations, and makes you look professional — which prevents most mid-project confusion and scope arguments.' },
      { q: 'What should I collect before starting?', a: 'The signed agreement, advance, main contact and approver, goals, brand assets, required access, content, and deadlines. This checklist lists them all.' },
      { q: 'How do I set expectations without seeming difficult?', a: 'Frame it as making the project run smoothly for them: confirm scope, revisions, communication, and feedback turnaround on the kickoff call. Clients appreciate the clarity.' },
    ],
    related: [
      { href: '/glossary/onboarding', label: 'Onboarding', desc: 'What onboarding means.' },
      { href: '/glossary/intake-form', label: 'Intake form', desc: 'Collect client details in one form.' },
      { href: '/features/client-management', label: 'Client Management', desc: 'Keep every client’s details in one profile.' },
    ],
    ctaTitle: 'Onboard clients without the chaos',
    ctaSubtitle: 'CLIV∞ uses intake forms and a client portal to start projects cleanly. Start free.',
  },

  {
    slug: 'scope-of-work-template',
    path: '/templates/scope-of-work-template',
    title: 'Scope of Work Template',
    tagline: 'Define exactly what’s in — and out of — a project.',
    metaTitle: 'Free Scope of Work (SOW) Template for Freelancers',
    metaDescription:
      'A free scope of work template for freelancers. Copy the SOW structure to define deliverables, timeline, and exclusions — and prevent scope creep.',
    keywords: ['scope of work template', 'sow template', 'statement of work template'],
    eyebrow: 'Scope of work',
    h1: 'Scope of work',
    h1Highlight: 'template',
    subheading:
      'Scope creep starts where the scope is vague. This template pins down exactly what you’ll deliver, by when, and what falls outside the price.',
    intro: [
      'A scope of work (SOW) turns a fuzzy “build me a website” into a precise list of what’s included, what isn’t, and what happens when the client wants more. It’s the single best defence against scope creep.',
      'Attach an SOW to your contract or proposal for every project. When a client asks for something outside it, you have a clear, unemotional reference point — and a reason to raise a change order.',
    ],
    templateTitle: 'Scope of Work',
    templateBody: `SCOPE OF WORK

Project: [PROJECT NAME]
Client: [CLIENT NAME]
Freelancer: [YOUR NAME]
Date: [DATE]

1. OBJECTIVE
[One or two sentences on what this project is meant to achieve.]

2. DELIVERABLES
  • [Deliverable 1 — specific, e.g. "Homepage + 4 inner pages, responsive"]
  • [Deliverable 2]
  • [Deliverable 3]

3. OUT OF SCOPE
The following are NOT included and will be quoted separately if needed:
  • [e.g. Copywriting]
  • [e.g. Ongoing maintenance]
  • [e.g. Additional pages beyond those listed]

4. TIMELINE & MILESTONES
  • [Milestone 1] — [date]
  • [Milestone 2] — [date]
  • Final delivery — [date]

5. CLIENT RESPONSIBILITIES
  • Provide [content/assets/access] by [date]
  • Give consolidated feedback within [X] working days

6. REVISIONS
Included: [NUMBER] rounds. Beyond this, changes are handled as a change order at ₹[RATE].

7. CHANGES
Any change to this scope will be agreed in writing, with any impact on price and timeline stated before work continues.`,
    howToUse: [
      'Copy the template and complete each section for the specific project.',
      'Be concrete in Deliverables — quantities, page counts, formats.',
      'Fill the Out of Scope section honestly; it’s the most valuable part.',
      'Attach it to your contract or proposal and have the client acknowledge it.',
    ],
    tips: [
      'The Out of Scope section prevents more disputes than any other clause — don’t skip it.',
      'Tie deliverables to numbers (pages, rounds, formats) so “done” is unambiguous.',
      'State client responsibilities and feedback turnaround — their delays shouldn’t become your fault.',
      'Route every new request through the Changes clause.',
    ],
    faqHeading: 'Scope of work FAQs',
    faqs: [
      { q: 'What is a scope of work?', a: 'A scope of work (SOW) is a document that defines exactly what a project includes — deliverables, timeline, exclusions, and how changes are handled. It’s the main tool against scope creep.' },
      { q: 'Is an SOW the same as a statement of work?', a: 'The terms are often used interchangeably. Both describe the deliverables, timeline, and terms of a specific piece of work; larger contracts sometimes attach an SOW under a broader master agreement.' },
      { q: 'How does an SOW stop scope creep?', a: 'By listing what’s included and explicitly what isn’t, plus a changes clause, it gives you a clear reference to point to when a client asks for extra work — turning an awkward conversation into a simple change order.' },
    ],
    related: [
      { href: '/glossary/scope-of-work', label: 'Scope of work', desc: 'The concept explained.' },
      { href: '/glossary/change-order', label: 'Change order', desc: 'How to charge for extra work.' },
      { href: '/templates/freelance-contract-template', label: 'Contract Template', desc: 'Pair the SOW with a contract.' },
    ],
    ctaTitle: 'Keep scope under control',
    ctaSubtitle: 'CLIV∞ ties scope and budgets to every project. Start free.',
  },

  {
    slug: 'nda-template-freelancers',
    path: '/templates/nda-template-freelancers',
    title: 'NDA Template for Freelancers',
    tagline: 'A simple mutual confidentiality agreement.',
    metaTitle: 'Free NDA Template for Freelancers (India)',
    metaDescription:
      'A free, plain-language NDA template for freelancers. Copy the mutual confidentiality agreement to protect sensitive information before a project. Not legal advice.',
    keywords: ['nda template freelancers', 'nda template india', 'confidentiality agreement freelance'],
    eyebrow: 'NDA template',
    h1: 'NDA',
    h1Highlight: 'template',
    subheading:
      'When a project involves sensitive information, a short mutual NDA sets the ground rules for keeping it private — before you share anything.',
    intro: [
      'A non-disclosure agreement (NDA) is a promise to keep shared information confidential. Freelancers meet them when a client shares business plans, data, or unreleased products — and sometimes you’ll want one to protect your own methods too.',
      'This is a simple mutual NDA, meaning both sides protect each other’s confidential information. Copy it, fill in the details, and use it before sensitive information changes hands.',
    ],
    templateTitle: 'Mutual Non-Disclosure Agreement',
    templateBody: `MUTUAL NON-DISCLOSURE AGREEMENT

This Agreement is made on [DATE] between:
  [PARTY A NAME], [ADDRESS]
  [PARTY B NAME], [ADDRESS]
(each a "Party").

1. PURPOSE
The Parties wish to share confidential information to explore or carry out [DESCRIBE PURPOSE, e.g. "a website development project"].

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information shared by one Party with the other, whether written, verbal, or electronic, that is marked or would reasonably be understood to be confidential.

3. OBLIGATIONS
Each Party will:
  • Keep the other's Confidential Information private;
  • Use it only for the Purpose above;
  • Not disclose it to any third party without written consent.

4. EXCLUSIONS
Confidential Information does not include information that is public, already known, independently developed, or required to be disclosed by law.

5. TERM
These obligations apply during the project and for [NUMBER] years after it ends.

6. NO LICENCE
Sharing information grants no ownership or licence beyond the Purpose.

7. GOVERNING LAW
This Agreement is governed by the laws of India.

Signed:
Party A: __________________________  Date: __________
Party B: __________________________  Date: __________`,
    howToUse: [
      'Copy the NDA and fill in both parties’ details and the purpose.',
      'Set a sensible term (often 1–3 years after the project).',
      'Both parties sign before any confidential information is shared.',
      'Keep a signed copy on file.',
    ],
    tips: [
      'A mutual NDA is usually fairer and easier to agree than a one-sided one.',
      'Keep the “Purpose” specific so the NDA isn’t overly broad.',
      'Don’t rely on an NDA for high-stakes matters without professional review.',
      'An NDA protects information — use a contract for the work itself.',
    ],
    faqHeading: 'NDA FAQs',
    faqs: [
      { q: 'When do freelancers need an NDA?', a: 'When a project involves sensitive information — business plans, data, unreleased products — or when you want to protect your own methods. For many small projects the confidentiality clause in your contract is enough.' },
      { q: 'Is a mutual NDA better than a one-way one?', a: 'A mutual NDA protects both sides and is usually quicker to agree, since neither party is asked to take on all the obligation. This template is mutual.' },
      { q: 'Is this NDA legally valid?', a: 'A properly completed, signed NDA can be enforceable, but this is a plain-language template, not legal advice. For high-stakes situations, have a professional review it under your local law.' },
    ],
    related: [
      { href: '/glossary/nda', label: 'NDA', desc: 'What an NDA is and isn’t.' },
      { href: '/glossary/msa', label: 'MSA', desc: 'Master service agreements explained.' },
      { href: '/templates/freelance-contract-template', label: 'Contract Template', desc: 'The agreement for the actual work.' },
    ],
    ctaTitle: 'Handle documents like a pro',
    ctaSubtitle: 'CLIV∞ manages proposals, agreements, and e-signatures. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  {
    slug: 'invoice-template-india',
    path: '/templates/invoice-template-india',
    title: 'Invoice Template (India)',
    tagline: 'A clean invoice layout with all the fields you need.',
    metaTitle: 'Free Invoice Template India — Copy & Use',
    metaDescription:
      'A free invoice template for India with every field you need, including GST. Copy the layout, fill in your details, or use the free invoice generator for a PDF.',
    keywords: ['invoice template india', 'invoice format india', 'freelance invoice template'],
    eyebrow: 'Invoice template',
    h1: 'Invoice template',
    h1Highlight: 'India',
    subheading:
      'A complete invoice layout with every field an Indian freelance invoice needs — copy it, or use the free generator for a branded PDF.',
    intro: [
      'A professional invoice gets you paid faster and keeps your records clean. This template lays out all the fields a valid Indian invoice needs — your and the client’s details, a unique number, itemised work, and GST if you’re registered.',
      'Copy the layout below to build an invoice in any editor, or use the free invoice generator to produce a branded PDF in seconds.',
    ],
    templateTitle: 'Invoice (India)',
    templateBody: `INVOICE

FROM
[YOUR NAME / BUSINESS]
[ADDRESS]
GSTIN: [YOUR GSTIN — if registered]
PAN: [YOUR PAN]

BILL TO
[CLIENT NAME]
[CLIENT ADDRESS]
GSTIN: [CLIENT GSTIN — if applicable]

Invoice No: [INV/2026-27/001]
Invoice Date: [DATE]
Due Date: [DATE]

------------------------------------------------------------
Description                         Qty     Rate      Amount
------------------------------------------------------------
[Service / item 1]                  [1]    ₹[____]   ₹[____]
[Service / item 2]                  [1]    ₹[____]   ₹[____]
------------------------------------------------------------
                                        Subtotal:   ₹[____]
                                  CGST @ [9]%:   ₹[____]
                                  SGST @ [9]%:   ₹[____]
                        (or IGST @ [18]% if inter-state)
------------------------------------------------------------
                                        TOTAL:   ₹[____]

Amount in words: [Rupees ______ only]

PAYMENT DETAILS
UPI: [your-upi@bank]   |   Bank: [A/C no, IFSC, bank name]

Notes: [Payment due within X days. Thank you for your business.]`,
    howToUse: [
      'Copy the layout into your editor, or use the free invoice generator for a PDF.',
      'Fill in your details, the client’s, and a unique consecutive invoice number.',
      'Add your line items; if GST-registered, apply CGST/SGST (same state) or IGST (inter-state).',
      'Include UPI and bank details so paying is effortless.',
    ],
    tips: [
      'Use a consecutive, unique invoice number — GST rules require no gaps.',
      'Send the invoice promptly; the clock on payment only starts once it’s sent.',
      'State a clear due date and payment method to get paid faster.',
      'If you’re not GST-registered, simply omit the GST lines.',
    ],
    faqHeading: 'Invoice template FAQs',
    faqs: [
      { q: 'What must an Indian invoice include?', a: 'Your details (and GSTIN if registered), the client’s details, a unique consecutive invoice number, date, itemised work, the amount, and GST if applicable. This template includes all of them.' },
      { q: 'Do I need GST on my invoice?', a: 'Only if you’re registered for GST. If you are, show CGST/SGST for same-state supply or IGST for inter-state. If you’re not registered, omit the GST lines.' },
      { q: 'How do I get a PDF invoice?', a: 'Use the free invoice generator to produce a branded PDF in seconds, or use CLIV∞ to raise GST-ready invoices automatically from your projects.' },
    ],
    related: [
      { href: '/invoice', label: 'Invoice Generator', desc: 'Make a branded invoice PDF.' },
      { href: '/tools/gst-invoice-generator', label: 'GST Invoice Generator', desc: 'Build a GST invoice draft.' },
      { href: '/tools/invoice-number-generator', label: 'Invoice Number Generator', desc: 'Set up a numbering scheme.' },
    ],
    ctaTitle: 'Automate your invoicing',
    ctaSubtitle: 'CLIV∞ raises GST-ready invoices and tracks payments. Start free.',
  },

  {
    slug: 'quotation-template',
    path: '/templates/quotation-template',
    title: 'Quotation Template',
    tagline: 'A clean quote layout to price work before it starts.',
    metaTitle: 'Free Quotation Template (India) — Copy & Use',
    metaDescription:
      'A free quotation template for freelancers in India. Copy the quote layout, add your line items and terms, and send a professional quote in minutes.',
    keywords: ['quotation template', 'quotation format india', 'free quote template'],
    eyebrow: 'Quotation template',
    h1: 'Quotation',
    h1Highlight: 'template',
    subheading:
      'Price the work clearly before it begins. This quotation layout has everything a client needs to say yes with confidence.',
    intro: [
      'A quotation is your offer of price before the work starts. A clear quote builds trust and prevents disputes, because both sides agree on scope and cost up front.',
      'Copy this layout, add your line items and terms, and you have a professional quotation ready to send — no design software required.',
    ],
    templateTitle: 'Quotation',
    templateBody: `QUOTATION

FROM
[YOUR NAME / BUSINESS]
[CONTACT DETAILS]

TO
[CLIENT NAME]
[CLIENT DETAILS]

Quotation No: [QUO-2026-001]
Date: [DATE]
Valid until: [DATE]

------------------------------------------------------------
Description                              Amount
------------------------------------------------------------
[Item / service 1]                       ₹[____]
[Item / service 2]                       ₹[____]
[Item / service 3]                       ₹[____]
------------------------------------------------------------
                          Estimated total:   ₹[____]
                      (GST extra, if applicable)

TERMS
  • [e.g. 50% advance to begin work]
  • [e.g. Timeline: 3 weeks from advance]
  • This quotation is valid until the date above.

This is a quotation, not a tax invoice.

To accept, reply to this quote or sign below.
Accepted by: __________________  Date: __________`,
    howToUse: [
      'Copy the layout and add your specific line items and prices.',
      'Keep descriptions specific so there’s no ambiguity later.',
      'Set a validity date so an old price doesn’t bind you.',
      'When accepted, convert the quote into an invoice rather than retyping it.',
    ],
    tips: [
      'Always set a “valid until” date — prices and availability change.',
      'Note whether GST is extra so the total isn’t misread.',
      'Be specific in descriptions: “5-page website” not “website work”.',
      'A quote isn’t a tax invoice — raise an invoice once work is agreed or done.',
    ],
    faqHeading: 'Quotation FAQs',
    faqs: [
      { q: 'What’s the difference between a quotation and an invoice?', a: 'A quotation is your offer of price before the work; an invoice requests payment after (or as) the work is done and carries GST if you’re registered. A quote is not a tax document.' },
      { q: 'Should a quotation show GST?', a: 'You can show estimated GST for clarity, but note it’s charged on the final invoice. If you’re not registered, quote without GST.' },
      { q: 'How long should a quote stay valid?', a: 'Set a validity window — often 7–30 days — so a price you gave weeks ago doesn’t come back to bind you.' },
    ],
    related: [
      { href: '/tools/quotation-generator', label: 'Quotation Generator', desc: 'Auto-build a quote from your items.' },
      { href: '/templates/invoice-template-india', label: 'Invoice Template', desc: 'Convert an accepted quote to an invoice.' },
      { href: '/glossary/quotation', label: 'Quotation', desc: 'Quotation explained.' },
    ],
    ctaTitle: 'Quote, then get paid',
    ctaSubtitle: 'CLIV∞ turns quotes into invoices without retyping. Start free.',
  },

  {
    slug: 'retainer-agreement-template',
    path: '/templates/retainer-agreement-template',
    title: 'Retainer Agreement Template',
    tagline: 'Lock in recurring work with a clear monthly agreement.',
    metaTitle: 'Free Retainer Agreement Template for Freelancers',
    metaDescription:
      'A free retainer agreement template for freelancers. Copy it to set monthly scope, fees, and hours — and turn one-off clients into predictable income.',
    keywords: ['retainer agreement template', 'freelance retainer agreement', 'monthly retainer contract'],
    eyebrow: 'Retainer agreement',
    h1: 'Retainer agreement',
    h1Highlight: 'template',
    subheading:
      'Turn a good client into recurring income. This retainer agreement sets the monthly scope, fee, and hours clearly — so a retainer stays predictable, not unlimited.',
    intro: [
      'A retainer gives you predictable monthly income in exchange for a set amount of work or availability. The key to a retainer that works is a clear agreement — otherwise it slowly expands until you’re working far more than you’re paid for.',
      'This template pins down what the client gets each month, what they pay, and what happens when they need more. Copy it, fill in the details, and convert your best clients to recurring work.',
    ],
    templateTitle: 'Retainer Agreement',
    templateBody: `RETAINER AGREEMENT

This Agreement is made on [DATE] between:
  Freelancer: [YOUR NAME / BUSINESS] ("Freelancer")
  Client: [CLIENT NAME] ("Client")

1. RETAINER SCOPE
Each month, the Freelancer will provide:
  • [e.g. Up to 20 hours of work] OR
  • [e.g. 4 blog posts + ongoing edits]
Work outside this scope is quoted and billed separately.

2. FEE
Monthly retainer: ₹[AMOUNT], payable in advance by the [1st] of each month.

3. TERM
This Agreement runs for [NUMBER] months from [START DATE], then continues month-to-month unless cancelled.

4. UNUSED HOURS / WORK
Unused hours [do / do not] roll over to the next month.

5. RESPONSE TIME
The Freelancer will respond to requests within [X business days] and prioritise the Client's work during the retainer.

6. CANCELLATION
Either party may cancel with [NUMBER] days' written notice. The final month is paid in full.

7. REVISIONS & EXTRA WORK
Anything beyond the monthly scope is agreed in writing and billed at ₹[RATE] before work begins.

8. GOVERNING LAW
This Agreement is governed by the laws of India.

Signed:
Freelancer: __________________________  Date: __________
Client:     __________________________  Date: __________`,
    howToUse: [
      'Copy the template and define the monthly scope precisely (hours or deliverables).',
      'Set the fee, payment date, and minimum term.',
      'Decide clearly whether unused hours roll over.',
      'Both parties sign; review the scope every few months as needs change.',
    ],
    tips: [
      'Cap the monthly scope in writing — it’s the main defence against retainer creep.',
      'Bill in advance; a retainer’s whole value is predictable, upfront income.',
      'State a response time so the client feels the priority they’re paying for.',
      'Revisit the retainer when a client consistently needs more — renegotiate rather than absorb.',
    ],
    faqHeading: 'Retainer agreement FAQs',
    faqs: [
      { q: 'How do I price a retainer?', a: 'Start from reserved hours × your rate, then apply a modest discount for the guaranteed income. The retainer calculator does this for you and shows the effective hourly rate.' },
      { q: 'What stops a retainer becoming unlimited work?', a: 'A written monthly scope cap, tracking delivery against it, and an extra-work clause that bills anything beyond the scope separately. This template includes all three.' },
      { q: 'Should retainers be paid in advance?', a: 'Yes — the point of a retainer is predictable, upfront income. Bill at the start of each month, before the work.' },
    ],
    related: [
      { href: '/tools/retainer-calculator', label: 'Retainer Calculator', desc: 'Price your monthly retainer.' },
      { href: '/glossary/retainer', label: 'Retainer', desc: 'How retainers work.' },
      { href: '/glossary/retainer-creep', label: 'Retainer creep', desc: 'How retainers expand — and how to stop it.' },
    ],
    ctaTitle: 'Run retainers without the creep',
    ctaSubtitle: 'CLIV∞ tracks retainer projects and recurring invoices. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },
]

export const TEMPLATE_BY_SLUG: Record<string, TemplateConfig> = Object.fromEntries(
  TEMPLATES.map((t) => [t.slug, t]),
)
