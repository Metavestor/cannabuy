'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock transaction data
const mockTransactions = [
  { id: '1', invoice_number: 'INV-2024-0001', member_name: 'John Smith', subtotal_excl_vat_zar: 739.13, vat_amount_zar: 110.87, total_incl_vat_zar: 850.00, payment_method: 'eft', status: 'completed', created_at: '2024-04-15 10:30:00' },
  { id: '2', invoice_number: 'INV-2024-0002', member_name: 'Jane Doe', subtotal_excl_vat_zar: 304.35, vat_amount_zar: 45.65, total_incl_vat_zar: 350.00, payment_method: 'cash', status: 'completed', created_at: '2024-04-15 11:45:00' },
  { id: '3', invoice_number: 'INV-2024-0003', member_name: 'Mike Johnson', subtotal_excl_vat_zar: 1043.48, vat_amount_zar: 156.52, total_incl_vat_zar: 1200.00, payment_method: 'snapscan', status: 'completed', created_at: '2024-04-15 14:20:00' },
  { id: '4', invoice_number: 'INV-2024-0004', member_name: 'John Smith', subtotal_excl_vat_zar: 565.22, vat_amount_zar: 84.78, total_incl_vat_zar: 650.00, payment_method: 'eft', status: 'refunded', created_at: '2024-04-14 09:15:00' },
  { id: '5', invoice_number: 'INV-2024-0005', member_name: 'Sarah Williams', subtotal_excl_vat_zar: 217.39, vat_amount_zar: 32.61, total_incl_vat_zar: 250.00, payment_method: 'yoco', status: 'pending', created_at: '2024-04-16 08:00:00' },
]

const mockLineItems: Record<string, Array<{ name: string; qty: number; price: number }>> = {
  '1': [{ name: 'Purple Haze (28g)', qty: 1, price: 850.00 }],
  '2': [{ name: 'THC Gummies (10pk)', qty: 1, price: 350.00 }],
  '3': [{ name: 'Water Hash (7g)', qty: 1, price: 1200.00 }],
  '4': [{ name: 'CBD Oil 1000mg', qty: 1, price: 650.00 }],
  '5': [{ name: 'OG Kush (28g)', qty: 1, price: 250.00 }],
}

