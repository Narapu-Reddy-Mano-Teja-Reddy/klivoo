import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Bell,
  KanbanSquare,
  ReceiptText,
  FileSignature,
  LayoutDashboard,
  CalendarClock,
  UserPlus,
  BadgeCheck,
  ShieldCheck,
  Wallet,
  Clock,
  Zap,
  Sparkles,
  Target,
  PieChart,
  FolderKanban,
  CreditCard,
  ClipboardList,
  Layers,
  type LucideIcon,
} from 'lucide-react'

/**
 * Content configs for the keyword-targeted SEO landing pages. Each page owns a
 * distinct keyword cluster (per the marketing keyword sheet) and carries its own
 * unique copy — meta, H1, intro, benefits, capabilities, comparison, and FAQ —
 * so every page earns its own ranking instead of competing as duplicate content.
 *
 * The <SeoLanding> template renders any of these; add a config here + a thin
 * page.tsx under src/app/<slug>/ to ship a new landing page.
 */
export type SeoIconItem = { icon: LucideIcon; title: string; desc: string }
export type SeoFaq = { q: string; a: string }

export type SeoLandingConfig = {
  /** Route path, e.g. "/client-management-software". */
  path: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  /** Optional social-card overrides (fall back to meta title/description). */
  ogTitle?: string
  ogDescription?: string
  breadcrumbLabel: string
  eyebrow: string
  /** H1 lead — the highlight is appended in the brand gradient. */
  h1: string
  h1Highlight: string
  subheading: string
  intro: { heading: string; body: string[] }
  benefits: { heading: string; sub: string; items: SeoIconItem[] }
  capabilities: { heading: string; sub: string; items: SeoIconItem[] }
  compare: { heading: string; sub: string; old: string[]; calm: string[] }
  faqHeading: string
  faqs: SeoFaq[]
  related: { href: string; label: string; desc: string }[]
  ctaTitle: string
  ctaSubtitle: string
}

