import {
  Users,
  KanbanSquare,
  Briefcase,
  FileText,
  LayoutDashboard,
  BadgeCheck,
  Layers,
  Zap,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Clock,
  Wallet,
  Lock,
  CreditCard,
  Sparkles,
  Handshake,
  Eye,
  Repeat,
  type LucideIcon,
} from 'lucide-react'
import type { SeoFaq, SeoIconItem } from '@/lib/seo-pages'

/**
 * In-depth, single-feature explainer pages. Unlike the /features overview (which
 * lists everything) and the keyword SEO pages (which target search terms), each
 * of these answers one feature in full: what it is, how to use it, where it
 * fits, and how it helps. They power the header "Solutions" dropdown so users
 * confused about a specific feature can read a dedicated page for it.
 *
 * Each lives at /features/<slug>. Rendered by <FeatureLanding>.
 */
export type FeaturePageConfig = {
  slug: string
  /** Full route, e.g. "/features/client-management". */
  path: string
  /** Short label + one-liner used in the nav dropdown and related-links cards. */
  navLabel: string
  navDescription: string
  icon: LucideIcon
  metaTitle: string
  metaDescription: string
  keywords: string[]
  eyebrow: string
  h1: string
  h1Highlight: string
  subheading: string
  intro: { heading: string; body: string[] }
  /** "How to use" — numbered steps. */
  stepsHeading: string
  steps: { title: string; desc: string }[]
  /** "How it helps" — benefit cards. */
  helpsHeading: string
  helps: SeoIconItem[]
  /** "Where to use it" — situational cards. */
  whereHeading: string
  where: { title: string; desc: string }[]
  /** "What's included" — capability checklist. */
  capabilitiesHeading: string
  capabilities: string[]
  faqHeading: string
  faqs: SeoFaq[]
  ctaTitle: string
  ctaSubtitle: string
}

// ── Client Management ────────────────────────────────────────────────────────
const CLIENT_MANAGEMENT: FeaturePageConfig = {
  slug: 'client-management',
  path: '/features/client-management',
  navLabel: 'Client Management',
  navDescription: 'Every client’s details, projects & history in one profile',
  icon: Users,
  metaTitle: 'Client Management — Organize Every Client in One Profile',
  metaDescription:
    'How CLIV∞’s client management works: keep every client’s contacts, projects, invoices, payments, and history in one profile. Learn how to use it and how it helps freelancers and agencies.',
  keywords: [
    'client management',
    'client management feature',
    'manage clients',
    'client profiles',
    'client tracking software',
    'client history',
  ],
  eyebrow: 'Client Management',
  h1: 'Every client, in one calm',
  h1Highlight: 'profile',
  subheading:
    'Keep every client’s contacts, projects, invoices, payments, and full history together — so you always know exactly where each relationship stands.',
  intro: {
    heading: 'What is client management in CLIV∞?',
    body: [
      'Client management is the heart of CLIV∞: one tidy profile for every client that holds their contact details, company, notes, files, and the complete history of your work together. Instead of scattering that across WhatsApp, email, and spreadsheets, everything about a client lives on a single screen you can pull up in seconds.',
      'Because each profile is connected to the rest of CLIV∞, opening a client instantly shows their projects, the invoices you’ve raised, the payments you’ve collected, and the meetings you’ve had. When a client messages “where are we at?”, the answer is one click away — not a fifteen-minute hunt through old chats.',
    ],
  },
  stepsHeading: 'How to use client management',
  steps: [
    { title: 'Add a client', desc: 'Create a client with their name, company, contact details, and notes in a few seconds — or import a list to get started fast.' },
    { title: 'Attach their work', desc: 'Link projects, invoices, payments, and files to the client so everything about them collects in one place automatically.' },
    { title: 'Set a status', desc: 'Mark each client active, lead, or on-hold so you can see the state of every relationship at a glance.' },
    { title: 'Open one profile', desc: 'Whenever you need context, open the client to see their full timeline — no switching between apps.' },
  ],
  helpsHeading: 'How client management helps you',
  helps: [
    { icon: Layers, title: 'One source of truth', desc: 'Every detail, file, and payment for a client sits in one profile — nothing lost across apps.' },
    { icon: Zap, title: 'Answers in seconds', desc: 'Recall exactly what you agreed, what’s outstanding, and what’s next without digging.' },
    { icon: ShieldCheck, title: 'Nothing forgotten', desc: 'A clear status and connected history mean no dropped follow-ups or missed promises.' },
    { icon: Star, title: 'Stronger relationships', desc: 'Show up informed on every call — the small thing that earns bigger, longer engagements.' },
  ],
  whereHeading: 'Where client management fits',
  where: [
    { title: 'Solo freelancers', desc: 'Juggling several clients at once and tired of hunting through chats to remember details.' },
    { title: 'Growing agencies', desc: 'Many clients across a team who all need the same, up-to-date picture of each account.' },
    { title: 'Retainer & repeat clients', desc: 'Long relationships with months of history you can’t hold in your head.' },
  ],
  capabilitiesHeading: 'What’s included',
  capabilities: [
    'Full contact & company details',
    'Notes and file attachments',
    'Per-client project history',
    'Linked invoices & payment records',
    'Status pipeline (active / lead / on-hold)',
    'Fast, searchable client list',
  ],
  faqHeading: 'Client management FAQs',
  faqs: [
    { q: 'Can I import my existing clients?', a: 'Yes. You can add clients manually in seconds or bring across an existing list, then attach their projects, invoices, and notes so their full history builds up in one profile.' },
    { q: 'Does each client’s history update automatically?', a: 'Yes. When you raise an invoice, record a payment, or run a project for a client, it’s linked to their profile automatically — so the timeline is always current without extra data entry.' },
    { q: 'How many clients can I manage?', a: 'The Free plan covers up to 5 clients, Pro up to 30, and Ultra is unlimited. Leads are unlimited on every plan, so you only count clients once a prospect converts.' },
  ],
  ctaTitle: 'Bring every client into one profile',
  ctaSubtitle: 'Start free and set up your first client in minutes. No credit card required.',
}

