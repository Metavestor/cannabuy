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
  const statusColor = (status: string) => {
    if (status === 'In Stock') return { text: '#22c55e', bg: '#0d1f12', border: '#1a3322' }
    if (status === 'Low Stock') return { text: '#f59e0b', bg: '#1a150a', border: '#3d2a0a' }
    return { text: '#ef4444', bg: '#1f0a0a', border: '#3d1515' }
  }

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
            { label: 'Inventory', href: '/inventory', icon: '◈', active: true },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: false },
            { label: 'Products', href: '/admin/products', icon: '◆', active: false },
            { label: 'Transactions', href: '/transactions', icon: '▣', active: false },
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>Inventory Management</div>
          <button style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', color: '#e2e8f0', fontSize: '12px', fontWeight: 600, padding: '8px 16px', cursor: 'pointer' }}>+ Add Stock</button>
        </header>

        <main style={{ padding: '28px', flex: 1 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'Total Products', value: '48', sub: 'Across all categories' },
              { label: 'Total Stock Value', value: 'R 186,500', sub: 'At current prices' },
              { label: 'Low Stock Alerts', value: '3', sub: 'Below reorder level' },
              { label: 'Out of Stock', value: '0', sub: 'Zero items unavailable' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontSize: '11px', color: '#3d4f63', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#4a6080' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Inventory Table */}
          <div style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a2535', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>Product Inventory</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', color: '#4a6080', fontSize: '11px', fontWeight: 600, padding: '6px 12px', cursor: 'pointer' }}>Export CSV</button>
                <input placeholder="Search inventory..." style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', padding: '7px 12px', fontSize: '12px', color: '#e2e8f0', width: '180px', outline: 'none' }} />
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0f1923' }}>
                  {['SKU', 'Product', 'Category', 'Stock', 'Reorder At', 'Unit Price', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', fontSize: '10px', fontWeight: 700, color: '#3d4f63', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #1a2535' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, i) => {
                  const sc = statusColor(item.status)
                  return (
                    <tr key={item.sku} style={{ borderBottom: i < inventory.length - 1 ? '1px solid #1a2535' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>{item.sku}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 500, color: '#e2e8f0' }}>{item.name}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#4a6080' }}>{item.category}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: item.stock <= 5 ? '#ef4444' : '#e2e8f0' }}>{item.stock} {item.unit}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#4a6080' }}>{item.reorderLevel} {item.unit}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>R {item.price.toLocaleString()}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>{item.status.toUpperCase()}</span>
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