// ── /client-management-software ──────────────────────────────────────────────
const CLIENT_MANAGEMENT: SeoLandingConfig = {
  path: '/client-management-software',
  metaTitle: 'Client Management CRM Software for Freelancers & Agencies',
  metaDescription:
    'Manage clients, projects, payments, and meetings in one powerful CRM. CLIV∞ helps freelancers and agencies streamline operations and grow their business — start free.',
  keywords: [
    'client management software',
    'CRM for freelancers',
    'agency CRM',
    'project management software',
    'invoice management',
    'client portal',
    'freelancer CRM',
    'agency management software',
    'business CRM India',
    'client tracking software',
    'client management software free',
  ],
  ogTitle: 'CLIV∞ — Client Management CRM Software',
  ogDescription:
    'Manage clients, projects, invoices, payments, meetings, and teams from one beautiful workspace. Built for Indian freelancers and agencies.',
  breadcrumbLabel: 'Client Management Software',
  eyebrow: 'Client management software',
  h1: 'Client management CRM software for freelancers &',
  h1Highlight: 'agencies',
  subheading:
    'Run your freelance business without the chaos. Manage clients, projects, invoices, payments, and teams from one powerful CRM platform — free to start.',
  intro: {
    heading: 'What is client management software?',
    body: [
      'Client management software is a single system that stores everything about every client — their contact details, projects, invoices, payments, documents, and conversation history — so nothing lives in a WhatsApp thread or a forgotten spreadsheet tab. Instead of stitching together five apps, you open one and see exactly where each relationship stands.',
      'CLIV∞ is client management software built specifically for Indian freelancers and small agencies. Every client gets one tidy profile with their full history attached: the projects you’ve run, the invoices you’ve raised, the payments you’ve collected, and the meetings you’ve had. When a client emails asking “where are we at?”, the answer is one click away.',
      'Because it’s a proper CRM and not just a contact list, CLIV∞ also tracks the work before it becomes a client — a visual lead pipeline — and the money after — invoices, expenses, and profit — so the whole lifecycle of a client lives in one place.',
    ],
  },
  benefits: {
    heading: 'Why freelancers switch to CLIV∞',
    sub: 'One organized workspace replaces the scattered stack you run your business on today.',
    items: [
      {
        icon: Layers,
        title: 'One source of truth',
        desc: 'Every client detail, file, invoice, and payment in one profile — no more hunting across apps to remember what you promised.',
      },
      {
        icon: Zap,
        title: 'Less admin, more billable hours',
        desc: 'Add a client in seconds, spin up a project, and raise an invoice in a minute. The busywork that eats your evenings, gone.',
      },
      {
        icon: ShieldCheck,
        title: 'Nothing slips through',
        desc: 'A clear status pipeline and meeting reminders mean no forgotten follow-ups and no “I thought you were handling that” moments.',
      },
      {
        icon: TrendingUp,
        title: 'Know your numbers',
        desc: 'See revenue, outstanding invoices, and profit update live — make pricing and hiring calls on real data, not gut feel.',
      },
    ],
  },
  capabilities: {
    heading: 'Everything you need to manage clients',
    sub: 'The full toolkit — not a stripped-down contact list.',
    items: [
      { icon: Users, title: 'Client profiles', desc: 'Contacts, company, notes, files, and full history in one view.' },
      { icon: KanbanSquare, title: 'Lead pipeline', desc: 'Track prospects on a Kanban board and convert them to clients in a click.' },
      { icon: Briefcase, title: 'Project tracking', desc: 'Per-client projects with Kanban boards, deadlines, and budgets.' },
      { icon: FileText, title: 'GST-ready invoices', desc: 'Branded, tax-ready invoices with one-click PDF export.' },
      { icon: Wallet, title: 'Payments & expenses', desc: 'Record what clients pay and what projects cost — see net profit.' },
      { icon: LayoutDashboard, title: 'White-label portal', desc: 'A branded login where clients view work and download invoices.' },
    ],
  },
  compare: {
    heading: 'From scattered chaos to one calm workspace',
    sub: 'Here’s what changes the day you move your clients into CLIV∞.',
    old: [
      'Client details spread across WhatsApp, email, and Google Contacts',
      'Invoices copied from a Word template every month',
      'Payment status living only in your head',
      'Digging through chats to find what you last agreed',
      'Five different apps that don’t talk to each other',
    ],
    calm: [
      'Every client in one profile with their full history attached',
      'Professional GST-ready invoices in under a minute',
      'Payments, dues, and profit tracked automatically',
      'One searchable timeline per client, always up to date',
      'A single workspace built for client-services work',
    ],
  },
  faqHeading: 'Client management software FAQs',
  faqs: [
    {
      q: 'What is client management software?',
      a: 'Client management software is a tool that keeps everything about your clients — contacts, projects, invoices, payments, documents, and communication history — in one organized system instead of scattered across spreadsheets, chats, and email. CLIV∞ is client management software (a CRM) built for freelancers and agencies, so you can run every client relationship from one place.',
    },
    {
      q: 'Is there free client management software?',
      a: 'Yes. CLIV∞ has a Free plan that is free forever — no credit card required. It includes up to 5 clients and 10 projects, the full leads & CRM pipeline, invoicing, meetings, and basic analytics, which is plenty to run a solo freelance business. You only upgrade when you outgrow those limits.',
    },
    {
      q: 'What is the best client management software for freelancers in India?',
      a: 'The best fit for most Indian freelancers is software built for their workflow — invoices in ₹ with GST, UPI-friendly payments, and pricing that makes sense in rupees. CLIV∞ is built exactly for this: it combines client management, projects, GST-ready invoicing, and a CRM pipeline in one app, starting free and with Pro at a launch price of ₹199/month.',
    },
    {
      q: 'What is a client management system?',
      a: 'A client management system is the software and process you use to organize client relationships end to end — from the first lead, through active projects and invoices, to reviews and repeat work. CLIV∞ is a client management system that covers all of it in one workspace.',
    },
    {
      q: 'Can I download client management software or is it online?',
      a: 'CLIV∞ is cloud-based, so there is nothing to download or install — you sign in from any browser on your laptop or phone and your data syncs everywhere. That also means automatic backups and no software to update. You can export all your data anytime.',
    },
  ],
  related: [
    { href: '/crm-for-freelancers', label: 'CRM for Freelancers', desc: 'A sales & client CRM sized for solo freelancers.' },
    { href: '/features', label: 'All features', desc: 'Every tool CLIV∞ gives you, in detail.' },
    { href: '/pricing', label: 'Pricing', desc: 'Free forever, or Pro from ₹199/month.' },
    { href: '/invoice', label: 'Free invoice generator', desc: 'Make a professional invoice in seconds.' },
  ],
  ctaTitle: 'Bring every client into one calm workspace',
  ctaSubtitle: 'Create your free account and set up your first client in minutes. No credit card required.',
}

