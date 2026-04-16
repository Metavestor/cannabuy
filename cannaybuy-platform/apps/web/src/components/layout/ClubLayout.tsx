'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useClub } from '../context/ClubContext'
import { useAuth } from '../context/AuthContext'
import { hasSupabaseConfig } from '@/lib/supabase/client'
import ClubSwitcher from './ClubSwitcher'

interface ClubLayoutProps {
  title: string
  children: ReactNode
}

const planLabels = { starter: 'STARTER', growth: 'GROWTH', enterprise: 'ENTERPRISE' }
const planColors = { starter: '#6b7280', growth: '#2563eb', enterprise: '#16a34a' }

const mainNav = [
  { label: 'Dashboard', href: '/dashboard', icon: '◫' },
  { label: 'Members', href: '/members', icon: '◉' },
  { label: 'Inventory', href: '/inventory', icon: '◈' },
  { label: 'Point of Sale', href: '/pos', icon: '◇' },
  { label: 'Products', href: '/admin/products', icon: '◆' },
  { label: 'Transactions', href: '/transactions', icon: '▣' },
]

const complianceNav = [
  { label: 'Audit Trail', href: '/admin/audit', icon: '▤' },
  { label: 'FICA Verification', href: '/admin/fica', icon: '▥' },
  { label: 'VAT Reports', href: '/reports/vat', icon: '▦' },
  { label: 'DAA Reports', href: '/reports/daa', icon: '▧' },
]

export default function ClubLayout({ title, children }: ClubLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { activeClub } = useClub()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!hasSupabaseConfig()) return
    if (isLoading) return
    if (!user && pathname !== '/login') {
      router.replace('/login')
    }
  }, [isLoading, pathname, router, user])

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: '256px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #d1fae5',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #d1fae5' }}>
          <img
            src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
            alt="CannaBuy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
              {activeClub.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: activeClub.brandColor, display: 'inline-block', flexShrink: 0 }} />
              <span style={{
                fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px',
                background: planColors[activeClub.plan] + '15', color: planColors[activeClub.plan],
                border: `1px solid ${planColors[activeClub.plan]}30`, letterSpacing: '0.5px',
              }}>
                {planLabels[activeClub.plan]}
              </span>
            </div>
          </div>
        </div>

        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: '10px' }}>
            Navigation
          </div>
          {mainNav.map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '11px',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                background: isActive(item.href) ? '#f0fdf4' : 'transparent',
                color: isActive(item.href) ? '#16a34a' : '#6b7280',
                fontWeight: isActive(item.href) ? 600 : 400,
                border: isActive(item.href) ? '1px solid #bbf7d0' : '1px solid transparent',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}

          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', margin: '20px 0 10px' }}>
            Compliance
          </div>
          {complianceNav.map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '11px',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#6b7280',
              }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}

          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', margin: '20px 0 10px' }}>
            Admin
          </div>
          {[
            { label: 'Clubs', href: '/admin/clubs', icon: '◉' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '11px',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#6b7280',
              }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #d1fae5' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>CannaBuy POS</div>
          <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '3px' }}>Phase 3 · Multi-tenant</div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{
          background: '#ffffff',
          borderBottom: '1px solid #d1fae5',
          padding: '0 28px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{title}</div>
          <ClubSwitcher />
        </header>

        <main style={{ padding: '28px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
