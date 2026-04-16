'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[app:global-error]', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, sans-serif', background: '#f8f9fa' }}>
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '720px', width: '100%', background: '#fff', border: '1px solid #fecaca', borderRadius: '18px', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', border: '3px solid #fecaca', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 800, marginBottom: '18px' }}>
              !
            </div>
            <h1 style={{ margin: '0 0 10px', fontSize: '26px', fontWeight: 800, color: '#111827' }}>Application error</h1>
            <p style={{ margin: '0 0 18px', fontSize: '14px', lineHeight: 1.6, color: '#6b7280' }}>
              CannaBuy encountered a fatal error rendering the application shell. Use diagnostics to inspect the current environment or retry the render.
            </p>

            <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>Error details</div>
              <div style={{ fontSize: '13px', color: '#111827', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {error.message}
              </div>
              {error.digest ? (
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '10px' }}>Digest: {error.digest}</div>
              ) : null}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => reset()}
                style={{ background: '#16a34a', color: '#fff', border: '1px solid #16a34a', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Retry
              </button>
              <Link href="/admin/diagnostics" style={{ textDecoration: 'none' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 700 }}>
                  Open Diagnostics
                </span>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