// ── /crm-for-freelancers ─────────────────────────────────────────────────────
const CRM_FOR_FREELANCERS: SeoLandingConfig = {
  path: '/crm-for-freelancers',
  metaTitle: 'CRM for Freelancers — Simple Client CRM Software (Free to Start)',
  metaDescription:
    'A CRM built for freelancers, not enterprises. Track leads, manage clients, send invoices, and get paid — all in one simple workspace. Free plan, no credit card.',
  keywords: [
    'CRM for freelancers',
    'freelancer CRM',
    'best CRM software for freelancers',
    'best CRM software for freelancers in India',
    'freelance client management',
    'client management system for freelancers',
    'freelance software management',
    'simple CRM for freelancers',
  ],
  ogTitle: 'CRM for Freelancers — CLIV∞',
  ogDescription:
    'The CRM built for freelancers: leads, clients, projects, and invoices in one simple workspace. Start free.',
  breadcrumbLabel: 'CRM for Freelancers',
  eyebrow: 'CRM for freelancers',
  h1: 'The CRM built for freelancers, not',
  h1Highlight: 'enterprises',
  subheading:
    'Most CRMs are bloated tools designed for big sales teams. CLIV∞ is a simple, affordable CRM that tracks your leads, manages your clients, and helps you get paid — without the enterprise overwhelm.',
  intro: {
    heading: 'What is a CRM for freelancers?',
    body: [
      'A CRM (customer relationship management) tool helps you keep track of the people you sell to and work with — where each lead came from, what stage they’re at, and everything you’ve done together. Traditional CRMs like Salesforce are built for large sales teams and priced accordingly, which makes them overkill for a freelancer running solo.',
      'A CRM for freelancers strips that down to what actually matters when you’re a team of one: a simple pipeline to move leads from “first message” to “signed”, one clean profile per client, and the invoices and payments attached right where you need them. CLIV∞ is that CRM — lightweight enough to actually use every day, complete enough to run your whole business.',
      'Because freelancing blends sales and delivery, CLIV∞ goes a step further than a pure CRM: the same tool that tracks your pipeline also runs your projects, raises your invoices, and collects verified reviews when you finish — so you’re never bouncing between a CRM and five other apps.',
    ],
  },
  benefits: {
    heading: 'A CRM that fits how freelancers actually work',
    sub: 'Powerful where it counts, simple everywhere else.',
    items: [
      {
        icon: Target,
        title: 'Never lose a lead',
        desc: 'Capture every enquiry in a visual pipeline so no “I’ll get back to you” quietly turns into lost income.',
      },
      {
        icon: Sparkles,
        title: 'No bloat, no training',
        desc: 'Set it up in an afternoon. If you can drag a card between columns, you already know how to use it.',
      },
      {
        icon: CreditCard,
        title: 'Priced for one person',
        desc: 'Free to start, Pro at a launch price of ₹199/month — not enterprise seat pricing that assumes a sales team.',
      },
      {
        icon: BadgeCheck,
        title: 'Wins you the next client',
        desc: 'Finish a project and CLIV∞ collects a verified review automatically — the social proof that lands bigger work.',
      },
    ],
  },
  capabilities: {
    heading: 'Everything a freelance CRM should do',
    sub: 'From first hello to repeat client.',
    items: [
      { icon: KanbanSquare, title: 'Sales pipeline', desc: 'Drag leads across custom stages, with a mandatory reason on every lost deal.' },
      { icon: Users, title: 'Client records', desc: 'One profile per client with projects, invoices, and notes attached.' },
      { icon: FileSignature, title: 'Proposals & e-sign', desc: 'Send proposals clients sign digitally, right inside their portal.' },
      { icon: ReceiptText, title: 'Quotes & invoices', desc: 'Quote before the work, invoice after — no re-typing details.' },
      { icon: CalendarClock, title: 'Meetings & calendar', desc: 'Google Calendar sync and auto Meet links, with reminders.' },
      { icon: BadgeCheck, title: 'Verified reviews', desc: 'Turn happy clients into credible reviews you can show off.' },
    ],
  },
  compare: {
    heading: 'Enterprise CRM vs a CRM for freelancers',
    sub: 'You don’t need a sales ops team — you need to get paid.',
    old: [
      'Weeks of setup, consultants, and “implementation partners”',
      'Per-seat pricing that assumes a whole sales department',
      'A hundred features you’ll never touch',
      'A separate app for invoices, projects, and files',
      'Built for enterprise sales, not client-services work',
    ],
    calm: [
      'Sign up and add your first lead in five minutes',
      'Free to start; Pro at a freelancer-friendly ₹199/month',
      'Just the pipeline, clients, invoices, and reviews you use',
      'Projects, invoices, and files built into the same CRM',
      'Designed from scratch for freelancers and small agencies',
    ],
  },
  faqHeading: 'Freelancer CRM FAQs',
  faqs: [
    {
      q: 'What is the best CRM software for freelancers in India?',
      a: 'The best CRM for an Indian freelancer is one that speaks your workflow: leads and clients in one place, invoices in ₹ with GST, UPI-friendly billing, and pricing in rupees. CLIV∞ is built for exactly that — a simple CRM plus invoicing and projects, free to start and Pro at a launch price of ₹199/month.',
    },
    {
      q: 'Do I really need a CRM as a solo freelancer?',
      a: 'If you have more than a couple of clients, yes — even a simple CRM stops leads from slipping through the cracks and keeps every client’s details, projects, and payments in one place. CLIV∞ is designed so a solo freelancer gets that benefit without enterprise complexity or cost.',
    },
    {
      q: 'Is there a free CRM for freelancers?',
      a: 'Yes. CLIV∞’s Free plan is free forever with no credit card — it includes the full leads & CRM pipeline (with unlimited leads), up to 5 clients and 10 projects, invoicing, and basic analytics. It’s a genuinely usable freelance CRM, not a limited trial.',
    },
    {
      q: 'How is CLIV∞ different from a normal CRM?',
      a: 'A normal CRM stops at tracking leads and contacts. CLIV∞ combines that pipeline with everything freelancers do after the sale — projects, GST invoices, a client portal, meetings, and verified reviews — so you run your whole business in one tool instead of a CRM plus five others.',
    },
  ],
  related: [
    { href: '/client-management-software', label: 'Client Management Software', desc: 'Manage every client in one profile.' },
    { href: '/project-management-crm', label: 'Project Management CRM', desc: 'Run the delivery side of client work.' },
    { href: '/pricing', label: 'Pricing', desc: 'Free forever, or Pro from ₹199/month.' },
    { href: '/features', label: 'All features', desc: 'The full toolkit in detail.' },
  ],
  ctaTitle: 'Get a CRM that actually fits a freelancer',
  ctaSubtitle: 'Start free, add your first lead in minutes, and keep your whole pipeline in one place.',
}

