import Link from 'next/link'

const products = [
  { id: 1, sku: 'SKU-001', name: 'Purple Haze', category: 'Sativa', thc: '18%', cbd: '0.1%', stock: 28, price: 850, supplier: 'CannaCo ZA', status: 'Active' },
  { id: 2, sku: 'SKU-002', name: 'Northern Lights', category: 'Indica', thc: '22%', cbd: '0.05%', stock: 14, price: 720, supplier: 'CannaCo ZA', status: 'Active' },
  { id: 3, sku: 'SKU-003', name: 'OG Kush', category: 'Hybrid', thc: '24%', cbd: '0.1%', stock: 21, price: 780, supplier: 'GreenLeaf SA', status: 'Active' },
  { id: 4, sku: 'SKU-004', name: 'THC Gummies', category: 'Edible', thc: '10mg', cbd: '0%', stock: 42, price: 350, supplier: 'SweetLeaf', status: 'Active' },
  { id: 5, sku: 'SKU-005', name: 'Water Hash', category: 'Concentrate', thc: '65%', cbd: '0.3%', stock: 4, price: 1200, supplier: 'Hash House', status: 'Low Stock' },
  { id: 6, sku: 'SKU-006', name: 'CBD Oil 1000mg', category: 'Wellness', thc: '0%', cbd: '1000mg', stock: 35, price: 650, supplier: 'CannaCo ZA', status: 'Active' },
  { id: 7, sku: 'SKU-007', name: 'Sour Diesel', category: 'Sativa', thc: '19%', cbd: '0.05%', stock: 0, price: 890, supplier: 'GreenLeaf SA', status: 'Out of Stock' },
  { id: 8, sku: 'SKU-008', name: 'Blue Cheese', category: 'Indica', thc: '20%', cbd: '0.1%', stock: 17, price: 810, supplier: 'CannaCo ZA', status: 'Active' },
]

export default function ProductsPage() {
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
            { label: 'Products', href: '/admin/products', icon: '◆', active: true },
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>Product Catalogue</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '6px', color: '#4a6080', fontSize: '11px', fontWeight: 600, padding: '7px 14px', cursor: 'pointer' }}>Import</button>
            <button style={{ background: '#22c55e', border: 'none', borderRadius: '6px', color: '#0a0f14', fontSize: '12px', fontWeight: 700, padding: '8px 16px', cursor: 'pointer' }}>+ Add Product</button>
          </div>
        </header>

        <main style={{ padding: '28px', flex: 1 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {[
              { label: 'Total Products', value: '48', sub: 'In catalogue' },
              { label: 'Active Products', value: '43', sub: 'Available for sale' },
              { label: 'Categories', value: '6', sub: 'Product types' },
              { label: 'Avg Price', value: 'R 762', sub: 'Per unit' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontSize: '11px', color: '#3d4f63', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#4a6080' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['All Products', 'Sativa', 'Indica', 'Hybrid', 'Edible', 'Concentrate', 'Wellness'].map((cat, i) => (
              <button key={cat} style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: i === 0 ? '#22c55e' : '#0a0f14', color: i === 0 ? '#0a0f14' : '#4a6080', border: `1px solid ${i === 0 ? '#22c55e' : '#1a2535'}`, transition: 'all 0.15s' }}>{cat}</button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {products.map(p => {
              const statusStyle = p.status === 'Active' ? { bg: '#0d1f12', border: '#1a3322', text: '#22c55e' } : p.status === 'Low Stock' ? { bg: '#1a150a', border: '#3d2a0a', text: '#f59e0b' } : { bg: '#1f0a0a', border: '#3d1515', text: '#ef4444' }
              return (
                <div key={p.id} style={{ background: '#0a0f14', border: '1px solid #1a2535', borderRadius: '10px', padding: '20px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#0f1923', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      {p.category === 'Edible' ? '🍬' : p.category === 'Wellness' ? '💧' : p.category === 'Concentrate' ? '🧊' : '🌿'}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px', background: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}` }}>{p.status.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#3d4f63', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.3px' }}>{p.sku} · {p.category}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>{p.name}</div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px', background: '#0f1923', color: '#22c55e', border: '1px solid #1a2535' }}>THC {p.thc}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px', background: '#0f1923', color: '#60a5fa', border: '1px solid #1a2535' }}>CBD {p.cbd}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '14px', borderTop: '1px solid #1a2535' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#3d4f63', marginBottom: '2px' }}>Stock</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: p.stock === 0 ? '#ef4444' : p.stock < 10 ? '#f59e0b' : '#e2e8f0' }}>{p.stock} units</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: '#3d4f63', marginBottom: '2px' }}>Price</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>R {p.price}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', fontSize: '10px', color: '#3d4f63' }}>Supplier: {p.supplier}</div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
