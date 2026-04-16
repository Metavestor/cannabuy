'use client'

import { useEffect, useMemo, useState } from 'react'
import ClubLayout from '../../../components/layout/ClubLayout'
import { useAuth } from '../../../components/context/AuthContext'
import { useClub } from '../../../components/context/ClubContext'
import { hasSupabaseConfig } from '../../../lib/supabase/client'

function statusTone(ok: boolean) {
  return ok
    ? { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', label: 'OK' }
    : { bg: '#fef2f2', border: '#fecaca', text: '#b91c1c', label: 'ACTION REQUIRED' }
}

function formatValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

export default function DiagnosticsPage() {
  const { user, session, isLoading } = useAuth()
  const { activeClub, activeClubId, isDemo } = useClub()
  const [localStorageAvailable, setLocalStorageAvailable] = useState(false)
  const [lastClub, setLastClub] = useState<string | null>(null)
  const [online, setOnline] = useState(true)
  const [now, setNow] = useState(new Date())
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(tick)
  }, [])

  useEffect(() => {
    setOnline(navigator.onLine)
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    try {
      const last = window.localStorage.getItem('cannabuy:last-club-id')
      setLastClub(last)
      setLocalStorageAvailable(true)
    } catch {
      setLocalStorageAvailable(false)
    }

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const checks = useMemo(() => {
    const profileTenantId = user?.profile?.tenant_id ?? null
    const profileMatchesActiveClub = Boolean(profileTenantId && activeClubId && profileTenantId === activeClubId)
    const authReady = !isLoading && Boolean(session || !hasSupabaseConfig())

    return [
      {
        label: 'Supabase configured',
        ok: hasSupabaseConfig(),
        detail: hasSupabaseConfig()
          ? 'Public URL and anon key are present.'
          : 'App is running in demo mode because env vars are missing.',
      },
      {
        label: 'Auth session loaded',
        ok: authReady,
        detail: isLoading
          ? 'Auth provider is still loading.'
          : session
            ? `Signed in as ${session.user.email ?? 'unknown'}.`
            : 'No active auth session in browser.',
      },
      {
        label: 'Tenant loaded',
        ok: Boolean(activeClubId),
        detail: activeClub
          ? `${activeClub.name} · ${activeClub.plan.toUpperCase()} · ${activeClub.id}`
          : 'No active tenant selected.',
      },
      {
        label: 'Profile tenant matches active club',
        ok: !hasSupabaseConfig() || !user || profileMatchesActiveClub,
        detail: user?.profile
          ? `Profile tenant: ${profileTenantId ?? 'none'}`
          : 'No user profile available.',
      },
      {
        label: 'Demo fallback active',
        ok: isDemo || !hasSupabaseConfig(),
        detail: isDemo
          ? 'Demo mode is active.'
          : 'Production mode is using Supabase data.',
      },
      {
        label: 'Browser storage',
        ok: localStorageAvailable,
        detail: localStorageAvailable
          ? `Last selected club id: ${lastClub ?? 'none'}`
          : 'Local storage is unavailable or blocked.',
      },
      {
        label: 'Network online',
        ok: online,
        detail: online ? 'Browser reports online.' : 'Browser reports offline.',
      },
    ]
  }, [activeClub, activeClubId, hasSupabaseConfig, isDemo, lastClub, localStorageAvailable, online, session, user, isLoading])

  const supportBundle = useMemo(() => ({
    timestamp: now.toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    online,
    supabaseConfigured: hasSupabaseConfig(),
    isDemo,
    activeClub: activeClub
      ? {
          id: activeClub.id,
          name: activeClub.name,
          slug: activeClub.slug,
          plan: activeClub.plan,
        }
      : null,
    auth: session
      ? {
          userId: session.user.id,
          email: session.user.email ?? '',
          expiresAt: session.expires_at ?? null,
        }
      : null,
    profileTenantId: user?.profile?.tenant_id ?? null,
    lastSelectedClubId: lastClub,
  }), [activeClub, isDemo, lastClub, now, online, session, user])

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(supportBundle, null, 2))
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1400)
    } catch {
      setCopyState('idle')
    }
  }

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(supportBundle, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cannabuy-diagnostics-${now.toISOString().slice(0, 19).replace(/[:T]/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ClubLayout title="Production Diagnostics">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Supabase', value: formatValue(hasSupabaseConfig()), sub: hasSupabaseConfig() ? 'Configured' : 'Missing env vars' },
          { label: 'Auth', value: formatValue(Boolean(session)), sub: isLoading ? 'Loading session' : session ? 'Signed in' : 'Signed out' },
          { label: 'Tenant', value: formatValue(activeClub?.name ?? null), sub: activeClub?.plan ? activeClub.plan.toUpperCase() : 'No active club' },
          { label: 'Mode', value: isDemo ? 'Demo' : 'Production', sub: online ? 'Online' : 'Offline' },
        ].map(item => (
          <div key={item.label} style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{item.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '4px', wordBreak: 'break-word' }}>{item.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '16px', alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>Health checks</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '3px' }}>Quick signals for production readiness and support triage.</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={copyReport} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', color: '#16a34a', fontSize: '11px', fontWeight: 700, padding: '8px 14px', cursor: 'pointer' }}>
                {copyState === 'copied' ? 'Copied' : 'Copy JSON'}
              </button>
              <button onClick={downloadReport} style={{ background: '#16a34a', border: '1px solid #16a34a', borderRadius: '10px', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '8px 14px', cursor: 'pointer' }}>
                Download
              </button>
            </div>
          </div>

          <div style={{ padding: '18px 22px' }}>
            <div style={{ display: 'grid', gap: '12px' }}>
              {checks.map(check => {
                const tone = statusTone(check.ok)
                return (
                  <div key={check.label} style={{ border: `1px solid ${tone.border}`, background: tone.bg, borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>{check.label}</div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: tone.text, letterSpacing: '0.6px' }}>{tone.label}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#374151', lineHeight: 1.5 }}>{check.detail}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '16px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', marginBottom: '14px' }}>Environment summary</div>
            <div style={{ display: 'grid', gap: '10px' }}>
              <Row label="Route" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
              <Row label="User" value={session?.user.email ?? '—'} />
              <Row label="Profile tenant" value={user?.profile?.tenant_id ?? '—'} />
              <Row label="Last club" value={lastClub ?? '—'} />
              <Row label="Build mode" value={process.env.NODE_ENV} />
              <Row label="Time" value={now.toLocaleString('en-ZA')} />
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '16px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Support note</div>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>
              Use this page when a tenant reports login issues, missing data, or a deployment that appears healthy but is not loading real Supabase state.
            </p>
            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700 }}>Recommended checks</div>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#374151', fontSize: '12px', lineHeight: 1.6 }}>
                <li>Confirm Vercel env vars are set.</li>
                <li>Confirm user_profiles exists for the signed-in user.</li>
                <li>Confirm the active club matches the tenant in Supabase.</li>
                <li>Check RLS if data is unexpectedly empty.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ClubLayout>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: '#111827', fontWeight: 600, textAlign: 'right', maxWidth: '65%', wordBreak: 'break-word' }}>{value}</div>
    </div>
  )
}
