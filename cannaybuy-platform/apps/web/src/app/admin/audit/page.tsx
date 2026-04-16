'use client'
import Link from 'next/link'
import { useState } from 'react'

const mockLogs = [
  { id: '1', action: 'create', entity_type: 'member', entity_id: 'm1', actor: 'admin@cannaclub.co.za', description: 'New member registered', before: null, after: { name: 'Thabo Molefe', status: 'pending' }, timestamp: '2026-04-16 14:32:00' },
  { id: '2', action: 'update', entity_type: 'member', entity_id: 'm2', actor: 'manager@cannaclub.co.za', description: 'FICA status changed to verified', before: { fica_status: 'pending' }, after: { fica_status: 'verified' }, timestamp: '2026-04-16 13:18:00' },
  { id: '3', action: 'void', entity_type: 'transaction', entity_id: 't1', actor: 'admin@cannaclub.co.za', description: 'Transaction TXN-7815 voided — product out of stock', before: { status: 'completed', total: 1240 }, after: { status: 'voided', total: 0 }, timestamp: '2026-04-16 12:45:00' },
  { id: '4', action: 'update', entity_type: 'stock_adjustment', entity_id: 's1', actor: 'budtender@cannaclub.co.za', description: 'Stock adjusted: Pink Panther Flower −50g (damage)', before: { qty: 200 }, after: { qty: 150 }, timestamp: '2026-04-16 11:22:00' },
  { id: '5', action: 'refund', entity_type: 'transaction', entity_id: 't2', actor: 'admin@cannaclub.co.za', description: 'Partial refund on TXN-7810 — R150 credited', before: { status: 'completed', total: 850 }, after: { status: 'refunded', total: 700 }, timestamp: '2026-04-16 10:05:00' },
  { id: '6', action: 'update', entity_type: 'product', entity_id: 'p1', actor: 'manager@cannaclub.co.za', description: 'Price change: Sour Diesel 3.5g — R180 → R195', before: { price: 180 }, after: { price: 195 }, timestamp: '2026-04-15 16:40:00' },
  { id: '7', action: 'delete', entity_type: 'member', entity_id: 'm3', actor: 'superadmin@cannaclub.co.za', description: 'Member account deactivated — request not FICA compliant', before: { name: 'J. Smith', status: 'active' }, after: null, timestamp: '2026-04-15 09:12:00' },
  { id: '8', action: 'create', entity_type: 'transaction', entity_id: 't3', actor: 'budtender@cannaclub.co.za', description: 'Sale completed: TXN-7816', before: null, after: { total: 1240, items: 3 }, timestamp: '2026-04-14 15:30:00' },
]

const actionColors: Record<string, string> = {
  create: '#16a34a', update: '#2563eb', delete: '#dc2626',
  void: '#dc2626', refund: '#d97706', login: '#6b7280', logout: '#6b7280',
}
const actionLabels: Record<string, string> = {
  create: 'CREATE', update: 'UPDATE', delete: 'DELETE',
  void: 'VOID', refund: 'REFUND', login: 'LOGIN', logout: 'LOGOUT',
}
const entityIcons: Record<string, string> = {
  member: '◉', product: '◆', transaction: '▣', stock_adjustment: '◈', user: '◉',
}

