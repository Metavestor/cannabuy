'use client'
import ClubLayout from '../../components/layout/ClubLayout'

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
    <ClubLayout title="Inventory Management">
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
    </ClubLayout>
  )
}
