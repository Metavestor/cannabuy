'use client'

import Link from 'next/link'
import { hasSupabaseConfig } from '@/lib/supabase/client'

interface EnvironmentBannerProps {
  compact?: boolean
}

export default function EnvironmentBanner({ compact = false }: EnvironmentBannerProps) {
  if (hasSupabaseConfig()) return null

  return (
    <div style={{
      background: '#fffbeb',
      border: '1px solid #fde68a',
      borderRadius: '12px',
      padding: compact ? '10px 12px' : '14px 16px',
      fontSize: compact ? '12px' : '13px',
      color: '#92400e',
      lineHeight: 1.5,
      marginBottom: compact ? '14px' : '18px',
    }}>
      <div style={{ fontWeight: 800, marginBottom: '4px' }}>Production config missing</div>
      <div>
        Supabase environment variables are not set for this deployment. The app will stay in demo mode until{' '}
        <code style={{ fontFamily: 'monospace' }}>NEXT_PUBLIC_SUPABASE_URL</code> and either{' '}
        <code style={{ fontFamily: 'monospace' }}>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> or{' '}
        <code style={{ fontFamily: 'monospace' }}>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> are configured.
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
        <Link href="/admin/diagnostics" style={{ color: '#92400e', fontWeight: 700, textDecoration: 'underline' }}>
          Open diagnostics
        </Link>
        <a
          href="https://vercel.com/docs/environment-variables"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#92400e', fontWeight: 700, textDecoration: 'underline' }}
        >
          Vercel env docs
        </a>
      </div>
    </div>
  )
}
