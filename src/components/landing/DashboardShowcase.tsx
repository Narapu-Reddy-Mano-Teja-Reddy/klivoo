'use client'

import Image from 'next/image'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  // sidebar
  Home,
  Target,
  Users,
  FolderKanban,
  Repeat,
  TrendingUp,
  Calendar,
  CheckSquare,
  FileSignature,
  UserCog,
  CreditCard,
  Bell,
  Settings,
  ChevronsUpDown,
  // chrome
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  // content
  Trophy,
  Percent,
  TrendingDown,
  Wallet,
  DollarSign,
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Plus,
  MessageSquare,
  MousePointer2,
  type LucideIcon,
} from 'lucide-react'

/* ────────────────────────────────────────────────────────────────────────────
   DashboardShowcase — a pixel-faithful, *interactive* replica of the real
   CLIV∞ dashboard, framed like a real browser window (the app open at
   app.clivoo.co.in/dashboard).

   Unlike a screenshot, this is alive: the inner panel scrolls, the charts are
   real SVG that respond to the cursor, and hovering any tile pops a tooltip
   that explains what that part of the product does — so the very first thing a
   visitor sees is the product teaching itself.

   Everything here is presentational. Values mirror the founder's live
   dashboard for the above-the-fold cards; the sections below the fold use clean
   demo figures so the scroll reveal reads well.
   ──────────────────────────────────────────────────────────────────────────── */

// ── Tooltip system ───────────────────────────────────────────────────────────
// A single floating tooltip, rendered as a child of the (un-clipped) showcase
// root so it can escape the inner scroll container without being cut off.

type TipRow = { label: string; value: string; color?: string }
type TipData = {
  variant: 'explain' | 'data'
  title: string
  text?: string
  rows?: TipRow[]
}
type TipState = TipData & { x: number; y: number; place: 'top' | 'bottom' }

interface TipApi {
  /** Anchor the tooltip to a point in viewport coords — the tooltip follows
      the cursor, so every hover surface passes the live pointer position. */
  showAt: (clientX: number, clientY: number, data: TipData) => void
  hide: () => void
}

const TipContext = createContext<TipApi | null>(null)
const useTip = () => useContext(TipContext)

// ── Static data ──────────────────────────────────────────────────────────────

const NAV: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'Leads', icon: Target },
  { label: 'Clients', icon: Users },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Retainers', icon: Repeat },
  { label: 'Payments', icon: TrendingUp },
  { label: 'Meetings', icon: Calendar },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Documents', icon: FileSignature },
  { label: 'Team', icon: UserCog },
  { label: 'Billing', icon: CreditCard },
]

const FOOTER_NAV: { label: string; icon: LucideIcon }[] = [
  { label: 'Activity', icon: Bell },
  { label: 'Settings', icon: Settings },
]

const PIPELINE_METRICS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Target, label: 'Open', value: '61' },
  { icon: TrendingUp, label: 'Pipeline', value: '$223' },
  { icon: Trophy, label: 'Won / mo', value: '1' },
  { icon: Percent, label: 'Win rate', value: '100%' },
]

const MONTH_CARDS: {
  label: string
  value: string
  sub: string
  hint?: string
  icon: LucideIcon
  accent: 'stone' | 'red' | 'emerald'
  highlight?: boolean
  valueClass?: string
  tip: string
}[] = [
  {
    label: 'Revenue',
    value: '$5,634.21',
    sub: '7 new projects',
    hint: 'Sum of new project budgets this month',
    icon: TrendingUp,
    accent: 'stone',
    tip: 'Booked revenue — the total budget of every project you started this month.',
  },
  {
    label: 'Received',
    value: '$2,046.1',
    sub: 'Payments collected this month',
    icon: DollarSign,
    accent: 'stone',
    tip: 'Actual cash collected. Log part-payments and CLIV∞ tracks the running total for you.',
  },
  {
    label: 'Expenses',
    value: '$400',
    sub: 'Team payouts & tools',
    icon: TrendingDown,
    accent: 'red',
    valueClass: 'text-red-600',
    tip: 'Everything going out — team payouts, subscriptions and tools — in one place.',
  },
  {
    label: 'Money in account',
    value: '$1,043.1',
    sub: 'Received minus expenses',
    icon: Wallet,
    accent: 'emerald',
    highlight: true,
    tip: 'Your real cash position: everything received minus everything spent. No spreadsheet needed.',
  },
]