// ── CRM & Lead Pipeline ──────────────────────────────────────────────────────
const CRM_PIPELINE: FeaturePageConfig = {
  slug: 'crm-lead-pipeline',
  path: '/features/crm-lead-pipeline',
  navLabel: 'CRM & Lead Pipeline',
  navDescription: 'Track leads on a visual sales pipeline before they become clients',
  icon: KanbanSquare,
  metaTitle: 'CRM & Lead Pipeline — Turn Prospects into Clients',
  metaDescription:
    'How CLIV∞’s CRM lead pipeline works: capture every lead on a visual Kanban pipeline, move deals through your stages, and convert winners to clients in one click. Learn how to use it and how it helps.',
  keywords: [
    'lead pipeline',
    'sales pipeline',
    'CRM pipeline',
    'lead management',
    'sales CRM for freelancers',
    'kanban sales pipeline',
  ],
  eyebrow: 'CRM & Lead Pipeline',
  h1: 'Turn leads into clients on a visual',
  h1Highlight: 'pipeline',
  subheading:
    'Capture every enquiry, move it through stages you control, and convert winners into clients in one click — so no deal slips through the cracks of your inbox.',
  intro: {
    heading: 'What is the CRM lead pipeline?',
    body: [
      'The lead pipeline is CLIV∞’s visual sales board for the work that hasn’t become a client yet. Every enquiry becomes a card you drag across columns — from first contact to won — so you can see the exact state of your sales at a glance, the same way a Kanban board shows your projects.',
      'You define the stages that match how you sell, with protected Won and Lost columns at the ends. When a lead is won, one click converts it into a full client — carrying the details across so you never re-type anything. When one is lost, CLIV∞ asks for a reason, so you learn what’s actually costing you deals.',
    ],
  },
  stepsHeading: 'How to use the lead pipeline',
  steps: [
    { title: 'Add a lead', desc: 'Quick-add every enquiry the moment it lands — name, value, and where it came from.' },
    { title: 'Set your stages', desc: 'Create the columns that match your sales process; Won and Lost are built in and protected.' },
    { title: 'Drag deals forward', desc: 'Move cards across the board as conversations progress so status is always current.' },
    { title: 'Convert to client', desc: 'Mark a lead won and convert it to a client in one click — or mark it lost with a required reason.' },
  ],
  helpsHeading: 'How the pipeline helps you',
  helps: [
    { icon: Target, title: 'Never lose a lead', desc: 'Every enquiry is captured and visible, so “I’ll get back to you” never quietly becomes lost income.' },
    { icon: Eye, title: 'See your sales at a glance', desc: 'Know exactly how many deals are live and where each one stands — without a spreadsheet.' },
    { icon: Zap, title: 'Zero re-typing', desc: 'Winning a deal converts it straight into a client, carrying all the details across.' },
    { icon: TrendingUp, title: 'Learn what loses deals', desc: 'A mandatory reason on every lost deal turns dead ends into insight you can act on.' },
  ],
  whereHeading: 'Where the pipeline fits',
  where: [
    { title: 'Freelancers chasing enquiries', desc: 'Getting DMs, emails, and referrals you keep forgetting to follow up on.' },
    { title: 'Agencies with real sales flow', desc: 'Multiple deals in motion at once that need a shared, visible pipeline.' },
    { title: 'Referral-heavy businesses', desc: 'Leads arriving from many places that all need to land in one board.' },
  ],
  capabilitiesHeading: 'What’s included',
  capabilities: [
    'Visual Kanban sales pipeline',
    'Custom, drag-and-drop stages',
    'Protected Won / Lost columns',
    'Quick-add for fast capture',
    'One-click “Convert to Client”',
    'Mandatory reason on lost deals',
  ],
  faqHeading: 'Lead pipeline FAQs',
  faqs: [
    { q: 'How many leads can I track?', a: 'Leads are unlimited on every plan, including Free. You can capture as many enquiries as you like — you only start counting toward your plan’s client limit once a lead converts to a client.' },
    { q: 'Can I customise the pipeline stages?', a: 'Yes. You can create and reorder the columns to match how you sell. The Won and Lost stages at the ends are protected so your conversion and loss data stays reliable.' },
    { q: 'What happens when I win a deal?', a: 'Marking a lead as won lets you convert it to a client in one click, carrying its details across so you can start projects and invoicing without re-entering anything.' },
  ],
  ctaTitle: 'Stop losing deals in your inbox',
  ctaSubtitle: 'Start free and put every lead on one visual pipeline today.',
}

