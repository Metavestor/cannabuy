'use client'

import Link from 'next/link'

const features = [
  {
    icon: '⚡',
    title: 'Fast POS',
    copy: 'Cashier-first checkout with member lookup, cart actions, and payment close at hand.',
  },
  {
    icon: '🧾',
    title: 'Compliance',
    copy: 'FICA-aware records, refund history, and transaction logs for regulated club operations.',
  },
  {
    icon: '📦',
    title: 'Inventory',
    copy: 'Live stock visibility and reorder cues scoped to the active club.',
  },
  {
    icon: '🏢',
    title: 'Multi-club',
    copy: 'Each club stays isolated so staff, products, and reporting do not bleed across tenants.',
  },
]

const stats = [
  { value: '99.9%', label: 'uptime focus' },
  { value: 'RLS', label: 'security model' },
  { value: '1', label: 'club scope' },
  { value: 'VAT', label: 'ready flows' },
]

const rollout = [
  {
    title: 'Pilot club',
    copy: 'Launch with one location and validate the workflow fast.',
  },
  {
    title: 'Growth',
    copy: 'Expand across clubs while keeping tenant data separate.',
  },
  {
    title: 'Enterprise',
    copy: 'Roll out with onboarding, diagnostics, and support.',
  },
]

const showEnvWarning = Boolean(
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
)

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at 18% 12%, rgba(34,197,94,0.25), transparent 24%), radial-gradient(circle at 82% 16%, rgba(99,102,241,0.2), transparent 24%), linear-gradient(180deg, #050910 0%, #07111a 55%, #f6f8f5 55%, #f8faf8 100%)',
    color: '#fff',
  },
  shell: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '24px 24px 104px',
  },
  card: {
    borderRadius: '32px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(4, 8, 15, 0.72)',
    boxShadow: '0 40px 120px rgba(0,0,0,0.42)',
    backdropFilter: 'blur(20px)',
  },
  pill: {
    borderRadius: '999px',
    padding: '10px 18px',
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600,
  } as const,
}