const PIPELINE_CARDS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: AlertCircle, label: 'New projects', value: '5' },
  { icon: Briefcase, label: 'Ongoing', value: '2' },
  { icon: CheckCircle, label: 'Completed', value: '0' },
  { icon: TrendingUp, label: 'Total projects', value: '7' },
  { icon: Users, label: 'Total clients', value: '8' },
]

// Revenue-by-type split (payments received to date). Mostly freelance, matching
// the live donut.
const REVENUE_SPLIT = { freelance: 895, retainer: 151 }

// Below-the-fold all-time overview — clean demo figures.
const ALLTIME = {
  total: 84200,
  received: 61340,
  pending: 22860,
  expenses: 9420,
  inAccount: 51920,
}

// 6-month trend (received vs pending, per month).
const TREND: { m: string; paid: number; pending: number }[] = [
  { m: 'Feb', paid: 6200, pending: 2100 },
  { m: 'Mar', paid: 7800, pending: 1600 },
  { m: 'Apr', paid: 5400, pending: 3000 },
  { m: 'May', paid: 9100, pending: 2400 },
  { m: 'Jun', paid: 8300, pending: 1900 },
  { m: 'Jul', paid: 10600, pending: 2800 },
]

const REMINDERS: { title: string; client: string; when: string }[] = [
  { title: 'Kickoff call', client: 'Acme Co.', when: 'in 2 hours' },
  { title: 'Design review', client: 'Nova Studio', when: 'Tomorrow, 11:00 AM' },
]

const CLIENTS: { name: string; phone: string; ago: string }[] = [
  { name: 'Acme Co.', phone: '+91 98765 43210', ago: '2h ago' },
  { name: 'Nova Studio', phone: '+91 91234 56780', ago: '1d ago' },
  { name: 'Pixel Labs', phone: '+91 99887 71122', ago: '3d ago' },
  { name: 'Bright Media', phone: '+91 90011 22334', ago: '5d ago' },
]

const COLORS = {
  paid: '#10b981', // emerald-500
  pending: '#f59e0b', // amber-500
  retainer: '#f97316', // orange-500
  freelance: '#3b82f6', // blue-500
}

const money = (n: number) => '$' + n.toLocaleString('en-US')

// ── Root component ───────────────────────────────────────────────────────────

export function DashboardShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={rootRef} className="relative">
      {/* State lives in the provider, not here, and the frame is passed as
          stable `children` — so a cursor move (which fires setState on every
          pixel) only re-renders the floating tooltip, never the whole dashboard
          tree. */}
      <TipProvider rootRef={rootRef}>
        <ShowcaseFrame />
      </TipProvider>
    </div>
  )
}

function TipProvider({
  rootRef,
  children,
}: {
  rootRef: React.RefObject<HTMLDivElement>
  children: ReactNode
}) {
  const [tip, setTip] = useState<TipState | null>(null)
  const [visible, setVisible] = useState(false)

  const showAt = useCallback(
    (clientX: number, clientY: number, data: TipData) => {
      const root = rootRef.current
      if (!root) return
      const rr = root.getBoundingClientRect()
      const x = clientX - rr.left
      const y = clientY - rr.top
      // Above the cursor by default; flip below when near the frame's top edge
      // so it never rides up over the browser chrome.
      const place: 'top' | 'bottom' = y > 140 ? 'top' : 'bottom'
      setTip({ ...data, x, y, place })
      setVisible(true)
    },
    [rootRef]
  )

  const hide = useCallback(() => setVisible(false), [])

  const api = useMemo<TipApi>(() => ({ showAt, hide }), [showAt, hide])

  return (
    <TipContext.Provider value={api}>
      {children}
      <FloatingTip tip={tip} visible={visible} />
    </TipContext.Provider>
  )
}

