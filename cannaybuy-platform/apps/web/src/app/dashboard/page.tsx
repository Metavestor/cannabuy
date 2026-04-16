'use client'
import Link from 'next/link'

const stats = [
  { label: "Today's Revenue", value: 'R 6,214', sub: '+18% vs yesterday', up: true },
  { label: 'Transactions', value: '12', sub: '3 voided today', up: null },
  { label: 'Active Members', value: '48', sub: '3 pending FICA', up: null },
  { label: 'Low Stock Items', value: '3', sub: 'Below reorder level', up: false },
]

const recentTxns = [
  { id: 'TXN-7821', member: 'Thabo Molefe', total: 1242, payment: 'Cash', time: '14:32', status: 'Completed' },
  { id: 'TXN-7820', member: 'Priya Kartik', total: 850, payment: 'Card', time: '13:18', status: 'Completed' },
  { id: 'TXN-7819', member: 'Johan Snyman', total: 2100, payment: 'Cash', time: '12:45', status: 'Completed' },
  { id: 'TXN-7818', member: 'Lisa Nkosi', total: 980, payment: 'Card', time: '11:22', status: 'Completed' },
]

export default function DashboardPage() {
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
            { label: 'Dashboard', href: '/dashboard', icon: '◫', active: true },
            { label: 'Members', href: '/members', icon: '◉', active: false },
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

        
        <div style={{ padding: '20px 20px', borderTop: '1px solid #d1fae5' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>CannaBuy POS</div>
          <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '3px' }}>v1.0 · South Africa</div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Dashboard</div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>Thursday, 16 April 2026</div>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>{s.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
            {/* Revenue Chart Placeholder */}
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Revenue — Last 7 Days</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '120px' }}>
                {[65, 82, 45, 90, 73, 88, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '100%', background: i === 6 ? '#16a34a' : '#d1fae5', borderRadius: '6px', height: `${h}%`, minHeight: '8px' }}></div>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Recent Transactions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recentTxns.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{t.member}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{t.id} · {t.time}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {t.total.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>{t.payment}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/transactions" style={{ display: 'block', marginTop: '14px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#16a34a', textDecoration: 'none', padding: '8px', border: '1px solid #d1fae5', borderRadius: '8px' }}>View All Transactions →</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
