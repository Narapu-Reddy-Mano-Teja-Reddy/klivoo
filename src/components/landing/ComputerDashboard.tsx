'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  FileText,
  KanbanSquare,
  TrendingUp,
  Globe,
  Lock,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  DollarSign,
  Star,
} from 'lucide-react'

export function ComputerDashboard() {
  const [activeTab, setActiveTab] = useState<'crm' | 'invoicing' | 'projects' | 'analytics'>('crm')
  const [autoRotate, setAutoRotate] = useState(true)

  // Auto-rotate tabs every 4 seconds unless hovered/clicked
  useEffect(() => {
    if (!autoRotate) return
    const tabs: ('crm' | 'invoicing' | 'projects' | 'analytics')[] = ['crm', 'invoicing', 'projects', 'analytics']
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (tabs.indexOf(prev) + 1) % tabs.length
        return tabs[nextIdx]
      })
    }, 4500)
    return () => clearInterval(interval)
  }, [autoRotate])

  return (
    <div
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
      className="relative mx-auto max-w-5xl"
    >
      {/* Outer Computer Monitor Frame */}
      <div className="relative rounded-[2rem] border-[10px] border-slate-900 bg-slate-900 shadow-[0_25px_70px_-15px_rgba(10,22,40,0.35),0_0_40px_rgba(14,145,232,0.15)] overflow-hidden">
        {/* Monitor Webcam & Sensor Dot */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-800 border border-slate-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/80 animate-pulse" />
        </div>

        {/* Browser Top Navigation Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 pt-5">
          {/* Traffic Lights & URL Bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>kliv∞.in/workspace</span>
            </div>
          </div>

          {/* Interactive Workspace Tab Bar */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('crm')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'crm'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Users className="h-3.5 w-3.5" /> Client CRM
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('invoicing')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'invoicing'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="h-3.5 w-3.5" /> Invoicing
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <KanbanSquare className="h-3.5 w-3.5" /> Projects
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" /> Analytics
            </button>
          </div>
        </div>

        {/* Main Operating System Display Area */}
        <div className="bg-white p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
          {/* Top Running Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Live Operations Cockpit
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-extrabold">
                  ● Realtime Sync
                </span>
              </div>
              <h3 className="font-display text-xl font-extrabold text-navy">
                {activeTab === 'crm' && 'Client Relationship & Lead Records'}
                {activeTab === 'invoicing' && 'GST Invoices & Settlement Tracking'}
                {activeTab === 'projects' && 'Active Milestone Kanban Deliverables'}
                {activeTab === 'analytics' && 'Financial Performance Dashboard'}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium">Active Workspace</span>
              <div className="text-sm font-bold text-navy">Tenspick Labs Studio</div>
            </div>
          </div>

          {/* Dynamic Screen Content */}
          <div className="py-6">
            {activeTab === 'crm' && (
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Acme Corp</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                      Active Account
                    </span>
                  </div>
                  <div className="mt-3 font-bold text-slate-900 text-base">
                    Website Redesign &amp; Brand Systems
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>Value: ₹1,85,000</span>
                    <span className="font-semibold text-emerald-600">Net 15 Paid</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">NexTech Agency</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Monthly Retainer
                    </span>
                  </div>
                  <div className="mt-3 font-bold text-slate-900 text-base">
                    Design System &amp; UI Maintenance
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>Value: ₹95,000/mo</span>
                    <span className="font-semibold text-blue-600">Auto-recurring</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Pulse Labs</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                      Proposal Out
                    </span>
                  </div>
                  <div className="mt-3 font-bold text-slate-900 text-base">
                    Mobile Application Prototype
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>Value: ₹2,40,000</span>
                    <span className="font-semibold text-amber-600">Reviewing</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'invoicing' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs">
                      INV-042
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Acme Corp — Milestone #2 Handoff</div>
                      <div className="text-xs text-slate-500">18% GST (CGST ₹8,325 + SGST ₹8,325)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900">₹92,500.00</div>
                    <div className="text-xs text-emerald-600 font-bold">Settled via UPI</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs">
                      INV-043
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">NexTech Agency — Monthly Retainer</div>
                      <div className="text-xs text-slate-500">18% GST • Automated Invoice Delivery</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900">₹95,000.00</div>
                    <div className="text-xs text-amber-600 font-bold">Due in 3 Days</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                    In Progress
                  </div>
                  <div className="mt-2 font-bold text-slate-900 text-sm">
                    Design System Component Library
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Completion</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[75%] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
                    Client Review
                  </div>
                  <div className="mt-2 font-bold text-slate-900 text-sm">
                    White-Label Portal Handoff
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Completion</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[90%] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
                    Completed &amp; Signed
                  </div>
                  <div className="mt-2 font-bold text-slate-900 text-sm">
                    Brand Strategy &amp; Guidelines
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Completion</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[100%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid sm:grid-cols-3 gap-5 text-center">
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 shadow-sm">
                  <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Monthly Revenue
                  </div>
                  <div className="mt-2 text-3xl font-black text-blue-600">₹3,72,500</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    +24% vs last month
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Avg Payment Velocity
                  </div>
                  <div className="mt-2 text-3xl font-black text-slate-900">2.4 Days</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    3x faster than average
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Client Satisfaction
                  </div>
                  <div className="mt-2 text-3xl font-black text-slate-900 flex items-center justify-center gap-1">
                    <span>99.4%</span>
                    <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-500">
                    Based on 48 verified reviews
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Screen Status Bar */}
          <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              <span>Kliv∞ Operating Engine Online</span>
            </div>
            <span>Powered by Tenspick Labs</span>
          </div>
        </div>
      </div>

      {/* Monitor Stand Base */}
      <div className="mx-auto w-44 h-5 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-xl border-x border-b border-slate-800 shadow-md" />
      <div className="mx-auto w-64 h-2 bg-slate-300/60 rounded-full blur-[1px] shadow-sm" />
    </div>
  )
}
