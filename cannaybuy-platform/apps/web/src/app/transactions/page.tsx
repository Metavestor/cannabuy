'use client'
import { useState, useMemo } from 'react'
import ClubLayout from '../../components/layout/ClubLayout'

interface Transaction {
  id: string
  member: string
  items: number
  subtotal: number
  vat: number
  total: number
  payment: 'Cash' | 'Card'
  time: string
  date: string
  status: 'Completed' | 'Refunded' | 'Pending'
}

const ALL_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-7821', member: 'Thabo Molefe', items: 3, subtotal: 1080, vat: 162, total: 1242, payment: 'Cash', time: '14:32', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7820', member: 'Priya Kartik', items: 1, subtotal: 739, vat: 111, total: 850, payment: 'Card', time: '13:18', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7819', member: 'Johan Snyman', items: 5, subtotal: 1826, vat: 274, total: 2100, payment: 'Cash', time: '12:45', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7818', member: 'Lisa Nkosi', items: 2, subtotal: 852, vat: 128, total: 980, payment: 'Card', time: '11:22', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7817', member: 'David Rossouw', items: 4, subtotal: 1435, vat: 215, total: 1650, payment: 'Cash', time: '10:05', date: '2026-04-16', status: 'Completed' },
  { id: 'TXN-7816', member: 'Amara Diallo', items: 2, subtotal: 1080, vat: 162, total: 1242, payment: 'Card', time: '09:30', date: '2026-04-15', status: 'Completed' },
  { id: 'TXN-7815', member: 'Keitumetse Moiloa', items: 3, subtotal: 950, vat: 143, total: 1093, payment: 'Cash', time: '16:44', date: '2026-04-15', status: 'Completed' },
  { id: 'TXN-7814', member: 'Jannes van der Merwe', items: 6, subtotal: 2150, vat: 323, total: 2473, payment: 'Card', time: '15:10', date: '2026-04-15', status: 'Refunded' },
  { id: 'TXN-7813', member: 'Thabo Molefe', items: 2, subtotal: 620, vat: 93, total: 713, payment: 'Cash', time: '14:55', date: '2026-04-15', status: 'Completed' },
  { id: 'TXN-7812', member: 'Priya Kartik', items: 4, subtotal: 1340, vat: 201, total: 1541, payment: 'Card', time: '13:30', date: '2026-04-14', status: 'Completed' },
  { id: 'TXN-7811', member: 'Johan Snyman', items: 1, subtotal: 450, vat: 68, total: 518, payment: 'Cash', time: '12:00', date: '2026-04-14', status: 'Completed' },
  { id: 'TXN-7810', member: 'Lisa Nkosi', items: 3, subtotal: 780, vat: 117, total: 897, payment: 'Card', time: '11:15', date: '2026-04-14', status: 'Completed' },
  { id: 'TXN-7809', member: 'David Rossouw', items: 2, subtotal: 1100, vat: 165, total: 1265, payment: 'Cash', time: '10:30', date: '2026-04-13', status: 'Completed' },
  { id: 'TXN-7808', member: 'Amara Diallo', items: 5, subtotal: 1890, vat: 284, total: 2174, payment: 'Card', time: '15:20', date: '2026-04-13', status: 'Completed' },
  { id: 'TXN-7807', member: 'Keitumetse Moiloa', items: 2, subtotal: 670, vat: 101, total: 771, payment: 'Cash', time: '14:00', date: '2026-04-12', status: 'Completed' },
  { id: 'TXN-7806', member: 'Jannes van der Merwe', items: 3, subtotal: 1450, vat: 218, total: 1668, payment: 'Card', time: '13:45', date: '2026-04-12', status: 'Completed' },
]

const PAGE_SIZE = 10

