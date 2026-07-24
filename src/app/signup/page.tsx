import Link from 'next/link'

const companySizes = ['1', '2-10', '11-50', '51-200', '201-500', '500+']
const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Singapore', 'Other']

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_50%,_#f8fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Back to home
          </Link>
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600">
            Sign in
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)] sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-200">
              # Try Clivoo for Free
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
              Launch your client workflow without the friction.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Create your trial account and start using Clivoo for onboarding, projects,
              invoicing, and client collaboration.
            </p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950"># Try Clivoo for Free</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill in your details below to create your account.
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">First name</span>
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="text" name="firstName" required />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Last name</span>
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="text" name="lastName" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Job title</span>
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="text" name="jobTitle" required />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Company</span>
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="text" name="company" required />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Company size</span>
                  <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" name="companySize" defaultValue="" required>
                    <option value="" disabled>
                      Select company size
                    </option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size} employees
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Country/region</span>
                  <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" name="countryRegion" defaultValue="" required>
                    <option value="" disabled>
                      Select country/region
                    </option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Email</span>
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="email" name="email" required />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-slate-700">Phone</span>
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="tel" name="phone" required />
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="text-sm font-semibold text-slate-700">Password</span>
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400" type="password" name="password" required />
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <input className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" type="checkbox" required />
                <span>
                  I agree to the{' '}
                  <a className="font-semibold text-blue-600 underline underline-offset-2" href="https://www.salesforce.com/company/legal/sfdc-main-services-agreement/" target="_blank" rel="noreferrer">
                    Main Services Agreement
                  </a>{' '}
                  and the{' '}
                  <a className="font-semibold text-blue-600 underline underline-offset-2" href="https://slack.com/terms-of-service/user" target="_blank" rel="noreferrer">
                    Slack User Terms of Service
                  </a>
                  .
                  <span className="mt-3 block text-slate-500">
                    Your free trial may be provisioned on or migrated to Shaivika,Clivoo&apos;s public cloud infrastructure.
                  </span>
                  <span className="mt-3 block text-slate-500">
                    Salesforce may establish general practices and limits concerning use of the Clivoo Starter service, including, without limitation, the maximum number of combined Leads and Contacts, which is limited to 2,000 leads and/or contacts and 10 emails per day for the Salesforce Starter Trial Edition.
                  </span>
                  <span className="mt-3 block text-slate-500">
                    We value your privacy. To learn more, visit our{' '}
                    <a className="font-semibold text-blue-600 underline underline-offset-2" href="https://www.salesforce.com/company/privacy/" target="_blank" rel="noreferrer">
                      Privacy Statement
                    </a>
                    .
                  </span>
                </span>
              </label>

              <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-blue-700">
                Try for Free
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
