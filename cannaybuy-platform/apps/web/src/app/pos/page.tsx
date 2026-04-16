'use client'
import { useState, useMemo, useCallback } from 'react'
import ClubLayout from '../../components/layout/ClubLayout'

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = 'cash' | 'eft' | 'snapscan' | 'yoco' | 'payfast'
type CartItem = { id: string; sku: string; name: string; qty: number; price: number; unit: string; category: string }
type Member = { id: string; name: string; idNumber: string; memberNumber: string; tier: string; gramLimit: number; usedGrams: number; ficaStatus: string; status: string }
type TransactionRecord = { invoiceNumber: string; items: CartItem[]; member: string; subtotal: number; vat: number; total: number; payment: PaymentMethod; timestamp: string }

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Thabo Molefe', idNumber: '8901025371082', memberNumber: 'MBR-001', tier: 'Premium', gramLimit: 60, usedGrams: 28.5, ficaStatus: 'Verified', status: 'Active' },
  { id: '2', name: 'Priya Kartik', idNumber: '9412205472083', memberNumber: 'MBR-002', tier: 'Standard', gramLimit: 30, usedGrams: 14.0, ficaStatus: 'Verified', status: 'Active' },
  { id: '3', name: 'Johan Snyman', idNumber: '8205106231094', memberNumber: 'MBR-003', tier: 'Founding', gramLimit: 100, usedGrams: 67.0, ficaStatus: 'Verified', status: 'Active' },
  { id: '4', name: 'Lisa Nkosi', idNumber: '9603056284097', memberNumber: 'MBR-004', tier: 'Standard', gramLimit: 30, usedGrams: 8.5, ficaStatus: 'Pending', status: 'Active' },
  { id: '5', name: 'David Rossouw', idNumber: '8811224055089', memberNumber: 'MBR-005', tier: 'Premium', gramLimit: 60, usedGrams: 42.0, ficaStatus: 'Verified', status: 'Active' },
  { id: '6', name: 'Amara Diallo', idNumber: '9307012345091', memberNumber: 'MBR-006', tier: 'Standard', gramLimit: 30, usedGrams: 0, ficaStatus: 'Pending', status: 'Active' },
]

const PRODUCTS = [
  { id: '1', sku: 'SKU-001', name: 'Purple Haze', category: 'Sativa', unit: '3.5g', price: 850, stock: 28, weight: 3.5 },
  { id: '2', sku: 'SKU-002', name: 'Northern Lights', category: 'Indica', unit: '3.5g', price: 720, stock: 14, weight: 3.5 },
  { id: '3', sku: 'SKU-003', name: 'OG Kush', category: 'Hybrid', unit: '3.5g', price: 780, stock: 21, weight: 3.5 },
  { id: '4', sku: 'SKU-004', name: 'THC Gummies', category: 'Edible', unit: 'pack', price: 350, stock: 42, weight: 0 },
  { id: '5', sku: 'SKU-005', name: 'Water Hash', category: 'Concentrate', unit: '1g', price: 1200, stock: 4, weight: 1 },
  { id: '6', sku: 'SKU-006', name: 'CBD Oil 1000mg', category: 'Wellness', unit: '30ml', price: 650, stock: 35, weight: 0 },
  { id: '7', sku: 'SKU-007', name: 'Sour Diesel', category: 'Sativa', unit: '3.5g', price: 890, stock: 0, weight: 3.5 },
  { id: '8', sku: 'SKU-008', name: 'Blue Cheese', category: 'Indica', unit: '3.5g', price: 810, stock: 17, weight: 3.5 },
  { id: '9', sku: 'SKU-009', name: 'Green Crack', category: 'Sativa', unit: '3.5g', price: 760, stock: 12, weight: 3.5 },
  { id: '10', sku: 'SKU-010', name: 'Amnesia Haze', category: 'Sativa', unit: '3.5g', price: 820, stock: 19, weight: 3.5 },
  { id: '11', sku: 'SKU-011', name: 'Girl Scout Cookies', category: 'Hybrid', unit: '3.5g', price: 800, stock: 8, weight: 3.5 },
  { id: '12', sku: 'SKU-012', name: 'Pink OG', category: 'Indica', unit: '3.5g', price: 870, stock: 22, weight: 3.5 },
  { id: '13', sku: 'SKU-013', name: 'RSO Syringe', category: 'Concentrate', unit: '1ml', price: 950, stock: 18, weight: 0 },
  { id: '14', sku: 'SKU-014', name: 'Space Cake', category: 'Edible', unit: 'slice', price: 280, stock: 25, weight: 0 },
]