function ShowcaseFrame() {
  const tip = useTip()
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-lift-4 ring-1 ring-black/[0.03]">
      <BrowserChrome />

      <div className="flex bg-[#FAFAF8]">
        <ShowcaseSidebar />

        {/* Scrollable app viewport. `data-lenis-prevent` hands wheel/touch
            back to the browser so this panel scrolls natively inside the
            site's Lenis smooth-scroll; overscroll-contain keeps the scroll
            from chaining out awkwardly at the edges. */}
        <div
          data-lenis-prevent
          onScroll={() => {
            if (!scrolled) setScrolled(true)
            tip?.hide()
          }}
          className="relative h-[540px] flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300/80 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5 sm:h-[600px] lg:h-[636px]"
        >
          <DashboardContent />
        </div>
      </div>

      {/* Bottom fade + scroll affordance, layered over the viewport. */}
      <BottomFade show={!scrolled} />

      {/* The app's live "Feedback" pill, bottom-right — a real detail from
          the product, purely decorative here. */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 hidden items-center gap-1.5 rounded-full bg-blue-500 px-3.5 py-2 text-xs font-semibold text-white shadow-ember sm:inline-flex">
        <MessageSquare className="h-3.5 w-3.5" />
        Feedback
      </div>
    </div>
  )
}

// ── Browser chrome ───────────────────────────────────────────────────────────

function BrowserChrome() {
  return (
    <div className="flex items-center gap-3 border-b border-stone-200/70 bg-gradient-to-b from-stone-50 to-stone-100/70 px-4 py-3">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="ml-1 hidden items-center gap-1 text-stone-300 sm:flex">
        <ArrowLeft className="h-4 w-4" />
        <ArrowRight className="h-4 w-4" />
        <RotateCw className="ml-0.5 h-[13px] w-[13px] text-stone-400" />
      </div>

      {/* URL bar */}
      <div className="flex h-7 flex-1 items-center gap-2 rounded-full border border-stone-200/80 bg-white px-3 text-[11px] font-medium text-stone-500 shadow-sm">
        <Lock className="h-3 w-3 flex-none text-emerald-500" />
        <span className="truncate">
          app.clivoo.co.in<span className="text-stone-400">/dashboard</span>
        </span>
      </div>
    </div>
  )
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

function ShowcaseSidebar() {
  return (
    <aside className="hidden w-52 flex-none flex-col border-r border-stone-200/70 bg-white md:flex lg:w-56">
      {/* Logo */}
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="CLIV∞"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="text-[17px] font-bold tracking-tight text-ink">CLIV∞</span>
        </div>
      </div>

      {/* Org switcher */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-stone-200/70 bg-stone-50 px-2.5 py-2">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-stone-800 to-stone-950 text-sm font-bold text-white">
            W
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">Webcros</p>
            <span className="mt-0.5 inline-flex rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-medium text-violet-700">
              Owner
            </span>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 flex-none text-stone-400" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-hidden px-3">
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <div
                  className={`relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium ${
                    item.active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-stone-600'
                  }`}
                >
                  {item.active && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                  )}
                  <Icon
                    className={`h-[18px] w-[18px] ${item.active ? 'text-blue-600' : 'text-stone-400'}`}
                  />
                  <span>{item.label}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer nav */}
      <div className="space-y-0.5 border-t border-stone-200/70 p-3">
        {FOOTER_NAV.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-stone-600"
          >
            <Icon className="h-[18px] w-[18px] text-stone-400" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}

// ── Dashboard content (the scrollable body) ──────────────────────────────────

function DashboardContent() {
  return (
    <div className="min-h-full">
      {/* Greeting */}
      <header className="px-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Welcome back, Rajesh
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>
          <p className="hidden text-[13px] font-medium text-stone-400 sm:block">Saturday, Jul 18</p>
        </div>
      </header>

      <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
        <SalesPipeline />
        <ThisMonth />
        <PipelineClients />
        <RetainersAndRevenue />
        <AllTimeOverview />
        <RevenueTrend />
        <RemindersAndClients />
        <QuickActions />
      </div>
    </div>
  )
}

// A section eyebrow label — matches the app's uppercase micro-heads.
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
      {children}
    </h3>
  )
}

