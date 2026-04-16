'use client'

import Link from 'next/link'
import EnvironmentBanner from '../components/common/EnvironmentBanner'

const featureCards = [
  {
    title: 'Fast POS flow',
    copy:
      'Process sales with a clean cart, quick member lookup, and a checkout experience staff can learn fast.',
  },
  {
    title: 'Club-safe tenant separation',
    copy:
      'Each club stays scoped to its own members, products, and transactions so operations remain isolated.',
  },
  {
    title: 'Compliance-ready admin tools',
    copy:
      'Manage FICA, stock, refunds, and reporting from a system designed for regulated cannabis clubs.',
  },
  {
    title: 'Production diagnostics',
    copy:
      'Support teams can quickly see auth, tenant, and environment state when something needs attention.',
  },
]

const productPillars = [
  'POS',
  'Members',
  'Inventory',
  'Transactions',
  'Compliance',
  'Diagnostics',
]

const rolloutCards = [
  {
    title: 'Pilot',
    price: 'Fast setup',
    copy: 'For one club that wants a modern operational system with clean onboarding and support.',
  },
  {
    title: 'Growth',
    price: 'Multi-club ready',
    copy: 'For operators expanding into more locations while keeping tenant data and reporting separate.',
  },
  {
    title: 'Enterprise',
    price: 'Custom delivery',
    copy: 'For larger networks needing advanced controls, commercial onboarding, and rollout support.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07111a] text-white">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-10px) }
        }
        @keyframes drift {
          0%, 100% { transform: translate3d(0,0,0) scale(1) }
          33% { transform: translate3d(20px,-16px,0) scale(1.04) }
          66% { transform: translate3d(-10px,14px,0) scale(0.98) }
        }
      `}</style>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(26,122,74,0.34),transparent_32%),radial-gradient(circle_at_top_right,rgba(83,58,253,0.20),transparent_34%),linear-gradient(180deg,#07111a_0%,#0a1722_52%,#f6f8f5_52%,#f7faf8_100%)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-[-80px] top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
            style={{ animation: 'drift 18s ease-in-out infinite' }}
          />
          <div
            className="absolute right-[-60px] top-8 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
            style={{ animation: 'drift 22s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
            style={{ animation: 'drift 26s ease-in-out infinite' }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-8">
          <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-slate-950/65 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-6">
            <header className="flex flex-col gap-4 border-b border-white/10 px-2 pb-4 text-white lg:flex-row lg:items-center lg:justify-between lg:px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20">
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
                <Link href="#pricing" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
                  Rollout
                </Link>
                <Link href="#contact" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 font-medium text-emerald-200 transition hover:bg-emerald-400/20"
                >
                  Admin login
                </Link>
              </nav>
            </header>

            <div className="grid gap-10 px-2 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-4 lg:py-10">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Built for compliant cannabis club operations
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl lg:leading-[0.94]">
                  A premium club OS for cannabis retail in South Africa.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  CannaBuy brings point-of-sale, member management, inventory control, transactions, and
                  compliance into one polished workflow designed for regulated clubs. It looks modern,
                  feels fast, and keeps every club tenant-scoped.
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
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Request a demo
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

              <div className="relative">
                <div className="absolute -inset-6 rounded-[32px] bg-emerald-400/10 blur-2xl" />
                <div
                  className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,31,0.96),rgba(5,10,18,0.98))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
                  style={{ animation: 'float 8s ease-in-out infinite' }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-slate-300">
                    <span className="font-semibold text-white">Live club workspace</span>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      Active club: CannaClub Gauteng
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        POS queue
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          ['Durban Poison', '3.5g · R200'],
                          ['OG Kush', '3.5g · R210'],
                          ['CBD Oil 30ml', '1 unit · R200'],
                        ].map(([name, price]) => (
                          <div key={name} className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-950/70 px-3 py-3 text-sm">
                            <div>
                              <div className="font-medium text-white">{name}</div>
                              <div className="text-slate-400">Ready for checkout</div>
                            </div>
                            <div className="font-semibold text-emerald-300">{price}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Today
                        </div>
                        <div className="mt-3 text-3xl font-semibold text-white">R 48,220</div>
                        <div className="mt-1 text-sm text-slate-400">Revenue · 24 transactions</div>
                      </div>
                      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                          Support status
                        </div>
                        <div className="mt-3 text-lg font-semibold text-white">Diagnostics ready</div>
                        <div className="mt-1 text-sm text-emerald-100/80">
                          Supabase auth, tenant scope, and environment checks in one place.
                        </div>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 font-mono text-[12px] leading-6 text-emerald-200">
                        <div>$ club: secure</div>
                        <div>$ role: super_admin</div>
                        <div>$ inventory: live</div>
                        <div>$ compliance: on</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-3 px-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 lg:px-4">
            {productPillars.map((pill) => (
              <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                {pill}
              </span>
            ))}
          </section>
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Platform overview
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              Everything the club needs, without the noise.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The goal is a serious operational system: clear hierarchy, fast actions, compliance-first
              structure, and a brand that looks ready for real customers.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
              >
                <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_30px_100px_rgba(2,6,23,0.28)] lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Feature set
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Match the feel of a modern SaaS product, but for cannabis operations.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
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
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-base font-semibold text-white">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] lg:p-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Rollout options
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              Packages that feel commercially real.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              This is the section that makes the product feel sellable: clear tiers, clear outcomes, and a
              path to pilot or enterprise rollout.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {rolloutCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  {card.title}
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-950">{card.price}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="rounded-[32px] border border-emerald-500/20 bg-[linear-gradient(180deg,rgba(10,20,31,0.98),rgba(5,10,18,0.96))] p-6 text-white shadow-[0_35px_110px_rgba(0,0,0,0.35)] lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Next step
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Ready for admin login, testing, and production rollout.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-300">
                This homepage is designed to make the product look real, credible, and commercially ready.
                Use it as the public face of CannaBuy while the app handles the operational work.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Sign in
              </Link>
              <Link
                href="/admin/diagnostics"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open diagnostics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