// ── /project-management-crm ──────────────────────────────────────────────────
const PROJECT_MANAGEMENT_CRM: SeoLandingConfig = {
  path: '/project-management-crm',
  metaTitle: 'Project Management CRM for Agencies & Freelancers',
  metaDescription:
    'A project management CRM that connects clients to their projects. Kanban boards, deadlines, budgets, tasks, and invoices in one agency workspace. Free to start.',
  keywords: [
    'project management CRM',
    'agency CRM',
    'project tracking software',
    'project management software for freelancers',
    'project and clients management software',
    'best project management software for freelancers',
    'project management tools for freelancers',
    'agency management software',
  ],
  ogTitle: 'Project Management CRM — CLIV∞',
  ogDescription:
    'Connect every project to its client. Kanban boards, budgets, tasks, and invoices in one agency workspace. Start free.',
  breadcrumbLabel: 'Project Management CRM',
  eyebrow: 'Project management CRM',
  h1: 'The project management CRM for client-based',
  h1Highlight: 'work',
  subheading:
    'Generic project tools forget who the work is for. CLIV∞ ties every project to its client, budget, and invoice — so you see delivery and the relationship together, on one board.',
  intro: {
    heading: 'What is a project management CRM?',
    body: [
      'A project management CRM combines two things freelancers and agencies usually keep in separate apps: the client relationship (the CRM side) and the actual delivery of the work (the project management side). Instead of a Trello board here and a client list there, every project is attached to the client it belongs to, with its budget, tasks, files, and invoices in the same place.',
      'That connection matters for client-services work. When a project slips, you know exactly which client to call. When you raise an invoice, it’s already linked to the project and payment record. When you look at profit, it rolls up per client and per project automatically — no reconciling spreadsheets at month-end.',
      'CLIV∞ is a project management CRM built for Indian freelancers and agencies. You run projects on clean Kanban boards, assign your team, track budgets and deadlines, and keep clients in the loop through a branded portal — all without leaving the tool that also holds their contact details and invoices.',
    ],
  },
  benefits: {
    heading: 'Why a connected CRM beats a standalone board',
    sub: 'Projects mean more when they’re tied to the client and the money.',
    items: [
      {
        icon: FolderKanban,
        title: 'Projects, in context',
        desc: 'Every board is linked to its client, budget, and invoices — so status, scope, and payment live together.',
      },
      {
        icon: PieChart,
        title: 'Profit per project',
        desc: 'Track payments and expenses against each project and see real net profit, not just a to-do list.',
      },
      {
        icon: UserPlus,
        title: 'Your whole team, aligned',
        desc: 'Assign developers and designers to tasks and projects with role-based access — everyone knows what’s theirs.',
      },
      {
        icon: LayoutDashboard,
        title: 'Clients stay in the loop',
        desc: 'A white-label portal lets clients follow progress and download invoices — cutting your status-update emails to zero.',
      },
    ],
  },
  capabilities: {
    heading: 'Everything you need to deliver projects',
    sub: 'Boards, budgets, teams, and client visibility in one place.',
    items: [
      { icon: KanbanSquare, title: 'Kanban boards', desc: 'Drag tasks from To-do to Done across a clean, visual board.' },
      { icon: Clock, title: 'Deadlines & budgets', desc: 'Set a budget and due date per project and track against them.' },
      { icon: ClipboardList, title: 'Tasks & assignments', desc: 'Break projects into tasks and assign them to your team.' },
      { icon: Briefcase, title: 'Client linkage', desc: 'Every project ties back to its client, history, and invoices.' },
      { icon: Wallet, title: 'Files & payments', desc: 'Keep project files, updates, and payment records together.' },
      { icon: TrendingUp, title: 'Delivery analytics', desc: 'See what’s on track, what’s slipping, and what’s profitable.' },
    ],
  },
  compare: {
    heading: 'Generic project tool vs a project management CRM',
    sub: 'The difference is everything the board can’t see.',
    old: [
      'A board that has no idea which client the work is for',
      'Budgets tracked in a separate spreadsheet',
      'Invoices raised in a different app entirely',
      'Clients emailing you for updates constantly',
      'Profit worked out by hand at the end of the month',
    ],
    calm: [
      'Every project linked to its client and full history',
      'Budgets and expenses tracked right on the project',
      'Invoices generated from the project in one click',
      'Clients self-serve progress in a branded portal',
      'Profit per project and per client, updated live',
    ],
  },
  faqHeading: 'Project management CRM FAQs',
  faqs: [
    {
      q: 'What are the best project management tools for freelancers?',
      a: 'The best project management tool for a freelancer connects the work to the client and the invoice — otherwise you’re still juggling apps. CLIV∞ gives you Kanban boards, deadlines, budgets, and tasks, all tied to the client they belong to, plus invoicing and a client portal, so delivery and the relationship live in one workspace.',
    },
    {
      q: 'What is the best project management software for freelancers?',
      a: 'For client-services freelancers, the best project management software is one that also handles clients and invoices. CLIV∞ does exactly this as a project management CRM — free to start, with Pro (up to 60 projects and 5 team members) at a launch price of ₹199/month.',
    },
    {
      q: 'How do I manage freelance projects and clients together?',
      a: 'Use a tool that links them. In CLIV∞, each project sits under its client, so opening a client shows all their projects, invoices, and payments, and opening a project shows the client it’s for. That single connection removes almost all the copy-pasting between apps.',
    },
    {
      q: 'Can I add my team to projects?',
      a: 'Yes. On Pro you can add up to 5 team members, assign them to specific projects and tasks with role-based access, and track what you owe each of them. Ultra removes the limit so you can run a full agency.',
    },
  ],
  related: [
    { href: '/client-management-software', label: 'Client Management Software', desc: 'The client side of the workspace.' },
    { href: '/crm-for-freelancers', label: 'CRM for Freelancers', desc: 'Track leads before they become projects.' },
    { href: '/business-management-software', label: 'Business Management Software', desc: 'Run the whole business, not just projects.' },
    { href: '/features', label: 'All features', desc: 'Every tool in detail.' },
  ],
  ctaTitle: 'Run every project like clockwork',
  ctaSubtitle: 'Start free and put your projects, clients, and invoices on one connected board.',
}