export default function HomePage() {
  return (
    <main style={styles.page}>
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', left: '-80px', top: '24px', width: '280px', height: '280px', borderRadius: '999px', background: 'rgba(34,197,94,0.18)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', right: '-50px', top: '12px', width: '320px', height: '320px', borderRadius: '999px', background: 'rgba(99,102,241,0.16)', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', bottom: '-120px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '240px', borderRadius: '999px', background: 'rgba(34,197,94,0.08)', filter: 'blur(80px)' }} />
        </div>

        <div style={styles.shell}>
          <div style={styles.card}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: 52, height: 52, borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.25)' }}>
                  <img
                    src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                    alt="CannaBuy"
                    style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: '0.24em', fontWeight: 700, color: '#86efac', textTransform: 'uppercase' }}>CannaBuy</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Cannabis club POS for South Africa</div>
                </div>
              </div>

              <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
                <Link href="#product" style={styles.pill}>Product</Link>
                <Link href="#features" style={styles.pill}>Features</Link>
                <Link href="#rollout" style={styles.pill}>Rollout</Link>
                <Link href="#contact" style={styles.pill}>Contact</Link>
                <Link
                  href="/login"
                  style={{
                    ...styles.pill,
                    border: '1px solid rgba(52,211,153,0.38)',
                    background: 'rgba(52,211,153,0.12)',
                    color: '#d1fae5',
                  }}
                >
                  Admin login
                </Link>
              </nav>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.04fr 0.96fr', gap: 28, alignItems: 'center', padding: '32px 24px 28px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 999, border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.1)', padding: '10px 16px', fontSize: 12, letterSpacing: '0.26em', fontWeight: 700, color: '#bbf7d0', textTransform: 'uppercase' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#86efac', display: 'inline-block' }} />
                  Built for compliant cannabis club operations
                </div>

                <h1 style={{ marginTop: 24, maxWidth: 700, fontSize: 74, lineHeight: 0.92, letterSpacing: '-0.06em', marginBottom: 0, color: '#fff', fontWeight: 700 }}>
                  Premium club software for South African cannabis retail.
                </h1>

                <p style={{ marginTop: 20, maxWidth: 640, fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.74)' }}>
                  CannaBuy unifies point-of-sale, members, inventory, transactions, and compliance in one polished operating system that feels fast on the floor and credible in the boardroom.
                </p>

                {showEnvWarning ? (
                  <div style={{ marginTop: 18, borderRadius: 18, border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.1)', color: '#fde68a', padding: '14px 16px', fontSize: 13, lineHeight: 1.5 }}>
                    <strong style={{ display: 'block', marginBottom: 4 }}>Production config missing</strong>
                    Supabase env vars aren’t set for this deployment yet. The app will stay in demo mode until <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>NEXT_PUBLIC_SUPABASE_URL</code> and one browser key are configured.
                  </div>
                ) : null}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                  <Link
                    href="/login"
                    style={{
                      borderRadius: 999,
                      padding: '14px 22px',
                      background: 'linear-gradient(135deg, #34d399, #86efac)',
                      color: '#052e16',
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 700,
                      boxShadow: '0 18px 40px rgba(52,211,153,0.25)',
                    }}
                  >
                    Open admin login
                  </Link>
                  <Link
                    href="#contact"
                    style={{
                      borderRadius: 999,
                      padding: '14px 22px',
                      border: '1px solid rgba(255,255,255,0.16)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Request a demo
                  </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginTop: 28 }}>
                  {stats.map((stat) => (
                    <div key={stat.label} style={{ borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 16 }}>
                      <div style={{ fontSize: 26, lineHeight: 1, fontWeight: 700, color: '#fff' }}>{stat.value}</div>
                      <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.68)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -20, borderRadius: 34, background: 'rgba(52,211,153,0.12)', filter: 'blur(24px)' }} />
                <div style={{ position: 'relative', borderRadius: 34, border: '1px solid rgba(255,255,255,0.12)', background: 'linear-gradient(180deg, rgba(9,17,26,0.98), rgba(5,10,18,1))', padding: 18, boxShadow: '0 40px 120px rgba(0,0,0,0.45)', animation: 'floaty 8s ease-in-out infinite' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <div style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>Live club workspace</div>
                      <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700, color: '#fff' }}>CannaClub Gauteng</div>
                    </div>
                    <div style={{ borderRadius: 999, border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.1)', padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#bbf7d0' }}>Live</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '0.72fr 1.28fr', gap: 14, marginTop: 14 }}>
                    <div style={{ borderRadius: 28, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>POS</div>
                          <div style={{ marginTop: 5, fontSize: 18, fontWeight: 700 }}>Ready for checkout</div>
                        </div>
                        <div style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Live</div>
                      </div>

                      <div style={{ display: 'grid', gap: 10 }}>
                        {[
                          ['Durban Poison', '3.5g', 'R200'],
                          ['OG Kush', '3.5g', 'R210'],
                          ['CBD Oil 30ml', '1 unit', 'R200'],
                        ].map(([name, size, price]) => (
                          <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3,7,13,0.65)', padding: '12px 14px', fontSize: 13 }}>
                            <div>
                              <div style={{ color: '#fff', fontWeight: 600 }}>{name}</div>
                              <div style={{ color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{size}</div>
                            </div>
                            <div style={{ color: '#86efac', fontWeight: 700 }}>{price}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: 14 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                        {[
                          ['R 48,220', 'Revenue today'],
                          ['24', 'Transactions'],
                          ['6', 'Low stock items'],
                        ].map(([value, label]) => (
                          <div key={label} style={{ borderRadius: 22, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 14 }}>
                            <div style={{ color: '#fff', fontSize: 24, fontWeight: 700, lineHeight: 1 }}>{value}</div>
                            <div style={{ color: 'rgba(255,255,255,0.65)', marginTop: 6, fontSize: 12 }}>{label}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderRadius: 28, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <div>
                            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>Checkout lane</div>
                            <div style={{ marginTop: 5, fontSize: 18, fontWeight: 700 }}>Ready for payment</div>
                          </div>
                          <div style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Live</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12, marginTop: 14 }}>
                          <div style={{ display: 'grid', gap: 10 }}>
                            {[
                              ['Durban Poison', '3.5g', 'R200'],
                              ['OG Kush', '3.5g', 'R210'],
                              ['CBD Oil 30ml', '1 unit', 'R200'],
                            ].map(([name, size, price]) => (
                              <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3,7,13,0.65)', padding: '12px 14px', fontSize: 13 }}>
                                <div>
                                  <div style={{ color: '#fff', fontWeight: 600 }}>{name}</div>
                                  <div style={{ color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{size}</div>
                                </div>
                                <div style={{ color: '#86efac', fontWeight: 700 }}>{price}</div>
                              </div>
                            ))}
                          </div>

                          <div style={{ display: 'grid', gap: 10 }}>
                            <div style={{ borderRadius: 18, border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.1)', padding: 14 }}>
                              <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bbf7d0', fontWeight: 700 }}>Support</div>
                              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#fff' }}>Diagnostics ready</div>
                            </div>
                            <div style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3,7,13,0.8)', padding: 14 }}>
                              <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>Activity</div>
                              <div style={{ marginTop: 16, display: 'flex', alignItems: 'end', gap: 6, height: 72 }}>
                                {[18, 28, 22, 34, 26, 38, 30, 42].map((h, i) => (
                                  <div key={i} style={{ flex: 1, height: h, borderRadius: '8px 8px 0 0', background: 'linear-gradient(180deg, #34d399, #86efac)' }} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginTop: 24 }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.68)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" style={{ padding: '24px 24px 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ color: '#86efac', fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Product showcase</div>
          <h2 style={{ marginTop: 10, color: '#fff', fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 700, marginBottom: 0 }}>
            A real club workspace, not a brochure.
          </h2>
          <p style={{ marginTop: 14, maxWidth: 740, color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.7 }}>
            The home page should show the product itself so the brand feels like a system operators can trust.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14 }}>
          {features.map((feature) => (
            <article key={feature.title} style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 20, boxShadow: '0 20px 50px rgba(0,0,0,0.16)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'rgba(52,211,153,0.1)', fontSize: 20 }}>{feature.icon}</div>
              <h3 style={{ marginTop: 16, color: '#fff', fontSize: 19, lineHeight: 1.2 }}>{feature.title}</h3>
              <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="rollout" style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 24px 24px' }}>
        <div style={{ borderRadius: 30, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(4,8,15,0.68)', padding: 24, boxShadow: '0 30px 100px rgba(0,0,0,0.3)' }}>
          <div style={{ color: '#bbf7d0', fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Rollout options</div>
          <h2 style={{ marginTop: 10, color: '#fff', fontSize: 42, lineHeight: 1.05, marginBottom: 0, maxWidth: 700 }}>
            Packages that feel commercially real.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, marginTop: 18 }}>
            {rollout.map((card) => (
              <div key={card.title} style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 20 }}>
                <div style={{ color: '#86efac', fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{card.title}</div>
                <p style={{ marginTop: 10, color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.6 }}>{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 24px 28px' }}>
        <div style={{ borderRadius: 30, border: '1px solid rgba(52,211,153,0.2)', background: 'linear-gradient(180deg, rgba(10,20,31,0.98), rgba(5,10,18,0.96))', padding: 24, boxShadow: '0 35px 110px rgba(0,0,0,0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 720 }}>
              <div style={{ color: '#86efac', fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Next step</div>
              <h2 style={{ marginTop: 10, marginBottom: 0, color: '#fff', fontSize: 42, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
                Ready for admin login, testing, and production rollout.
              </h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link
                href="/login"
                style={{
                  borderRadius: 999,
                  padding: '14px 22px',
                  background: 'linear-gradient(135deg, #34d399, #86efac)',
                  color: '#052e16',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Sign in
              </Link>
              <Link
                href="/admin/diagnostics"
                style={{
                  borderRadius: 999,
                  padding: '14px 22px',
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Open diagnostics
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-8px) }
        }
      `}</style>
    </main>
  )
}
