'use client'

import Link from 'next/link'
import EnvironmentBanner from '../components/common/EnvironmentBanner'

const stats = [
  { value: '99.9%', label: 'club uptime focus' },
  { value: '1 tenant', label: 'one club at a time' },
  { value: 'RLS', label: 'security by design' },
  { value: 'VAT', label: 'commercial receipts' },
]

const featureCards = [
  {
    title: 'Fast POS experience',
    copy:
      'A cashier-first flow with quick member lookup, simple cart actions, and a checkout panel that feels effortless.',
  },
  {
    title: 'Tenant-scoped operations',
    copy:
      'Every club stays isolated so products, members, and transactions remain safely separated across locations.',
  },
  {
    title: 'Compliance and reporting',
    copy:
      'FICA-friendly admin tools, refunds, inventory visibility, and a reporting structure designed for real operators.',
  },
  {
    title: 'Production support tools',
    copy:
      'Diagnostics, environment banners, and error boundaries make the platform easier to launch and support.',
  },
]

const rolloutCards = [
  {
    title: 'Pilot club',
    copy: 'Launch with one location, validate the workflow, and train staff on a clean operating system.',
  },
  {
    title: 'Multi-club growth',
    copy: 'Expand to more locations while keeping tenant data, product catalogs, and reporting separated.',
  },
  {
    title: 'Enterprise rollout',
    copy: 'Use a polished commercial platform with onboarding, support, and production diagnostics built in.',
  },
]

export default function HomePage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          'radial-gradient(circle at 20% 10%, rgba(26,122,74,0.36), transparent 24%), radial-gradient(circle at 80% 18%, rgba(99,102,241,0.22), transparent 26%), linear-gradient(180deg, #061018 0%, #091723 45%, #f6f8f5 45%, #f8faf8 100%)',
      }}
    >
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-[-90px] top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
            style={{ animation: 'pulse 10s ease-in-out infinite' }}
          />
          <div
            className="absolute right-[-80px] top-12 h-80 w-80 rounded-full bg-violet-500/18 blur-3xl"
            style={{ animation: 'pulse 14s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-[-140px] left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
            style={{ animation: 'pulse 18s ease-in-out infinite' }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8 lg:pb-28 lg:pt-8">
          <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-slate-950/72 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:p-6">
            <header className="flex flex-col gap-4 border-b border-white/10 px-2 pb-4 lg:flex-row lg:items-center lg:justify-between lg:px-4">
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

            <div className="grid gap-10 px-2 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-4 lg:py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Built for compliant cannabis club operations
                </div>

                <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl lg:leading-[0.92]">
                  Premium club software for South African cannabis retail.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  CannaBuy unifies point-of-sale, member management, inventory, transactions, and compliance in
                  one polished operating system. It is designed to feel fast on the floor and credible in the boardroom.
                </p>

                <EnvironmentBanner />

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
                  >
                    Open admin login
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Request a demo
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="text-2xl font-semibold text-white">{stat.value}</div>
                      <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[32px] bg-emerald-400/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,20,31,0.97),rgba(5,10,18,0.99))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-slate-300">
                    <span className="font-semibold text-white">Live club workspace</span>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      Active club: CannaClub Gauteng
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        POS queue
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          ['Durban Poison', '3.5g · R200'],
                          ['OG Kush', '3.5g · R210'],
                          ['CBD Oil 30ml', '1 unit · R200'],
                        ].map(([name, price]) => (
                          <div
                            key={name}
                            className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-950/70 px-3 py-3 text-sm"
                          >
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
                      <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Today
                        </div>
                        <div className="mt-3 text-3xl font-semibold text-white">R 48,220</div>
                        <div className="mt-1 text-sm text-slate-400">Revenue · 24 transactions</div>
                      </div>
                      <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                          Support status
                        </div>
                        <div className="mt-3 text-lg font-semibold text-white">Diagnostics ready</div>
                        <div className="mt-1 text-sm text-emerald-100/80">
                          Auth, tenant, and environment checks in one place.
                        </div>
                      </div>
                      <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4 font-mono text-[12px] leading-6 text-emerald-200">
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

          <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4 px-2 lg:px-4">
            {[
              'Multi-club tenant safe',
              'Supabase RLS enabled',
              'VAT-ready transaction flow',
              'Production diagnostics',
            ].map((pill) => (
              <div
                key={pill}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 backdrop-blur"
              >
                {pill}
              </div>
            ))}
          </div>
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
              The goal is a serious operational system: clear hierarchy, fast actions, compliance-first structure,
              and a brand that looks ready for real customers.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
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
                The UI should be sharp, trustworthy, and simple enough for floor staff while still giving operators the control they need.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Fast POS flow', 'Keep the cashier path short and obvious with cart, member, and payment actions upfront.'],
                ['Club administration', 'Manage clubs, settings, and staff with a clean admin shell.'],
                ['Inventory visibility', 'See low stock, product status, and stock movements without leaving the workflow.'],
                ['Transactions and refunds', 'Keep sale history and post-sale actions visible for compliance and support.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
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
              This section makes the product feel sellable: clear tiers, clear outcomes, and a path to pilot or enterprise rollout.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {rolloutCards.map((card) => (
              <div key={card.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  {card.title}
                </div>
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

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: translateY(0) scale(1) }
          50% { transform: translateY(-10px) scale(1.03) }
        }
      `}</style>
    </main>
  )
}
