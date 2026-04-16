import Link from 'next/link'

'use client'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '40px' }}>
        <img
          src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
          alt="CannaBuy"
          style={{ width: '260px', height: 'auto', margin: '0 auto 32px', display: 'block' }}
        />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px', background: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: 700, padding: '6px 14px', borderRadius: '20px', letterSpacing: '0.8px', border: '1px solid #bbf7d0' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
          ZA COMPLIANT · CANNABIS CLUB POS
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', marginBottom: '12px', letterSpacing: '-0.5px' }}>CannaBuy POS</h1>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '36px', lineHeight: 1.6 }}>Point-of-sale platform for South African cannabis clubs. Manage members, inventory, and transactions with full SARS VAT compliance.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Dashboard', href: '/dashboard', desc: 'Revenue overview & live stats' },
            { label: 'Point of Sale', href: '/pos', desc: 'Process sales & manage cart' },
            { label: 'Members', href: '/members', desc: 'Member management & FICA' },
            { label: 'Inventory', href: '/inventory', desc: 'Stock levels & reorder alerts' },
            { label: 'Products', href: '/admin/products', desc: 'Product catalogue & pricing' },
            { label: 'Transactions', href: '/transactions', desc: 'Transaction history & VAT reports' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0fdf4'; (e.currentTarget as HTMLDivElement).style.borderColor = '#16a34a' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#ffffff'; (e.currentTarget as HTMLDivElement).style.borderColor = '#bbf7d0' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '16px' }}>◈</span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>{link.label}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{link.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