export default function TransactionsPage() {
  const [transactions] = useState(mockTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTx, setSelectedTx] = useState<any>(null)

  const filteredTx = transactions.filter(tx => {
    const matchesSearch = tx.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.member_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.total_incl_vat_zar, 0)
  const totalVAT = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.vat_amount_zar, 0)

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return { color: '#059669', bg: '#ecfdf5' }
      case 'pending': return { color: '#d97706', bg: '#fffbeb' }
      case 'refunded': return { color: '#dc2626', bg: '#fef2f2' }
      default: return { color: '#6b7280', bg: '#f3f4f6' }
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'eft': return '🏦'
      case 'cash': return '💵'
      case 'snapscan': return '📱'
      case 'yoco': return '💳'
      case 'payfast': return '🔒'
      default: return '💰'
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside style={{ width: '240px', background: 'white', borderRight: '0.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '240px', height: 'auto', display: 'block' }} />
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>Cannabis Club Management</div>
          <div style={{ display: 'inline-block', marginTop: '8px', background: '#e8f5ef', color: '#1a7a4a', fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '10px' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '▦' },
            { label: 'Members', href: '/members', icon: '👥' },
            { label: 'Inventory', href: '/inventory', icon: '📦' },
            { label: 'Point of Sale', href: '/pos', icon: '🧾' },
            { label: 'Transactions', href: '/transactions', icon: '📊', active: true },
            { label: 'Financials', href: '/financial', icon: '💰' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', fontSize: '13px', background: (item as any).active ? '#e8f5ef' : 'transparent', color: (item as any).active ? '#1a7a4a' : '#6b7280', fontWeight: (item as any).active ? '600' : '400' }}>
                <span style={{ fontSize: '14px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '0.5px solid #e5e7eb', fontSize: '11px', color: '#9ca3af' }}>v1.0 · South Africa</div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'white', borderBottom: '0.5px solid #e5e7eb', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '15px', fontWeight: '600' }}>Transactions</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#e8f5ef', color: '#1a7a4a', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a7a4a', display: 'inline-block' }} />
              System Active
            </div>
          </div>
        </header>

        <div style={{ padding: '24px', flex: 1 }}>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#f0faf4', borderRadius: '10px', padding: '16px', border: '0.5px solid #d1fae5' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>Total Revenue (VAT Incl)</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#111' }}>R {totalRevenue.toFixed(2)}</div>
            </div>
            <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '16px', border: '0.5px solid #fde68a' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>VAT Collected (15%)</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#111' }}>R {totalVAT.toFixed(2)}</div>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: '10px', padding: '16px', border: '0.5px solid #e5e7eb' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>Total Transactions</div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#111' }}>{transactions.length}</div>
            </div>
          </div>

          {/* Filters */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search invoice or member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '260px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Transactions Table */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Invoice</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Member</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Payment</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Subtotal</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>VAT</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Total</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTx.map(tx => {
                  const statusStyle = getStatusStyle(tx.status)
                  return (
                    <tr key={tx.id} style={{ borderBottom: '0.5px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'monospace', fontWeight: '500' }}>{tx.invoice_number}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>{tx.member_name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{tx.created_at}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                        <span style={{ marginRight: '4px' }}>{getMethodIcon(tx.payment_method)}</span>
                        {tx.payment_method.toUpperCase()}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px' }}>R {tx.subtotal_excl_vat_zar.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#6b7280' }}>R {tx.vat_amount_zar.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '600' }}>R {tx.total_incl_vat_zar.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', background: statusStyle.bg, color: statusStyle.color }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button onClick={() => setSelectedTx(tx)} style={{ background: 'none', border: 'none', color: '#1a7a4a', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>View</button>
                        {tx.status === 'completed' && (
                          <button style={{ background: 'none', border: 'none', color: '#d97706', fontSize: '12px', fontWeight: '500', cursor: 'pointer', marginLeft: '8px' }}>Refund</button>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {filteredTx.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '40px 16px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedTx && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '0', width: '380px', maxHeight: '80vh', overflow: 'auto' }}>
            {/* Receipt Header */}
            <div style={{ padding: '20px', borderBottom: '2px dashed #e5e7eb', textAlign: 'center' }}>
              <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '240px', height: 'auto', display: 'block' }} />
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Cannabis Club Management</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>South Africa</div>
            </div>

            {/* Receipt Info */}
            <div style={{ padding: '16px 20px', borderBottom: '2px dashed #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Invoice:</span>
                <span style={{ fontSize: '12px', fontWeight: '500' }}>{selectedTx.invoice_number}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Date:</span>
                <span style={{ fontSize: '12px' }}>{selectedTx.created_at}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Member:</span>
                <span style={{ fontSize: '12px' }}>{selectedTx.member_name}</span>
              </div>
            </div>

            {/* Line Items */}
            <div style={{ padding: '16px 20px', borderBottom: '2px dashed #e5e7eb' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>ITEMS</div>
              {mockLineItems[selectedTx.id]?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div>
                    <div style={{ fontSize: '12px' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Qty: {item.qty}</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>R {item.price.toFixed(2)}</span>
                </div>
              )) || <div style={{ fontSize: '12px', color: '#6b7280' }}>No items</div>}
            </div>

            {/* Totals */}
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Subtotal (excl VAT):</span>
                <span style={{ fontSize: '12px' }}>R {selectedTx.subtotal_excl_vat_zar.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>VAT (15%):</span>
                <span style={{ fontSize: '12px' }}>R {selectedTx.vat_amount_zar.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>TOTAL:</span>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>R {selectedTx.total_incl_vat_zar.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>Payment:</span>
                <span style={{ fontSize: '11px' }}>{getMethodIcon(selectedTx.payment_method)} {selectedTx.payment_method.toUpperCase()}</span>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '16px 20px', borderTop: '2px dashed #e5e7eb', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px' }}>SARS VAT Compliant</div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>Thank you for your business</div>
            </div>

            {/* Close Button */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e7eb' }}>
              <button onClick={() => setSelectedTx(null)} style={{ width: '100%', padding: '10px', background: '#1a7a4a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