// ── Project Management ───────────────────────────────────────────────────────
const PROJECT_MANAGEMENT: FeaturePageConfig = {
  slug: 'project-management',
  path: '/features/project-management',
  navLabel: 'Project Management',
  navDescription: 'Kanban boards, deadlines, budgets & tasks for every project',
  icon: Briefcase,
  metaTitle: 'Project Management — Kanban Boards, Budgets & Tasks',
  metaDescription:
    'How CLIV∞’s project management works: run every client project on a Kanban board with deadlines, budgets, tasks, and team assignments. Learn how to use it and how it helps freelancers and agencies.',
  keywords: [
    'project management',
    'project tracking',
    'kanban board',
    'project management for freelancers',
    'task management',
    'project budgets',
  ],
  eyebrow: 'Project Management',
  h1: 'See exactly where every project',
  h1Highlight: 'stands',
  subheading:
    'Run each project on a clean Kanban board with deadlines, budgets, tasks, and team assignments — all tied to the client it belongs to.',
  intro: {
    heading: 'What is project management in CLIV∞?',
    body: [
      'Project management in CLIV∞ turns each piece of client work into a project with its own Kanban board, deadline, budget, files, and tasks. You move work from To-do to In progress to Done by dragging cards, so the status of everything you’re delivering is visible on one board instead of living in your head.',
      'What makes it different from a generic board is the connection: every project is linked to its client and its invoices. So when a project slips you know exactly whose work is affected, and when it’s done you can raise the invoice without re-entering anything. Assign your team to tasks, track spend against the budget, and always know what’s on track and what’s profitable.',
    ],
  },
  stepsHeading: 'How to use project management',
  steps: [
    { title: 'Create a project', desc: 'Spin up a project, link it to its client, and set a budget and deadline.' },
    { title: 'Break it into tasks', desc: 'Add tasks and assign them to yourself or your team so everyone knows what’s theirs.' },
    { title: 'Work the board', desc: 'Drag cards across the Kanban board — To-do, In progress, Done — as work moves.' },
    { title: 'Track budget & files', desc: 'Log expenses against the budget and keep project files and updates in one timeline.' },
  ],
  helpsHeading: 'How project management helps you',
  helps: [
    { icon: Eye, title: 'Status without meetings', desc: 'One glance at the board shows what’s on track and what’s slipping — no status calls needed.' },
    { icon: Wallet, title: 'Stay on budget', desc: 'Track spend against each project’s budget so profit doesn’t quietly leak away.' },
    { icon: Users, title: 'Keep the team aligned', desc: 'Assign tasks so every developer and designer knows exactly what to work on.' },
    { icon: Briefcase, title: 'Everything in context', desc: 'Each project stays linked to its client and invoices — delivery and money in one place.' },
  ],
  whereHeading: 'Where project management fits',
  where: [
    { title: 'Multi-project freelancers', desc: 'Running several client projects at once and losing track of what’s due when.' },
    { title: 'Small agencies', desc: 'A team delivering many projects that all need one shared, visible board.' },
    { title: 'Fixed-budget work', desc: 'Projects where staying inside a budget is the difference between profit and loss.' },
  ],
  capabilitiesHeading: 'What’s included',
  capabilities: [
    'Drag-and-drop Kanban boards',
    'Deadlines & budgets per project',
    'Tasks with team assignments',
    'Project files & activity timeline',
    'Client-linked projects',
    'Expense tracking against budget',
  ],
  faqHeading: 'Project management FAQs',
  faqs: [
    { q: 'Are projects linked to clients?', a: 'Yes. Every project belongs to a client, so opening a client shows all their projects and opening a project shows the client it’s for — plus the invoices and payments attached.' },
    { q: 'Can I assign projects to my team?', a: 'Yes. On Pro you can add up to 5 team members and assign them to projects and tasks with role-based access; Ultra makes team members unlimited.' },
    { q: 'How many projects can I run?', a: 'The Free plan includes up to 10 projects, Pro up to 60, and Ultra is unlimited — so the workspace grows with your business.' },
  ],
  ctaTitle: 'Run every project like clockwork',
  ctaSubtitle: 'Start free and put your projects, tasks, and budgets on one board.',
}

