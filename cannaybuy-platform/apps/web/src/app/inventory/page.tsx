'use client'
import Link from 'next/link'

const inventory = [
  { sku: 'SKU-001', name: 'Purple Haze', category: 'Sativa', stock: 28, unit: '3.5g', reorderLevel: 10, price: 850, status: 'In Stock' },
  { sku: 'SKU-002', name: 'Northern Lights', category: 'Indica', stock: 14, unit: '3.5g', reorderLevel: 10, price: 720, status: 'Low Stock' },
  { sku: 'SKU-003', name: 'OG Kush', category: 'Hybrid', stock: 21, unit: '3.5g', reorderLevel: 10, price: 780, status: 'In Stock' },
  { sku: 'SKU-004', name: 'THC Gummies', category: 'Edible', stock: 42, unit: 'pack', reorderLevel: 15, price: 350, status: 'In Stock' },
  { sku: 'SKU-005', name: 'Water Hash', category: 'Concentrate', stock: 4, unit: '1g', reorderLevel: 5, price: 1200, status: 'Critical' },
  { sku: 'SKU-006', name: 'CBD Oil 1000mg', category: 'Wellness', stock: 35, unit: '30ml', reorderLevel: 10, price: 650, status: 'In Stock' },
]

export default function InventoryPage() {
  const statusStyle = (status: string) => {
    if (status === 'In Stock') return { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' }
    if (status === 'Low Stock') return { bg: '#fffbeb', border: '#fde68a', text: '#d97706' }
    return { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
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
            { label: 'Dashboard', href: '/dashboard', icon: '◫', active: false },
            { label: 'Members', href: '/members', icon: '◉', active: false },
            { label: 'Inventory', href: '/inventory', icon: '◈', active: true },
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Inventory Management</div>
          <button style={{ background: '#16a34a', border: '1px solid #16a34a', borderRadius: '10px', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '9px 18px', cursor: 'pointer' }}>+ Add Stock</button>
        </header>

        <main style={{ padding: '28px', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'Total Products', value: '48', sub: 'Across all categories' },
              { label: 'Total Stock Value', value: 'R 186,500', sub: 'At current prices' },
              { label: 'Low Stock Alerts', value: '3', sub: 'Below reorder level' },
              { label: 'Out of Stock', value: '0', sub: 'Zero items unavailable' },
            ].map(s => (
              <div key={s.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Product Inventory</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', color: '#16a34a', fontSize: '11px', fontWeight: 600, padding: '7px 14px', cursor: 'pointer' }}>Export CSV</button>
                <input placeholder="Search inventory..." style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '7px 12px', fontSize: '12px', color: '#111827', width: '180px', outline: 'none' }} />
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['SKU', 'Product', 'Category', 'Stock', 'Reorder At', 'Unit Price', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, i) => {
                  const sc = statusStyle(item.status)
                  return (
                    <tr key={item.sku} style={{ borderBottom: i < inventory.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#16a34a', fontFamily: 'monospace' }}>{item.sku}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{item.name}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280' }}>{item.category}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: item.stock <= 5 ? '#dc2626' : '#111827' }}>{item.stock} {item.unit}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280' }}>{item.reorderLevel} {item.unit}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {item.price.toLocaleString()}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>{item.status.toUpperCase()}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
