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
          <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)] sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-200">
              Welcome Back
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
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

              <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-blue-700">
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