// ── Invoicing & Payments ─────────────────────────────────────────────────────
const INVOICING: FeaturePageConfig = {
  slug: 'invoicing',
  path: '/features/invoicing',
  navLabel: 'Invoicing & Payments',
  navDescription: 'GST-ready invoices, PDF export & payment tracking',
  icon: FileText,
  metaTitle: 'Invoicing & Payments — GST-Ready Invoices in a Minute',
  metaDescription:
    'How CLIV∞’s invoicing works: create professional GST-ready invoices with line items and tax, export a branded PDF, and track paid, pending, and overdue payments. Learn how to use it and how it helps.',
  keywords: [
    'invoicing',
    'GST invoice software',
    'invoice generator',
    'payment tracking',
    'invoice management',
    'freelancer invoices India',
  ],
  eyebrow: 'Invoicing & Payments',
  h1: 'Send GST-ready invoices in a',
  h1Highlight: 'minute',
  subheading:
    'Professional, branded invoices with line items, tax, and one-click PDF export — plus payment tracking so you always know who’s paid and who owes you.',
  intro: {
    heading: 'What is invoicing in CLIV∞?',
    body: [
      'Invoicing in CLIV∞ lets you build professional, GST-ready invoices in minutes: add line items with quantities and rates, apply tax, and put your business and GST details on every invoice. Amounts are in ₹ by default, so it fits how Indian freelancers and agencies actually bill. One click exports a clean, branded PDF you can send straight to your client.',
      'Every invoice is linked to its client and project and connected to payment tracking, so as money comes in your dashboard updates on its own. You can see at a glance what’s paid, what’s pending, and what’s overdue — no separate spreadsheet, no manual math, and a far more professional look than a Word template.',
    ],
  },
  stepsHeading: 'How to use invoicing',
  steps: [
    { title: 'Start an invoice', desc: 'Create an invoice for a client and project, with your business and GST details pre-filled.' },
    { title: 'Add line items', desc: 'Add items with quantities, rates, and tax — totals calculate automatically in ₹.' },
    { title: 'Export & send', desc: 'Download a clean, branded PDF and send it to your client in one click.' },
    { title: 'Track payment', desc: 'Record payments as they arrive and watch paid, pending, and overdue update live.' },
  ],
  helpsHeading: 'How invoicing helps you',
  helps: [
    { icon: Zap, title: 'Get paid faster', desc: 'Professional invoices out the door in a minute mean less friction and quicker payment.' },
    { icon: Sparkles, title: 'Look established', desc: 'Branded, GST-ready invoices make a one-person studio look like an agency twice its size.' },
    { icon: Eye, title: 'Know who owes you', desc: 'A live view of paid, pending, and overdue means no more chasing blind or forgetting dues.' },
    { icon: CreditCard, title: 'Built for India', desc: 'Rupee amounts and GST details out of the box — no wrestling a foreign tool into shape.' },
  ],
  whereHeading: 'Where invoicing fits',
  where: [
    { title: 'Freelancers billing monthly', desc: 'Tired of copying last month’s invoice from a Word template every single time.' },
    { title: 'GST-registered businesses', desc: 'Needing tax and business details on every invoice, done correctly.' },
    { title: 'Agencies tracking dues', desc: 'Juggling many invoices and needing to see outstanding payments at a glance.' },
  ],
  capabilitiesHeading: 'What’s included',
  capabilities: [
    'Line items with quantity, rate & tax',
    'GST & business details on every invoice',
    'One-click branded PDF export',
    'Amounts in ₹ by default',
    'Linked to clients & projects',
    'Paid / pending / overdue tracking',
  ],
  faqHeading: 'Invoicing FAQs',
  faqs: [
    { q: 'Can I add GST to invoices?', a: 'Yes. Invoices support tax and carry your GST and business details, with amounts in ₹ by default, so your invoices are ready to send to Indian clients.' },
    { q: 'Do invoices link to payments?', a: 'Yes. Each invoice is tied to its client and project, and as you record payments the dashboard updates to show what’s paid, pending, and overdue automatically.' },
    { q: 'Is there a free invoice generator?', a: 'Yes — CLIV∞ also offers a free, no-signup invoice generator you can use in your browser, and full invoicing (linked to clients and payments) is built into the app on every plan.' },
  ],
  ctaTitle: 'Send invoices that get you paid',
  ctaSubtitle: 'Start free and raise your first GST-ready invoice in minutes.',
}

