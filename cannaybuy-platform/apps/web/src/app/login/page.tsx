'use client'

import { useState, type FormEvent } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import EnvironmentBanner from '../../components/common/EnvironmentBanner'

const proofPoints = [
  'Tenant-isolated clubs and roles',
  'POS, inventory, members, and compliance in one stack',
  'Production diagnostics for fast support triage',
]

const metrics = [
  { value: 'RLS', label: 'security model' },
  { value: 'FICA', label: 'member workflow' },
  { value: 'VAT', label: 'reporting ready' },
]

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error, session } = await signIn(email.trim(), password)
      if (error) {
        setError(error.message || 'Unable to sign in')
        return
      }

      if (!session) {
        setError('Login succeeded but no session was returned.')
        return
      }

      window.location.assign('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 15% 15%, rgba(52,211,153,0.16), transparent 26%), radial-gradient(circle at 82% 20%, rgba(96,165,250,0.14), transparent 24%), linear-gradient(180deg, #050910 0%, #07111a 55%, #f6f8f5 55%, #f8faf8 100%)',
        color: '#fff',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: '24px',
            alignItems: 'stretch',
            minHeight: 'calc(100vh - 48px)',
          }}
        >
          <section
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '32px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(4, 8, 15, 0.72)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.42)',
              backdropFilter: 'blur(20px)',
              padding: '28px',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', left: '-70px', top: '24px', width: '260px', height: '260px', borderRadius: '999px', background: 'rgba(34,197,94,0.18)', filter: 'blur(60px)' }} />
              <div style={{ position: 'absolute', right: '-40px', top: '40px', width: '280px', height: '280px', borderRadius: '999px', background: 'rgba(96,165,250,0.12)', filter: 'blur(70px)' }} />
              <div style={{ position: 'absolute', bottom: '-120px', left: '50%', transform: 'translateX(-50%)', width: '760px', height: '220px', borderRadius: '999px', background: 'rgba(34,197,94,0.08)', filter: 'blur(80px)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.25)' }}>
                  <img
                    src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
                    alt="CannaBuy"
                    style={{ width: 34, height: 34, objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: '0.26em', fontWeight: 800, color: '#86efac', textTransform: 'uppercase' }}>CannaBuy</div>
                  <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.74)' }}>Cannabis club POS for South Africa</div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '64px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 999, border: '1px solid rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.1)', padding: '10px 16px', fontSize: 12, letterSpacing: '0.26em', fontWeight: 800, color: '#bbf7d0', textTransform: 'uppercase' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#86efac', display: 'inline-block' }} />
                  Built for compliant cannabis club operations
                </div>

                <h1 style={{ marginTop: 24, maxWidth: 700, fontSize: 'clamp(48px, 6vw, 74px)', lineHeight: 0.94, letterSpacing: '-0.07em', marginBottom: 0, color: '#fff', fontWeight: 700 }}>
                  Sign in to a premium club operations stack.
                </h1>

                <p style={{ marginTop: 18, maxWidth: 620, fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.74)' }}>
                  Run POS, members, inventory, transactions, and compliance from one secure workspace — designed for the floor, the office, and the audit trail.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 26 }}>
                  {metrics.map((metric) => (
                    <div key={metric.label} style={{ borderRadius: 22, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: 16 }}>
                      <div style={{ fontSize: 24, lineHeight: 1, fontWeight: 800, color: '#fff' }}>{metric.value}</div>
                      <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.66)' }}>{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 22, display: 'grid', gap: 10 }}>
                  {proofPoints.map((point) => (
                    <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3,7,13,0.65)', padding: '12px 14px', fontSize: 14, color: 'rgba(255,255,255,0.84)' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 999, background: 'linear-gradient(135deg, #34d399, #86efac)', display: 'inline-block', boxShadow: '0 0 20px rgba(52,211,153,0.35)' }} />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                borderRadius: '32px',
                border: '1px solid rgba(15,23,42,0.08)',
                background: 'rgba(255,255,255,0.92)',
                color: '#111827',
                boxShadow: '0 25px 80px rgba(15,23,42,0.12)',
                padding: '28px',
                backdropFilter: 'blur(14px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: '0.24em', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>Admin access</div>
                  <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(28px, 3vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.05em', color: '#0f172a' }}>
                    Secure sign in
                  </h2>
                </div>
                <div style={{ width: 54, height: 54, borderRadius: 18, background: 'linear-gradient(135deg, #16a34a, #86efac)', display: 'grid', placeItems: 'center', color: '#052e16', fontWeight: 900, boxShadow: '0 16px 36px rgba(22,163,74,0.24)' }}>
                  CB
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <EnvironmentBanner compact />
              </div>

              <form onSubmit={handleLogin} style={{ marginTop: '18px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#334155', marginBottom: '6px', fontWeight: 700, letterSpacing: '0.02em' }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@yourclub.co.za"
                    autoComplete="email"
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '14px',
                      fontSize: '15px',
                      background: '#f8fafc',
                      outline: 'none',
                      color: '#0f172a',
                      boxShadow: 'inset 0 1px 2px rgba(15,23,42,0.04)',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#334155', marginBottom: '6px', fontWeight: 700, letterSpacing: '0.02em' }}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                    style={{
                      width: '100%',
                      padding: '13px 14px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '14px',
                      fontSize: '15px',
                      background: '#f8fafc',
                      outline: 'none',
                      color: '#0f172a',
                      boxShadow: 'inset 0 1px 2px rgba(15,23,42,0.04)',
                    }}
                  />
                </div>

                {error ? (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', padding: '12px 14px', fontSize: '13px', color: '#b91c1c', marginBottom: '16px', lineHeight: 1.5 }}>
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: loading ? 'linear-gradient(135deg, #86efac, #bbf7d0)' : 'linear-gradient(135deg, #16a34a, #86efac)',
                    color: '#052e16',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: 800,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 18px 40px rgba(22,163,74,0.22)',
                  }}
                >
                  {loading ? 'Signing in…' : 'Sign in to dashboard'}
                </button>
              </form>

              <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 12, color: '#64748b' }}>
                <span>Need access configured in Supabase?</span>
                <a href="/admin/diagnostics" style={{ color: '#16a34a', fontWeight: 800, textDecoration: 'none' }}>
                  Open diagnostics →
                </a>
              </div>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '18px', marginBottom: 0 }}>
                South African Cannabis Club Management
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
