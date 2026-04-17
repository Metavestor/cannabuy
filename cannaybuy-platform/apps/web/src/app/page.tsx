'use client'

import Link from 'next/link'

const features = [
  {
    icon: '&#128722;',
    title: 'Point of Sale',
    description: 'Intuitive POS built for cannabis clubs. Member lookup, personalized recommendations, and automated discounts that help staff fly through transactions.',
  },
  {
    icon: '&#128179;',
    title: 'Integrated Payments',
    description: 'Reliable payment processing with fast settlements. Support for card, cash, and EFT with real-time reconciliation and optional tipping.',
  },
  {
    icon: '&#128230;',
    title: 'Smart Inventory',
    description: 'AI-assisted inventory management with cycle counts, low-stock alerts, batch intake workflows, and vendor management from intake to auditing.',
  },
  {
    icon: '&#128202;',
    title: 'AI Analytics',
    description: 'Actionable insights and recommendations powered by AI. Make smarter, data-driven decisions on stock, pricing, and member engagement.',
  },
  {
    icon: '&#9851;',
    title: 'FICA Compliance',
    description: 'Automated FICA/KYC verification, complete transaction logs, and audit-ready reports designed for South African regulatory requirements.',
  },
  {
    icon: '&#127970;',
    title: 'Multi-Club',
    description: 'Manage every location from a single dashboard. Company-wide promotions, real-time reporting, and tenant-isolated data across all clubs.',
  },
  {
    icon: '&#128666;',
    title: 'Delivery Tracking',
    description: 'Real-time order tracking with member notifications. Centralized dispatch for multi-location delivery operations.',
  },
  {
    icon: '&#128241;',
    title: 'Member Apps',
    description: 'White-labeled mobile apps for members. Browse menus, track orders, earn loyalty rewards, and receive push notifications.',
  },
]

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'RLS', label: 'Row-Level Security' },
  { value: 'ZA', label: 'Compliance Ready' },
  { value: 'AI', label: 'Powered Insights' },
]

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc' }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/logo.png"
              alt="CannaBuy"
              style={{ width: '34px', height: '34px', objectFit: 'contain' }}
            />
            <span style={{
              fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #f8fafc, #94a3b8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              CannaBuy
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/login" style={{
              fontSize: '14px', fontWeight: 500, color: '#94a3b8',
              textDecoration: 'none', padding: '8px 16px', borderRadius: '8px',
              transition: 'color 0.2s'
            }}>
              Sign in
            </Link>
            <Link href="/login" style={{
              fontSize: '14px', fontWeight: 600, color: '#020617',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              padding: '8px 20px', borderRadius: '8px', textDecoration: 'none',
              boxShadow: '0 0 20px rgba(16,185,129,0.3)'
            }}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 80px' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.05) 40%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '100px', right: '-100px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
            marginBottom: '32px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#10b981' }}>
              Now available for South African clubs
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left - Text */}
            <div>
              <h1 style={{
                fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.05,
                letterSpacing: '-0.03em', marginBottom: '24px'
              }}>
                Built for the
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  Business of Cannabis
                </span>
              </h1>
              <p style={{
                fontSize: '18px', color: '#94a3b8', lineHeight: 1.7,
                marginBottom: '40px', maxWidth: '520px'
              }}>
                An AI-powered platform built specifically for South African cannabis clubs.
                Simplify compliance, streamline inventory, and provide seamless member experiences
                — so you can operate with confidence.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/login" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '16px', fontWeight: 600, color: '#020617',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  padding: '14px 32px', borderRadius: '10px', textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(16,185,129,0.3)'
                }}>
                  Start free trial
                </Link>
                <Link href="#features" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '16px', fontWeight: 500, color: '#e2e8f0',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '14px 32px', borderRadius: '10px', textDecoration: 'none'
                }}>
                  See all features
                </Link>
              </div>
            </div>

            {/* Right - POS Preview */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}>
                {/* Window bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#64748b', fontWeight: 500 }}>CannaBuy POS</span>
                </div>
                <div style={{ padding: '20px' }}>
                  {/* Transaction header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Current Transaction
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>
                        R 610.00
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 12px', borderRadius: '9999px',
                      background: 'rgba(16,185,129,0.15)', color: '#10b981',
                      fontSize: '12px', fontWeight: 600, border: '1px solid rgba(16,185,129,0.3)'
                    }}>
                      Active
                    </div>
                  </div>
                  {/* Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {[
                      { name: 'Durban Poison', variant: '3.5g Flower', price: 'R 200.00' },
                      { name: 'Cold Creek Kush', variant: '3.5g Flower', price: 'R 210.00' },
                      { name: 'CBD Oil Tincture', variant: '30ml', price: 'R 200.00' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 12px', borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{item.variant}</div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>
                  {/* Stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { value: '24', label: 'Today' },
                      { value: 'R 48k', label: 'Revenue' },
                      { value: '6', label: 'Low Stock' },
                    ].map((s, i) => (
                      <div key={i} style={{
                        padding: '10px', borderRadius: '8px', textAlign: 'center',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>{s.value}</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: '-20px', left: '-20px',
                padding: '12px 16px', background: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'rgba(16,185,129,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '14px' }}>&#10003;</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>System Status</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>Operational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '48px 24px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px'
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '640px', margin: '0 auto 80px' }}>
            <div style={{
              display: 'inline-block', fontSize: '12px', fontWeight: 700,
              color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.15em',
              marginBottom: '16px'
            }}>
              Features
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: '-0.02em', marginBottom: '16px'
            }}>
              Everything you need to
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                run your club
              </span>
            </h2>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7 }}>
              Powerful, intelligent tools built specifically for cannabis club operations.
              From member onboarding to end-of-day reporting.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                padding: '28px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', marginBottom: '20px'
                }} dangerouslySetInnerHTML={{ __html: f.icon }} />
                <h3 style={{
                  fontSize: '16px', fontWeight: 700, color: '#f8fafc',
                  marginBottom: '8px', letterSpacing: '-0.01em'
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products showcase */}
      <section style={{
        padding: '120px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.01)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '640px', margin: '0 auto 80px' }}>
            <div style={{
              display: 'inline-block', fontSize: '12px', fontWeight: 700,
              color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.15em',
              marginBottom: '16px'
            }}>
              Product Suite
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: '-0.02em', marginBottom: '16px'
            }}>
              A complete platform for
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                cannabis operations
              </span>
            </h2>
            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7 }}>
              POS, payments, inventory, compliance, delivery, and analytics
              in one unified platform.
            </p>
          </div>

          {/* Product cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              {
                title: 'Point-of-Sale',
                items: ['Member lookup & profiles', 'Automated discounts & promos', 'Staff performance tracking', 'Offline mode support'],
              },
              {
                title: 'Smart Inventory',
                items: ['AI stock recommendations', 'Batch intake workflows', 'Vendor management', 'Low-stock alerts & reorders'],
              },
              {
                title: 'Compliance',
                items: ['FICA/KYC verification', 'Transaction audit logs', 'VAT reporting', 'Export-ready reports'],
              },
            ].map((product, i) => (
              <div key={i} style={{
                padding: '32px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <h3 style={{
                  fontSize: '20px', fontWeight: 700, color: '#f8fafc',
                  marginBottom: '20px', letterSpacing: '-0.01em'
                }}>
                  {product.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#10b981', fontSize: '14px' }}>&#10003;</span>
                      <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            position: 'relative', borderRadius: '24px', padding: '80px 48px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05))',
            border: '1px solid rgba(16,185,129,0.2)', overflow: 'hidden', textAlign: 'center'
          }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
              width: '600px', height: '400px',
              background: 'radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative' }}>
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800,
                letterSpacing: '-0.02em', marginBottom: '16px'
              }}>
                Ready to streamline your
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  club operations?
                </span>
              </h2>
              <p style={{
                fontSize: '18px', color: '#94a3b8', lineHeight: 1.7,
                maxWidth: '560px', margin: '0 auto 40px'
              }}>
                Join South African cannabis clubs using CannaBuy to manage
                their business with confidence and compliance.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/login" style={{
                  fontSize: '16px', fontWeight: 600, color: '#020617',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  padding: '16px 40px', borderRadius: '10px', textDecoration: 'none',
                  boxShadow: '0 0 40px rgba(16,185,129,0.4)'
                }}>
                  Get started free
                </Link>
                <Link href="/admin/diagnostics" style={{
                  fontSize: '16px', fontWeight: 500, color: '#e2e8f0',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '16px 40px', borderRadius: '10px', textDecoration: 'none'
                }}>
                  System status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 0'
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/logo.png"
              alt="CannaBuy"
              style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>CannaBuy</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/login" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
            <Link href="/admin/diagnostics" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Diagnostics</Link>
          </div>
          <div style={{ fontSize: '13px', color: '#475569' }}>
            For licensed South African cannabis clubs
          </div>
        </div>
      </footer>
    </main>
  )
}