// ── Client Portal ────────────────────────────────────────────────────────────
const CLIENT_PORTAL: FeaturePageConfig = {
  slug: 'client-portal',
  path: '/features/client-portal',
  navLabel: 'Client Portal',
  navDescription: 'A white-label login where clients view work & pay',
  icon: LayoutDashboard,
  metaTitle: 'White-Label Client Portal — A Branded Space for Clients',
  metaDescription:
    'How CLIV∞’s white-label client portal works: give clients a branded login to view projects, download invoices, access files, and sign documents. Learn how to use it and how it helps you look professional.',
  keywords: [
    'client portal',
    'white-label client portal',
    'client portal software',
    'branded client login',
    'client dashboard',
    'client self-service',
  ],
  eyebrow: 'Client Portal',
  h1: 'A branded portal your clients will',
  h1Highlight: 'love',
  subheading:
    'Give every client a secure, white-label login — your name and logo, not ours — where they view projects, download invoices, access files, and sign documents themselves.',
  intro: {
    heading: 'What is the white-label client portal?',
    body: [
      'The client portal is a branded space where your clients log in to see everything about their work with you. It carries your agency’s name and logo — not CLIV∞’s — so it feels like a premium tool you built. Clients access it with a passwordless magic link, so there’s no account to create or password to forget.',
      'Inside, clients can follow project progress, download their invoice PDFs, open files through secure links, and sign proposals and documents digitally. That self-serve experience cuts down the endless “can you send me that again?” emails and makes even a solo freelancer feel like an established agency.',
    ],
  },
  stepsHeading: 'How to use the client portal',
  steps: [
    { title: 'Brand it', desc: 'Add your agency name and logo so the portal looks like your own product, not CLIV∞’s.' },
    { title: 'Invite your client', desc: 'Give the client access — they sign in with a secure, passwordless magic link.' },
    { title: 'Share the work', desc: 'Projects, invoices, and files appear in their portal automatically as you work.' },
    { title: 'Let them self-serve', desc: 'Clients download invoices, open files, and sign documents themselves — no back-and-forth.' },
  ],
  helpsHeading: 'How the client portal helps you',
  helps: [
    { icon: Sparkles, title: 'Look bigger than you are', desc: 'A branded portal makes a one-person studio feel like an established agency.' },
    { icon: Handshake, title: 'Build trust', desc: 'A premium, transparent experience reassures clients and wins you bigger work.' },
    { icon: Zap, title: 'Fewer status emails', desc: 'Clients see progress and grab what they need themselves — your inbox thanks you.' },
    { icon: Lock, title: 'Secure by design', desc: 'Passwordless magic-link access and signed file links keep client data protected.' },
  ],
  whereHeading: 'Where the client portal fits',
  where: [
    { title: 'Freelancers going upmarket', desc: 'Wanting to look and feel like an agency to win larger clients.' },
    { title: 'Agencies with demanding clients', desc: 'Clients who expect a professional, self-serve place to see their projects.' },
    { title: 'Document-heavy work', desc: 'Proposals and files that clients need to review, download, and sign.' },
  ],
  capabilitiesHeading: 'What’s included',
  capabilities: [
    'White-label branding (your name & logo)',
    'Passwordless magic-link sign-in',
    'Project progress for clients',
    'Invoice PDF downloads',
    'Secure file access via signed links',
    'In-portal document signing',
  ],
  faqHeading: 'Client portal FAQs',
  faqs: [
    { q: 'Is the portal branded with my name or CLIV∞’s?', a: 'Yours. The white-label portal shows your agency’s name and logo, so to your clients it looks like your own product — CLIV∞ stays behind the scenes.' },
    { q: 'How do clients log in?', a: 'Clients sign in with a passwordless magic link sent to their email — there’s no account to create or password to remember, which keeps access simple and secure.' },
    { q: 'Which plans include the client portal?', a: 'The white-label client portal is available on the Pro and Ultra plans. The Free plan focuses on the core client, project, and invoicing tools.' },
  ],
  ctaTitle: 'Give your clients a portal to remember',
  ctaSubtitle: 'Start free and see how a branded client experience changes the relationship.',
}

