import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Heart,
  Target,
  Shield,
  Flame,
  Lightbulb,
  Hammer,
  Rocket,
  ArrowRight,
  Sparkles,
  Building2,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { PageShell } from '@/components/marketing/PageShell'
import { PageHero } from '@/components/marketing/PageHero'
import { CtaSection } from '@/components/marketing/CtaSection'
import { Reveal } from '@/components/landing/Reveal'
import { Marquee } from '@/components/landing/Marquee'
import { CountUp } from '@/components/landing/CountUp'
import { JsonLd } from '@/components/marketing/JsonLd'
import { pageMetadata, SITE_URL } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = pageMetadata({
  title: 'About CLIV∞ — Empowering Independent Excellence',
  description:
    'CLIV∞ is developed by Tenspick Labs to empower freelancers, digital consultants, and modern agencies with a calm, high-performance operating system.',
  path: '/about',
  keywords: ['about CLIV∞', 'Tenspick Labs', 'client operations software', 'freelancer operating system'],
})

const MILESTONES: { icon: LucideIcon; phase: string; title: string; desc: string }[] = [
  {
    icon: Flame,
    phase: 'Phase 01',
    title: 'Tool Fragmentation & Operational Chaos',
    desc: 'Managing clients across WhatsApp, Word templates, and spreadsheets created endless administrative drag and missed billing milestones.',
  },
  {
    icon: Lightbulb,
    phase: 'Phase 02',
    title: 'The Unified Operating Blueprint',
    desc: 'What if client records, project milestone tracking, GST invoices, and white-label portals lived inside one unified, high-speed workspace?',
  },
  {
    icon: Hammer,
    phase: 'Phase 03',
    title: 'Engineered by Tenspick Labs',
    desc: 'Crafted with extreme attention to detail, sub-100ms response times, and an intuitive UI designed specifically for modern independent creators.',
  },
  {
    icon: Rocket,
    phase: 'Phase 04',
    title: 'Empowering Thousands Globally',
    desc: 'CLIV∞ is live worldwide. Start free forever and transform your client operations in under five minutes.',
  },
]

const VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Target,
    title: 'Purpose-Built for Independents',
    desc: 'We focus exclusively on the workflows of freelancers, studios, and small agencies — avoiding bloated corporate complexity.',
  },
  {
    icon: Heart,
    title: 'Calm Efficiency & Zero Clutter',
    desc: 'Software should reduce mental fatigue, not add to it. CLIV∞ features a clean, fast interface that gets straight out of your way.',
  },
  {
    icon: Shield,
    title: 'Absolute Data Ownership',
    desc: 'Zero lock-in and complete privacy. Export your clients, invoices, and project records whenever you need them.',
  },
]

const STATS = [
  { to: 6, prefix: '', suffix: '-in-1', label: 'Unified Operating Tools' },
  { to: 0, prefix: '₹', suffix: '', label: 'Free Forever Plan' },
  { to: 5, prefix: '< ', suffix: ' min', label: 'Time to First Invoice' },
  { to: 100, prefix: '', suffix: '%', label: 'Data Sovereignty & Privacy' },
]

const AUDIENCE = [
  'Freelance Designers',
  'Software Engineers',
  'Digital Agencies',
  'UI/UX Studios',
  'Marketing Consultants',
  'Content Creators',
  'Copywriters',
  'SEO Specialists',
  'Video Editors',
  'Solo Founders',
]

function AudienceChip({ label }: { label: string }) {
  return (
    <span className="mx-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-blue-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-blue-500" />
      {label}
    </span>
  )
}

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Engineered by Tenspick Labs"
        title="Building the calmest workspace for"
        highlight="independent professionals"
        subtitle="CLIV∞ originated from a simple vision: independent creators deserve a high-performance operating system that replaces administrative drag with effortless client collaboration."
      />

      {/* Mission & Background */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Foundational Purpose
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl leading-tight">
              Running a business shouldn’t feel like juggling ten fragmented apps at once.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 text-base text-slate-600 leading-relaxed">
            <Reveal className="space-y-4">
              <p>
                Independent professionals spend up to 40% of their work week copying invoice numbers, tracking down client feedback, and chasing overdue payments.
              </p>
              <p>
                CLIV∞ brings <strong className="text-navy font-semibold">clients, leads, projects, GST invoicing, and team collaboration</strong> under one unified, high-speed canopy.
              </p>
            </Reveal>
            <Reveal delay={120} className="space-y-4">
              <p>
                Developed by <strong className="text-navy font-semibold">Tenspick Labs</strong>, CLIV∞ is continuously updated to deliver world-class security, instant page loads, and seamless user experiences.
              </p>
              <p className="border-l-2 border-blue-500 pl-4 text-slate-800 font-medium italic">
                “One calm workspace. Every piece of your business synchronized.”
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Development Journey Timeline */}
      <section className="relative py-16 sm:py-24 bg-slate-50/60 border-y border-slate-200/60">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              The Blueprint
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              From Frustration to Operational Freedom
            </h2>
          </Reveal>

          <ol className="relative mt-12 space-y-8">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon
              return (
                <Reveal key={m.phase} delay={i * 100} className="relative flex gap-6 items-start">
                  <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {m.phase}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-navy">{m.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Tenspick Labs Highlight Section */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center">
          <Reveal>
            <Image
              src="/clivoo logo.png"
              alt="CLIV∞ logo"
              width={400}
              height={100}
              className="h-20 sm:h-28 w-auto mb-6 mx-auto"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span>Built by Tenspick Labs</span>
            </div>
            <h2 className="mt-6 font-display text-2xl sm:text-3xl font-extrabold text-navy">
              Crafted with Excellence by Tenspick Labs
            </h2>
            <blockquote className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              At Tenspick Labs, we build specialized software solutions that empower independent creators and agencies to operate with corporate-grade precision.
            </blockquote>
            <div className="mt-6">
              <a
                href="https://www.tenspick.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors text-sm"
              >
                <Globe className="h-4 w-4" />
                Learn more at www.tenspick.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stat Band */}
      <section className="relative border-y border-slate-200/80 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="border-slate-200/80 px-4 py-8 text-center border-r last:border-r-0"
            >
              <div className="font-display text-4xl font-extrabold text-blue-600">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Target Audience Marquee */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Who We Serve
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Designed for High-Performing Freelancers &amp; Teams
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 space-y-4">
          <Marquee speed={40}>
            {AUDIENCE.map((label) => (
              <AudienceChip key={label} label={label} />
            ))}
          </Marquee>
        </div>
      </section>

      <CtaSection />
    </PageShell>
  )
}