const CATEGORIES = ['All', 'Sativa', 'Indica', 'Hybrid', 'Concentrate', 'Edible', 'Wellness']

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'cash', label: 'Cash', icon: '💵' },
  { id: 'eft', label: 'EFT', icon: '🏦' },
  { id: 'snapscan', label: 'SnapScan', icon: '📱' },
  { id: 'yoco', label: 'Yoco', icon: '💳' },
  { id: 'payfast', label: 'PayFast', icon: '🌐' },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

function generateInvoice(): string {
  const d = new Date()
  return `INV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`
}

function categoryColor(cat: string) {
  const map: Record<string, string> = {
    Sativa: '#8b5cf6', Indica: '#ec4899', Hybrid: '#6366f1',
    Concentrate: '#f59e0b', Edible: '#10b981', Wellness: '#06b6d4',
  }
  return map[cat] ?? '#6b7280'
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '20px', padding: '32px',
        width: '100%', maxWidth: '420px', boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: '#f3f4f6',
          border: 'none', borderRadius: '8px', width: '32px', height: '32px',
          cursor: 'pointer', fontSize: '14px', color: '#6b7280', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
        {children}
      </div>
    </div>
  )
}

function ReceiptModal({ tx, onClose }: { tx: TransactionRecord; onClose: () => void }) {
  const method = PAYMENT_METHODS.find(m => m.id === tx.payment)
  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f0fdf4', border: '3px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px' }}>✓</div>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 800, color: '#111827' }}>Sale Complete!</h2>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#6b7280' }}>{tx.invoiceNumber}</p>
      </div>

      <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#6b7280' }}>
          <span>Date</span><span style={{ fontWeight: 600, color: '#111827' }}>{tx.timestamp}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#6b7280' }}>
          <span>Member</span><span style={{ fontWeight: 600, color: '#111827' }}>{tx.member}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
          <span>Payment</span><span style={{ fontWeight: 600, color: '#111827' }}>{method?.label ?? tx.payment}</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '14px', marginBottom: '14px' }}>
        {tx.items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#374151' }}>{item.qty}× {item.name}</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>R {(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Subtotal</span>
          <span style={{ fontSize: '12px', color: '#111827' }}>R {tx.subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>VAT (15%)</span>
          <span style={{ fontSize: '12px', color: '#111827' }}>R {tx.vat.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '2px solid #d1fae5' }}>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>Total</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>R {tx.total.toLocaleString()}</span>
        </div>
      </div>

      <button onClick={onClose} style={{
        width: '100%', background: '#16a34a', color: '#fff', border: 'none',
        borderRadius: '12px', padding: '14px', fontSize: '14px', fontWeight: 700,
        cursor: 'pointer', marginTop: '20px',
      }}>Done</button>
    </ModalOverlay>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function POSPage() {
  const [products, setProducts] = useState(PRODUCTS.map(p => ({ ...p })))
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [memberSearch, setMemberSearch] = useState('')
  const [showMemberDropdown, setShowMemberDropdown] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [showReceipt, setShowReceipt] = useState<TransactionRecord | null>(null)
  const [completedTx, setCompletedTx] = useState<TransactionRecord | null>(null)

  // ── Filtered products ───────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !productSearch ||
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase())
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      return matchSearch && matchCat
    })
  }, [products, productSearch, activeCategory])

  // ── Cart totals ────────────────────────────────────────────────────────────
  const { subtotal, vat, total, cartWeight } = useMemo(() => {
    const s = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    const v = Math.round(s * 0.15)
    const t = s + v
    const w = cart.reduce((sum, i) => {
      const p = products.find(pp => pp.id === i.id)
      return sum + (p?.weight ?? 0) * i.qty
    }, 0)
    return { subtotal: s, vat: v, total: t, cartWeight: w }
  }, [cart, products])

  // ── Gram limit check ───────────────────────────────────────────────────────
  const gramLimitOk = useMemo(() => {
    if (!selectedMember) return true
    return selectedMember.usedGrams + cartWeight <= selectedMember.gramLimit
  }, [selectedMember, cartWeight])

  // ── Cart operations ─────────────────────────────────────────────────────────
  const addToCart = useCallback((product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        if (existing.qty >= product.stock) return prev
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id: product.id, sku: product.sku, name: product.name, qty: 1, price: product.price, unit: product.unit, category: product.category }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (!existing) return prev
      if (existing.qty > 1) return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
      return prev.filter(i => i.id !== id)
    })
  }, [])

  const clearCart = useCallback(() => setCart([]), [])
  const deleteFromCart = useCallback((id: string) => setCart(prev => prev.filter(i => i.id !== id)), [])

  // ── Member selection ────────────────────────────────────────────────────────
  const memberResults = useMemo(() => {
    if (!memberSearch) return MOCK_MEMBERS.slice(0, 5)
    const q = memberSearch.toLowerCase()
    return MOCK_MEMBERS.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.memberNumber.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [memberSearch])

  const selectMember = (m: Member) => {
    setSelectedMember(m)
    setMemberSearch('')
    setShowMemberDropdown(false)
  }

  // ── Complete sale ───────────────────────────────────────────────────────────
  const completeSale = () => {
    if (cart.length === 0) return
    const tx: TransactionRecord = {
      invoiceNumber: generateInvoice(),
      items: [...cart],
      member: selectedMember?.name ?? 'Walk-in Customer',
      subtotal,
      vat,
      total,
      payment: paymentMethod,
      timestamp: new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
    }

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const inCart = cart.find(c => c.id === p.id)
      if (!inCart) return p
      return { ...p, stock: Math.max(0, p.stock - inCart.qty) }
    }))

    // Update member used grams
    if (selectedMember) {
      setSelectedMember(m => m ? { ...m, usedGrams: m.usedGrams + cartWeight } : m)
    }

    setCompletedTx(tx)
    setShowReceipt(tx)
    setCart([])
  }

  // ─────────────────────────────────────────────────────────────────────────

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <ClubLayout title={`Point of Sale${cartCount > 0 ? ` (${cartCount})` : ''}`}>

      <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 140px)', minHeight: '500px' }}>

        {/* ── LEFT: Product Panel ─────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>

          {/* Search */}
          <input
            value={productSearch}
            onChange={e => setProductSearch(e.target.value)}
            placeholder='Search by product name or SKU...'
            style={{
              width: '100%', background: '#ffffff', border: '1px solid #d1fae5',
              borderRadius: '12px', padding: '11px 16px', fontSize: '13px', color: '#111827',
              outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', boxSizing: 'border-box',
            }}
          />

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '5px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                border: `1px solid ${activeCategory === cat ? '#16a34a' : '#d1fae5'}`,
                background: activeCategory === cat ? '#f0fdf4' : '#ffffff',
                color: activeCategory === cat ? '#16a34a' : '#6b7280', cursor: 'pointer',
                transition: 'all 0.15s',
              }}>{cat}</button>
            ))}
          </div>

          {/* Product Grid */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignContent: 'start' }}>
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '13px' }}>
                No products found
              </div>
            )}
            {filtered.map(p => {
              const inCart = cart.find(c => c.id === p.id)
              const atMax = inCart ? inCart.qty >= p.stock : p.stock === 0
              return (
                <div key={p.id} onClick={() => !atMax && addToCart(p)} style={{
                  background: '#ffffff', border: `1.5px solid ${inCart ? '#16a34a' : '#d1fae5'}`,
                  borderRadius: '14px', padding: '14px', cursor: atMax ? 'not-allowed' : 'pointer',
                  opacity: atMax ? 0.55 : 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s', position: 'relative',
                }}>
                  {inCart && (
                    <div style={{
                      position: 'absolute', top: '-8px', right: '-8px', background: '#16a34a',
                      color: '#fff', borderRadius: '50%', width: '22px', height: '22px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 800, zIndex: 1,
                    }}>{inCart.qty}</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, marginBottom: '2px', fontFamily: 'monospace' }}>{p.sku}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{p.name}</div>
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px',
                      background: categoryColor(p.category) + '18', color: categoryColor(p.category),
                      border: `1px solid ${categoryColor(p.category)}35`,
                    }}>{p.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: p.stock <= 5 ? '#dc2626' : '#9ca3af' }}>
                        {p.stock === 0 ? 'Out of stock' : `${p.stock} ${p.unit} left`}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>R {p.price}</div>
                    </div>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      background: inCart ? '#16a34a' : '#f0fdf4',
                      border: `1px solid ${inCart ? '#16a34a' : '#bbf7d0'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', color: inCart ? '#fff' : '#16a34a', fontWeight: 700,
                    }}>+</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: Cart Panel ───────────────────────────────────────────────── */}
        <div style={{
          width: '360px', background: '#ffffff', border: '1px solid #d1fae5',
          borderRadius: '16px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden',
        }}>

          {/* Panel Header */}
          <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>Current Sale</div>
              {cartCount > 0 && (
                <button onClick={clearCart} style={{
                  background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px',
                  color: '#dc2626', fontSize: '11px', fontWeight: 600, padding: '4px 10px', cursor: 'pointer',
                }}>Clear All</button>
              )}
            </div>

            {/* Member selector */}
            <div style={{ position: 'relative' }}>
              {selectedMember ? (
                <div style={{
                  background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
                  padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>{selectedMember.name}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{selectedMember.memberNumber} · {selectedMember.tier}</div>
                    {/* Gram limit bar */}
                    {selectedMember.gramLimit > 0 && (
                      <div style={{ marginTop: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#6b7280', marginBottom: '3px' }}>
                          <span>Monthly limit</span>
                          <span style={{ fontWeight: 600, color: gramLimitOk ? '#16a34a' : '#dc2626' }}>
                            {selectedMember.usedGrams.toFixed(1)} / {selectedMember.gramLimit}g
                            {cartWeight > 0 && ` (+${cartWeight.toFixed(1)}g in cart)`}
                          </span>
                        </div>
                        <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '4px',
                            width: `${Math.min(100, ((selectedMember.usedGrams + cartWeight) / selectedMember.gramLimit) * 100)}%`,
                            background: gramLimitOk ? '#16a34a' : '#dc2626',
                          }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setSelectedMember(null)} style={{
                    background: '#fff', border: '1px solid #d1fae5', borderRadius: '6px',
                    color: '#6b7280', fontSize: '10px', fontWeight: 600, padding: '4px 8px', cursor: 'pointer',
                  }}>✕</button>
                </div>
              ) : (
                <div>
                  <input
                    value={memberSearch}
                    onChange={e => { setMemberSearch(e.target.value); setShowMemberDropdown(true) }}
                    onFocus={() => setShowMemberDropdown(true)}
                    placeholder='Search member...'
                    style={{
                      width: '100%', background: '#f9fafb', border: '1px solid #d1fae5',
                      borderRadius: '10px', padding: '9px 12px', fontSize: '12px', color: '#111827',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                  {showMemberDropdown && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff',
                      border: '1px solid #d1fae5', borderRadius: '10px', marginTop: '4px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 100, overflow: 'hidden',
                    }}>
                      {memberResults.map(m => (
                        <div key={m.id} onClick={() => selectMember(m)} style={{
                          padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6',
                          transition: 'background 0.1s',
                        }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{m.name}</div>
                          <div style={{ fontSize: '10px', color: '#9ca3af' }}>{m.memberNumber} · {m.tier} · {m.ficaStatus}</div>
                        </div>
                      ))}
                      {memberResults.length === 0 && (
                        <div style={{ padding: '12px', textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>No members found</div>
                      )}
                      <div style={{ padding: '8px 14px', background: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
                        <span style={{ fontSize: '10px', color: '#9ca3af' }}>Leave blank for walk-in customer</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cart items */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af', fontSize: '13px', lineHeight: 1.8 }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛒</div>
                No items in cart yet.<br />Click a product to add.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '11px 12px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>R {(item.price * item.qty).toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: '#9ca3af' }}>R {item.price} × {item.qty} {item.unit}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => removeFromCart(item.id)} style={{
                          width: '24px', height: '24px', borderRadius: '50%', background: '#ffffff',
                          border: '1px solid #d1fae5', color: '#16a34a', fontSize: '13px', fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>−</button>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', minWidth: '18px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => {
                          const p = products.find(pp => pp.id === item.id)
                          if (p && item.qty < p.stock) addToCart(p)
                        }} style={{
                          width: '24px', height: '24px', borderRadius: '50%', background: '#f0fdf4',
                          border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '13px', fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>+</button>
                        <button onClick={() => deleteFromCart(item.id)} style={{
                          background: 'none', border: 'none', color: '#dc2626', fontSize: '10px',
                          cursor: 'pointer', marginLeft: '4px', padding: '2px 4px',
                        }}>✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Footer */}
          <div style={{ padding: '18px 20px', borderTop: '1px solid #f3f4f6' }}>

            {/* Totals */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontSize: '12px', color: '#111827' }}>R {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>VAT (15%)</span>
                <span style={{ fontSize: '12px', color: '#111827' }}>R {vat.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '2px solid #d1fae5', marginBottom: '12px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>Total</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#16a34a' }}>R {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Gram limit warning */}
            {!gramLimitOk && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
                padding: '10px 12px', marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '14px' }}>⚠️</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626' }}>Gram limit exceeded</div>
                  <div style={{ fontSize: '10px', color: '#991b1b', marginTop: '2px' }}>
                    This sale exceeds {selectedMember?.name}&apos;s monthly limit by {(selectedMember!.usedGrams + cartWeight - selectedMember!.gramLimit).toFixed(1)}g
                  </div>
                </div>
              </div>
            )}

            {/* Payment method */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>Payment Method</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {PAYMENT_METHODS.map(pm => (
                  <button key={pm.id} onClick={() => setPaymentMethod(pm.id)} style={{
                    padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                    border: `1.5px solid ${paymentMethod === pm.id ? '#16a34a' : '#e5e7eb'}`,
                    background: paymentMethod === pm.id ? '#f0fdf4' : '#ffffff',
                    color: paymentMethod === pm.id ? '#16a34a' : '#6b7280',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                    transition: 'all 0.12s',
                  }}>
                    <span>{pm.icon}</span>{pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Complete Sale Button */}
            <button
              onClick={completeSale}
              disabled={cart.length === 0 || !gramLimitOk}
              style={{
                width: '100%', padding: '15px', borderRadius: '12px', fontSize: '14px', fontWeight: 800,
                background: cart.length > 0 && gramLimitOk ? '#16a34a' : '#d1fae5',
                color: cart.length > 0 && gramLimitOk ? '#ffffff' : '#9ca3af',
                border: 'none', cursor: cart.length > 0 && gramLimitOk ? 'pointer' : 'not-allowed',
                boxShadow: cart.length > 0 && gramLimitOk ? '0 4px 14px rgba(22,163,74,0.3)' : 'none',
                transition: 'all 0.15s',
              }}>
              {cart.length === 0 ? 'Add items to continue' : gramLimitOk ? `Complete Sale — R ${total.toLocaleString()}` : 'Gram limit exceeded'}
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && completedTx && (
        <ReceiptModal tx={completedTx} onClose={() => { setShowReceipt(null); setCompletedTx(null) }} />
      )}
    </ClubLayout>
  )
}
