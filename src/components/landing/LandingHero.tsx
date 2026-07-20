'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { APP_URL } from '@/lib/site'
import { SpotlightButton } from '@/components/landing/SpotlightButton'
import { Reveal } from '@/components/landing/Reveal'
import { ComputerDashboard } from '@/components/landing/ComputerDashboard'
import { HeroBackgroundAnimation } from '@/components/landing/HeroBackgroundAnimation'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 bg-white">
      {/* Interactive Background Grid & Particle Animation */}
      <HeroBackgroundAnimation />

      {/* Background radial blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(14,145,232,0.12),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
              <span>Built by Tenspick Labs</span>
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              <span className="text-blue-600/90 font-normal">Next-Gen Client OS</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-6xl md:text-7xl leading-[1.1]">
              The Infinite Client Operations Platform for{' '}
              <span className="text-gradient-brand">Freelancers &amp; Agencies</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Replace fragmented tools with one seamless workspace. Manage leads, deliver projects, issue GST invoices, and get paid faster — without the chaos.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SpotlightButton
                href={`${APP_URL}/signup`}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold shadow-ember"
                dropClassName="h-12 w-12"
              >
                Start Operating Free
                <ArrowRight className="h-4 w-4" />
              </SpotlightButton>
              <a
                href="#demo-showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-7 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
              >
                Explore Live Platform
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-500" /> No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-500" /> Free forever tier
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-500" /> 5-minute setup
              </span>
            </div>
          </Reveal>
        </div>

        {/* Animated 3D Computer Screen Workspace Dashboard */}
        <Reveal delay={500} className="mt-14">
          <div id="demo-showcase">
            <ComputerDashboard />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
