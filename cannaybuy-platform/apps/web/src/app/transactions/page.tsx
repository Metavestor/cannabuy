'use client'
import ClubLayout from '../../components/layout/ClubLayout'

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
    <ClubLayout title="Transaction History">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: "Today's Revenue", value: `R ${todayTotal.toLocaleString()}`, sub: 'Gross total incl. VAT' },
          { label: "Today's VAT", value: `R ${todayVat.toLocaleString()}`, sub: '15% SARS liability' },
          { label: 'Transactions Today', value: '5', sub: 'Completed sales' },
          { label: 'Avg Transaction', value: 'R 1,164', sub: 'Per transaction' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '20px' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>All Transactions</div>
          <input placeholder="Search transactions..." style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', width: '200px', outline: 'none' }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['TXN ID', 'Date & Time', 'Member', 'Items', 'Subtotal', 'VAT (15%)', 'Total', 'Payment', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={t.id} style={{ borderBottom: i < transactions.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <td style={{ padding: '13px 16px', fontSize: '12px', fontWeight: 700, color: '#16a34a', fontFamily: 'monospace' }}>{t.id}</td>
                <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>{t.date} {t.time}</td>
                <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{t.member}</td>
                <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>{t.items}</td>
                <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>R {t.subtotal.toLocaleString()}</td>
                <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>R {t.vat.toLocaleString()}</td>
                <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {t.total.toLocaleString()}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: t.payment === 'Cash' ? '#fffbeb' : '#eff6ff', color: t.payment === 'Cash' ? '#d97706' : '#3b82f6', border: `1px solid ${t.payment === 'Cash' ? '#fde68a' : '#bfdbfe'}` }}>{t.payment}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>SARS VAT Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { label: 'Total Exempt Sales (0%)', value: 'R 0.00' },
            { label: 'Standard Rate Sales (15%)', value: `R ${todayTotal.toLocaleString()}` },
            { label: 'Output VAT Due', value: `R ${todayVat.toLocaleString()}` },
          ].map(item => (
            <div key={item.label} style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '14px 18px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </ClubLayout>
  )
}
