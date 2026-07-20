import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Home } from 'lucide-react'
import { SiteHeader } from '@/components/marketing/SiteHeader'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#FAFAF8] font-sans text-gray-900 antialiased">
      <SiteHeader />

      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Big 404 */}
        <p className="font-display text-8xl font-extrabold tracking-tight text-stone-100 sm:text-[10rem]">
          404
        </p>

        <div className="-mt-6 sm:-mt-10">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            The page you&apos;re looking for doesn&apos;t exist or was moved.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-95"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-soft transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
          >
            Explore features
          </Link>
        </div>
      </main>
    </div>
  )
}
