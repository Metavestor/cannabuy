'use client'

import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    title: 'Point of Sale',
    description: 'Fast, reliable checkout built for cannabis clubs. Member lookup, cart management, and payment processing in one streamlined interface.',
  },
  {
    title: 'Compliance Ready',
    description: 'FICA-aware records, complete transaction logs, and refund tracking designed for South African regulatory requirements.',
  },
  {
    title: 'Inventory Control',
    description: 'Real-time stock visibility with low-stock alerts, reorder management, and product catalog organization per club.',
  },
  {
    title: 'Multi-Club Architecture',
    description: 'Complete tenant isolation between locations. Staff, products, and reporting stay separate and secure.',
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'RLS', label: 'Row-Level Security' },
  { value: 'ZA', label: 'Compliance Ready' },
  { value: 'POS', label: 'Integrated Payments' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          {/* Navigation - minimal inline */}
          <nav className="flex items-center justify-between mb-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                <Image
                  src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                  alt="CannaBuy"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-medium text-slate-900 tracking-tight">CannaBuy</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Sign in
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Get started
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-slate-600">Now available for South African clubs</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1] tracking-tight mb-6">
                Point of sale built for cannabis clubs
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                CannaBuy unifies point-of-sale, member management, inventory tracking, and compliance reporting in one enterprise-grade platform designed for the South African cannabis industry.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center text-base font-medium bg-slate-900 text-white px-8 py-3.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Start free trial
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center text-base font-medium text-slate-700 bg-slate-50 px-8 py-3.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Product Preview Card */}
            <div className="relative">
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Window controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                  <div className="ml-auto text-xs font-medium text-slate-400">CannaBuy POS</div>
                </div>

                {/* Mock POS Interface */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Current Transaction</div>
                      <div className="text-2xl font-semibold text-slate-900 mt-1">R 610.00</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
                      Active
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { name: 'Durban Poison', variant: '3.5g Flower', price: 'R 200.00' },
                      { name: 'Cold Creek Kush', variant: '3.5g Flower', price: 'R 210.00' },
                      { name: 'CBD Oil Tincture', variant: '30ml', price: 'R 200.00' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div>
                          <div className="font-medium text-slate-900">{item.name}</div>
                          <div className="text-sm text-slate-500">{item.variant}</div>
                        </div>
                        <div className="font-medium text-slate-900">{item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="text-lg font-semibold text-slate-900">24</div>
                      <div className="text-xs text-slate-500 mt-0.5">Today</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="text-lg font-semibold text-slate-900">R 48k</div>
                      <div className="text-xs text-slate-500 mt-0.5">Revenue</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="text-lg font-semibold text-slate-900">6</div>
                      <div className="text-xs text-slate-500 mt-0.5">Low Stock</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 p-4 bg-white rounded-xl border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">System Status</div>
                    <div className="text-sm font-semibold text-slate-900">Operational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-light text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-light text-slate-900 tracking-tight mb-4">
              Everything you need to run your club
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Purpose-built tools for cannabis club operations, from member onboarding to end-of-day reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <h3 className="text-xl font-medium text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-900 rounded-2xl p-12 lg:p-16 text-center lg:text-left">
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-light text-white tracking-tight mb-4">
                  Ready to streamline your club operations?
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  Join South African cannabis clubs using CannaBuy to manage their business with confidence and compliance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center text-base font-medium bg-white text-slate-900 px-8 py-3.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/admin/diagnostics"
                    className="inline-flex items-center justify-center text-base font-medium text-white bg-slate-800 px-8 py-3.5 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    System status
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                  <div className="relative p-8 bg-slate-800 rounded-xl border border-slate-700">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <div className="flex-1 h-2 bg-slate-700 rounded" />
                        <div className="w-16 h-2 bg-slate-600 rounded" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div className="flex-1 h-2 bg-slate-700 rounded" />
                        <div className="w-12 h-2 bg-slate-600 rounded" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <div className="flex-1 h-2 bg-slate-700 rounded" />
                        <div className="w-20 h-2 bg-slate-600 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <Image
                  src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                  alt="CannaBuy"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-slate-900">CannaBuy</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/login" className="hover:text-slate-900 transition-colors">Sign in</Link>
              <Link href="/admin/diagnostics" className="hover:text-slate-900 transition-colors">Diagnostics</Link>
            </div>
            <div className="text-sm text-slate-400">
              For licensed South African cannabis clubs
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
