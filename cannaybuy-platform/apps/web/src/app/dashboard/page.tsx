'use client'
import Link from 'next/link'
import ClubLayout from '../../components/layout/ClubLayout'

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
    <ClubLayout title="Dashboard">
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
    </ClubLayout>
  )
}
