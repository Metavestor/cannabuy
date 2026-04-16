'use client'
import Link from 'next/link'

const members = [
  { id: 1, name: 'Thabo Molefe', idNumber: '8901025371082', memberSince: '2024-01-15', visits: 48, totalSpend: 28400, ficaStatus: 'Verified', status: 'Active' },
  { id: 2, name: 'Priya Kartik', idNumber: '9412205472083', memberSince: '2024-03-22', visits: 31, totalSpend: 19800, ficaStatus: 'Verified', status: 'Active' },
  { id: 3, name: 'Johan Snyman', idNumber: '8205106231094', memberSince: '2023-11-08', visits: 67, totalSpend: 42100, ficaStatus: 'Verified', status: 'Active' },
  { id: 4, name: 'Lisa Nkosi', idNumber: '9603056284097', memberSince: '2024-06-14', visits: 22, totalSpend: 11400, ficaStatus: 'Pending', status: 'Active' },
  { id: 5, name: 'David Rossouw', idNumber: '8811224055089', memberSince: '2023-08-30', visits: 89, totalSpend: 55600, ficaStatus: 'Verified', status: 'Active' },
  { id: 6, name: 'Amara Diallo', idNumber: '9307012345091', memberSince: '2024-09-01', visits: 12, totalSpend: 6200, ficaStatus: 'Pending', status: 'Active' },
  { id: 7, name: 'Keitumetse Moiloa', idNumber: '8905150324088', memberSince: '2024-02-18', visits: 41, totalSpend: 23900, ficaStatus: 'Verified', status: 'Active' },
  { id: 8, name: 'Jannes van der Merwe', idNumber: '8510095478102', memberSince: '2023-05-10', visits: 103, totalSpend: 68400, ficaStatus: 'Verified', status: 'Active' },
]

export default function MembersPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{ width: '256px', background: '#ffffff', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #d1fae5', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid #d1fae5' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Cannabis Club Management</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: '#f0fdf4', color: '#16a34a', fontSize: '9px', fontWeight: 700, padding: '5px 10px', borderRadius: '20px', letterSpacing: '0.8px', border: '1px solid #bbf7d0' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
              ZA COMPLIANT
            </div>
          </div>
        </div>
        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: '10px' }}>Navigation</div>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '◫', active: false },
            { label: 'Members', href: '/members', icon: '◉', active: true },
            { label: 'Inventory', href: '/inventory', icon: '◈', active: false },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: false },
            { label: 'Products', href: '/admin/products', icon: '◆', active: false },
            { label: 'Transactions', href: '/transactions', icon: '▣', active: false },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', background: item.active ? '#f0fdf4' : 'transparent', color: item.active ? '#16a34a' : '#6b7280', fontWeight: item.active ? 600 : 400, border: item.active ? '1px solid #bbf7d0' : '1px solid transparent', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '20px 20px', borderTop: '1px solid #d1fae5' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>CannaBuy POS</div>
          <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '3px' }}>v1.0 · South Africa</div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Member Management</div>
          <button style={{ background: '#16a34a', border: '1px solid #16a34a', borderRadius: '10px', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '9px 18px', cursor: 'pointer' }}>+ Register Member</button>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'Total Members', value: '48', sub: 'Registered members' },
              { label: 'FICA Verified', value: '42', sub: '87.5% compliance' },
              { label: 'Pending FICA', value: '6', sub: 'Action required' },
              { label: 'Active Today', value: '8', sub: 'Members on site' },
            ].map(s => (
              <div key={s.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Members Table */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>All Members</div>
              <input placeholder="Search members..." style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', color: '#111827', outline: 'none', width: '180px' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Member', 'ID Number', 'Member Since', 'Visits', 'Total Spend', 'FICA Status', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => {
                  const ficaStyle = m.ficaStatus === 'Verified' ? { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' } : { bg: '#fffbeb', border: '#fde68a', text: '#d97706' }
                  return (
                    <tr key={m.id} style={{ borderBottom: i < members.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{m.idNumber}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280' }}>{m.memberSince}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.visits}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {m.totalSpend.toLocaleString()}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: ficaStyle.bg, color: ficaStyle.text, border: `1px solid ${ficaStyle.border}` }}>{m.ficaStatus}</span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>{m.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