function SalesPipeline() {
  const tip = useTip()
  return (
    <section
      onMouseMove={(e) =>
        tip?.showAt(e.clientX, e.clientY, {
          variant: 'explain',
          title: 'Sales Pipeline',
          text: 'A built-in CRM — track every lead from first contact to won deal, with live conversion stats.',
        })
      }
      onMouseLeave={() => tip?.hide()}
      className="rounded-2xl border border-stone-200/70 bg-white p-4 shadow-soft transition-shadow duration-200 hover:shadow-soft-md sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <Target className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-[15px] font-semibold tracking-tight text-ink">Sales Pipeline</h4>
        </div>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-blue-600">
          View
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {PIPELINE_METRICS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-stone-50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-stone-400">
              <Icon className="h-4 w-4" />
              <span className="text-[11px]">{label}</span>
            </div>
            <p className="truncate text-lg font-semibold tabular-nums text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-stone-100 pt-3">
        <p className="mb-2 text-[11px] font-medium text-stone-400">Leads by source</p>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
            Other
            <span className="tabular-nums opacity-70">62</span>
          </span>
        </div>
      </div>
    </section>
  )
}

function ThisMonth() {
  const tip = useTip()
  const toneMap = {
    stone: 'bg-stone-100 text-stone-500',
    red: 'bg-red-50 text-red-500',
    emerald: 'bg-emerald-100 text-emerald-600',
  } as const
  return (
    <section>
      <Eyebrow>This month</Eyebrow>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {MONTH_CARDS.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              onMouseMove={(e) =>
                tip?.showAt(e.clientX, e.clientY, {
                  variant: 'explain',
                  title: c.label,
                  text: c.tip,
                })
              }
              onMouseLeave={() => tip?.hide()}
              className={`rounded-2xl border p-3.5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-md sm:p-4 ${
                c.highlight
                  ? 'border-emerald-200/70 bg-emerald-50/50 ring-1 ring-emerald-100'
                  : 'border-stone-200/70 bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneMap[c.accent]}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={`text-xs font-medium ${
                    c.highlight ? 'font-semibold text-emerald-800' : 'text-ink-muted'
                  }`}
                >
                  {c.label}
                </span>
              </div>
              <p
                className={`mt-3 text-xl font-bold tabular-nums sm:text-2xl ${
                  c.highlight ? 'text-emerald-700' : c.valueClass || 'text-ink'
                }`}
              >
                {c.value}
              </p>
              <p
                className={`mt-1 text-[11px] ${
                  c.highlight ? 'text-emerald-600/80' : 'text-stone-400'
                }`}
              >
                {c.sub}
              </p>
              {c.hint && <p className="mt-0.5 text-[10px] italic text-stone-400">{c.hint}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function PipelineClients() {
  return (
    <section>
      <Eyebrow>Pipeline &amp; clients</Eyebrow>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3">
        {PIPELINE_CARDS.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-stone-200/70 bg-white p-3.5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-md"
          >
            <div className="flex items-center gap-1.5 text-stone-400">
              <Icon className="h-4 w-4 flex-none" />
              <span className="truncate text-[11px] font-medium">{label}</span>
            </div>
            <p className="mt-2 text-xl font-semibold tabular-nums text-ink sm:text-2xl">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function RetainersAndRevenue() {
  const tip = useTip()
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {/* Active retainers */}
      <div
        onMouseMove={(e) =>
          tip?.showAt(e.clientX, e.clientY, {
            variant: 'explain',
            title: 'Retainers & MRR',
            text: 'Recurring revenue on autopilot — track monthly retainers and see your MRR at a glance.',
          })
        }
        onMouseLeave={() => tip?.hide()}
        className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-soft transition-shadow duration-200 hover:shadow-soft-md"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-ink-muted">Active retainers</p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-ink">2</p>
            <p className="mt-1 text-[13px] text-stone-400">MRR $151/mo</p>
          </div>
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue-50 text-blue-500">
            <Repeat className="h-5 w-5" />
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-blue-600">
          View retainers
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {/* Revenue by type — donut */}
      <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-soft">
        <h4 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <Repeat className="h-5 w-5 text-blue-500" />
          Revenue by type
        </h4>
        <p className="mt-0.5 text-[11px] text-stone-400">Payments received to date</p>
        <div className="mt-4">
          <RevenueDonut />
        </div>
      </div>
    </div>
  )
}

function AllTimeOverview() {
  const paidPct = Math.round((ALLTIME.received / ALLTIME.total) * 100)
  const pendingPct = Math.round((ALLTIME.pending / ALLTIME.total) * 100)
  return (
    <section>
      <Eyebrow>All-time revenue overview</Eyebrow>
      <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-soft">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          <div className="w-40 flex-none">
            <PaymentGauge pct={paidPct} />
            <p className="mt-1 text-center text-[11px] text-stone-400">of total value collected</p>
          </div>

          <div className="w-full flex-1 space-y-4">
            <OverviewRow
              label="Total project value"
              value={money(ALLTIME.total)}
              pct={100}
              bar="bg-stone-300"
              tipTitle="Total project value"
              tipText="Every rupee you have ever booked across all projects."
            />
            <OverviewRow
              label="Amount received"
              value={money(ALLTIME.received)}
              pct={paidPct}
              bar="bg-emerald-500"
              valueClass="text-emerald-600"
              tipTitle="Amount received"
              tipText="Cash actually collected to date — the green line you want climbing."
            />
            <OverviewRow
              label="Pending amount"
              value={money(ALLTIME.pending)}
              pct={pendingPct}
              bar="bg-amber-400"
              valueClass="text-amber-600"
              tipTitle="Pending amount"
              tipText="Invoiced but not yet paid — chase these with a click from Payments."
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[11px] text-stone-400">Total expenses</p>
            <p className="text-lg font-semibold tabular-nums text-red-600">
              {money(ALLTIME.expenses)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-stone-400">Money in account</p>
            <p className="text-lg font-semibold tabular-nums text-emerald-700">
              {money(ALLTIME.inAccount)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function OverviewRow({
  label,
  value,
  pct,
  bar,
  valueClass = 'text-ink',
  tipTitle,
  tipText,
}: {
  label: string
  value: string
  pct: number
  bar: string
  valueClass?: string
  tipTitle: string
  tipText: string
}) {
  const tip = useTip()
  return (
    <div
      onMouseMove={(e) =>
        tip?.showAt(e.clientX, e.clientY, { variant: 'explain', title: tipTitle, text: tipText })
      }
      onMouseLeave={() => tip?.hide()}
      className="cursor-default"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-muted">{label}</span>
        <span className={`text-[15px] font-semibold tabular-nums ${valueClass}`}>{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${bar}`}
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  )
}

function RevenueTrend() {
  return (
    <section>
      <div className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-soft">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <Calendar className="h-5 w-5 text-blue-500" />
              6-month revenue trend
            </h4>
            <p className="mt-0.5 text-[11px] text-stone-400">Received vs pending, per month</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS.paid }} />
              Received
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS.pending }} />
              Pending
            </span>
          </div>
        </div>
        <TrendArea />
      </div>
    </section>
  )
}