export default function AuditLogPage() {
  const [filterEntity, setFilterEntity] = useState('all')
  const [filterAction, setFilterAction] = useState('all')
  const [filterDate, setFilterDate] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = mockLogs.filter(log => {
    if (filterEntity !== 'all' && log.entity_type !== filterEntity) return false
    if (filterAction !== 'all' && log.action !== filterAction) return false
    if (search && !log.description.toLowerCase().includes(search.toLowerCase()) && !log.actor.includes(search)) return false
    return true
  })

  const sidebar = (
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
          { label: 'Dashboard', href: '/dashboard', icon: '◫' },
          { label: 'Members', href: '/members', icon: '◉' },
          { label: 'Inventory', href: '/inventory', icon: '◈' },
          { label: 'Point of Sale', href: '/pos', icon: '◇' },
          { label: 'Products', href: '/admin/products', icon: '◆' },
          { label: 'Transactions', href: '/transactions', icon: '▣' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#6b7280' }}>
              <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
        <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', margin: '20px 0 10px' }}>Compliance</div>
        {[
          { label: 'Audit Trail', href: '/admin/audit', icon: '▤', active: true },
          { label: 'FICA Verification', href: '/admin/fica', icon: '▥' },
          { label: 'VAT Reports', href: '/reports/vat', icon: '▦' },
          { label: 'DAA Reports', href: '/reports/daa', icon: '▧' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', background: (item as any).active ? '#f0fdf4' : 'transparent', color: (item as any).active ? '#16a34a' : '#6b7280', fontWeight: (item as any).active ? 600 : 400, border: (item as any).active ? '1px solid #bbf7d0' : '1px solid transparent' }}>
              <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
      <div style={{ padding: '20px 20px', borderTop: '1px solid #d1fae5' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>CannaBuy POS</div>
        <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '3px' }}>Phase 2 · South Africa</div>
      </div>
    </aside>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {sidebar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Compliance Audit Trail</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              ⬇ Export CSV
            </button>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              ⬇ Export PDF
            </button>
          </div>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Retention notice */}
          <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '16px' }}>ℹ</span>
            <div style={{ fontSize: '12px', color: '#854d0e' }}>
              <strong>Retention Policy:</strong> All audit records are retained for minimum <strong>7 years</strong> per SA cannabis regulations. Logs are immutable and cannot be modified or deleted.
            </div>
          </div>

          {/* Filters */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <input
              type="text"
              placeholder="Search by description or user..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: '200px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
            />
            <select value={filterEntity} onChange={e => setFilterEntity(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none' }}>
              <option value="all">All Entities</option>
              <option value="member">Member</option>
              <option value="product">Product</option>
              <option value="transaction">Transaction</option>
              <option value="stock_adjustment">Stock Adjustment</option>
            </select>
            <select value={filterAction} onChange={e => setFilterAction(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none' }}>
              <option value="all">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="void">Void</option>
              <option value="refund">Refund</option>
            </select>
            <select value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#374151', outline: 'none' }}>
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <div style={{ fontSize: '12px', color: '#6b7280', marginLeft: 'auto' }}>
              {filtered.length} record{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Log table */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  {['Timestamp', 'Action', 'Entity', 'Description', 'Actor', ''].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => (
                  <>
                    <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }} onClick={() => setExpanded(expanded === log.id ? null : log.id)}>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#374151', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: actionColors[log.action] + '15', color: actionColors[log.action], border: `1px solid ${actionColors[log.action]}30` }}>
                        {actionLabels[log.action]}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#374151' }}>
                      <span style={{ marginRight: '6px' }}>{entityIcons[log.entity_type]}</span>
                      {log.entity_type.replace('_', ' ')}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#374151', maxWidth: '320px' }}>{log.description}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280' }}>{log.actor}</td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#16a34a', textAlign: 'center' }}>{expanded === log.id ? '▲' : '▼'}</td>
                  </tr>
                  {expanded === log.id && (
                    <tr key={log.id + '-detail'} style={{ background: '#fafafa' }}>
                      <td colSpan={6} style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          {log.before && (
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '14px' }}>
                              <div style={{ fontSize: '10px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Before</div>
                              <pre style={{ fontSize: '11px', color: '#991b1b', margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {JSON.stringify(log.before, null, 2)}
                              </pre>
                            </div>
                          )}
                          {log.after && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px' }}>
                              <div style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>After</div>
                              <pre style={{ fontSize: '11px', color: '#166534', margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {JSON.stringify(log.after, null, 2)}
                              </pre>
                            </div>
                          )}
                          {!log.before && !log.after && (
                            <div style={{ color: '#6b7280', fontSize: '12px', fontStyle: 'italic' }}>No state data captured</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  </>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                No audit logs match your filters
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
