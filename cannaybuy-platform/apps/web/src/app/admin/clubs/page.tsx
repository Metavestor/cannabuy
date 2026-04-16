'use client'
import Link from 'next/link'
import { useState } from 'react'

const mockClubs = [
  { id: 't1', name: 'CannaClub Gauteng', slug: 'cannaclub-gauteng', plan: 'enterprise', isActive: true, memberCount: 142, monthlyRevenue: 89420, vatNumber: '4912345678', brandColor: '#1a7a4a', createdAt: '2025-01-15' },
  { id: 't2', name: 'Green Leaf Western Cape', slug: 'greenleaf-wc', plan: 'growth', isActive: true, memberCount: 67, monthlyRevenue: 42180, vatNumber: '4987654321', brandColor: '#0f766e', createdAt: '2025-06-01' },
  { id: 't3', name: 'Cape Cannabis Co.', slug: 'capecannaco', plan: 'starter', isActive: true, memberCount: 28, monthlyRevenue: 18240, vatNumber: '4123456789', brandColor: '#7c3aed', createdAt: '2025-09-20' },
  { id: 't4', name: 'KwaZulu Bud Club', slug: 'kznbud', plan: 'starter', isActive: false, memberCount: 12, monthlyRevenue: 0, vatNumber: '4876543210', brandColor: '#b45309', createdAt: '2025-11-10' },
]

const planColors: Record<string, string> = { starter: '#6b7280', growth: '#2563eb', enterprise: '#16a34a' }
const planLabels: Record<string, string> = { starter: 'STARTER', growth: 'GROWTH', enterprise: 'ENTERPRISE' }

export default function ClubsPage() {
  const [filterPlan, setFilterPlan] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewModal, setShowNewModal] = useState(false)

  const filtered = mockClubs.filter(c => {
    if (filterPlan !== 'all' && c.plan !== filterPlan) return false
    if (filterStatus === 'active' && !c.isActive) return false
    if (filterStatus === 'inactive' && c.isActive) return false
    return true
  })

  const totalMembers = mockClubs.filter(c => c.isActive).reduce((s, c) => s + c.memberCount, 0)
  const totalRevenue = mockClubs.filter(c => c.isActive).reduce((s, c) => s + c.monthlyRevenue, 0)
  const activeClubs = mockClubs.filter(c => c.isActive).length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{ width: '256px', background: '#ffffff', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #d1fae5', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid #d1fae5' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Super Admin</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: '#f0fdf4', color: '#16a34a', fontSize: '9px', fontWeight: 700, padding: '5px 10px', borderRadius: '20px', letterSpacing: '0.8px', border: '1px solid #bbf7d0' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
              SUPER ADMIN
            </div>
          </div>
        </div>
        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: '10px' }}>Navigation</div>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '◫' },
            { label: 'Members', href: '/members', icon: '◉' },
            { label: 'Inventory', href: '/inventory', icon: '◈' },
            { label: 'Point of Sale', href: '/pos', icon: '◇' },
            { label: 'Products', href: '/admin/products', icon: '◆' },
            { label: 'Transactions', href: '/transactions', icon: '▣' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#6b7280' }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', margin: '20px 0 10px' }}>Compliance</div>
          {[
            { label: 'Audit Trail', href: '/admin/audit', icon: '▤' },
            { label: 'FICA Verification', href: '/admin/fica', icon: '▥' },
            { label: 'VAT Reports', href: '/reports/vat', icon: '▦' },
            { label: 'DAA Reports', href: '/reports/daa', icon: '▧' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#6b7280' }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', margin: '20px 0 10px' }}>Admin</div>
          {[
            { label: 'Clubs', href: '/admin/clubs', icon: '◉', active: true },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', background: (item as any).active ? '#f0fdf4' : 'transparent', color: (item as any).active ? '#16a34a' : '#6b7280', fontWeight: (item as any).active ? 600 : 400, border: (item as any).active ? '1px solid #bbf7d0' : '1px solid transparent' }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '20px 20px', borderTop: '1px solid #d1fae5' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>CannaBuy POS</div>
          <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '3px' }}>Phase 3 · Multi-tenant</div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Club Management</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '3px 10px', borderRadius: '20px' }}>Super Admin</div>
          </div>
          <Link href="/admin/clubs/new">
            <button style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', padding: '9px 18px', cursor: 'pointer' }}>
              + New Club
            </button>
          </Link>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Clubs', value: mockClubs.length, color: '#111827' },
              { label: 'Active Clubs', value: activeClubs, color: '#16a34a' },
              { label: 'Total Members', value: totalMembers.toLocaleString(), color: '#111827' },
              { label: 'Monthly Revenue', value: `R ${totalRevenue.toLocaleString()}`, color: '#16a34a' },
            ].map(card => (
              <div key={card.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{card.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '16px 20px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>Filter:</span>
            {['all', 'starter', 'growth', 'enterprise'].map(p => (
              <button key={p} onClick={() => setFilterPlan(p)} style={{ padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '20px', border: '1px solid', cursor: 'pointer', textTransform: 'capitalize',
                background: filterPlan === p ? planColors[p] + '15' : '#ffffff', color: filterPlan === p ? planColors[p] : '#6b7280', borderColor: filterPlan === p ? planColors[p] + '40' : '#e5e7eb' }}>
                {p === 'all' ? 'All Plans' : planLabels[p]}
              </button>
            ))}
            <div style={{ width: '1px', height: '20px', background: '#e5e7eb', margin: '0 4px' }} />
            {[['all', 'All Status'], ['active', 'Active'], ['inactive', 'Inactive']].map(([v, label]) => (
              <button key={v} onClick={() => setFilterStatus(v)} style={{ padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '20px', border: '1px solid', cursor: 'pointer',
                background: filterStatus === v ? '#16a34a' + '15' : '#ffffff', color: filterStatus === v ? '#16a34a' : '#6b7280', borderColor: filterStatus === v ? '#16a34a40' : '#e5e7eb' }}>
                {label}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>{filtered.length} club{filtered.length !== 1 ? 's' : ''}</div>
          </div>

          {/* Clubs Table */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  {['Club', 'Plan', 'Status', 'Members', 'Monthly Revenue', 'VAT Number', 'Created', ''].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((club, i) => (
                  <tr key={club.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: club.brandColor + '20', border: `2px solid ${club.brandColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: club.brandColor }}>{club.name[0]}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{club.name}</div>
                          <div style={{ fontSize: '11px', color: '#9ca3af' }}>/{club.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: planColors[club.plan] + '15', color: planColors[club.plan], border: `1px solid ${planColors[club.plan]}30` }}>
                        {planLabels[club.plan]}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: club.isActive ? '#16a34a' : '#dc2626' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: club.isActive ? '#16a34a' : '#dc2626', display: 'inline-block' }}></span>
                        {club.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#374151' }}>{club.memberCount}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>
                      {club.isActive ? `R ${club.monthlyRevenue.toLocaleString()}` : <span style={{ color: '#9ca3af' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{club.vatNumber}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280' }}>{club.createdAt}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href={`/admin/clubs/${club.id}`}>
                          <button style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, color: '#374151', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>Edit</button>
                        </Link>
                        <button style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 600, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', cursor: 'pointer' }}>Switch</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>No clubs match your filters</div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
