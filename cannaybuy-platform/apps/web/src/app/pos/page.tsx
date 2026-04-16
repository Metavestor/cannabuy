'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockProducts = [
  { id: '1', name: 'Purple Haze', category: 'sativa', price: 850, thc: '22%', stock: 28 },
  { id: '2', name: 'Northern Lights', category: 'indica', price: 720, thc: '18%', stock: 14 },
  { id: '3', name: 'THC Gummies', category: 'edible', price: 350, thc: '10mg', stock: 42 },
  { id: '4', name: 'Water Hash', category: 'concentrate', price: 1200, thc: '65%', stock: 8 },
  { id: '5', name: 'OG Kush', category: 'hybrid', price: 780, thc: '20%', stock: 21 },
  { id: '6', name: 'CBD Oil 1000mg', category: 'wellness', price: 650, thc: '0%', stock: 35 },
]

const categories = ['All', 'Sativa', 'Indica', 'Hybrid', 'Edible', 'Concentrate', 'Wellness']

export default function POSPage() {
  const [cart, setCart] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta
        return newQty > 0 ? { ...item, qty: newQty } : item
      }
      return item
    }).filter(item => item.qty > 0))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const vat = subtotal * 0.15
  const total = subtotal + vat

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
            { label: 'Point of Sale', href: '/pos', icon: '🧾', active: true },
            { label: 'Products', href: '/admin/products', icon: '📋' },
            { label: 'Transactions', href: '/transactions', icon: '📊' },
          ].map((item: any) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', fontSize: '13px', background: item.active ? '#e8f5ef' : 'transparent', color: item.active ? '#1a7a4a' : '#6b7280', fontWeight: item.active ? '600' : '400' }}>
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
          <div style={{ fontSize: '15px', fontWeight: '600' }}>Point of Sale</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#e8f5ef', color: '#1a7a4a', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a7a4a', display: 'inline-block' }} />
              System Active
            </div>
          </div>
        </header>

        <div style={{ padding: '24px', flex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
          {/* Product Catalog */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #e5e7eb' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '250px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <div style={{ padding: '12px 20px', borderBottom: '0.5px solid #e5e7eb', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid #e5e7eb',
                    background: selectedCategory === cat ? '#1a7a4a' : 'white',
                    color: selectedCategory === cat ? 'white' : '#6b7280',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ padding: '16px 20px', overflowY: 'auto', maxHeight: 'calc(100vh - 320px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    style={{
                      background: '#f9fafb',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ width: '100%', height: '60px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '8px' }} />
                    <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{product.category} · {product.thc}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a7a4a' }}>R {product.price.toFixed(2)}</div>
                    <div style={{ fontSize: '10px', color: product.stock < 10 ? '#dc2626' : '#6b7280' }}>Stock: {product.stock}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '0.5px solid #e5e7eb' }}>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Current Sale</div>
            </div>
            <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛒</div>
                  <div style={{ fontSize: '13px' }}>No items in cart</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '0.5px solid #f3f4f6' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '500' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>R {item.price.toFixed(2)} each</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '14px' }}>-</button>
                      <span style={{ fontSize: '13px', fontWeight: '500', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '14px' }}>+</button>
                      <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '16px 20px', borderTop: '0.5px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Subtotal (excl VAT)</span>
                <span style={{ fontSize: '12px' }}>R {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>VAT (15%)</span>
                <span style={{ fontSize: '12px' }}>R {vat.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e7eb', marginTop: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Total</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>R {total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                <button style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>💵 Cash</button>
                <button style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}>💳 Card</button>
              </div>
              <button
                disabled={cart.length === 0}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: cart.length === 0 ? '#d1d5db' : '#059669',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
