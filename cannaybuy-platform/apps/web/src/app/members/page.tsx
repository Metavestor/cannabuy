import Link from 'next/link'

const members = [
  { id: 'M001', name: 'Thabo Molefe', idNumber: '9101225051182', status: 'Active', memberSince: '2024-01-15', visits: 42, totalSpend: 'R 18,450' },
  { id: 'M002', name: 'Priya Kartik', idNumber: '8803025065183', status: 'Active', memberSince: '2024-02-20', visits: 31, totalSpend: 'R 12,800' },
  { id: 'M003', name: 'Johan Snyman', idNumber: '8205155072189', status: 'Active', memberSince: '2024-01-08', visits: 58, totalSpend: 'R 24,100' },
  { id: 'M004', name: 'Lisa Nkosi', idNumber: '9007205048187', status: 'Active', memberSince: '2024-03-11', visits: 19, totalSpend: 'R 7,250' },
  { id: 'M005', name: 'David Rossouw', idNumber: '8711055033181', status: 'Pending', memberSince: '2025-04-10', visits: 0, totalSpend: 'R 0' },
  { id: 'M006', name: 'Amara Diallo', idNumber: '9304156029184', status: 'Active', memberSince: '2024-04-02', visits: 27, totalSpend: 'R 11,500' },
]

export default function MembersPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1923' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#0a0f14', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #1a2535' }}>
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid #1a2535' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1a2535' }}>
            <div style={{ fontSize: '10px', color: '#3d4f63', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Cannabis Club Management</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: '#0d1f12', color: '#22c55e', fontSize: '9px', fontWeight: 700, padding: '5px 10px', borderRadius: '3px', letterSpacing: '0.8px', border: '1px solid #1a3322' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
              ZA COMPLIANT
            </div>
          </div>
        </div>

        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', color: '#2a3a50', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: '10px' }}>Navigation</div>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '◫', active: false },
            { label: 'Members', href: '/members', icon: '◉', active: true },
            { label: 'Inventory', href: '/inventory', icon: '◈', active: false },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: false },
            { label: 'Products', href: '/admin/products', icon: '◆', active: false },
            { label: 'Transactions', href: '/transactions', icon: '▣', active: false },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', background: item.active ? '#0f2a1a' : 'transparent', color: item.active ? '#22c55e' : '#4a6080', fontWeight: item.active ? 600 : 400, borderLeft: item.active ? '2px solid #22c55e' : '2px solid transparent', transition: 'all 0.15s ease' }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center', opacity: item.active ? 1 : 0.5 }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div style={{ padding: '20px 20px', borderTop: '1px solid #1a2535' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#2a3a50' }}>CannaBuy POS</div>
          <div style={{ fontSize: '10px', color: '#1e2d3d', marginTop: '3px' }}>v1.0 · South Africa</div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#0a0f14', borderBottom: '1px solid #1a2535', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>Member Management</div>
          <button style={{ background: '#22c55e', border: 'none', borderRadius: '6px', color: '#0a0f14', fontSize: '12px', fontWeight: 700, padding: '8px 16px', cursor: 'pointer' }}>+ Register New Member</button>
        </header>

        <main style={{ padding: '28px', flex: 1 }}>
          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'Total Members', value: '124', sub: '+4 this month' },
              { label: 'Active Members', value: '118', sub: '95% active rate' },
              { label: 'Pending Verification', value: '6', sub: 'Awaiting FICA' },
              { label: 'Members Today', value: '8', sub: 'Checked in today' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontSize: '11px', color: '#3d4f63', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#22c55e' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Members Table */}
          <div style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a2535', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>All Members</div>
              <input placeholder="Search members..." style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', padding: '7px 12px', fontSize: '12px', color: '#e2e8f0', width: '200px', outline: 'none' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0f1923' }}>
                  {['ID', 'Name', 'ID Number', 'Status', 'Member Since', 'Visits', 'Total Spend'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontSize: '10px', fontWeight: 700, color: '#3d4f63', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #1a2535' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: i < members.length - 1 ? '1px solid #1a2535' : 'none', transition: 'background 0.1s' }}>
                    <td style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>{m.id}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 500, color: '#e2e8f0' }}>{m.name}</td>
                    <td style={{ padding: '14px 20px', fontSize: '12px', color: '#4a6080' }}>{m.idNumber}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', background: m.status === 'Active' ? '#0d1f12' : '#1a150a', color: m.status === 'Active' ? '#22c55e' : '#f59e0b', border: `1px solid ${m.status === 'Active' ? '#1a3322' : '#3d2a0a'}` }}>{m.status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '12px', color: '#4a6080' }}>{m.memberSince}</td>
                    <td style={{ padding: '14px 20px', fontSize: '12px', color: '#4a6080' }}>{m.visits}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{m.totalSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
