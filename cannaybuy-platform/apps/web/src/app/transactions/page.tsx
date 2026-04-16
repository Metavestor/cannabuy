'use client'

import { useEffect, useMemo, useState } from 'react'
import ClubLayout from '../../components/layout/ClubLayout'
import { useClub } from '../../components/context/ClubContext'
import {
  getTransactions,
  getTransactionLineItems,
  getMemberById,
  refundTransaction,
} from '../../lib/supabase/queries'
import type { Transaction as DbTransaction, TransactionLineItem } from '../../lib/supabase/types'
import { hasSupabaseConfig } from '../../lib/supabase/client'

const PAGE_SIZE = 10

type PaymentLabel = 'Cash' | 'EFT' | 'SnapScan' | 'Yoco' | 'PayFast'
type StatusLabel = 'Completed' | 'Refunded' | 'Pending' | 'Failed'

interface UiTransaction {
  id: string
  date: string
  time: string
  member: string
  items: number
  subtotal: number
  vat: number
  total: number
  payment: PaymentLabel
  status: StatusLabel
  dbId: string
  lineItems: Array<{ name: string; qty: number; price: number; total: number }>
}

const DEMO_TRANSACTIONS: UiTransaction[] = [
  { id: 'TXN-7821', date: '2026-04-16', time: '14:32', member: 'Thabo Molefe', items: 3, subtotal: 1080, vat: 162, total: 1242, payment: 'Cash', status: 'Completed', dbId: '', lineItems: [{ name: 'Purple Haze', qty: 1, price: 850, total: 850 }, { name: 'OG Kush', qty: 1, price: 780, total: 780 }] },
  { id: 'TXN-7820', date: '2026-04-16', time: '13:18', member: 'Priya Kartik', items: 1, subtotal: 739, vat: 111, total: 850, payment: 'EFT', status: 'Completed', dbId: '', lineItems: [{ name: 'Northern Lights', qty: 1, price: 720, total: 720 }] },
  { id: 'TXN-7819', date: '2026-04-16', time: '12:45', member: 'Johan Snyman', items: 5, subtotal: 1826, vat: 274, total: 2100, payment: 'Cash', status: 'Completed', dbId: '', lineItems: [] },
  { id: 'TXN-7818', date: '2026-04-16', time: '11:22', member: 'Lisa Nkosi', items: 2, subtotal: 852, vat: 128, total: 980, payment: 'EFT', status: 'Completed', dbId: '', lineItems: [] },
  { id: 'TXN-7817', date: '2026-04-16', time: '10:05', member: 'David Rossouw', items: 4, subtotal: 1435, vat: 215, total: 1650, payment: 'Cash', status: 'Completed', dbId: '', lineItems: [] },
  { id: 'TXN-7816', date: '2026-04-15', time: '09:30', member: 'Amara Diallo', items: 2, subtotal: 1080, vat: 162, total: 1242, payment: 'EFT', status: 'Completed', dbId: '', lineItems: [] },
  { id: 'TXN-7815', date: '2026-04-15', time: '16:44', member: 'Keitumetse Moiloa', items: 3, subtotal: 950, vat: 143, total: 1093, payment: 'Cash', status: 'Completed', dbId: '', lineItems: [] },
  { id: 'TXN-7814', date: '2026-04-15', time: '15:10', member: 'Jannes van der Merwe', items: 6, subtotal: 2150, vat: 323, total: 2473, payment: 'Yoco', status: 'Refunded', dbId: '', lineItems: [] },
  { id: 'TXN-7813', date: '2026-04-15', time: '14:55', member: 'Thabo Molefe', items: 2, subtotal: 620, vat: 93, total: 713, payment: 'PayFast', status: 'Completed', dbId: '', lineItems: [] },
  { id: 'TXN-7812', date: '2026-04-14', time: '13:30', member: 'Priya Kartik', items: 4, subtotal: 1340, vat: 201, total: 1541, payment: 'SnapScan', status: 'Completed', dbId: '', lineItems: [] },
]

function paymentLabel(method: DbTransaction['payment_method']): PaymentLabel {
  switch (method) {
    case 'cash': return 'Cash'
    case 'eft': return 'EFT'
    case 'snapscan': return 'SnapScan'
    case 'yoco': return 'Yoco'
    case 'payfast': return 'PayFast'
    default: return 'EFT'
  }
}

function statusLabel(status: DbTransaction['status']): StatusLabel {
  switch (status) {
    case 'completed': return 'Completed'
    case 'refunded': return 'Refunded'
    case 'pending': return 'Pending'
    case 'failed': return 'Failed'
    default: return 'Pending'
  }
}