export default function TransactionsPage() {
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Transaction | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(ALL_TRANSACTIONS)

  const filteredLive = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = search === '' ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.member.toLowerCase().includes(search.toLowerCase())
      const matchDate = dateFilter === 'all' || t.date === dateFilter
      const matchPayment = paymentFilter === 'all' || t.payment === paymentFilter
      const matchStatus = statusFilter === 'all' || t.status === statusFilter
      return matchSearch && matchDate && matchPayment && matchStatus
    })
  }, [transactions, search, dateFilter, paymentFilter, statusFilter])

  const displayList = filteredLive

  const totalPages = useMemo(() => Math.max(1, Math.ceil(displayList.length / PAGE_SIZE)), [displayList.length])

  const pageData = useMemo(() => {
    const safePage = Math.min(page, totalPages)
    return displayList.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  }, [displayList, page, totalPages])

  const stats = useMemo(() => {
    const today = '2026-04-16'
    const todayTxns = transactions.filter(t => t.date === today && t.status !== 'Refunded')
    const todayTotal = todayTxns.reduce((s, t) => s + t.total, 0)
    const todayVat = todayTxns.reduce((s, t) => s + t.vat, 0)
    const avgTxn = todayTxns.length ? Math.round(todayTotal / todayTxns.length) : 0
    return {
      todayRevenue: todayTotal,
      todayVat,
      todayCount: todayTxns.length,
      avgTxn,
      totalRevenue: transactions.filter(t => t.status !== 'Refunded').reduce((s, t) => s + t.total, 0),
      totalVat: transactions.filter(t => t.status !== 'Refunded').reduce((s, t) => s + t.vat, 0),
    }
  }, [transactions])

  const uniqueDates = useMemo(() => {
    const dateSet: Record<string, boolean> = {}
    ALL_TRANSACTIONS.forEach(t => { dateSet[t.date] = true })
    return Object.keys(dateSet).sort().reverse()
  }, [])

  const handleRefund = (txn: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === txn.id ? { ...t, status: 'Refunded' } : t))
    setShowDetail(false)
    setSelected(null)
  }

  const openDetail = (txn: Transaction) => {
    setSelected(txn)
    setShowDetail(true)
  }

  const closeDetail = () => {
    setShowDetail(false)
    setSelected(null)
  }

  const exportCsv = () => {
    const headers = ['TXN ID', 'Date', 'Time', 'Member', 'Items', 'Subtotal', 'VAT', 'Total', 'Payment', 'Status']
    const rows = displayList.map(t => [t.id, t.date, t.time, t.member, t.items, t.subtotal, t.vat, t.total, t.payment, t.status])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ClubLayout title="Transaction History">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: "Today's Revenue", value: `R ${stats.todayRevenue.toLocaleString()}`, sub: 'Gross total incl. VAT' },
          { label: "Today's VAT", value: `R ${stats.todayVat.toLocaleString()}`, sub: '15% SARS liability' },
          { label: 'Transactions Today', value: String(stats.todayCount), sub: 'Completed sales' },
          { label: 'Avg Transaction', value: `R ${stats.avgTxn.toLocaleString()}`, sub: 'Per transaction' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '16px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginRight: '8px' }}>Filters</div>
        <input
          placeholder="Search by ID or member..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', width: '200px' }}
        />
        <select value={dateFilter} onChange={e => { setDateFilter(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Dates</option>
          {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={paymentFilter} onChange={e => { setPaymentFilter(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Payments</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Refunded">Refunded</option>
          <option value="Pending">Pending</option>
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button onClick={exportCsv} style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '7px 14px', cursor: 'pointer' }}>
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '16px' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
            All Transactions <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 400 }}>({displayList.length} results)</span>
          </div>
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
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#9ca3af' }}>No transactions found</td>
              </tr>
            ) : pageData.map((t, i) => {
              const statusStyle = t.status === 'Completed'
                ? { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' }
                : t.status === 'Refunded'
                ? { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' }
                : { bg: '#fffbeb', border: '#fde68a', text: '#d97706' }
              return (
                <tr key={t.id} onClick={() => openDetail(t)} style={{ cursor: 'pointer', borderBottom: i < pageData.length - 1 ? '1px solid #f3f4f6' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '13px 16px', fontSize: '12px', fontWeight: 700, color: '#16a34a', fontFamily: 'monospace' }}>{t.id}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>{t.date} {t.time}</td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{t.member}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>{t.items}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>R {t.subtotal.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>R {t.vat.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {t.total.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: t.payment === 'Cash' ? '#fffbeb' : '#eff6ff', color: t.payment === 'Cash' ? '#d97706' : '#3b82f6', border: `1px solid ${t.payment === 'Cash' ? '#fde68a' : '#bfdbfe'}` }}>{t.payment}</span>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}` }}>{t.status}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Page {Math.min(page, totalPages)} of {totalPages} — {displayList.length} total transactions
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ fontSize: '12px', fontWeight: 600, color: page === 1 ? '#d1d5db' : '#374151', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 12px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>← Prev</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) pageNum = i + 1
              else if (page <= 3) pageNum = i + 1
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + i
              else pageNum = page - 2 + i
              return (
                <button key={pageNum} onClick={() => setPage(pageNum)} style={{ fontSize: '12px', fontWeight: 600, color: page === pageNum ? '#ffffff' : '#374151', background: page === pageNum ? '#16a34a' : '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>{pageNum}</button>
              )
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ fontSize: '12px', fontWeight: 600, color: page === totalPages ? '#d1d5db' : '#374151', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 12px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next →</button>
          </div>
        </div>
      </div>

      {/* SARS VAT Summary */}
      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>SARS VAT Summary</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>Based on filtered transactions</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { label: 'Total Exempt Sales (0%)', value: 'R 0.00' },
            { label: 'Standard Rate Sales (15%)', value: `R ${stats.totalRevenue.toLocaleString()}` },
            { label: 'Output VAT Due', value: `R ${stats.totalVat.toLocaleString()}` },
          ].map(item => (
            <div key={item.label} style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '14px 18px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={closeDetail}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', maxWidth: '560px', width: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Transaction Detail</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>{selected.id}</div>
              </div>
              <button onClick={closeDetail} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#9ca3af', lineHeight: 1, padding: '0' }}>×</button>
            </div>

            <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Date', value: selected.date },
                  { label: 'Time', value: selected.time },
                  { label: 'Member', value: selected.member },
                  { label: 'Payment', value: selected.payment },
                  { label: 'Items', value: String(selected.items) },
                  { label: 'Status', value: selected.status },
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{row.label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
              {[
                { label: 'Subtotal (excl. VAT)', value: `R ${selected.subtotal.toLocaleString()}` },
                { label: 'VAT @ 15%', value: `R ${selected.vat.toLocaleString()}` },
                { label: 'Total (incl. VAT)', value: `R ${selected.total.toLocaleString()}`, bold: true },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: row.bold ? 700 : 400, color: row.bold ? '#111827' : '#6b7280', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {selected.status === 'Completed' && (
                <button onClick={() => handleRefund(selected)} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#ffffff', background: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  ↩ Refund Transaction
                </button>
              )}
              <button onClick={closeDetail} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ClubLayout>
  )
}
