import Link from 'next/link'
import EnvironmentBanner from '../components/common/EnvironmentBanner'

const coreFeatures = [
  {
    title: 'Point of sale that feels fast',
    description:
      'Open a cart, find members, add products, take payment, and complete sales without fighting the interface.',
  },
  {
    title: 'Tenant-scoped inventory',
    description:
      'Every stock action stays inside the active club, with reorder visibility and clear stock movement history.',
  },
  {
    title: 'Member and compliance workflows',
    description:
      'Manage FICA status, membership tiers, and club records with a structure built for regulated operations.',
  },
  {
    title: 'Reports your team can use',
    description:
      'Track sales, stock, and membership activity with a commercial admin experience instead of demo-only dashboards.',
  },
]

const operatingBenefits = [
  'Multi-club tenant separation',
  'Supabase auth + RLS ready',
  'Demo fallback for local development',
  'Commercial brand and admin experience',
  'South Africa-first cannabis club workflows',
  'Diagnostics for production support',
]

const steps = [
  {
    number: '01',
    title: 'Login securely',
    copy: 'Sign in with a real account linked to the correct club and role.',
  },
  {
    number: '02',
    title: 'Operate the club',
    copy: 'Use POS, members, inventory, and compliance tools from one clean workspace.',
  },
  {
    number: '03',
    title: 'Scale confidently',
    copy: 'Add more clubs, more staff, and stronger reporting without changing the core platform.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(26,122,74,0.24),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(8,15,30,0.72),_transparent_40%),linear-gradient(180deg,#07111a_0%,#091722_42%,#f6f8f5_42%,#f7faf8_100%)] text-slate-950">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl lg:p-6">
          <header className="flex flex-col gap-4 border-b border-white/10 px-2 pb-4 text-white lg:flex-row lg:items-center lg:justify-between lg:px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <img
                  src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                  alt="CannaBuy"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[0.24em] text-emerald-300 uppercase">
                  CannaBuy
                </div>
                <div className="text-sm text-slate-300">Cannabis club POS for South Africa</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
              <Link href="#platform" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
                Platform
              </Link>
              <Link href="#features" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
                Features
              </Link>
              <Link href="#workflow" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
                Workflow
              </Link>
              <Link href="/login" className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 font-medium text-emerald-200 transition hover:bg-emerald-400/20">
                Admin login
              </Link>
            </nav>
          </header>

          <div className="px-2 py-6 lg:px-4 lg:py-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Built for compliant cannabis club operations
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl lg:leading-[0.96]">
                A premium club OS for cannabis retail in South Africa.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                CannaBuy brings point-of-sale, member management, stock control, and compliance into one
                polished workflow designed for regulated clubs. It is fast for staff, safe for tenants,
                and built to scale.
              </p>

              <EnvironmentBanner />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
                >
                  Open admin login
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View dashboard
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ['Multi-club', 'tenant safe'],
                  ['Supabase', 'RLS enabled'],
                  ['VAT-ready', 'transaction flow'],
                  ['Support', 'diagnostics page'],
                ].map(([top, bottom]) => (
                  <div key={top} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="text-lg font-semibold text-white">{top}</div>
                    <div className="mt-1 text-sm text-slate-300">{bottom}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section id="platform" className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 lg:p-8">
            <div className="max-w-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Platform overview
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Everything your club needs, without the noise.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The goal is not to feel like a generic POS. It should feel like a serious operational
                system: clear hierarchy, fast actions, compliance-first structure, and a brand that looks
                ready for real customers.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {coreFeatures.map((feature) => (
                <article key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-emerald-500/20 bg-[linear-gradient(180deg,rgba(12,22,32,0.98),rgba(7,17,26,0.95))] p-6 text-white shadow-2xl shadow-emerald-950/25 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                  Commercial readiness
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  Built to look premium from day one.
                </h3>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-200">
                South Africa
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {operatingBenefits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
                <span>Demo / live mode</span>
                <span>Support ready</span>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950 p-4 font-mono text-[12px] leading-6 text-emerald-200">
                <div>$ club: CannaClub Gauteng</div>
                <div>$ auth: super_admin</div>
                <div>$ stock: tenant scoped</div>
                <div>$ compliance: enabled</div>
              </div>
            </div>
          </aside>
        </section>

        <section id="features" className="mx-auto mt-10 max-w-6xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Feature set
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                Match the feel of a modern SaaS product, but for cannabis operations.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The UI should be sharp, trustworthy, and simple enough for floor staff while still giving
                operators the control they need.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Fast POS flow', 'Keep the cashier path short and obvious with cart, member, and payment actions upfront.'],
                ['Club administration', 'Manage clubs, settings, and staff with a clean admin shell.'],
                ['Inventory visibility', 'See low stock, product status, and stock movements without leaving the workflow.'],
                ['Transactions and refunds', 'Keep sale history and post-sale actions visible for compliance and support.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-base font-semibold text-slate-950">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mx-auto mt-10 max-w-6xl">
          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/25 lg:p-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Workflow
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Simple, guided, and made for real staff.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                A good landing page should promise a product that feels easy to trust. These three steps
                describe the experience from login to day-to-day operations.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {steps.map((step) => (
                <article key={step.number} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    {step.number}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl rounded-[28px] border border-emerald-500/20 bg-emerald-50 p-6 shadow-xl shadow-emerald-100/60 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-800">
                Next step
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                Ready for admin login, testing, and production rollout.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                This homepage is designed to make the product look real, credible, and commercially ready.
                Use it as the public face of CannaBuy while the app handles the operational work.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in
              </Link>
              <Link
                href="/admin/diagnostics"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Open diagnostics
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