function mapDbTxn(txn: DbTransaction, memberName: string, lineItems: TransactionLineItem[]): UiTransaction {
  const createdAt = txn.created_at ? new Date(txn.created_at) : new Date()
  return {
    id: txn.invoice_number,
    date: createdAt.toISOString().slice(0, 10),
    time: createdAt.toLocaleTimeString('en-ZA', { timeZone: 'Africa/Johannesburg', hour: '2-digit', minute: '2-digit' }),
    member: memberName,
    items: lineItems.reduce((sum, li) => sum + li.qty, 0),
    subtotal: txn.subtotal_excl_vat_zar,
    vat: txn.vat_amount_zar,
    total: txn.total_incl_vat_zar,
    payment: paymentLabel(txn.payment_method),
    status: statusLabel(txn.status),
    dbId: txn.id,
    lineItems: lineItems.map(li => ({
      name: li.product_name,
      qty: li.qty,
      price: li.unit_price_incl_vat_zar,
      total: li.line_total,
    })),
  }
}

export default function TransactionsPage() {
  const { activeClubId, isDemo } = useClub()
  const [transactions, setTransactions] = useState<UiTransaction[]>(DEMO_TRANSACTIONS)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<UiTransaction | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!hasSupabaseConfig() || isDemo || !activeClubId) {
        setTransactions(DEMO_TRANSACTIONS)
        return
      }

      setLoading(true)
      try {
        const txns = await getTransactions(activeClubId, 200)
        const mapped = await Promise.all(
          txns.map(async (txn) => {
            const [member, lineItems] = await Promise.all([
              txn.member_id ? getMemberById(txn.member_id) : Promise.resolve(null),
              getTransactionLineItems(txn.id),
            ])

            const memberName = member
              ? `${member.first_name} ${member.last_name}`
              : 'Walk-in Customer'

            return mapDbTxn(txn, memberName, lineItems)
          })
        )

        if (!cancelled) {
          setTransactions(mapped.length ? mapped : DEMO_TRANSACTIONS)
        }
      } catch (error) {
        console.error('[transactions] load error:', error)
        if (!cancelled) setTransactions(DEMO_TRANSACTIONS)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [activeClubId, isDemo])

  const today = new Date().toISOString().slice(0, 10)

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = !search || t.id.toLowerCase().includes(search.toLowerCase()) || t.member.toLowerCase().includes(search.toLowerCase())
      const matchDate = dateFilter === 'all' || t.date === dateFilter
      const matchPayment = paymentFilter === 'all' || t.payment === paymentFilter
      const matchStatus = statusFilter === 'all' || t.status === statusFilter
      return matchSearch && matchDate && matchPayment && matchStatus
    })
  }, [transactions, search, dateFilter, paymentFilter, statusFilter])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)), [filtered.length])
  const pageData = useMemo(() => filtered.slice((Math.min(page, totalPages) - 1) * PAGE_SIZE, Math.min(page, totalPages) * PAGE_SIZE), [filtered, page, totalPages])

  const stats = useMemo(() => {
    const todayTxns = transactions.filter(t => t.date === today && t.status !== 'Refunded')
    const todayRevenue = todayTxns.reduce((sum, t) => sum + t.total, 0)
    const todayVat = todayTxns.reduce((sum, t) => sum + t.vat, 0)
    return {
      todayRevenue,
      todayVat,
      todayCount: todayTxns.length,
      avgTxn: todayTxns.length ? Math.round(todayRevenue / todayTxns.length) : 0,
      totalRevenue: transactions.filter(t => t.status !== 'Refunded').reduce((sum, t) => sum + t.total, 0),
      totalVat: transactions.filter(t => t.status !== 'Refunded').reduce((sum, t) => sum + t.vat, 0),
    }
  }, [transactions, today])

  const uniqueDates = useMemo(() => Array.from(new Set(transactions.map(t => t.date))).sort().reverse(), [transactions])

  const handleRefund = async (txn: UiTransaction) => {
    if (hasSupabaseConfig() && !isDemo && activeClubId && txn.dbId) {
      try {
        const ok = await refundTransaction(txn.dbId, activeClubId, 'system')
        if (!ok) throw new Error('Refund failed')
      } catch (e) {
        console.error('[transactions] refundTransaction error:', e)
      }
    }

    setTransactions(prev => prev.map(t => t.id === txn.id ? { ...t, status: 'Refunded' } : t))
    setShowDetail(false)
    setSelected(null)
  }

  const exportCsv = () => {
    const headers = ['TXN ID', 'Date', 'Time', 'Member', 'Items', 'Subtotal', 'VAT', 'Total', 'Payment', 'Status']
    const rows = filtered.map(t => [t.id, t.date, t.time, t.member, t.items, t.subtotal, t.vat, t.total, t.payment, t.status])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions-${today}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ClubLayout title="Transaction History">
      {loading && transactions.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#9ca3af', fontSize: '14px' }}>Loading transactions...</div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: "Today's Revenue", value: `R ${stats.todayRevenue.toLocaleString()}`, sub: 'Gross total incl. VAT' },
          { label: "Today's VAT", value: `R ${stats.todayVat.toLocaleString()}`, sub: '15% SARS liability' },
          { label: 'Transactions Today', value: String(stats.todayCount), sub: 'Completed sales' },
          { label: 'Avg Transaction', value: `R ${stats.avgTxn.toLocaleString()}`, sub: 'Per transaction' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '16px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginRight: '8px' }}>Filters</div>
        <input placeholder="Search by ID or member..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', width: '200px' }} />
        <select value={dateFilter} onChange={e => { setDateFilter(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Dates</option>
          {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={paymentFilter} onChange={e => { setPaymentFilter(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Payments</option>
          {['Cash', 'EFT', 'SnapScan', 'Yoco', 'PayFast'].map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }} style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', outline: 'none', cursor: 'pointer' }}>
          <option value="all">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Refunded">Refunded</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={exportCsv} style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '7px 14px', cursor: 'pointer' }}>Export CSV</button>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '16px' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>All Transactions <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 400 }}>({filtered.length} results)</span></div>
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
              <tr><td colSpan={9} style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#9ca3af' }}>No transactions found</td></tr>
            ) : pageData.map((t, i) => {
              const ss = t.status === 'Completed' ? { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' } : t.status === 'Refunded' ? { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' } : t.status === 'Failed' ? { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' } : { bg: '#fffbeb', border: '#fde68a', text: '#d97706' }
              const ps = t.payment === 'Cash' ? { bg: '#fffbeb', border: '#fde68a', text: '#d97706' } : t.payment === 'EFT' ? { bg: '#eff6ff', border: '#bfdbfe', text: '#3b82f6' } : t.payment === 'SnapScan' ? { bg: '#f5f3ff', border: '#ddd6fe', text: '#7c3aed' } : t.payment === 'Yoco' ? { bg: '#eef2ff', border: '#c7d2fe', text: '#4f46e5' } : { bg: '#ecfeff', border: '#a5f3fc', text: '#0891b2' }
              return (
                <tr key={t.id} onClick={() => { setSelected(t); setShowDetail(true) }} style={{ cursor: 'pointer', borderBottom: i < pageData.length - 1 ? '1px solid #f3f4f6' : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '13px 16px', fontSize: '12px', fontWeight: 700, color: '#16a34a', fontFamily: 'monospace' }}>{t.id}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>{t.date} {t.time}</td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{t.member}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>{t.items}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>R {t.subtotal.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#6b7280' }}>R {t.vat.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {t.total.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: ps.bg, color: ps.text, border: `1px solid ${ps.border}` }}>{t.payment}</span></td>
                  <td style={{ padding: '13px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: ss.bg, color: ss.text, border: `1px solid ${ss.border}` }}>{t.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ padding: '14px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Page {Math.min(page, totalPages)} of {totalPages}</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ fontSize: '12px', fontWeight: 600, color: page === 1 ? '#d1d5db' : '#374151', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 12px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pn: number
              if (totalPages <= 5) pn = i + 1
              else if (page <= 3) pn = i + 1
              else if (page >= totalPages - 2) pn = totalPages - 4 + i
              else pn = page - 2 + i
              return <button key={pn} onClick={() => setPage(pn)} style={{ fontSize: '12px', fontWeight: 600, color: page === pn ? '#fff' : '#374151', background: page === pn ? '#16a34a' : '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>{pn}</button>
            })}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ fontSize: '12px', fontWeight: 600, color: page === totalPages ? '#d1d5db' : '#374151', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 12px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>SARS VAT Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[{ label: 'Total Exempt Sales (0%)', value: 'R 0.00' }, { label: 'Standard Rate Sales (15%)', value: `R ${stats.totalRevenue.toLocaleString()}` }, { label: 'Output VAT Due', value: `R ${stats.totalVat.toLocaleString()}` }].map(item => (
            <div key={item.label} style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '14px 18px' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {showDetail && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => { setShowDetail(false); setSelected(null) }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '560px', width: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Transaction Detail</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>{selected.id}</div>
              </div>
              <button onClick={() => { setShowDetail(false); setSelected(null) }} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>

            <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[{ label: 'Date', value: selected.date }, { label: 'Time', value: selected.time }, { label: 'Member', value: selected.member }, { label: 'Payment', value: selected.payment }, { label: 'Status', value: selected.status }].map(row => (
                <div key={row.label}>
                  <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{row.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{row.value}</div>
                </div>
              ))}
            </div>

            {selected.lineItems.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Line Items</div>
                {selected.lineItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '12px' }}>
                    <span style={{ color: '#374151' }}>{item.qty}× {item.name}</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>R {item.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
              {[{ label: 'Subtotal (excl. VAT)', value: `R ${selected.subtotal.toLocaleString()}` }, { label: 'VAT @ 15%', value: `R ${selected.vat.toLocaleString()}` }, { label: 'Total (incl. VAT)', value: `R ${selected.total.toLocaleString()}`, bold: true }].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: row.bold ? 700 : 400, color: row.bold ? '#111827' : '#6b7280', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                  <span>{row.label}</span><span>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {selected.status === 'Completed' && (
                <button onClick={() => handleRefund(selected)} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Refund</button>
              )}
              <button onClick={() => { setShowDetail(false); setSelected(null) }} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </ClubLayout>
  )
}
