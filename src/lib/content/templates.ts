import type { TemplateConfig } from './templates/_type'

export type { TemplateConfig }

const LEGAL_DISCLAIMER =
  'This is a plain-language starting template, not legal advice. Adapt it to your situation and, for high-value or unusual work, have a qualified professional review it under your local law before you rely on it.'

export const TEMPLATES: TemplateConfig[] = [
  // ==========================================
  // SECTION 1: CONTRACTS & AGREEMENTS (5)
  // ==========================================
  {
    slug: 'freelance-contract-template',
    path: '/templates/freelance-contract-template',
    title: 'Freelance Contract Template',
    tagline: 'A plain-language service agreement you can copy and adapt.',
    category: 'contracts',
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

1. SERVICES & PROJECT TITLE
Project: [PROJECT TITLE]
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
      'Both parties sign before work commences.',
    ],
    tips: [
      'Always take an advance for larger projects — it filters out non-serious clients.',
      'Cap revisions explicitly so “one more change” doesn’t become unlimited free work.',
      'Keep the IP-transfers-on-payment clause — it protects you until you’re actually paid.',
    ],
    faqHeading: 'Freelance contract FAQs',
    faqs: [
      { q: 'Is a freelance contract legally binding in India?', a: 'A signed agreement between two competent parties for a lawful purpose can be binding. For significant work, have a professional adapt it to your situation and local law.' },
      { q: 'Do I need a contract for small jobs?', a: 'Even a short written agreement confirming scope, price, revisions, and payment terms is far safer than nothing.' },
    ],
    related: [
      { href: '/invoice', label: 'Invoice Generator', desc: 'Raise GST-ready invoices.' },
      { href: '/templates/scope-of-work-template', label: 'Scope of Work Template', desc: 'Define exactly what’s included.' },
    ],
    ctaTitle: 'Send contracts clients can e-sign',
    ctaSubtitle: 'Kliv∞ handles proposals, e-signatures, and invoices in one place. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  {
    slug: 'retainer-agreement-template',
    path: '/templates/retainer-agreement-template',
    title: 'Retainer Agreement Template',
    tagline: 'Lock in recurring work with a clear monthly agreement.',
    category: 'contracts',
    metaTitle: 'Free Retainer Agreement Template for Freelancers',
    metaDescription:
      'A free retainer agreement template for freelancers. Copy it to set monthly scope, fees, and hours — and turn one-off clients into predictable income.',
    keywords: ['retainer agreement template', 'freelance retainer agreement', 'monthly retainer contract'],
    eyebrow: 'Contract template',
    h1: 'Retainer agreement',
    h1Highlight: 'template',
    subheading:
      'Turn a good client into recurring income. This retainer agreement sets the monthly scope, fee, and hours clearly — so a retainer stays predictable, not unlimited.',
    intro: [
      'A retainer gives you predictable monthly income in exchange for a set amount of work or availability. The key to a retainer that works is a clear agreement — otherwise it slowly expands until you’re working far more than you’re paid for.',
      'This template pins down what the client gets each month, what they pay, and what happens when they need more.',
    ],
    templateTitle: 'Monthly Retainer Agreement',
    templateBody: `MONTHLY RETAINER AGREEMENT

This Agreement is made on [DATE] between:
  Freelancer: [YOUR NAME / BUSINESS] ("Freelancer")
  Client: [CLIENT NAME] ("Client")

1. RETAINER SCOPE & PROJECT TITLE
Project: [PROJECT TITLE]
Each month, the Freelancer will provide:
  • [e.g. Up to 20 hours of design work] OR
  • [e.g. 4 SEO articles + ongoing site maintenance]
Work outside this scope is quoted and billed separately.

2. MONTHLY FEE & PAYMENT
Monthly retainer: ₹[AMOUNT], payable in advance by the [1st] of each month.

3. TERM & RENEWAL
This Agreement runs for [NUMBER] months from [DATE], then continues month-to-month unless cancelled with written notice.

4. UNUSED HOURS / DELIVERABLES
Unused hours/deliverables [do / do not] roll over to the subsequent month.

5. RESPONSE TIME & AVAILABILITY
The Freelancer will respond to requests within [X business days] and prioritize the Client's work during the retainer.

6. CANCELLATION
Either party may cancel with [NUMBER] days' written notice. The final month is paid in full.

7. EXTRA WORK & REVISIONS
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
    ],
    faqHeading: 'Retainer agreement FAQs',
    faqs: [
      { q: 'What stops a retainer becoming unlimited work?', a: 'A written monthly scope cap, tracking delivery against it, and an extra-work clause that bills anything beyond the scope separately.' },
      { q: 'Should retainers be paid in advance?', a: 'Yes — the point of a retainer is predictable, upfront income. Bill at the start of each month.' },
    ],
    related: [
      { href: '/templates/freelance-contract-template', label: 'Freelance Contract', desc: 'For one-off project contracts.' },
      { href: '/invoice', label: 'Invoice Generator', desc: 'Raise recurring monthly invoices.' },
    ],
    ctaTitle: 'Run retainers without the creep',
    ctaSubtitle: 'Kliv∞ tracks retainer projects and recurring invoices. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  {
    slug: 'nda-template-freelancers',
    path: '/templates/nda-template-freelancers',
    title: 'NDA Template for Freelancers',
    tagline: 'A simple mutual confidentiality agreement.',
    category: 'contracts',
    metaTitle: 'Free NDA Template for Freelancers (India)',
    metaDescription:
      'A free, plain-language NDA template for freelancers. Copy the mutual confidentiality agreement to protect sensitive information before a project.',
    keywords: ['nda template freelancers', 'nda template india', 'confidentiality agreement freelance'],
    eyebrow: 'Contract template',
    h1: 'Mutual NDA',
    h1Highlight: 'template',
    subheading:
      'When a project involves sensitive information, a short mutual NDA sets the ground rules for keeping it private — before you share anything.',
    intro: [
      'A non-disclosure agreement (NDA) is a promise to keep shared information confidential. Freelancers meet them when a client shares business plans, data, or unreleased products.',
      'This is a simple mutual NDA, meaning both sides protect each other’s confidential information. Copy it, fill in the details, and use it before sensitive information changes hands.',
    ],
    templateTitle: 'Mutual Non-Disclosure Agreement',
    templateBody: `MUTUAL NON-DISCLOSURE AGREEMENT

This Agreement is made on [DATE] between:
  [YOUR NAME / BUSINESS], [ADDRESS] ("Party A")
  [CLIENT NAME], [ADDRESS] ("Party B")
(each a "Party").

1. PURPOSE & PROJECT TITLE
Project: [PROJECT TITLE]
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
    ],
    tips: [
      'A mutual NDA is usually fairer and easier to agree than a one-sided one.',
      'Keep the “Purpose” specific so the NDA isn’t overly broad.',
    ],
    faqHeading: 'NDA FAQs',
    faqs: [
      { q: 'When do freelancers need an NDA?', a: 'When a project involves sensitive information — business plans, data, unreleased products — or when you want to protect your own proprietary methods.' },
      { q: 'Is a mutual NDA better than a one-way one?', a: 'A mutual NDA protects both sides and is usually quicker to agree, since neither party is asked to take on all the obligation.' },
    ],
    related: [
      { href: '/templates/freelance-contract-template', label: 'Contract Template', desc: 'The agreement for the actual work.' },
      { href: '/templates/master-service-agreement-template', label: 'Master Service Agreement', desc: 'Umbrella agreement for ongoing jobs.' },
    ],
    ctaTitle: 'Handle documents like a pro',
    ctaSubtitle: 'Kliv∞ manages proposals, agreements, and e-signatures. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  {
    slug: 'master-service-agreement-template',
    path: '/templates/master-service-agreement-template',
    title: 'Master Service Agreement (MSA)',
    tagline: 'An umbrella contract for ongoing client relationships.',
    category: 'contracts',
    metaTitle: 'Free Master Service Agreement (MSA) Template for Agencies & Freelancers',
    metaDescription:
      'A free Master Service Agreement (MSA) template. Establish foundational legal terms once and execute multiple project Statements of Work underneath.',
    keywords: ['msa template', 'master service agreement template', 'agency umbrella contract'],
    eyebrow: 'Contract template',
    h1: 'Master Service Agreement',
    h1Highlight: '(MSA)',
    subheading:
      'Establish the legal rules of engagement once. Attach individual Statements of Work (SOWs) for each new project without renegotiating legal clauses.',
    intro: [
      'When you work repeatedly with the same client, signing a full contract every single time slows you down. A Master Service Agreement (MSA) covers standard terms like IP ownership, liability, payment policies, and confidentiality.',
      'Once signed, you simply attach short Statements of Work (SOWs) for each new task or campaign.',
    ],
    templateTitle: 'Master Service Agreement',
    templateBody: `MASTER SERVICE AGREEMENT (MSA)

This Agreement is entered into on [DATE] between:
  Service Provider: [YOUR NAME / BUSINESS], [ADDRESS] ("Provider")
  Client: [CLIENT NAME], [ADDRESS] ("Client")

1. STRUCTURE & STATEMENTS OF WORK
This MSA sets out standard terms governing all future work. Specific project deliverables, fees, and timelines will be agreed upon in separate Statements of Work ("SOW") or Project Proposals executed by both parties.

2. PAYMENT TERMS
Unless specified otherwise in an SOW:
  • Invoices are raised upon milestone completion or monthly.
  • Payment due date is [7/15/30] days from invoice date.
  • Late payments accrue interest at 1.5% per month or the maximum legal rate.

3. INTELLECTUAL PROPERTY & RIGHTS
Upon full payment of all fees under the applicable SOW, Provider assigns to Client all rights to final deliverables. Provider retains pre-existing tools, code libraries, and generic design patterns.

4. CONFIDENTIALITY
Both parties agree to hold confidential any proprietary business details, technical specifications, and client data shared during any project under this MSA.

5. WARRANTIES & LIMITATION OF LIABILITY
Provider guarantees services will be performed with professional quality and skill. Total liability under any SOW shall not exceed the fees paid by Client under that specific SOW.

6. TERM & TERMINATION
This MSA remains valid until terminated by either party with [30] days written notice. Termination of this MSA does not automatically cancel active SOWs unless explicitly stated.

7. GOVERNING LAW
This Agreement is governed by the laws of India.

Signed:
Provider: __________________________  Date: __________
Client:   __________________________  Date: __________`,
    howToUse: [
      'Have the client sign this MSA at the start of your relationship.',
      'Whenever a new project begins, create a simple Scope of Work (SOW) referencing this MSA date.',
      'Both parties sign only the brief SOW for future tasks.',
    ],
    tips: [
      'An MSA saves weeks of legal back-and-forth for multi-phase corporate clients.',
      'Ensure every SOW explicitly states: "This SOW is governed by the MSA dated [DATE]."',
    ],
    faqHeading: 'MSA FAQs',
    faqs: [
      { q: 'What is the difference between an MSA and an SOW?', a: 'The MSA covers overarching legal terms (IP, liability, confidentiality). The SOW covers the specific deliverables, timeline, and price of a single project.' },
    ],
    related: [
      { href: '/templates/scope-of-work-template', label: 'Scope of Work Template', desc: 'Pair this SOW with your MSA.' },
      { href: '/templates/subcontractor-agreement-template', label: 'Subcontractor Agreement', desc: 'For scaling with freelancers.' },
    ],
    ctaTitle: 'Manage long-term client accounts',
    ctaSubtitle: 'Kliv∞ keeps all client contracts, SOWs, and invoices in one unified profile. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  {
    slug: 'subcontractor-agreement-template',
    path: '/templates/subcontractor-agreement-template',
    title: 'Subcontractor Agreement Template',
    tagline: 'Safely delegate client work to freelance collaborators.',
    category: 'contracts',
    metaTitle: 'Free Subcontractor & Agency Agreement Template',
    metaDescription:
      'A free subcontractor agreement template for agencies and freelancers delegating client projects. Protect client confidentiality, IP rights, and deadlines.',
    keywords: ['subcontractor agreement template', 'freelance hiring contract', 'agency delegation agreement'],
    eyebrow: 'Contract template',
    h1: 'Subcontractor',
    h1Highlight: 'agreement',
    subheading:
      'When you bring in another freelancer to help deliver a client project, this agreement ensures client IP transfers cleanly and deadlines are respected.',
    intro: [
      'Scaling your freelance business or agency often means collaborating with other designers, developers, or writers. A Subcontractor Agreement protects you by ensuring the collaborator transfers all IP rights to you so you can pass them cleanly to the end client.',
      'It also binds the subcontractor to strict confidentiality and non-solicitation rules.',
    ],
    templateTitle: 'Subcontractor Service Agreement',
    templateBody: `SUBCONTRACTOR SERVICE AGREEMENT

This Agreement is made on [DATE] between:
  Contractor (Agency/Lead): [YOUR NAME / BUSINESS], [ADDRESS] ("Contractor")
  Subcontractor: [CLIENT NAME / SUBCONTRACTOR NAME], [ADDRESS] ("Subcontractor")

1. ENGAGEMENT & PROJECT TITLE
Project: [PROJECT TITLE]
Contractor engages Subcontractor to perform the following work:
  [DESCRIBE SUBCONTRACTOR DELIVERABLES AND SCOPE].

2. COMPENSATION & PAYMENTS
Total fee: ₹[AMOUNT].
Payment terms: [e.g. 50% upon completion of milestone 1, 50% upon final client sign-off].
Subcontractor will submit invoices to Contractor upon milestone completion.

3. WORK FOR HIRE & IP ASSIGNMENT
Subcontractor agrees that all deliverables created under this Agreement are "work made for hire." Subcontractor assigns all intellectual property rights, copyrights, and ownership of the final work exclusively to Contractor upon payment.

4. CONFIDENTIALITY & NON-SOLICITATION
Subcontractor will maintain strict confidentiality regarding Contractor's clients, project specifications, and pricing. Subcontractor agrees not to solicit or contract directly with the end client for [12] months after project completion without written approval.

5. TIMELINES & DEADLINES
Subcontractor agrees to deliver completed work by [TIMEFRAME]. Timely delivery is a vital condition of this Agreement.

6. INDEPENDENT CONTRACTOR STATUS
Subcontractor is an independent contractor, not an employee of Contractor.

7. GOVERNING LAW
This Agreement is governed by the laws of India.

Signed:
Contractor:    __________________________  Date: __________
Subcontractor: __________________________  Date: __________`,
    howToUse: [
      'Fill in your agency/lead details and the subcontractor’s details.',
      'Specify the deliverables and exact deadlines clearly.',
      'Have the subcontractor sign before sharing client assets or repository access.',
    ],
    tips: [
      'Never delegate work to a subcontractor without an IP assignment clause.',
      'Include a non-solicitation clause so collaborators do not bypass your agency.',
    ],
    faqHeading: 'Subcontractor Agreement FAQs',
    faqs: [
      { q: 'Why do I need a separate agreement for subcontractors?', a: 'Without it, the subcontractor legally owns the copyright to their contributions, meaning you cannot legally grant full ownership to your end client.' },
    ],
    related: [
      { href: '/templates/freelance-contract-template', label: 'Client Contract', desc: 'Your primary agreement with the end client.' },
      { href: '/templates/nda-template-freelancers', label: 'NDA Template', desc: 'For initial screening before assigning work.' },
    ],
    ctaTitle: 'Organize collaborative projects',
    ctaSubtitle: 'Kliv∞ lets you track project milestones and budgets seamlessly. Start free.',
    disclaimer: LEGAL_DISCLAIMER,
  },

  // ==========================================
  // SECTION 2: PROJECT PROPOSALS (5)
  // ==========================================
  {
    slug: 'project-proposal-template',
    path: '/templates/project-proposal-template',
    title: 'Project Proposal Template',
    tagline: 'A proposal structure that leads with the client’s goal.',
    category: 'proposals',
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
    templateTitle: 'General Project Proposal',
    templateBody: `PROJECT PROPOSAL
[PROJECT TITLE]

Prepared for: [CLIENT NAME]
Prepared by: [YOUR NAME / BUSINESS]
Date: [DATE]

1. UNDERSTANDING & GOALS
[In 2–3 sentences, show you understand the client's goal and why this project matters to them. Mirror their own words.]

2. SCOPE OF WORK & DELIVERABLES
What you'll deliver:
  • [Deliverable 1 — specific outcome]
  • [Deliverable 2 — specific outcome]
  • [Deliverable 3 — specific outcome]
Not included: [state what's out of scope to prevent creep].

3. TIMELINE & MILESTONES
[Milestone 1] — [date/week]
[Milestone 2] — [date/week]
Final delivery — [date/week], from receipt of advance and materials.

4. INVESTMENT & FEES
Total Investment: ₹[AMOUNT]
Payment schedule: [e.g. 50% advance upon approval, 50% on final delivery].

5. WHY ME / OUR EXPERIENCE
[2–3 lines: relevant experience or results, kept short and specific.]

6. NEXT STEP
To approve this proposal and schedule kickoff, sign below or reply with confirmation.
Approved by: ________________________  Date: __________`,
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
    ],
    faqHeading: 'Proposal template FAQs',
    faqs: [
      { q: 'How long should a proposal be?', a: 'One to two pages is plenty for most freelance work. Cover understanding, scope, timeline, price, and the next step — then stop.' },
      { q: 'Should the proposal include the price?', a: 'Yes. Stating the investment and payment terms clearly makes the decision easy; hiding the price creates hesitation.' },
    ],
    related: [
      { href: '/templates/web-design-development-proposal', label: 'Web Development Proposal', desc: 'Tailored for web & UI projects.' },
      { href: '/templates/quotation-template', label: 'Quotation Template', desc: 'Just need a quick price estimate?' },
    ],
    ctaTitle: 'Turn a yes into a signed deal',
    ctaSubtitle: 'Kliv∞ sends proposals clients accept and e-sign in their portal. Start free.',
  },

  {
    slug: 'web-design-development-proposal',
    path: '/templates/web-design-development-proposal',
    title: 'Web Design & Development Proposal',
    tagline: 'Tailored proposal structure for websites, web apps, and UI/UX projects.',
    category: 'proposals',
    metaTitle: 'Free Web Design & Development Proposal Template',
    metaDescription:
      'A structured proposal template tailored for web designers and frontend developers. Clearly outline sitemaps, tech stacks, milestones, and costs.',
    keywords: ['web design proposal template', 'website development proposal', 'ui ux proposal framework'],
    eyebrow: 'Proposal template',
    h1: 'Web Design & Development',
    h1Highlight: 'Proposal',
    subheading:
      'Pitch website redesigns, landing pages, and full-stack web applications with clear technical boundaries, sitemap planning, and phased milestones.',
    intro: [
      'Web projects can quickly get bogged down in technical confusion if the proposal does not clearly define pages, responsiveness, CMS setup, and content responsibilities.',
      'Use this specialized proposal to outline exactly what pages will be built, what tech stack will be used, and how feedback rounds will work.',
    ],
    templateTitle: 'Web Development Project Proposal',
    templateBody: `WEB DESIGN & DEVELOPMENT PROPOSAL
[PROJECT TITLE]

Prepared for: [CLIENT NAME]
Prepared by: [YOUR NAME / BUSINESS]
Date: [DATE]

1. PROJECT OVERVIEW & BUSINESS GOAL
[Client Name] seeks to modernize their web presence to improve user conversion and brand perception. We will design and develop a high-performance, mobile-responsive website tailored to your target audience.

2. TECHNICAL SCOPE & SITEMAP
Deliverables included:
  • Sitemap & UI/UX Wireframes ([5] key page layouts)
  • Responsive Frontend Development (Desktop, Tablet, Mobile)
  • Key Pages: [Homepage, About Us, Services/Solutions, Contact, Blog Grid]
  • Tech Stack & CMS Setup: [Next.js / WordPress / Webflow]
  • Core On-Page SEO optimization and speed performance setup.

3. CLIENT RESPONSIBILITIES & ASSETS
Client agrees to provide:
  • High-resolution brand logo, typography guidelines, and color hex codes.
  • Final page copywriting and images by [DATE].

4. TIMELINE & PHASED MILESTONES
  • Phase 1: Wireframes & UI Concept Approval ([2] weeks)
  • Phase 2: Frontend Development & CMS Integration ([3] weeks)
  • Phase 3: Testing, Client Review & Launch ([1] week)

5. INVESTMENT & PAYMENT TERMS
Total Project Fee: ₹[AMOUNT]
  • 50% Advance (₹[AMOUNT/2]) upon proposal acceptance.
  • 50% Final Payment prior to live server deployment / handoff.

6. ACCEPTANCE
To approve this proposal and initiate Phase 1, sign below:
Client Signature: ________________________  Date: __________`,
    howToUse: [
      'Specify the exact number of pages and CMS platform in Section 2.',
      'Make sure the client acknowledges they must provide copy/images on time.',
      'Tie final payment to pre-deployment so you are paid before handing over admin credentials.',
    ],
    tips: [
      'Explicitly state whether copywriting or stock photography purchase is included.',
      'Set clear revision limits for design concepts during Phase 1.',
    ],
    faqHeading: 'Web Proposal FAQs',
    faqs: [
      { q: 'How should I handle hosting and domain costs?', a: 'Always clarify in Section 2 or 3 that hosting, domain registration, and premium plugin subscriptions are paid directly by the client or billed separately.' },
    ],
    related: [
      { href: '/templates/project-proposal-template', label: 'General Proposal', desc: 'For general service pitches.' },
      { href: '/templates/freelance-contract-template', label: 'Freelance Contract', desc: 'Convert winning proposals to contracts.' },
    ],
    ctaTitle: 'Present web proposals in white-label portals',
    ctaSubtitle: 'Kliv∞ lets web agencies share interactive proposals clients can sign. Start free.',
  },

  {
    slug: 'digital-marketing-seo-proposal',
    path: '/templates/digital-marketing-seo-proposal',
    title: 'Digital Marketing & SEO Proposal',
    tagline: 'Structure recurring growth campaigns, keyword targeting, and analytics.',
    category: 'proposals',
    metaTitle: 'Free Digital Marketing & SEO Campaign Proposal Template',
    metaDescription:
      'Pitch organic growth, paid ads management, and social media campaigns with measurable KPIs, reporting cadences, and clear monthly scopes.',
    keywords: ['seo proposal template', 'digital marketing proposal', 'content marketing proposal'],
    eyebrow: 'Proposal template',
    h1: 'Digital Marketing & SEO',
    h1Highlight: 'Proposal',
    subheading:
      'Pitch monthly SEO retainers, performance marketing, and organic content strategies with clear KPI tracking and transparent activity schedules.',
    intro: [
      'Marketing proposals must balance long-term growth promises with immediate, tangible monthly deliverables so clients understand where their retainer goes.',
      'This framework lays out technical SEO audits, monthly content production quotas, backlink targets, and reporting schedules.',
    ],
    templateTitle: 'Digital Marketing & Growth Proposal',
    templateBody: `DIGITAL MARKETING & SEO PROPOSAL
[PROJECT TITLE]

Prepared for: [CLIENT NAME]
Prepared by: [YOUR NAME / BUSINESS]
Date: [DATE]

1. CAMPAIGN OBJECTIVES
To increase organic search visibility, drive qualified inbound traffic, and improve conversion rates for [CLIENT NAME] over a targeted [6]-month campaign.

2. MONTHLY DELIVERABLES & SCOPE
Each month, our team will deliver:
  • Technical SEO & Site Health Monitoring (Core Web Vitals & indexing fixes)
  • Keyword Research & On-Page Optimization ([4] target landing pages/month)
  • Content Production: [4] SEO-optimized blog articles (1,200+ words each)
  • Off-Page Authority: High-quality link acquisition & citation management
  • Monthly Performance Dashboard & Strategic Review Call.

3. TARGET KPIS & MEASUREMENT
Success will be tracked against:
  • Organic keyword ranking improvements for primary commercial terms.
  • Month-over-month growth in organic session volume.
  • Lead inquiry form submissions via organic search.

4. INVESTMENT & COMMITMENT
Monthly Campaign Investment: ₹[AMOUNT] / month
  • Minimum initial campaign commitment: [3 or 6] months.
  • Billed monthly in advance on the [1st] of each month.
  • Ad spend (if running paid ads) is billed directly to Client's credit card.

5. ACCEPTANCE
To begin the technical audit and campaign setup, confirm below:
Client Signature: ________________________  Date: __________`,
    howToUse: [
      'Customize the monthly deliverables to match your specific marketing package.',
      'Specify the minimum campaign duration (typically 3-6 months for SEO results).',
      'Ensure ad spend is explicitly separated from your management fees.',
    ],
    tips: [
      'Never guarantee exact #1 rankings on Google—promise professional execution, proven strategies, and transparent reporting.',
    ],
    faqHeading: 'Marketing Proposal FAQs',
    faqs: [
      { q: 'Why require a minimum month commitment for SEO?', a: 'Organic search changes take time to index and rank. A 3-to-6 month commitment ensures enough runway to demonstrate measurable ROI.' },
    ],
    related: [
      { href: '/templates/retainer-agreement-template', label: 'Retainer Agreement', desc: 'Lock in monthly marketing agreements.' },
      { href: '/templates/scope-of-work-template', label: 'Scope of Work', desc: 'Attach detailed monthly deliverables.' },
    ],
    ctaTitle: 'Automate recurring marketing retainers',
    ctaSubtitle: 'Kliv∞ handles recurring monthly billing and client reporting portals. Start free.',
  },

  {
    slug: 'software-engineering-saas-proposal',
    path: '/templates/software-engineering-saas-proposal',
    title: 'Software Engineering & SaaS Proposal',
    tagline: 'Structure custom software, mobile apps, and full-stack architecture proposals.',
    category: 'proposals',
    metaTitle: 'Free Custom Software & Mobile App Development Proposal Template',
    metaDescription:
      'Pitch complex software engineering, SaaS applications, and mobile app development with agile sprint breakdowns, architecture specs, and milestones.',
    keywords: ['software development proposal', 'mobile app proposal template', 'saas engineering proposal'],
    eyebrow: 'Proposal template',
    h1: 'Software Engineering & SaaS',
    h1Highlight: 'Proposal',
    subheading:
      'Outline complex engineering architecture, API integrations, database schemas, and sprint-based delivery phases for high-value software projects.',
    intro: [
      'Custom software and mobile application development requires crystal-clear technical specifications and risk mitigation strategies right from the initial proposal stage.',
      'Use this proposal to detail frontend/backend stacks, database choices, third-party API integrations, and quality assurance protocols.',
    ],
    templateTitle: 'Custom Software Architecture & Development Proposal',
    templateBody: `SOFTWARE ENGINEERING & SAAS DEVELOPMENT PROPOSAL
[PROJECT TITLE]

Prepared for: [CLIENT NAME]
Prepared by: [YOUR NAME / BUSINESS]
Date: [DATE]

1. EXECUTIVE SUMMARY & SYSTEM ARCHITECTURE
We propose to architect and build [PROJECT TITLE], a scalable, secure, cloud-hosted web/mobile application designed to streamline [BUSINESS PURPOSE].

2. TECHNICAL STACK & KEY MODULES
Proposed Technology Stack:
  • Frontend / Mobile: [React / Next.js / React Native / Flutter]
  • Backend API & Database: [Node.js / Python FastAPI / PostgreSQL / Supabase]
  • Cloud Hosting & DevOps: [AWS / Vercel / Docker]
Core System Modules Included:
  • User Authentication, Role-Based Access Control (RBAC) & Security
  • Core Business Logic & Interactive Dashboard
  • Third-Party Integrations: [Payment Gateway (Stripe/Razorpay), Email/SMS APIs]
  • Automated Testing & Staging Environment Setup.

3. SPRINT SCHEDULE & MILESTONES
  • Sprint 1 (Weeks 1-3): Architecture setup, Database schema, & Authentication
  • Sprint 2 (Weeks 4-6): Core feature development & API integrations
  • Sprint 3 (Weeks 7-8): QA testing, security hardening, & staging review
  • Production Launch & Deployment Handoff.

4. INVESTMENT & PAYMENT TERMS
Total Engineering Investment: ₹[AMOUNT]
  • Milestone 1 (Project Kickoff & Architecture): 30% (₹[AMOUNT*0.3])
  • Milestone 2 (Core MVP Modules Delivery): 40% (₹[AMOUNT*0.4])
  • Milestone 3 (Final QA & Production Deployment): 30% (₹[AMOUNT*0.3])

5. ACCEPTANCE
To authorize development and secure sprint team allocation, sign below:
Client Signature: ________________________  Date: __________`,
    howToUse: [
      'Detail the exact frontend, backend, and cloud technologies proposed.',
      'Break down the development into logical sprint milestones.',
      'Clarify that post-launch maintenance or bug support beyond 30 days requires a separate retainer.',
    ],
    tips: [
      'Include an explicit clause stating that any change in database architecture or new feature requests after Sprint 1 will trigger a formal Change Order.',
    ],
    faqHeading: 'Software Proposal FAQs',
    faqs: [
      { q: 'What happens if third-party APIs change or break during build?', a: 'Add a note in your SOW that delays or API deprecations caused by external third-party vendors are billed at standard engineering hourly rates to resolve.' },
    ],
    related: [
      { href: '/templates/master-service-agreement-template', label: 'Master Service Agreement', desc: 'Essential umbrella contract for engineering.' },
      { href: '/templates/scope-of-work-template', label: 'SOW Template', desc: 'Detail full API specs and schemas.' },
    ],
    ctaTitle: 'Manage complex development milestones',
    ctaSubtitle: 'Kliv∞ tracks engineering milestones and milestone payments effortlessly. Start free.',
  },

  {
    slug: 'brand-identity-design-proposal',
    path: '/templates/brand-identity-design-proposal',
    title: 'Brand Identity & Graphic Design Proposal',
    tagline: 'Structure logo design, brand guidelines, and visual identity packages.',
    category: 'proposals',
    metaTitle: 'Free Brand Identity & Graphic Design Proposal Template',
    metaDescription:
      'Pitch comprehensive branding, logo creation, typography systems, and visual identity packages with clear concept rounds and asset delivery checklists.',
    keywords: ['brand identity proposal', 'logo design proposal template', 'graphic design proposal'],
    eyebrow: 'Proposal template',
    h1: 'Brand Identity & Graphic Design',
    h1Highlight: 'Proposal',
    subheading:
      'Present logo concepts, visual brand systems, typography palettes, and style guides with well-defined concept limits and revision rounds.',
    intro: [
      'Creative design proposals must protect against subjective scope creep while communicating the high strategic value of a cohesive brand identity.',
      'This template clearly outlines the research phase, the exact number of initial logo concepts presented, revision rounds, and final file export formats.',
    ],
    templateTitle: 'Brand Identity Design Proposal',
    templateBody: `BRAND IDENTITY & GRAPHIC DESIGN PROPOSAL
[PROJECT TITLE]

Prepared for: [CLIENT NAME]
Prepared by: [YOUR NAME / BUSINESS]
Date: [DATE]

1. CREATIVE OBJECTIVE
To develop a distinctive, memorable, and strategically aligned visual identity for [CLIENT NAME] that reflects brand values and resonates with target customers across digital and print media.

2. DELIVERABLES & SCOPE
The Brand Identity Package includes:
  • Brand Discovery & Moodboard exploration
  • Primary Logo Design ([3] initial distinct concepts presented)
  • Secondary Logo & Icon Variations (Stacked, Horizontal, Favicon)
  • Typography Palette & Color System Guidelines (CMYK, RGB, HEX)
  • Comprehensive Brand Style Guide PDF (20+ pages)
  • Social Media Kit (Profile icons & header banners for LinkedIn/IG).

3. REVISION PROCESS
This proposal includes [2] consolidated rounds of revisions on the selected logo concept. Additional design concepts or extra revision cycles are billed at ₹[RATE]/hour.

4. FINAL ASSET HANDOFF
Upon full payment, Client will receive complete vector master files (.AI, .EPS, .SVG) plus high-resolution raster files (.PNG, .JPG) across all colorways.

5. INVESTMENT & TERMS
Total Branding Package: ₹[AMOUNT]
  • 50% Advance (₹[AMOUNT/2]) upon proposal acceptance.
  • 50% Final Payment upon completion and prior to final vector file transfer.

6. ACCEPTANCE
To begin the creative discovery phase, confirm below:
Client Signature: ________________________  Date: __________`,
    howToUse: [
      'Specify the exact number of initial logo concepts included (e.g., 2 or 3).',
      'Define the exact file formats included upon project delivery.',
      'Make sure final vector source files are only released after 100% payment clearance.',
    ],
    tips: [
      'Always emphasize that design feedback must be consolidated into single client roundups to avoid endless piecemeal revisions.',
    ],
    faqHeading: 'Branding Proposal FAQs',
    faqs: [
      { q: 'Who owns the unused logo concepts?', a: 'Standard practice is that the client only buys IP rights to the final selected concept upon payment. All unselected concepts remain the intellectual property of the designer.' },
    ],
    related: [
      { href: '/templates/project-proposal-template', label: 'General Proposal', desc: 'Standard proposal framework.' },
      { href: '/templates/freelance-contract-template', label: 'Contract Template', desc: 'Protect your vector assets.' },
    ],
    ctaTitle: 'Deliver creative work professionally',
    ctaSubtitle: 'Kliv∞ gives clients a branded portal to review deliverables and pay invoices. Start free.',
  },

  // ==========================================
  // SECTION 3: INVOICES & SCOPE DOCUMENTS (5)
  // ==========================================
  {
    slug: 'invoice-template-india',
    path: '/templates/invoice-template-india',
    title: 'Invoice Template (India)',
    tagline: 'A clean invoice layout with all the fields you need.',
    category: 'invoices',
    metaTitle: 'Free Invoice Template India — Copy & Use',
    metaDescription:
      'A free invoice template for India with every field you need, including GST. Copy the layout, fill in your details, or use our live invoice generator.',
    keywords: ['invoice template india', 'invoice format india', 'freelance invoice template'],
    eyebrow: 'Invoice template',
    h1: 'GST Invoice template',
    h1Highlight: 'India',
    subheading:
      'A complete invoice layout with every field an Indian freelance invoice needs — copy it, or use the free generator for a branded PDF.',
    intro: [
      'A professional invoice gets you paid faster and keeps your records clean. This template lays out all the fields a valid Indian invoice needs — your and the client’s details, a unique number, itemized work, and GST if you’re registered.',
      'Copy the layout below to build an invoice in any editor, or use the free invoice generator to produce a branded PDF in seconds.',
    ],
    templateTitle: 'GST Tax Invoice (India)',
    templateBody: `TAX INVOICE

FROM (SUPPLIER)
[YOUR NAME / BUSINESS]
[ADDRESS]
GSTIN: [YOUR GSTIN — if registered]
PAN: [YOUR PAN]

BILL TO (CLIENT)
[CLIENT NAME]
[CLIENT ADDRESS]
GSTIN: [CLIENT GSTIN — if applicable]
Project: [PROJECT TITLE]

Invoice No: [INV-2026-001]
Invoice Date: [DATE]
Due Date: [DUE DATE]

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
                                        TOTAL DUE:  ₹[AMOUNT]

Amount in words: [Rupees ______ only]

PAYMENT DETAILS & INSTRUCTIONS
UPI ID / VPA: [your-upi@bank]
Bank Account: [A/C no, IFSC code, bank name]

Notes: [Payment due within 15 days. Thank you for your business.]`,
    howToUse: [
      'Copy the layout into your editor, or use the free interactive invoice generator for a PDF.',
      'Fill in your details, the client’s, and a unique consecutive invoice number.',
      'Add your line items; if GST-registered, apply CGST/SGST (same state) or IGST (inter-state).',
      'Include UPI and bank details so paying is effortless.',
    ],
    tips: [
      'Use a consecutive, unique invoice number — GST rules require no gaps.',
      'Send the invoice promptly; the clock on payment only starts once it’s sent.',
      'If you’re not GST-registered, simply omit the GST lines.',
    ],
    faqHeading: 'Invoice template FAQs',
    faqs: [
      { q: 'What must an Indian invoice include?', a: 'Your details (and GSTIN if registered), the client’s details, a unique consecutive invoice number, date, itemized work, the amount, and GST if applicable.' },
      { q: 'Do I need GST on my invoice?', a: 'Only if you’re registered for GST. If you are, show CGST/SGST for same-state supply or IGST for inter-state. If you’re not registered, omit the GST lines.' },
    ],
    related: [
      { href: '/invoice', label: 'Interactive Generator', desc: 'Make a single-page branded PDF.' },
      { href: '/templates/quotation-template', label: 'Quotation Template', desc: 'Price estimates before invoicing.' },
    ],
    ctaTitle: 'Automate your invoicing',
    ctaSubtitle: 'Kliv∞ raises GST-ready invoices and tracks payments. Start free.',
  },

  {
    slug: 'quotation-template',
    path: '/templates/quotation-template',
    title: 'Quotation Template',
    tagline: 'A clean quote layout to price work before it starts.',
    category: 'invoices',
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
    templateTitle: 'Price Quotation / Estimate',
    templateBody: `PRICE QUOTATION / ESTIMATE

FROM
[YOUR NAME / BUSINESS]
[CONTACT DETAILS]

TO
[CLIENT NAME]
[CLIENT DETAILS]
Project: [PROJECT TITLE]

Quotation No: [QUO-2026-001]
Date: [DATE]
Valid until: [VALIDITY DATE]

------------------------------------------------------------
Description                              Amount
------------------------------------------------------------
[Item / deliverable 1]                   ₹[____]
[Item / deliverable 2]                   ₹[____]
[Item / deliverable 3]                   ₹[____]
------------------------------------------------------------
                          Estimated Total:   ₹[AMOUNT]
                      (GST extra, if applicable)

TERMS & CONDITIONS
  • [e.g. 50% advance to begin work]
  • [e.g. Estimated delivery: 3 weeks from receipt of advance]
  • This quotation is valid for [15/30] days from the date above.

This is a price quotation, not a tax invoice.

To accept this quote, reply to this email or sign below:
Accepted by: __________________  Date: __________`,
    howToUse: [
      'Copy the layout and add your specific line items and prices.',
      'Keep descriptions specific so there’s no ambiguity later.',
      'Set a validity date so an old price doesn’t bind you forever.',
      'When accepted, convert the quote into an invoice when starting work.',
    ],
    tips: [
      'Always set a “valid until” date — prices and availability change over time.',
      'Note whether GST is extra so the total isn’t misread.',
      'Be specific in descriptions: “5-page website” not “website work”.',
    ],
    faqHeading: 'Quotation FAQs',
    faqs: [
      { q: 'What’s the difference between a quotation and an invoice?', a: 'A quotation is your offer of price before the work; an invoice requests payment after (or during) the work and carries GST if registered.' },
      { q: 'Should a quotation show GST?', a: 'You can show estimated GST for clarity, but note it’s charged on the final invoice.' },
    ],
    related: [
      { href: '/invoice', label: 'Invoice Generator', desc: 'Turn quotes into invoices.' },
      { href: '/templates/scope-of-work-template', label: 'Scope of Work', desc: 'Define full deliverables.' },
    ],
    ctaTitle: 'Quote, then get paid',
    ctaSubtitle: 'Kliv∞ turns quotes into invoices without retyping. Start free.',
  },

  {
    slug: 'scope-of-work-template',
    path: '/templates/scope-of-work-template',
    title: 'Scope of Work Template',
    tagline: 'Define exactly what’s in — and out of — a project.',
    category: 'invoices',
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
      'Attach an SOW to your contract or proposal for every project. When a client asks for something outside it, you have a clear, unemotional reference point.',
    ],
    templateTitle: 'Statement of Work (SOW)',
    templateBody: `SCOPE OF WORK (SOW)

Project Title: [PROJECT TITLE]
Client: [CLIENT NAME]
Service Provider: [YOUR NAME / BUSINESS]
Date: [DATE]

1. OBJECTIVE & SUMMARY
[One or two sentences on what this project is meant to achieve for the client.]

2. INCLUDED DELIVERABLES
  • [Deliverable 1 — specific, e.g. "Homepage + 4 inner pages, responsive"]
  • [Deliverable 2 — specific outcome]
  • [Deliverable 3 — specific outcome]

3. OUT OF SCOPE (EXCLUSIONS)
The following items are explicitly NOT included and require a separate quote:
  • [e.g. Copywriting or professional photography]
  • [e.g. Ongoing server maintenance or monthly retainer]
  • [e.g. Additional pages or custom third-party integrations]

4. TIMELINE & MILESTONES
  • [Milestone 1] — [Date / Week]
  • [Milestone 2] — [Date / Week]
  • Final Delivery — [Date / Week]

5. CLIENT RESPONSIBILITIES
  • Provide brand assets, logins, and finalized content by [DATE].
  • Provide consolidated feedback within [3] business days of each review check-in.

6. REVISION ROUNDS
This SOW includes [NUMBER] rounds of revisions. Revisions beyond this limit are handled via formal Change Order at ₹[RATE]/hour.

7. CHANGE ORDERS
Any change to this scope must be agreed in writing, stating the exact impact on price and timeline before work proceeds.

Signed & Acknowledged:
Provider: __________________________  Date: __________
Client:   __________________________  Date: __________`,
    howToUse: [
      'Copy the template and complete each section for the specific project.',
      'Be concrete in Deliverables — quantities, page counts, formats.',
      'Fill the Out of Scope section honestly; it’s the most valuable part.',
    ],
    tips: [
      'The Out of Scope section prevents more disputes than any other clause — don’t skip it.',
      'Tie deliverables to numbers (pages, rounds, formats) so “done” is unambiguous.',
    ],
    faqHeading: 'Scope of work FAQs',
    faqs: [
      { q: 'How does an SOW stop scope creep?', a: 'By listing what’s included and explicitly what isn’t, plus a changes clause, it gives you a clear reference when a client asks for extra work — turning an awkward conversation into a simple change order.' },
    ],
    related: [
      { href: '/templates/freelance-contract-template', label: 'Contract Template', desc: 'Pair the SOW with a contract.' },
      { href: '/templates/client-onboarding-checklist', label: 'Onboarding Checklist', desc: 'Start projects smoothly.' },
    ],
    ctaTitle: 'Keep scope under control',
    ctaSubtitle: 'Kliv∞ ties scope and budgets to every project. Start free.',
  },

  {
    slug: 'client-onboarding-checklist',
    path: '/templates/client-onboarding-checklist',
    title: 'Client Onboarding Checklist',
    tagline: 'Everything to collect and confirm before a project starts.',
    category: 'invoices',
    metaTitle: 'Free Client Onboarding Checklist for Freelancers',
    metaDescription:
      'A free client onboarding checklist for freelancers and agencies. Copy the steps to collect details, set expectations, and start every project cleanly.',
    keywords: ['client onboarding checklist', 'freelance onboarding', 'onboarding new clients'],
    eyebrow: 'Checklist template',
    h1: 'Client onboarding',
    h1Highlight: 'checklist',
    subheading:
      'A smooth start sets the tone for the whole project. This checklist makes sure nothing important is missed before you begin the work.',
    intro: [
      'The first week with a new client decides how the rest of the project feels. A structured onboarding collects everything you need, sets expectations, and makes you look organized and professional from day one.',
      'Copy this checklist and work through it for every new client. It prevents the mid-project scramble for logins, brand files, or approval bottlenecks.',
    ],
    templateTitle: 'New Client Onboarding Checklist',
    templateBody: `NEW CLIENT ONBOARDING CHECKLIST
Project: [PROJECT TITLE]
Client: [CLIENT NAME]
Date: [DATE]

BEFORE COMMENCING WORK
  [ ] Signed contract / accepted proposal received
  [ ] Advance payment cleared in bank account
  [ ] Kickoff call scheduled on calendar

COLLECT FROM CLIENT (ASSETS & LOGINS)
  [ ] Primary point of contact + authorized final approver
  [ ] Project goals, success criteria, and reference inspirations
  [ ] Brand assets (vector logos, brand colors, font files)
  [ ] Required secure logins / CMS / hosting credentials
  [ ] Finalized copy, content, product data, or images
  [ ] Confirmed deadlines and any hard launch dates

CONFIRM & SET EXPECTATIONS
  [ ] Re-confirm final scope of work and out-of-scope exclusions
  [ ] Confirm number of included revision rounds
  [ ] Agree on primary communication channels (email, portal, meetings)
  [ ] Confirm feedback turnaround commitments (e.g., 48-72 hours)
  [ ] Review milestone payment schedule and invoicing dates

SET UP INTERNAL SYSTEMS
  [ ] Create client profile and project workspace in Kliv∞
  [ ] Set up task boards, milestones, and deadlines
  [ ] Invite client to their branded client portal

FIRST WEEK MOMENTUM
  [ ] Send welcome summary email with kickoff action items
  [ ] Confirm receipt of all required assets to begin Phase 1
  [ ] Deliver a quick early win or concept preview to build confidence`,
    howToUse: [
      'Copy the checklist and keep a master copy you reuse for every client.',
      'Work top to bottom before any real work begins.',
      'Send the “collect from the client” items as a single clear request, not scattered messages.',
    ],
    tips: [
      'Get the advance and agreement before collecting access — it confirms commitment.',
      'Ask for a feedback turnaround commitment; slow client feedback is the top cause of project delays.',
    ],
    faqHeading: 'Onboarding FAQs',
    faqs: [
      { q: 'Why does client onboarding matter?', a: 'A structured start collects everything you need, sets clear expectations, and makes you look professional — which prevents most mid-project confusion.' },
    ],
    related: [
      { href: '/features/client-management', label: 'Client Management', desc: 'Keep every client’s history in one profile.' },
      { href: '/templates/project-signoff-acceptance-sheet', label: 'Sign-off Sheet', desc: 'For closing projects cleanly.' },
    ],
    ctaTitle: 'Onboard clients without the chaos',
    ctaSubtitle: 'Kliv∞ uses intake forms and a client portal to start projects cleanly. Start free.',
  },

  {
    slug: 'project-signoff-acceptance-sheet',
    path: '/templates/project-signoff-acceptance-sheet',
    title: 'Project Delivery Sign-Off Sheet',
    tagline: 'Formal client sign-off document for final project completion and invoice clearance.',
    category: 'invoices',
    metaTitle: 'Free Project Delivery Sign-Off & Acceptance Certificate Template',
    metaDescription:
      'Formalize project completion, verify all deliverables have been accepted, release final invoices, and secure legal sign-off from your clients.',
    keywords: ['project sign off template', 'client acceptance certificate', 'project completion form'],
    eyebrow: 'Completion template',
    h1: 'Project Delivery Sign-Off',
    h1Highlight: 'Sheet',
    subheading:
      'Close completed projects cleanly. Get formal client confirmation that all deliverables are accepted, preventing post-launch scope arguments.',
    intro: [
      'When a project reaches final delivery, getting informal email confirmation leaves you vulnerable to requests for "one more quick change" weeks or months later.',
      'A formal Project Sign-Off Sheet confirms that the client has inspected and accepted all agreed deliverables, releasing you to issue the final invoice and transition the project to completed status.',
    ],
    templateTitle: 'Project Completion & Sign-Off Certificate',
    templateBody: `PROJECT DELIVERY SIGN-OFF & ACCEPTANCE SHEET

Project Title: [PROJECT TITLE]
Client: [CLIENT NAME]
Service Provider: [YOUR NAME / BUSINESS]
Completion Date: [DATE]

1. DELIVERABLE VERIFICATION
The undersigned Client acknowledges that all required deliverables outlined in the original Scope of Work (SOW) or Proposal dated [DATE] have been completed, inspected, and delivered:
  [x] Final Deliverable 1: [Verified & Accepted]
  [x] Final Deliverable 2: [Verified & Accepted]
  [x] Final Deliverable 3: [Verified & Accepted]
  [x] All source files, assets, and documentation transferred.

2. ACCEPTANCE CONFIRMATION
Client confirms that the project deliverables meet all agreed quality standards and functional requirements. Client hereby grants formal acceptance of the completed work.

3. FINAL BILLING & IP TRANSFER
Client authorizes the issuance of the final project invoice of ₹[AMOUNT]. Upon clearance of final payment, full intellectual property rights as defined in the master contract will transfer to Client.

4. POST-COMPLETION SUPPORT
Any subsequent modifications, new feature additions, or post-launch revisions requested after the execution of this sign-off sheet will be billed under a separate maintenance agreement or new SOW at standard rates.

Signed & Accepted by Authorized Representative:
Client Organization: [CLIENT NAME]
Authorized Signature: ________________________
Print Name:           ________________________
Title / Role:         ________________________
Date of Sign-Off:     __________`,
    howToUse: [
      'Present this sign-off sheet alongside your final deliverable review meeting.',
      'List the key deliverables checked off in Section 1.',
      'Require the authorized client approver to sign before releasing final admin credentials or vector masters.',
    ],
    tips: [
      'Pairing this sign-off with your final invoice ensures crystal-clear closure for both accounting and legal records.',
    ],
    faqHeading: 'Sign-Off FAQs',
    faqs: [
      { q: 'Can a client ask for free revisions after signing this acceptance sheet?', a: 'No. Section 4 explicitly establishes that any work requested post-sign-off is treated as a new maintenance request or separate scope.' },
    ],
    related: [
      { href: '/invoice', label: 'Invoice Generator', desc: 'Issue your final project invoice.' },
      { href: '/templates/scope-of-work-template', label: 'Scope of Work Template', desc: 'The original agreement.' },
    ],
    ctaTitle: 'Close projects and collect reviews',
    ctaSubtitle: 'Kliv∞ automates project sign-offs and verified testimonial requests. Start free.',
  },
]

export const TEMPLATE_BY_SLUG: Record<string, TemplateConfig> = Object.fromEntries(
  TEMPLATES.map((t) => [t.slug, t]),
)
