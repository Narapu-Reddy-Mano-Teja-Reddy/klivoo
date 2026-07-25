import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_52%,_#f8fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Back to home
          </Link>
          <Link href="/signup" className="text-sm font-semibold text-slate-600 hover:text-blue-600">
            Try for Free
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(147,197,253,0.95),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,207,232,0.88),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(253,230,138,0.9),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(253,186,116,0.86),_transparent_24%),linear-gradient(135deg,_#60a5fa_0%,_#f472b6_34%,_#facc15_68%,_#fb923c_100%)] p-8 text-slate-950 shadow-[0_30px_80px_-40px_rgba(251,146,60,0.45)] sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-200">
              Welcome Back
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Sign in to Clivoo and continue where you left off.
            </h1>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Sign in</h2>
            <form className="mt-6 space-y-4">
              <label className="space-y-2 block">
                <span className="text-sm font-semibold text-slate-700">User name</span>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="text" name="username" required />
              </label>

              <label className="space-y-2 block">
                <span className="text-sm font-semibold text-slate-700">Password</span>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="password" name="password" required />
              </label>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <label className="flex items-center gap-2">
                  <input className="h-4 w-4 rounded border-slate-300 text-blue-600" type="checkbox" name="rememberMe" />
                  <span>Remember me</span>
                </label>
                <a className="font-semibold text-blue-600 hover:text-blue-700" href="mailto:hello@talaganarajesh.in?subject=Clivoo%20password%20reset">
                  Forgot Your Password?
                </a>
              </div>

              <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(90deg,_#2563eb_0%,_#db2777_34%,_#f59e0b_70%,_#fb923c_100%)] px-5 py-4 text-sm font-extrabold text-white transition hover:brightness-105">
                Sign in
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <span>Not a customer?</span>
              <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                Try for Free
              </Link>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Use Custom Domain
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}