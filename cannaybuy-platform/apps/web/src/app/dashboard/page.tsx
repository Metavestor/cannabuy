import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <aside style={{ width: '256px', background: '#0f1923', display: 'flex', flexDirection: 'column', flexShrink: 0, minHeight: '100vh' }}>
        {/* Logo Area */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid #1e2a38' }}>
          <img
            src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
            alt="CannaBuy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #1e2a38' }}>
            <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Cannabis Club Management</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px', background: '#0d2818', color: '#4ade80', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '3px', letterSpacing: '0.8px', border: '1px solid #1a3d2a' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
              ZA COMPLIANT
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '10px', color: '#3a4a5c', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, padding: '0 12px', marginBottom: '8px' }}>Main</div>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '◫', active: true },
            { label: 'Members', href: '/members', icon: '◉', active: false },
            { label: 'Inventory', href: '/inventory', icon: '◈', active: false },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: false },
            { label: 'Products', href: '/admin/products', icon: '◆', active: false },
            { label: 'Transactions', href: '/transactions', icon: '▣', active: false },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '2px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '6px', fontSize: '13px',
                background: item.active ? '#1a3a2a' : 'transparent',
                color: item.active ? '#4ade80' : '#64748b',
                fontWeight: item.active ? 600 : 400,
                borderLeft: item.active ? '2px solid #4ade80' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}>
                <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', opacity: item.active ? 1 : 0.6 }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #1e2a38', fontSize: '11px', color: '#3a4a5c' }}>
          <div>CannaBuy POS v1.0</div>
          <div style={{ marginTop: '2px', color: '#2a3a4c' }}>South Africa</div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a202c' }}>Dashboard</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px' }}>Staff: Admin</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={{ padding: '32px', flex: 1 }}>
          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {[
              { label: 'Total Members', value: '124', change: '+3 today', color: '#4ade80' },
              { label: 'Products in Stock', value: '48', change: '6 low stock', color: '#fbbf24' },
              { label: "Today's Sales", value: 'R 12,450', change: '+18% vs yesterday', color: '#4ade80' },
              { label: 'VAT Collected', value: 'R 1,867', change: '15% VAT', color: '#60a5fa' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'white', borderRadius: '10px', padding: '20px 24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1a202c', marginBottom: '6px' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: stat.color, fontWeight: 500 }}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div style={{ background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a202c' }}>Recent Transactions</div>
              <Link href="/transactions" style={{ fontSize: '12px', color: '#4ade80', textDecoration: 'none', fontWeight: 500 }}>View all →</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Transaction ID', 'Member', 'Items', 'Total', 'Payment', 'Time'].map(h => (
                    <th key={h} style={{ padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'TXN-7821', member: 'Thabo M.', items: 3, total: 'R 1,240', payment: 'Cash', time: '14:32' },
                  { id: 'TXN-7820', member: 'Priya K.', items: 1, total: 'R 850', payment: 'Card', time: '13:18' },
                  { id: 'TXN-7819', member: 'Johan S.', items: 5, total: 'R 2,100', payment: 'Cash', time: '12:45' },
                  { id: 'TXN-7818', member: 'Lisa N.', items: 2, total: 'R 980', payment: 'Card', time: '11:22' },
                  { id: 'TXN-7817', member: 'David R.', items: 4, total: 'R 1,650', payment: 'Cash', time: '10:05' },
                ].map((row, i) => (
                  <tr key={row.id} style={{ borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '14px 24px', fontSize: '13px', fontWeight: 600, color: '#4ade80' }}>{row.id}</td>
                    <td style={{ padding: '14px 24px', fontSize: '13px', color: '#1a202c' }}>{row.member}</td>
                    <td style={{ padding: '14px 24px', fontSize: '13px', color: '#64748b' }}>{row.items} items</td>
                    <td style={{ padding: '14px 24px', fontSize: '13px', fontWeight: 600, color: '#1a202c' }}>{row.total}</td>
                    <td style={{ padding: '14px 24px', fontSize: '12px', color: '#64748b' }}>
                      <span style={{ background: row.payment === 'Cash' ? '#fef3c7' : '#dbeafe', color: row.payment === 'Cash' ? '#92400e' : '#1e40af', padding: '2px 8px', borderRadius: '3px', fontWeight: 500 }}>{row.payment}</span>
                    </td>
                    <td style={{ padding: '14px 24px', fontSize: '12px', color: '#94a3b8' }}>{row.time}</td>
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
