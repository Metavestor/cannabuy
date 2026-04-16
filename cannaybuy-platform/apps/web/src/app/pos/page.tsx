'use client'
import Link from 'next/link'
import { useState } from 'react'

const products = [
  { sku: 'SKU-001', name: 'Purple Haze', category: 'Sativa', unit: '3.5g', price: 850, stock: 28 },
  { sku: 'SKU-002', name: 'Northern Lights', category: 'Indica', unit: '3.5g', price: 720, stock: 14 },
  { sku: 'SKU-003', name: 'OG Kush', category: 'Hybrid', unit: '3.5g', price: 780, stock: 21 },
  { sku: 'SKU-004', name: 'THC Gummies', category: 'Edible', unit: 'pack', price: 350, stock: 42 },
  { sku: 'SKU-005', name: 'Water Hash', category: 'Concentrate', unit: '1g', price: 1200, stock: 4 },
  { sku: 'SKU-006', name: 'CBD Oil 1000mg', category: 'Wellness', unit: '30ml', price: 650, stock: 35 },
  { sku: 'SKU-007', name: 'Sour Diesel', category: 'Sativa', unit: '3.5g', price: 890, stock: 0 },
  { sku: 'SKU-008', name: 'Blue Cheese', category: 'Indica', unit: '3.5g', price: 810, stock: 17 },
  { sku: 'SKU-009', name: 'Green Crack', category: 'Sativa', unit: '3.5g', price: 760, stock: 12 },
  { sku: 'SKU-010', name: 'Amnesia Haze', category: 'Sativa', unit: '3.5g', price: 820, stock: 19 },
  { sku: 'SKU-011', name: 'Girl Scout Cookies', category: 'Hybrid', unit: '3.5g', price: 800, stock: 8 },
  { sku: 'SKU-012', name: 'Pink OG', category: 'Indica', unit: '3.5g', price: 870, stock: 22 },
]

export default function POSPage() {
  const [cart, setCart] = useState<{ sku: string; name: string; qty: number; price: number }[]>([])
  const [member, setMember] = useState('')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))

  const addToCart = (p: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.sku === p.sku)
      if (existing) return prev.map(i => i.sku === p.sku ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { sku: p.sku, name: p.name, qty: 1, price: p.price }]
    })
  }

  const removeFromCart = (sku: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.sku === sku)
      if (existing && existing.qty > 1) return prev.map(i => i.sku === sku ? { ...i, qty: i.qty - 1 } : i)
      return prev.filter(i => i.sku !== sku)
    })
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const vat = Math.round(subtotal * 0.15)
  const total = subtotal + vat

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
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
            { label: 'Inventory', href: '/inventory', icon: '◈', active: false },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: true },
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

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Point of Sale</div>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Product Grid */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <input
              placeholder="Search by name or SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#111827', outline: 'none', marginBottom: '16px', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {filtered.map(p => (
                <div key={p.sku} onClick={() => p.stock > 0 && addToCart(p)} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '16px', cursor: p.stock > 0 ? 'pointer' : 'not-allowed', opacity: p.stock === 0 ? 0.5 : 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '3px' }}>{p.sku}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{p.name}</div>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>{p.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>{p.stock} {p.unit} in stock</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>R {p.price}</div>
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#16a34a', fontWeight: 700 }}>+</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Panel */}
          <div style={{ width: '340px', background: '#ffffff', borderLeft: '1px solid #d1fae5', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 8px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #d1fae5' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Current Sale</div>
              <input placeholder="Member name (optional)" value={member} onChange={e => setMember(e.target.value)} style={{ width: '100%', background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#111827', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '13px' }}>No items in cart yet.<br />Click a product to add.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cart.map(item => (
                    <div key={item.sku} style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{item.name}</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {(item.price * item.qty).toLocaleString()}</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>R {item.price} × {item.qty}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button onClick={() => removeFromCart(item.sku)} style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#ffffff', border: '1px solid #d1fae5', color: '#16a34a', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => addToCart({ sku: item.sku, name: item.name, category: '', unit: '', price: item.price, stock: 99 })} style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #d1fae5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>R {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>VAT (15%)</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>R {vat.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '2px solid #d1fae5', marginBottom: '16px' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Total</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>R {total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', color: '#16a34a', fontSize: '13px', fontWeight: 700, padding: '14px', cursor: 'pointer' }}>Pay Cash</button>
                <button style={{ flex: 1, background: '#16a34a', border: '1px solid #16a34a', borderRadius: '12px', color: '#ffffff', fontSize: '13px', fontWeight: 700, padding: '14px', cursor: 'pointer' }}>Pay Card</button>
              </div>
              <button style={{ width: '100%', background: '#ffffff', border: '1px solid #f3f4f6', borderRadius: '12px', color: '#9ca3af', fontSize: '12px', fontWeight: 600, padding: '10px', marginTop: '8px', cursor: 'pointer' }}>Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