function RemindersAndClients() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {/* Upcoming reminders */}
      <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3.5">
          <h4 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <Clock className="h-5 w-5 text-blue-500" />
            Upcoming reminders
          </h4>
          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-blue-600">
            View all
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <ul className="p-3">
          {REMINDERS.map((r) => (
            <li
              key={r.title}
              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-stone-50"
            >
              <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-blue-500" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{r.title}</p>
                <p className="text-[11px] text-ink-muted">{r.client}</p>
                <p className="mt-0.5 text-[11px] text-stone-400">{r.when}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent clients */}
      <div className="overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3.5">
          <h4 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <Users className="h-5 w-5 text-blue-500" />
            Recent clients
          </h4>
          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-blue-600">
            View all
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <ul className="p-3">
          {CLIENTS.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-2 rounded-xl p-3 transition-colors hover:bg-stone-50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  {c.name[0]}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">{c.name}</p>
                  <p className="truncate text-[11px] text-stone-400">{c.phone}</p>
                </div>
              </div>
              <p className="flex-none text-[11px] text-stone-400">{c.ago}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { icon: Plus, title: 'Add client', desc: 'Create a new client profile', tone: 'bg-blue-600' },
    {
      icon: Calendar,
      title: 'Schedule meeting',
      desc: 'Plan your next client meeting',
      tone: 'bg-stone-900',
    },
  ]
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {actions.map(({ icon: Icon, title, desc, tone }) => (
        <div
          key={title}
          className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-md"
        >
          <span
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl text-white ${tone}`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h4 className="text-[15px] font-semibold text-ink">{title}</h4>
            <p className="text-[13px] text-ink-muted">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Charts (pure SVG, cursor-reactive) ───────────────────────────────────────

function RevenueDonut() {
  const tip = useTip()
  const [active, setActive] = useState<'freelance' | 'retainer' | null>(null)
  const total = REVENUE_SPLIT.freelance + REVENUE_SPLIT.retainer

  const slices = [
    { key: 'freelance' as const, label: 'Freelance', value: REVENUE_SPLIT.freelance, color: COLORS.freelance },
    { key: 'retainer' as const, label: 'Retainer', value: REVENUE_SPLIT.retainer, color: COLORS.retainer },
  ]

  // Geometry: r=36, gaps between slices via a small dash gap.
  const r = 36
  const C = 2 * Math.PI * r
  let offsetAcc = 0

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[150px] w-[150px] flex-none">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          {/* track */}
          <circle cx="50" cy="50" r={r} fill="none" stroke="#f0efed" strokeWidth="15" />
          {slices.map((s) => {
            const frac = s.value / total
            const len = frac * C
            const gap = 3
            const dash = `${Math.max(0, len - gap)} ${C - Math.max(0, len - gap)}`
            const dashoffset = -offsetAcc
            offsetAcc += len
            const isActive = active === s.key
            return (
              <circle
                key={s.key}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={isActive ? 18 : 15}
                strokeDasharray={dash}
                strokeDashoffset={dashoffset}
                strokeLinecap="butt"
                className="cursor-pointer transition-[stroke-width,opacity] duration-200"
                style={{ opacity: active && !isActive ? 0.4 : 1 }}
                onMouseEnter={(e) => {
                  setActive(s.key)
                  const pct = Math.round(frac * 100)
                  tip?.showAt(e.clientX, e.clientY, {
                    variant: 'data',
                    title: s.label,
                    rows: [{ label: `${pct}% of received`, value: money(s.value), color: s.color }],
                  })
                }}
                onMouseMove={(e) => {
                  const pct = Math.round(frac * 100)
                  tip?.showAt(e.clientX, e.clientY, {
                    variant: 'data',
                    title: s.label,
                    rows: [{ label: `${pct}% of received`, value: money(s.value), color: s.color }],
                  })
                }}
                onMouseLeave={() => {
                  setActive(null)
                  tip?.hide()
                }}
              />
            )
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-medium uppercase tracking-wide text-stone-400">
            Received
          </span>
          <span className="text-lg font-bold tabular-nums text-ink">{money(total)}</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        {slices.map((s) => {
          const pct = Math.round((s.value / total) * 100)
          return (
            <div
              key={s.key}
              onMouseEnter={() => setActive(s.key)}
              onMouseLeave={() => setActive(null)}
              className="cursor-default"
            >
              <div className="mb-1 flex items-center gap-2 text-[13px]">
                <span
                  className="h-2.5 w-2.5 flex-none rounded-full"
                  style={{ background: s.color }}
                />
                <span className="text-ink-muted">{s.label}</span>
                <span className="ml-auto font-semibold tabular-nums text-ink">{money(s.value)}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: s.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PaymentGauge({ pct }: { pct: number }) {
  const tip = useTip()
  const r = 40
  const C = 2 * Math.PI * r
  const dash = (pct / 100) * C
  return (
    <div
      className="relative mx-auto h-[150px] w-[150px]"
      onMouseEnter={(e) =>
        tip?.showAt(e.clientX, e.clientY, {
          variant: 'data',
          title: 'Collected to date',
          rows: [
            { label: 'Received', value: money(ALLTIME.received), color: COLORS.paid },
            { label: 'of total', value: money(ALLTIME.total) },
          ],
        })
      }
      onMouseMove={(e) =>
        tip?.showAt(e.clientX, e.clientY, {
          variant: 'data',
          title: 'Collected to date',
          rows: [
            { label: 'Received', value: money(ALLTIME.received), color: COLORS.paid },
            { label: 'of total', value: money(ALLTIME.total) },
          ],
        })
      }
      onMouseLeave={() => tip?.hide()}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#f0efed" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={COLORS.paid}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C - dash}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums text-ink">{pct}%</span>
        <span className="text-[11px] font-medium text-stone-400">collected</span>
      </div>
    </div>
  )
}

function TrendArea() {
  const tip = useTip()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const n = TREND.length
  const W = 300
  const H = 180
  const padX = 10
  const padTop = 12
  const padBottom = 16
  const plotW = W - padX * 2
  const plotH = H - padTop - padBottom
  const yMax = 14000

  const xAt = (i: number) => padX + (i / (n - 1)) * plotW
  const yAt = (v: number) => padTop + plotH - (v / yMax) * plotH

  const paidPts = TREND.map((d, i) => [xAt(i), yAt(d.paid)] as const)
  const totalPts = TREND.map((d, i) => [xAt(i), yAt(d.paid + d.pending)] as const)

  const line = (pts: readonly (readonly [number, number])[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')

  const paidArea = `${line(paidPts)} L${xAt(n - 1)},${padTop + plotH} L${xAt(0)},${padTop + plotH} Z`
  const pendingArea = `${line(totalPts)} ${paidPts
    .slice()
    .reverse()
    .map((p) => `L${p[0]},${p[1]}`)
    .join(' ')} Z`

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const frac = (e.clientX - rect.left) / rect.width
    let idx = Math.round(frac * (n - 1))
    idx = Math.max(0, Math.min(n - 1, idx))
    setActive(idx)
    const d = TREND[idx]
    // Tooltip follows the cursor horizontally; the cursor line + dots snap to
    // the nearest month column.
    tip?.showAt(e.clientX, rect.top + 6, {
      variant: 'data',
      title: `${d.m} 2026`,
      rows: [
        { label: 'Received', value: money(d.paid), color: COLORS.paid },
        { label: 'Pending', value: money(d.pending), color: COLORS.pending },
        { label: 'Total', value: money(d.paid + d.pending) },
      ],
    })
  }

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative h-[180px] w-full cursor-crosshair"
        onMouseMove={onMove}
        onMouseLeave={() => {
          setActive(null)
          tip?.hide()
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="showcaseFillPaid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.paid} stopOpacity={0.28} />
              <stop offset="100%" stopColor={COLORS.paid} stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="showcaseFillPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.pending} stopOpacity={0.28} />
              <stop offset="100%" stopColor={COLORS.pending} stopOpacity={0.04} />
            </linearGradient>
          </defs>

          {/* horizontal gridlines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1={padX}
              x2={W - padX}
              y1={padTop + plotH * g}
              y2={padTop + plotH * g}
              stroke="#f0efed"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={pendingArea} fill="url(#showcaseFillPending)" />
          <path d={paidArea} fill="url(#showcaseFillPaid)" />
          <path
            d={line(totalPts)}
            fill="none"
            stroke={COLORS.pending}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          <path
            d={line(paidPts)}
            fill="none"
            stroke={COLORS.paid}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </svg>

        {/* Cursor line + dots (HTML overlay, so they never distort) */}
        {active !== null && (
          <>
            <span
              className="pointer-events-none absolute top-0 bottom-0 w-px bg-stone-300"
              style={{ left: `${(xAt(active) / W) * 100}%` }}
            />
            {[
              { y: yAt(TREND[active].paid), color: COLORS.paid },
              { y: yAt(TREND[active].paid + TREND[active].pending), color: COLORS.pending },
            ].map((dot, i) => (
              <span
                key={i}
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
                style={{
                  left: `${(xAt(active) / W) * 100}%`,
                  top: `${(dot.y / H) * 100}%`,
                  background: dot.color,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* x-axis month labels */}
      <div className="mt-1.5 flex justify-between px-1 text-[10px] font-medium text-stone-400">
        {TREND.map((d) => (
          <span key={d.m}>{d.m}</span>
        ))}
      </div>
    </div>
  )
}

// ── Floating tooltip renderer ────────────────────────────────────────────────

function FloatingTip({ tip, visible }: { tip: TipState | null; visible: boolean }) {
  if (!tip) return null
  const isTop = tip.place === 'top'
  const scale = visible ? 1 : 0.94
  const transform = `translate(-50%, ${isTop ? 'calc(-100% - 10px)' : '10px'}) scale(${scale})`

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-40"
      style={{ left: tip.x, top: tip.y }}
    >
      <div
        className="origin-center transition-all duration-150 ease-out"
        style={{ transform, opacity: visible ? 1 : 0 }}
      >
        {tip.variant === 'explain' ? (
          <div className="relative w-max max-w-[240px] rounded-xl bg-espresso px-3.5 py-2.5 text-left shadow-lift-3 ring-1 ring-white/10">
            <div className="flex items-center gap-1.5">
              <MousePointer2 className="h-3 w-3 flex-none text-blue-400" />
              <p className="text-[12px] font-bold text-espresso-text">{tip.title}</p>
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-espresso-muted">{tip.text}</p>
            <TipArrow isTop={isTop} tone="dark" />
          </div>
        ) : (
          <div className="relative w-max rounded-xl border border-stone-200/80 bg-white px-3 py-2 shadow-lift-3">
            <p className="mb-1 text-[12px] font-semibold text-ink">{tip.title}</p>
            <div className="space-y-0.5">
              {tip.rows?.map((r) => (
                <div key={r.label} className="flex items-center gap-2 text-[11.5px]">
                  {r.color && (
                    <span
                      className="h-2 w-2 flex-none rounded-full"
                      style={{ background: r.color }}
                    />
                  )}
                  <span className="text-ink-muted">{r.label}</span>
                  <span className="ml-auto pl-3 font-medium tabular-nums text-ink">{r.value}</span>
                </div>
              ))}
            </div>
            <TipArrow isTop={isTop} tone="light" />
          </div>
        )}
      </div>
    </div>
  )
}

// Small diamond pointer, matched to the bubble's fill. Sits half-outside the
// bubble edge nearest the anchor.
function TipArrow({ isTop, tone }: { isTop: boolean; tone: 'dark' | 'light' }) {
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 ${
        tone === 'dark' ? 'bg-espresso' : 'border-b border-r border-stone-200/80 bg-white'
      } ${isTop ? 'bottom-[-4px]' : 'top-[-4px]'}`}
    />
  )
}

// ── Scroll affordance ────────────────────────────────────────────────────────

function BottomFade({ show }: { show: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-24 items-end justify-center bg-gradient-to-t from-white via-white/70 to-transparent transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="mb-4 inline-flex animate-float items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-stone-500 shadow-soft-md backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        Scroll to explore the live dashboard
      </span>
    </div>
  )
}
