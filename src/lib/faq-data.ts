/**
 * Shared FAQ content — the single source for the landing-page accordion, the
 * dedicated /faq page, and the FAQPage structured data. Keeping one list means
 * the rich-result schema can never drift from what users actually read.
 *
 * Answers are plain text (no markup) so they're valid for schema.org/Answer.
 */
export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'What is CLIV∞?',
    a: 'CLIV∞ is an all-in-one client management platform for freelancers and small agencies. It brings clients, projects, invoices, payments, meetings, and your team together in one place, so you can stop juggling spreadsheets, WhatsApp threads, and half a dozen separate tools.',
  },
  {
    q: 'Who is CLIV∞ built for?',
    a: 'Independent freelancers, solo consultants, and small agencies — especially in India — who juggle multiple clients, projects, and invoices and want one calm place to run it all. It works for developers, designers, writers, marketers, and any service business.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The Free plan is genuinely free forever — no card required. You only upgrade when your client and project count outgrows it.',
  },
  {
    q: 'How much does CLIV∞ cost?',
    a: 'CLIV∞ has three plans: Free (₹0/month, up to 5 clients and 10 projects with the full leads & CRM pipeline), Pro (launch offer ₹199/month, was ₹499 — up to 30 clients, 60 projects, and 5 team members), and Ultra (launch offer ₹799/month, was ₹1,999 — unlimited clients, projects, and team members). You can start free and upgrade anytime, and launch pricing is available for a limited time.',
  },
  {
    q: 'Can I invoice in Indian Rupees with GST?',
    a: 'Yes. Invoices support line items, tax, and one-click PDF export, with amounts in ₹ by default. You can add your GST details and download professional, branded invoices to send to clients.',
  },
  {
    q: 'Can I add my team?',
    a: 'On Pro you can add up to 5 developers or designers, assign them to projects, and track their payments. Ultra removes the limit entirely so you can run a full agency.',
  },
  {
    q: 'How do verified client reviews work?',
    a: 'When you mark a project as completed, your client is automatically invited to leave a 1–5 star review inside the portal they already use. Because every review is tied to a real client on a real completed project — and you cannot edit or delete them — they are genuinely verified. You get a public review page at your own agency slug and a copy-paste embeddable badge for your website, free on every plan.',
  },
  {
    q: 'Is my data secure?',
    a: 'Your data is isolated per account with row-level security and encrypted in transit. We never sell or share your client information, and you can export everything at any time.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'You keep full access to export your clients, projects, and invoices. We never hold your data hostage — if you downgrade or cancel, your information stays yours.',
  },
  {
    q: 'Can I use CLIV∞ on my phone?',
    a: 'Yes. CLIV∞ is fully responsive and works in any modern mobile browser, with a native-app-style layout. You can also add it to your home screen as a progressive web app.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Plans are billed monthly and you can cancel anytime to stop future charges. We do not offer refunds for charges already made, but cancelling keeps your access until the end of the paid period. See our Refund & Cancellation Policy for details.',
  },
]

/** The shorter set shown on the landing page. */
export const HOME_FAQS = FAQS.slice(0, 6)