// ── Verified Reviews ─────────────────────────────────────────────────────────
const VERIFIED_REVIEWS: FeaturePageConfig = {
  slug: 'verified-reviews',
  path: '/features/verified-reviews',
  navLabel: 'Verified Reviews',
  navDescription: 'Turn completed projects into credible public reviews',
  icon: BadgeCheck,
  metaTitle: 'Verified Client Reviews — Build Trust Automatically',
  metaDescription:
    'How CLIV∞’s verified client reviews work: completed projects automatically invite clients to review, you get a public review page and an embeddable badge, and reviews can’t be edited — so they’re credible.',
  keywords: [
    'verified reviews',
    'client reviews',
    'freelancer reviews',
    'agency reviews',
    'review badge',
    'social proof for freelancers',
  ],
  eyebrow: 'Verified Reviews',
  h1: 'Turn finished projects into verified',
  h1Highlight: 'reviews',
  subheading:
    'Social proof is the hardest thing for a freelancer to build — so CLIV∞ builds it for you. Real reviews, from real clients, on real completed projects, free on every plan.',
  intro: {
    heading: 'What are verified client reviews?',
    body: [
      'Verified reviews are a built-in, Trustpilot-style trust system. When you mark a project as completed, the client is automatically invited — inside the portal they already use — to leave a 1–5 star review with optional written feedback. There’s no separate login or link to chase; it piggybacks on the access they already have.',
      'What makes them “verified” is that every review is tied to a real client on a real completed project, and you cannot edit or delete them. That’s the whole point — reviews you can’t doctor are reviews people trust. You get a public review page at your own agency slug (your logo, average rating, and every review) plus a copy-paste embeddable badge for your own website. It’s free on every plan, deliberately, so more agencies share it.',
    ],
  },
  stepsHeading: 'How to use verified reviews',
  steps: [
    { title: 'Finish the work', desc: 'Mark a project “completed” using the status you already use — no new button to learn.' },
    { title: 'Client is invited', desc: 'Your client is automatically prompted to leave a 1–5 star review inside their portal.' },
    { title: 'Share your page', desc: 'Send clients and prospects your public review page at your own agency slug.' },
    { title: 'Embed the badge', desc: 'Drop one line of code on your website to show a live, auto-updating star rating.' },
  ],
  helpsHeading: 'How verified reviews help you',
  helps: [
    { icon: BadgeCheck, title: 'Credible by design', desc: 'Reviews you can’t edit or fake are exactly the kind prospects actually believe.' },
    { icon: Handshake, title: 'Win bigger clients', desc: 'A wall of verified reviews is the social proof that closes larger, higher-value work.' },
    { icon: Repeat, title: 'Collected on autopilot', desc: 'Reviews arrive automatically when projects finish — you never have to ask for a favour.' },
    { icon: Sparkles, title: 'Free marketing everywhere', desc: 'Every embedded badge and shared page quietly grows your reputation online.' },
  ],
  whereHeading: 'Where verified reviews fit',
  where: [
    { title: 'New freelancers', desc: 'Building a reputation from scratch and needing credible proof they can deliver.' },
    { title: 'Agencies pitching bigger work', desc: 'Wanting a public, trustworthy track record to show prospects.' },
    { title: 'Anyone with a website', desc: 'Who wants a live star rating on their own site without wiring up a review platform.' },
  ],
  capabilitiesHeading: 'What’s included',
  capabilities: [
    'Automatic review invites on completed projects',
    '1–5 star ratings with written feedback',
    'Reviews owners can’t edit or delete',
    'Public review page at your agency slug',
    'Copy-paste embeddable badge',
    'Free on every plan',
  ],
  faqHeading: 'Verified reviews FAQs',
  faqs: [
    { q: 'How are reviews collected?', a: 'Automatically. When you move a project to “completed”, the client is invited to review it inside the portal they already use — there’s no separate flow or extra login to set up.' },
    { q: 'Can I edit or delete a bad review?', a: 'No — and that’s deliberate. Because owners can’t edit or remove reviews, and each is tied to a real completed project, the reviews are genuinely verified and therefore credible to the people reading them.' },
    { q: 'Is it really free?', a: 'Yes. Verified reviews, the public review page, and the embeddable badge are free on every plan, including Free — the more agencies share their badge, the more people discover CLIV∞.' },
  ],
  ctaTitle: 'Let your finished work sell the next project',
  ctaSubtitle: 'Start free and turn completed projects into verified reviews automatically.',
}

export const FEATURE_PAGES: FeaturePageConfig[] = [
  CLIENT_MANAGEMENT,
  CRM_PIPELINE,
  PROJECT_MANAGEMENT,
  INVOICING,
  CLIENT_PORTAL,
  VERIFIED_REVIEWS,
]

export const FEATURE_PAGE_BY_SLUG: Record<string, FeaturePageConfig> = Object.fromEntries(
  FEATURE_PAGES.map((f) => [f.slug, f])
)

/** Lightweight nav data (strings only) for the header "Solutions" dropdown. */
export const SOLUTIONS_NAV = FEATURE_PAGES.map((f) => ({
  href: f.path,
  label: f.navLabel,
  description: f.navDescription,
}))
