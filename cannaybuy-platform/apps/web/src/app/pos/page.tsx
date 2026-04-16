'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockProducts = [
  { id: '1', name: 'Purple Haze', category: 'Sativa', strain: 'Sativa', price: 850, thc: '22%', stock: 28, unit: '3.5g' },
  { id: '2', name: 'Northern Lights', category: 'Indica', strain: 'Indica', price: 720, thc: '18%', stock: 14, unit: '3.5g' },
  { id: '3', name: 'THC Gummies', category: 'Edible', strain: 'Edible', price: 350, thc: '10mg', stock: 42, unit: 'pack' },
  { id: '4', name: 'Water Hash', category: 'Concentrate', strain: 'Concentrate', price: 1200, thc: '65%', stock: 8, unit: '1g' },
  { id: '5', name: 'OG Kush', category: 'Hybrid', strain: 'Hybrid', price: 780, thc: '20%', stock: 21, unit: '3.5g' },
  { id: '6', name: 'CBD Oil 1000mg', category: 'Wellness', strain: 'Wellness', price: 650, thc: '0%', stock: 35, unit: '30ml' },
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

  const stockStatus = (stock: number) => {
    if (stock <= 5) return { label: 'Critical', color: '#ef4444', bg: '#fef2f2' }
    if (stock <= 15) return { label: 'Low', color: '#f59e0b', bg: '#fffbeb' }
    return { label: 'In Stock', color: '#10b981', bg: '#f0fdf4' }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1923' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#0a0f14', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #1a2535' }}>
        {/* Logo Area */}
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid #1a2535' }}>
          <img
            src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png"
            alt="CannaBuy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1a2535' }}>
            <div style={{ fontSize: '10px', color: '#3d4f63', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Cannabis Club Management</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: '#0d1f12', color: '#22c55e', fontSize: '9px', fontWeight: 700, padding: '5px 10px', borderRadius: '3px', letterSpacing: '0.8px', border: '1px solid #1a3322' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
              ZA COMPLIANT
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', color: '#2a3a50', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: '10px' }}>Navigation</div>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '◫', active: false },
            { label: 'Members', href: '/members', icon: '◉', active: false },
            { label: 'Inventory', href: '/inventory', icon: '◈', active: false },
            { label: 'Point of Sale', href: '/pos', icon: '◇', active: true },
            { label: 'Products', href: '/admin/products', icon: '◆', active: false },
            { label: 'Transactions', href: '/transactions', icon: '▣', active: false },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '11px',
                padding: '10px 12px', borderRadius: '6px', fontSize: '13px',
                background: item.active ? '#0f2a1a' : 'transparent',
                color: item.active ? '#22c55e' : '#4a6080',
                fontWeight: item.active ? 600 : 400,
                borderLeft: item.active ? '2px solid #22c55e' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}>
                <span style={{ fontSize: '13px', width: '18px', textAlign: 'center', opacity: item.active ? 1 : 0.5 }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '20px 20px', borderTop: '1px solid #1a2535' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#2a3a50' }}>CannaBuy POS</div>
          <div style={{ fontSize: '10px', color: '#1e2d3d', marginTop: '3px' }}>v1.0 · South Africa</div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <header style={{ background: '#0a0f14', borderBottom: '1px solid #1a2535', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>Point of Sale</div>
            <div style={{ fontSize: '11px', color: '#22c55e', background: '#0f2a1a', padding: '4px 10px', borderRadius: '3px', fontWeight: 500 }}>● Live</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '12px', color: '#4a6080', background: '#0f1923', padding: '6px 14px', borderRadius: '6px', border: '1px solid #1a2535' }}>Staff: Admin</div>
            <div style={{ fontSize: '12px', color: '#4a6080' }}>ZA</div>
          </div>
        </header>

        {/* POS Content */}
        <main style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left: Product Catalog */}
          <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px 10px 38px', fontSize: '13px', background: '#0f1923', border: '1px solid #1a2535', borderRadius: '8px', color: '#e2e8f0', outline: 'none', boxSizing: 'border-box' }}
                />
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#3d4f63', fontSize: '13px' }}>⌕</span>
              </div>
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px', fontSize: '12px', fontWeight: 500,
                    background: selectedCategory === cat ? '#22c55e' : '#0f1923',
                    color: selectedCategory === cat ? '#0a0f14' : '#4a6080',
                    border: `1px solid ${selectedCategory === cat ? '#22c55e' : '#1a2535'}`,
                    borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
              {filteredProducts.map(product => {
                const status = stockStatus(product.stock)
                return (
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    style={{
                      background: '#0f1923', border: '1px solid #1a2535',
                      borderRadius: '10px', padding: '16px', cursor: 'pointer',
                      transition: 'all 0.15s ease', position: 'relative',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#22c55e')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a2535')}
                  >
                    {/* Category badge */}
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      fontSize: '9px', fontWeight: 700, color: '#4a6080',
                      background: '#0a0f14', padding: '2px 6px', borderRadius: '3px',
                      letterSpacing: '0.5px', textTransform: 'uppercase'
                    }}>
                      {product.category}
                    </div>

                    {/* THC/Strain */}
                    <div style={{ fontSize: '10px', color: '#22c55e', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.3px' }}>
                      {product.strain} · {product.thc} THC
                    </div>

                    {/* Name */}
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{product.name}</div>

                    {/* Unit */}
                    <div style={{ fontSize: '11px', color: '#3d4f63', marginBottom: '12px' }}>{product.unit}</div>

                    {/* Price & Stock Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>R {product.price.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: status.color, background: status.bg, padding: '3px 8px', borderRadius: '4px' }}>
                        {product.stock} {status.label}
                      </div>
                    </div>

                    {/* Add indicator */}
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #1a2535', textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>+ Add to Sale</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Cart Panel */}
          <div style={{ width: '320px', background: '#0a0f14', borderLeft: '1px solid #1a2535', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            {/* Cart Header */}
            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #1a2535' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Current Sale</div>
                <div style={{ fontSize: '12px', color: '#4a6080', background: '#0f1923', padding: '4px 10px', borderRadius: '4px' }}>
                  {cart.length} item{cart.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#2a3a50' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>🛒</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>No items in cart</div>
                  <div style={{ fontSize: '12px', marginTop: '4px', color: '#1e2d3d' }}>Click a product to add</div>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ background: '#0f1923', border: '1px solid #1a2535', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: '#4a6080', marginTop: '2px' }}>R {item.price.toLocaleString()} each</div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', color: '#3d4f63', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}
                      >
                        ×
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#1a2535', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', width: '20px', textAlign: 'center' }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#1a2535', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          +
                        </button>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e' }}>
                        R {(item.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Totals */}
            {cart.length > 0 && (
              <div style={{ padding: '16px 20px', borderTop: '1px solid #1a2535' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#4a6080' }}>Subtotal (excl. VAT)</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>R {subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#4a6080' }}>VAT (15%)</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>R {vat.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #1a2535', marginBottom: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>Total</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e' }}>R {total.toLocaleString()}</span>
                </div>

                {/* Payment Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                  <button style={{ padding: '12px', background: '#0f1923', border: '1px solid #1a2535', borderRadius: '8px', color: '#e2e8f0', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    💵 Cash
                  </button>
                  <button style={{ padding: '12px', background: '#0f1923', border: '1px solid #1a2535', borderRadius: '8px', color: '#e2e8f0', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    💳 Card
                  </button>
                </div>
                <button
                  style={{
                    width: '100%', padding: '14px', background: '#22c55e', border: 'none',
                    borderRadius: '8px', color: '#0a0f14', fontSize: '14px', fontWeight: 700,
                    cursor: 'pointer', marginTop: '4px', letterSpacing: '0.3px'
                  }}
                >
                  Complete Sale · R {total.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
