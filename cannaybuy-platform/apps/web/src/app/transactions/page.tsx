import Link from 'next/link'

const transactions = [
  { id: 'TXN-7821', member: 'Thabo Molefe', items: 3, subtotal: 1080, vat: 162, total: 1242, payment: 'Cash', time: '14:32', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7820', member: 'Priya Kartik', items: 1, subtotal: 739, vat: 111, total: 850, payment: 'Card', time: '13:18', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7819', member: 'Johan Snyman', items: 5, subtotal: 1826, vat: 274, total: 2100, payment: 'Cash', time: '12:45', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7818', member: 'Lisa Nkosi', items: 2, subtotal: 852, vat: 128, total: 980, payment: 'Card', time: '11:22', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7817', member: 'David Rossouw', items: 4, subtotal: 1435, vat: 215, total: 1650, payment: 'Cash', time: '10:05', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7816', member: 'Amara Diallo', items: 2, subtotal: 1080, vat: 162, total: 1242, payment: 'Card', time: '09:30', date: '2026-04-15', status: 'Completed' },
]

export default function TransactionsPage() {
  const todayTotal = transactions.filter(t => t.date === '2026-04-16').reduce((s, t) => s + t.total, 0)
  const todayVat = transactions.filter(t => t.date === '2026-04-16').reduce((s, t) => s + t.vat, 0)

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
            { label: 'Members', href: '/members', icon: '◉', active: false },
            { label: 'Inventory', href: '/inventory', icon: '◈', active: false },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: false },
            { label: 'Products', href: '/admin/products', icon: '◆', active: false },
            { label: 'Transactions', href: '/transactions', icon: '▣', active: true },
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>Transaction History</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', color: '#4a6080', fontSize: '11px', fontWeight: 600, padding: '7px 14px', cursor: 'pointer' }}>Export CSV</button>
            <button style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', color: '#4a6080', fontSize: '11px', fontWeight: 600, padding: '7px 14px', cursor: 'pointer' }}>Print Report</button>
          </div>
        </header>

        <main style={{ padding: '28px', flex: 1 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: "Today's Revenue", value: `R ${todayTotal.toLocaleString()}`, sub: 'Gross total incl. VAT' },
              { label: "Today's VAT", value: `R ${todayVat.toLocaleString()}`, sub: '15% SARS liability' },
              { label: 'Transactions Today', value: '5', sub: 'Completed sales' },
              { label: 'Avg Transaction', value: 'R 1,164', sub: 'Per transaction' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontSize: '11px', color: '#3d4f63', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#4a6080' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Transactions Table */}
          <div style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a2535', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>All Transactions</div>
              <input placeholder="Search transactions..." style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', padding: '7px 12px', fontSize: '12px', color: '#e2e8f0', width: '200px', outline: 'none' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0f1923' }}>
                  {['TXN ID', 'Date & Time', 'Member', 'Items', 'Subtotal', 'VAT (15%)', 'Total', 'Payment', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#3d4f63', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #1a2535' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={t.id} style={{ borderBottom: i < transactions.length - 1 ? '1px solid #1a2535' : 'none' }}>
                    <td style={{ padding: '13px 16px', fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>{t.id}</td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: '#4a6080' }}>{t.date} {t.time}</td>
                    <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 500, color: '#e2e8f0' }}>{t.member}</td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: '#4a6080' }}>{t.items}</td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: '#4a6080' }}>R {t.subtotal.toLocaleString()}</td>
                    <td style={{ padding: '13px 16px', fontSize: '12px', color: '#4a6080' }}>R {t.vat.toLocaleString()}</td>
                    <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>R {t.total.toLocaleString()}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', background: t.payment === 'Cash' ? '#1a150a' : '#0d1520', color: t.payment === 'Cash' ? '#f59e0b' : '#60a5fa', border: `1px solid ${t.payment === 'Cash' ? '#3d2a0a' : '#1a2535'}` }}>{t.payment}</span>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', background: '#0d1f12', color: '#22c55e', border: '1px solid #1a3322' }}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VAT Summary Note */}
          <div style={{ marginTop: '20px', background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', padding: '20px 24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginBottom: '10px' }}>SARS VAT Summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                { label: 'Total Exempt Sales (0%)', value: 'R 0.00' },
                { label: 'Standard Rate Sales (15%)', value: `R ${todayTotal.toLocaleString()}` },
                { label: 'Output VAT Due', value: `R ${todayVat.toLocaleString()}` },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: '11px', color: '#3d4f63', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#e2e8f0' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
