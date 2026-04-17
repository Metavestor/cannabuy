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
    <main style={{
      minHeight: '100vh',
      background: '#020617',
      color: '#f8fafc',
      padding: '24px',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '20%',
          width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', right: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
          minHeight: 'calc(100vh - 48px)',
        }}>
          {/* Left - Branding */}
          <section>
            {/* Logo */}
            <div style={{ marginBottom: '48px' }}>
              <img
                src="/logo.png"
                alt="CannaBuy"
                style={{ width: '150px', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '9999px',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              marginBottom: '24px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{
                fontSize: '11px', fontWeight: 700, color: '#10b981',
                letterSpacing: '0.15em', textTransform: 'uppercase'
              }}>
                Built for compliant cannabis club operations
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '600px'
            }}>
              Sign in to a premium
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                club operations stack.
              </span>
            </h1>

            <p style={{
              fontSize: '18px', color: '#94a3b8', lineHeight: 1.7,
              marginBottom: '40px', maxWidth: '520px'
            }}>
              Run POS, members, inventory, transactions, and compliance
              from one secure workspace — designed for the floor, the office, and the audit trail.
            </p>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {metrics.map((m) => (
                <div key={m.label} style={{
                  padding: '16px', borderRadius: '16px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{
                    fontSize: '24px', fontWeight: 800, lineHeight: 1,
                    background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                    {m.value}
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '12px', color: '#64748b' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Proof points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {proofPoints.map((point) => (
                <div key={point} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '14px', color: '#cbd5e1'
                }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                    background: '#10b981', boxShadow: '0 0 12px rgba(16,185,129,0.5)'
                  }} />
                  {point}
                </div>
              ))}
            </div>
          </section>

          {/* Right - Sign in form */}
          <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%', maxWidth: '440px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px', padding: '40px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <div style={{
                    fontSize: '11px', fontWeight: 700, color: '#10b981',
                    letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'
                  }}>
                    Admin access
                  </div>
                  <h2 style={{
                    fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em',
                    color: '#f8fafc', margin: 0
                  }}>
                    Secure sign in
                  </h2>
                </div>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 900, color: '#020617',
                  boxShadow: '0 0 20px rgba(16,185,129,0.3)'
                }}>
                  CB
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <EnvironmentBanner compact />
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block', fontSize: '13px', color: '#94a3b8',
                    marginBottom: '8px', fontWeight: 600
                  }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@yourclub.co.za"
                    autoComplete="email"
                    style={{
                      width: '100%', padding: '14px 16px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', fontSize: '15px',
                      background: 'rgba(255,255,255,0.05)',
                      outline: 'none', color: '#f8fafc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block', fontSize: '13px', color: '#94a3b8',
                    marginBottom: '8px', fontWeight: 600
                  }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                    style={{
                      width: '100%', padding: '14px 16px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', fontSize: '15px',
                      background: 'rgba(255,255,255,0.05)',
                      outline: 'none', color: '#f8fafc',
                    }}
                  />
                </div>

                {error ? (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '12px', padding: '12px 16px',
                    fontSize: '13px', color: '#f87171', marginBottom: '20px', lineHeight: 1.5
                  }}>
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '16px',
                    background: loading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#020617', border: 'none', borderRadius: '12px',
                    fontSize: '16px', fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : '0 0 30px rgba(16,185,129,0.3)',
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign in to dashboard'}
                </button>
              </form>

              <div style={{
                marginTop: '20px', display: 'flex', justifyContent: 'space-between',
                fontSize: '13px', color: '#64748b'
              }}>
                <span>Need access configured in Supabase?</span>
                <a href="/admin/diagnostics" style={{
                  color: '#10b981', fontWeight: 600, textDecoration: 'none'
                }}>
                  Open diagnostics →
                </a>
              </div>

              <p style={{
                textAlign: 'center', fontSize: '12px', color: '#475569',
                marginTop: '24px', marginBottom: 0
              }}>
                South African Cannabis Club Management
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
