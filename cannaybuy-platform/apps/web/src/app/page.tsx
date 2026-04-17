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
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Gradient accent */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: 0, left: '33%', width: '384px', height: '384px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(147,51,234,0.05))',
            borderRadius: '50%', filter: 'blur(72px)'
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '1152px', margin: '0 auto', padding: '80px 24px' }}>
          {/* Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '96px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', background: '#0f172a',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Image
                  src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                  alt="CannaBuy"
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 500, color: '#0f172a', letterSpacing: '-0.01em' }}>CannaBuy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <Link href="/login" style={{ fontSize: '14px', fontWeight: 500, color: '#475569', textDecoration: 'none' }}>
                Sign in
              </Link>
              <Link
                href="/login"
                style={{
                  fontSize: '14px', fontWeight: 500, background: '#0f172a', color: '#fff',
                  padding: '10px 20px', borderRadius: '8px', textDecoration: 'none'
                }}
              >
                Get started
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                borderRadius: '9999px', background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '32px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>Now available for South African clubs</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(48px, 5vw, 60px)', fontWeight: 300, color: '#0f172a',
                lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '24px'
              }}>
                Point of sale built for cannabis clubs
              </h1>

              <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '32px', maxWidth: '512px' }}>
                CannaBuy unifies point-of-sale, member management, inventory tracking, and compliance reporting in one enterprise-grade platform designed for the South African cannabis industry.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link
                  href="/login"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 500, background: '#0f172a', color: '#fff',
                    padding: '14px 32px', borderRadius: '8px', textDecoration: 'none'
                  }}
                >
                  Start free trial
                </Link>
                <Link
                  href="#features"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 500, color: '#334155', background: '#f8fafc',
                    padding: '14px 32px', borderRadius: '8px', border: '1px solid #e2e8f0', textDecoration: 'none'
                  }}
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Product Preview Card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative', borderRadius: '16px', background: '#fff', border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)', overflow: 'hidden'
              }}>
                {/* Window controls */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
                  borderBottom: '1px solid #f1f5f9', background: 'rgba(248,250,252,0.5)'
                }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#cbd5e1' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#cbd5e1' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#cbd5e1' }} />
                  <div style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 500, color: '#94a3b8' }}>CannaBuy POS</div>
                </div>

                {/* Mock POS Interface */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Transaction</div>
                      <div style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>R 610.00</div>
                    </div>
                    <div style={{
                      padding: '4px 12px', borderRadius: '9999px', background: '#ecfdf5', color: '#047857',
                      fontSize: '14px', fontWeight: 500, border: '1px solid #d1fae5'
                    }}>
                      Active
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {[
                      { name: 'Durban Poison', variant: '3.5g Flower', price: 'R 200.00' },
                      { name: 'Cold Creek Kush', variant: '3.5g Flower', price: 'R 210.00' },
                      { name: 'CBD Oil Tincture', variant: '30ml', price: 'R 200.00' },
                    ].map((item) => (
                      <div key={item.name} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9'
                      }}>
                        <div>
                          <div style={{ fontWeight: 500, color: '#0f172a' }}>{item.name}</div>
                          <div style={{ fontSize: '14px', color: '#64748b' }}>{item.variant}</div>
                        </div>
                        <div style={{ fontWeight: 500, color: '#0f172a' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>24</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Today</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>R 48k</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Revenue</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>6</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Low Stock</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div style={{
                position: 'absolute', bottom: '-16px', left: '-16px', padding: '16px',
                background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '8px', background: '#ecfdf5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#64748b' }}>System Status</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Operational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '30px', fontWeight: 300, color: '#0f172a', letterSpacing: '-0.01em' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '96px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '672px', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 300, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '16px' }}>
              Everything you need to run your club
            </h2>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
              Purpose-built tools for cannabis club operations, from member onboarding to end-of-day reporting.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {features.map((feature) => (
              <div
                key={feature.title}
                style={{
                  padding: '32px', background: '#fff', borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#0f172a', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.7 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '96px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ background: '#0f172a', borderRadius: '16px', padding: '64px 48px', textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '48px' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(30px, 4vw, 36px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', marginBottom: '16px' }}>
                  Ready to streamline your club operations?
                </h2>
                <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '32px' }}>
                  Join South African cannabis clubs using CannaBuy to manage their business with confidence and compliance.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <Link
                    href="/login"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: 500, background: '#fff', color: '#0f172a',
                      padding: '14px 32px', borderRadius: '8px', textDecoration: 'none'
                    }}
                  >
                    Get started
                  </Link>
                  <Link
                    href="/admin/diagnostics"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: 500, color: '#fff', background: '#1e293b',
                      padding: '14px 32px', borderRadius: '8px', textDecoration: 'none'
                    }}
                  >
                    System status
                  </Link>
                </div>
              </div>
              <div style={{ display: 'none' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))',
                    borderRadius: '50%', filter: 'blur(72px)'
                  }} />
                  <div style={{ position: 'relative', padding: '32px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                        <div style={{ flex: 1, height: '8px', background: '#334155', borderRadius: '4px' }} />
                        <div style={{ width: '64px', height: '8px', background: '#475569', borderRadius: '4px' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
                        <div style={{ flex: 1, height: '8px', background: '#334155', borderRadius: '4px' }} />
                        <div style={{ width: '48px', height: '8px', background: '#475569', borderRadius: '4px' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a855f7' }} />
                        <div style={{ flex: 1, height: '8px', background: '#334155', borderRadius: '4px' }} />
                        <div style={{ width: '80px', height: '8px', background: '#475569', borderRadius: '4px' }} />
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
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '48px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', background: '#0f172a',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Image
                  src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                  alt="CannaBuy"
                  width={18}
                  height={18}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#0f172a' }}>CannaBuy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#64748b' }}>
              <Link href="/login" style={{ textDecoration: 'none', color: '#64748b' }}>Sign in</Link>
              <Link href="/admin/diagnostics" style={{ textDecoration: 'none', color: '#64748b' }}>Diagnostics</Link>
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              For licensed South African cannabis clubs
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
