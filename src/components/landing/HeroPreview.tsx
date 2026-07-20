import { Users, Briefcase, FileText, TrendingUp, ArrowUpRight, Check } from 'lucide-react'

/**
 * Stylized in-product preview shown in the hero. Pure presentation (no real
 * data) — it gives the page a "look inside the app" moment without shipping a
 * screenshot. Built from the same design language as the real dashboard.
 */
export function HeroPreview() {
  return (
    <div className="relative">
      {/* Browser-chrome framed app window */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 ring-1 ring-black/5">
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-3 hidden h-6 flex-1 items-center rounded-md bg-white px-3 text-[11px] text-gray-400 ring-1 ring-gray-200 sm:flex">
            app.clivoo.co.in/dashboard
          </div>
        </div>

        <div className="grid grid-cols-12">
          {/* Mini sidebar */}
          <aside className="col-span-3 hidden flex-col gap-1 border-r border-gray-100 bg-white p-3 sm:flex">
            <div className="mb-2 flex items-center gap-2 px-2">
              <div className="h-6 w-6 rounded-md bg-blue-500" />
              <div className="h-2.5 w-16 rounded bg-gray-200" />
            </div>
            {['Dashboard', 'Clients', 'Projects', 'Invoices', 'Team'].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                  i === 0 ? 'bg-blue-50' : ''
                }`}
              >
                <div className={`h-3 w-3 rounded ${i === 0 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                <div
                  className={`h-2 rounded ${i === 0 ? 'w-14 bg-orange-300' : 'w-12 bg-gray-200'}`}
                />
              </div>
            ))}
          </aside>

          {/* Main panel */}
          <div className="col-span-12 space-y-4 p-4 sm:col-span-9 sm:p-5">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { icon: TrendingUp, label: 'Revenue', value: '₹2.4L', tint: 'text-emerald-600 bg-emerald-50' },
                { icon: Users, label: 'Clients', value: '18', tint: 'text-blue-600 bg-blue-50' },
                { icon: Briefcase, label: 'Projects', value: '24', tint: 'text-blue-600 bg-blue-50' },
                { icon: FileText, label: 'Invoices', value: '9', tint: 'text-violet-600 bg-violet-50' },
              ].map(({ icon: Icon, label, value, tint }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-white p-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${tint}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-2 font-display text-lg font-bold text-gray-900">{value}</div>
                  <div className="text-[11px] text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            {/* Chart + list */}
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-5 rounded-xl border border-gray-100 bg-white p-4 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <div className="h-2.5 w-24 rounded bg-gray-200" />
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" /> +18%
                  </div>
                </div>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {[40, 58, 35, 72, 50, 88, 64, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-blue-200 to-blue-500"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-5 space-y-2.5 rounded-xl border border-gray-100 bg-white p-4 lg:col-span-2">
                <div className="mb-1 h-2.5 w-20 rounded bg-gray-200" />
                {['Acme Co.', 'Nova Studio', 'Pixel Labs'].map((name) => (
                  <div key={name} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
                      {name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold text-gray-700">{name}</div>
                      <div className="h-1.5 w-10 rounded bg-gray-100" />
                    </div>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent cards */}
      <div className="absolute -left-4 top-24 hidden animate-float rounded-xl border border-gray-100 bg-white p-3 shadow-xl sm:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-900">Invoice paid</div>
            <div className="text-[10px] text-gray-400">₹45,000 · Acme Co.</div>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 bottom-16 hidden animate-float-slow rounded-xl border border-gray-100 bg-white p-3 shadow-xl sm:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-900">New project</div>
            <div className="text-[10px] text-gray-400">Website redesign</div>
          </div>
        </div>
      </div>
    </div>
  )
}
