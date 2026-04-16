'use client'
import Link from 'next/link'
import { useState } from 'react'

const monthlyData = [
  { month: 'January 2026', salesExcl: 182340, vatOnSales: 27351, purchasesExcl: 98400, vatOnPurchases: 14760, netPayable: 12591 },
  { month: 'February 2026', salesExcl: 165200, vatOnSales: 24780, purchasesExcl: 87600, vatOnPurchases: 13140, netPayable: 11640 },
  { month: 'March 2026', salesExcl: 201450, vatOnSales: 30218, purchasesExcl: 112000, vatOnPurchases: 16800, netPayable: 13418 },
]

const vatRates = { standard: 15, reduced: 0 }

export default function VATReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState('March 2026')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2026-0316', date: '2026-03-16', customerName: 'Priya Kartik',
    customerVat: '', subtotal: 856.52, vat: 128.48, total: 985.00, items: [
      { name: 'Pink Panther Flower 3.5g', qty: 2, unitPrice: 280.00, vat: 73.04, total: 633.04 },
      { name: 'Sour Diesel Concentrate 1g', qty: 1, unitPrice: 203.48, vat: 55.44, total: 351.96 },
    ]
  })

  const current = monthlyData.find(m => m.month === selectedMonth) || monthlyData[2]
  const totalSalesExcl = monthlyData.reduce((s, m) => s + m.salesExcl, 0)
  const totalVat = monthlyData.reduce((s, m) => s + m.vatOnSales, 0)
  const totalNet = monthlyData.reduce((s, m) => s + m.netPayable, 0)

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
          { label: 'Audit Trail', href: '/admin/audit', icon: '▤' },
          { label: 'FICA Verification', href: '/admin/fica', icon: '▥' },
          { label: 'VAT Reports', href: '/reports/vat', icon: '▦', active: true },
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>SARS VAT Reporting</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              ⬇ Export SARS CSV
            </button>
            <button onClick={() => setShowInvoiceModal(true)} style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#2563eb', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              + Generate Invoice
            </button>
          </div>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Info banner */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>ℹ</span>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>
              <strong>VAT Rate:</strong> 15% (standard rate). SARS VAT 201 return must be submitted monthly by the 25th. Records retained for 5 years per SARS requirements.
            </div>
          </div>

          {/* VAT Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Sales (excl. VAT)', value: `R ${current.salesExcl.toLocaleString()}`, color: '#111827' },
              { label: 'VAT on Sales', value: `R ${current.vatOnSales.toLocaleString()}`, color: '#16a34a' },
              { label: 'VAT on Purchases', value: `R ${current.vatOnPurchases.toLocaleString()}`, color: '#d97706' },
              { label: 'Net VAT Payable', value: `R ${current.netPayable.toLocaleString()}`, color: current.netPayable > 0 ? '#dc2626' : '#16a34a' },
            ].map(card => (
              <div key={card.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>{card.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
            {/* Monthly Breakdown Table */}
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>VAT Return Summary — {new Date().getFullYear()}</div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Period', 'Sales (excl)', 'VAT Collected', 'Purchases (excl)', 'VAT on Inputs', 'Net Payable'].map(h => (
                      <th key={h} style={{ padding: '11px 14px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((row, i) => (
                    <tr key={row.month} style={{ borderBottom: i < monthlyData.length - 1 ? '1px solid #f3f4f6' : 'none', background: row.month === selectedMonth ? '#f0fdf4' : 'transparent', cursor: 'pointer' }} onClick={() => setSelectedMonth(row.month)}>
                      <td style={{ padding: '13px 14px', fontSize: '12px', fontWeight: 600, color: row.month === selectedMonth ? '#16a34a' : '#374151' }}>{row.month}</td>
                      <td style={{ padding: '13px 14px', fontSize: '12px', color: '#374151', textAlign: 'right' }}>R {row.salesExcl.toLocaleString()}</td>
                      <td style={{ padding: '13px 14px', fontSize: '12px', color: '#16a34a', fontWeight: 600, textAlign: 'right' }}>R {row.vatOnSales.toLocaleString()}</td>
                      <td style={{ padding: '13px 14px', fontSize: '12px', color: '#374151', textAlign: 'right' }}>R {row.purchasesExcl.toLocaleString()}</td>
                      <td style={{ padding: '13px 14px', fontSize: '12px', color: '#d97706', textAlign: 'right' }}>R {row.vatOnPurchases.toLocaleString()}</td>
                      <td style={{ padding: '13px 14px', fontSize: '12px', fontWeight: 700, color: row.netPayable > 0 ? '#dc2626' : '#16a34a', textAlign: 'right' }}>R {row.netPayable.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f9fafb', fontWeight: 700 }}>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#374151' }}>Total YTD</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#374151', textAlign: 'right' }}>R {totalSalesExcl.toLocaleString()}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#16a34a', textAlign: 'right' }}>R {totalVat.toLocaleString()}</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#374151', textAlign: 'right' }}>—</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#374151', textAlign: 'right' }}>—</td>
                    <td style={{ padding: '13px 14px', fontSize: '12px', color: '#dc2626', textAlign: 'right' }}>R {totalNet.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* VAT Invoice Sample */}
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>VAT Invoice Preview</div>
              </div>
              <div style={{ padding: '20px', background: '#fafafa' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>CannaBuy Club</div>
                      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>VAT No: 4912345678</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>INVOICE</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{invoiceData.invoiceNumber}</div>
                      <div style={{ fontSize: '11px', color: '#6b7280' }}>{invoiceData.date}</div>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Bill To:</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{invoiceData.customerName}</div>
                  </div>
                  {invoiceData.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '12px' }}>
                      <div>
                        <div style={{ color: '#374151' }}>{item.name}</div>
                        <div style={{ color: '#9ca3af', fontSize: '11px' }}>{item.qty} × R{item.unitPrice.toFixed(2)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#374151', fontWeight: 600 }}>R {item.total.toFixed(2)}</div>
                        <div style={{ color: '#9ca3af', fontSize: '10px' }}>VAT R{item.vat.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '12px', paddingTop: '12px' }}>
                    {[
                      { label: 'Subtotal (excl. VAT)', value: `R ${invoiceData.subtotal.toFixed(2)}` },
                      { label: 'VAT @ 15%', value: `R ${invoiceData.vat.toFixed(2)}` },
                      { label: 'Total (incl. VAT)', value: `R ${invoiceData.total.toFixed(2)}`, bold: true },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: row.bold ? 700 : 400, color: row.bold ? '#111827' : '#6b7280' }}>
                        <span>{row.label}</span>
                        <span>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowInvoiceModal(true)} style={{ width: '100%', marginTop: '12px', padding: '10px', fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#2563eb', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Generate Full Invoice
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowInvoiceModal(false)}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>VAT Invoice</div>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '6px' }}>Invoice Number</label>
                <input value={invoiceData.invoiceNumber} readOnly style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '6px' }}>Date</label>
                <input type="date" value={invoiceData.date} readOnly style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '6px' }}>Customer Name</label>
                <input value={invoiceData.customerName} readOnly style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '6px' }}>Customer VAT No. (optional)</label>
                <input value={invoiceData.customerVat} readOnly placeholder="Optional for B2B" style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
              </div>
            </div>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>Line Items</div>
              {invoiceData.items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px', marginBottom: '8px', fontSize: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#374151' }}>{item.name}</div>
                  <div style={{ color: '#6b7280' }}>Qty: {item.qty}</div>
                  <div style={{ color: '#6b7280' }}>R {item.unitPrice.toFixed(2)}</div>
                  <div style={{ color: '#16a34a', fontWeight: 600 }}>R {item.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'Subtotal (excl. VAT)', value: `R ${invoiceData.subtotal.toFixed(2)}` },
                { label: 'VAT @ 15%', value: `R ${invoiceData.vat.toFixed(2)}` },
                { label: 'Total (incl. VAT)', value: `R ${invoiceData.total.toFixed(2)}`, bold: true },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: row.bold ? 700 : 400, color: row.bold ? '#111827' : '#6b7280' }}>
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button style={{ flex: 1, padding: '10px', fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Print Invoice</button>
              <button style={{ flex: 1, padding: '10px', fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#2563eb', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
