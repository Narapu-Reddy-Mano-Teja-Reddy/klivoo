import type { Metadata } from 'next'
import { SiteHeader } from '@/components/marketing/SiteHeader'
import { SiteFooter } from '@/components/marketing/SiteFooter'
import { LandingHero } from '@/components/landing/LandingHero'
import { WhyChooseUs } from '@/components/landing/WhyChooseUs'
import { ProcessTimeline } from '@/components/landing/ProcessTimeline'
import { FeatureTabs } from '@/components/landing/FeatureTabs'
import { PricingCalculator } from '@/components/landing/PricingCalculator'
import { FaqAccordion } from '@/components/landing/FaqAccordion'
import { CtaSection } from '@/components/marketing/CtaSection'
import { JsonLd } from '@/components/marketing/JsonLd'
import { pageMetadata } from '@/lib/site'
import { faqSchema } from '@/lib/structured-data'
import { HOME_FAQS } from '@/lib/faq-data'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Kliv∞ — The Infinite Client Operations Platform',
    description:
      'Kliv∞ brings clients, projects, GST invoices, payments, and team collaboration into one unified workspace. Built by Tenspick Labs. Start operating free.',
    path: '/',
    keywords: [
      'client management software',
      'freelancer CRM',
      'GST invoice generator',
      'agency management software',
      'client portal software',
      'freelance operating system',
    ],
  }),
  title: { absolute: 'Kliv∞ — The Infinite Client Operations Platform' },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500 selection:text-white">
      <JsonLd data={[faqSchema(HOME_FAQS)]} />
      
      {/* Global Glass Navigation Header */}
      <SiteHeader />

      {/* Main Page Layout Flow */}
      <main>
        {/* 1. Asymmetric Hero Section with Interactive Preview */}
        <LandingHero />

        {/* 2. Why Choose Us Value Matrix */}
        <WhyChooseUs />

        {/* 3. 4-Step Interactive Process Timeline */}
        <ProcessTimeline />

        {/* 4. Complete Operational Module Suite (Tabs) */}
        <FeatureTabs />

        {/* 5. Interactive Pricing Calculator & Cards */}
        <PricingCalculator />

        {/* 6. Expandable FAQ Accordion */}
        <FaqAccordion />

        {/* 7. Closing High-Conversion CTA */}
        <CtaSection
          title="Transform Your Client Operations Today"
          subtitle="Join thousands of independent professionals operating calmly on Kliv∞. Free forever tier, setup in 5 minutes."
          badge="Built by Tenspick Labs — Start Free"
        />
      </main>

      {/* Global Site Footer */}
      <SiteFooter />
    </div>
  )
}