// ── /business-management-software ────────────────────────────────────────────
const BUSINESS_MANAGEMENT: SeoLandingConfig = {
  path: '/business-management-software',
  metaTitle: 'Business Management Software for Freelancers & Agencies',
  metaDescription:
    'All-in-one business management software for freelancers and agencies: clients, projects, invoices, payments, team, and a client portal in one place. Free to start.',
  keywords: [
    'business management software',
    'business management free software',
    'client portal software',
    'team management software for agencies',
    'agency management software',
    'freelance business management',
    'all-in-one business software',
    'invoice management software',
  ],
  ogTitle: 'Business Management Software — CLIV∞',
  ogDescription:
    'Run your whole freelance business in one place: clients, projects, invoices, payments, team, and a client portal. Start free.',
  breadcrumbLabel: 'Business Management Software',
  eyebrow: 'Business management software',
  h1: 'Business management software for freelancers &',
  h1Highlight: 'agencies',
  subheading:
    'The operating system for your freelance business. Clients, projects, invoices, payments, team, and a white-label client portal — everything you need to run and grow, in one place.',
  intro: {
    heading: 'What is business management software?',
    body: [
      'Business management software brings the core operations of a business — clients, projects, sales, finances, and team — into one connected system, instead of spreading them across spreadsheets, chat apps, and half a dozen point tools. For a freelancer or small agency, it’s the difference between running your business and just reacting to it.',
      'CLIV∞ is all-in-one business management software for Indian freelancers and agencies. It covers the whole operation: a CRM pipeline to win work, client and project management to deliver it, GST-ready invoicing and payment tracking to get paid, a white-label client portal to look professional, and team management to scale — with a live profit view tying the money together.',
      'Because it’s one system rather than many, the pieces talk to each other automatically. A won lead becomes a client, a client’s project produces an invoice, an invoice becomes a payment, and a completed project collects a verified review — all without exporting, importing, or re-typing anything.',
    ],
  },
  benefits: {
    heading: 'One system to run the whole business',
    sub: 'Stop paying for and switching between five different tools.',
    items: [
      {
        icon: Layers,
        title: 'Everything connected',
        desc: 'Leads, clients, projects, invoices, and payments flow into each other — no exporting or double entry.',
      },
      {
        icon: Wallet,
        title: 'See your real profit',
        desc: 'Track income and expenses per project and client, with net profit, dues, and revenue on one dashboard.',
      },
      {
        icon: UserPlus,
        title: 'Grow from solo to agency',
        desc: 'Add team members with role-based access, assign work, and track payments as your business scales.',
      },
      {
        icon: LayoutDashboard,
        title: 'Look bigger than you are',
        desc: 'A branded client portal and verified reviews make a one-person studio feel like an established agency.',
      },
    ],
  },
  capabilities: {
    heading: 'Everything your business runs on',
    sub: 'The full operating system, from first lead to repeat client.',
    items: [
      { icon: KanbanSquare, title: 'CRM & leads', desc: 'A sales pipeline to turn conversations into clients.' },
      { icon: Users, title: 'Clients & projects', desc: 'Profiles, project boards, files, and history in one place.' },
      { icon: FileText, title: 'Invoices & quotes', desc: 'GST-ready invoices, quotations, and PDF export.' },
      { icon: Wallet, title: 'Payments & expenses', desc: 'Track dues and costs, with a live profitability view.' },
      { icon: LayoutDashboard, title: 'Client portal', desc: 'A white-label login for clients to view work and pay.' },
      { icon: UserPlus, title: 'Team management', desc: 'Role-based access, task assignment, and payouts.' },
    ],
  },
  compare: {
    heading: 'A stack of tools vs one business platform',
    sub: 'Consolidate the tabs into a single workspace.',
    old: [
      'Sheets for clients, an app for invoices, chat for updates',
      'Team access managed by sharing passwords',
      'Clients with no professional way to see their work',
      'Payments and expenses reconciled by hand',
      'Monthly bills for five different subscriptions',
    ],
    calm: [
      'Clients, projects, invoices, and payments in one system',
      'Proper role-based access for every team member',
      'A branded portal where clients self-serve everything',
      'Live profit, dues, and revenue tracked automatically',
      'One affordable plan instead of five subscriptions',
    ],
  },
  faqHeading: 'Business management software FAQs',
  faqs: [
    {
      q: 'Is there free business management software?',
      a: 'Yes. CLIV∞ offers free business management software on its Free plan — free forever, no credit card. It covers clients, projects, the CRM pipeline, invoicing, meetings, and basic analytics, enough to run a solo freelance business. Paid plans (Pro from a launch price of ₹199/month) lift the limits and add the client portal and team management.',
    },
    {
      q: 'How can freelancers track payments and expenses?',
      a: 'With CLIV∞, you record client payments against their invoices and log project expenses as you go. The dashboard then shows total paid, outstanding dues, expenses, and net profit automatically — so you always know what you’ve earned and who still owes you, without a spreadsheet.',
    },
    {
      q: 'What is the best team management software for agencies?',
      a: 'The best team management software for a small agency ties your team to the actual client work. CLIV∞ lets you add team members with role-based access (owner, admin, team), assign them to projects and tasks, and track what you owe each one — built into the same workspace that holds your clients and invoices.',
    },
    {
      q: 'What is client portal software?',
      a: 'Client portal software gives your clients a secure login to view their projects, download invoices, access files, and sign documents. CLIV∞ includes a white-label client portal (on Pro and Ultra) branded with your name and logo, so clients get a premium self-serve experience — not a CLIV∞-branded one.',
    },
  ],
  related: [
    { href: '/client-management-software', label: 'Client Management Software', desc: 'The client-relationship core.' },
    { href: '/project-management-crm', label: 'Project Management CRM', desc: 'The delivery side of the business.' },
    { href: '/crm-for-freelancers', label: 'CRM for Freelancers', desc: 'Win the work before it starts.' },
    { href: '/pricing', label: 'Pricing', desc: 'Free forever, or Pro from ₹199/month.' },
  ],
  ctaTitle: 'Run your whole business in one place',
  ctaSubtitle: 'Create your free account and bring clients, projects, invoices, and your team together today.',
}

export const SEO_LANDING_CONFIGS: SeoLandingConfig[] = [
  CLIENT_MANAGEMENT,
  CRM_FOR_FREELANCERS,
  PROJECT_MANAGEMENT_CRM,
  BUSINESS_MANAGEMENT,
]

export const SEO_LANDING_BY_PATH: Record<string, SeoLandingConfig> = Object.fromEntries(
  SEO_LANDING_CONFIGS.map((c) => [c.path, c])
)
