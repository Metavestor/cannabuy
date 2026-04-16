'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import ClubLayout from '../../components/layout/ClubLayout'
import { useClub } from '../../components/context/ClubContext'
import { getProducts, adjustStock } from '../../lib/supabase/queries'
import type { Product as DbProduct } from '../../lib/supabase/types'
import { supabase } from '../../lib/supabase/client'

// ─── Types ───────────────────────────────────────────────────────────────────

type StockStatus = 'In Stock' | 'Low Stock' | 'Critical' | 'Out of Stock'
type AdjustmentType = 'receive' | 'return' | 'damage' | 'writeoff' | 'sale'

interface Product {
  id: string
  sku: string
  name: string
  category: 'Sativa' | 'Indica' | 'Hybrid' | 'Concentrate' | 'Edible' | 'Wellness' | 'Processed'
  stock: number
  reorderLevel: number
  price: number
  unit: string
}

interface Adjustment {
  type: AdjustmentType
  qty: number
  reason: string
  notes: string
}

// ─── DB → UI mapper ───────────────────────────────────────────────────────────

function mapDbProduct(p: DbProduct): Product {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: (p.category.charAt(0).toUpperCase() + p.category.slice(1)) as Product['category'],
    stock: p.stock_qty,
    reorderLevel: p.reorder_threshold,
    price: p.price_incl_vat_zar,
    unit: p.unit_label,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function categoryLabel(cat: string): string {
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

function getStatus(stock: number, reorderLevel: number): StockStatus {
  if (stock === 0) return 'Out of Stock'
  if (stock <= reorderLevel * 0.5) return 'Critical'
  if (stock <= reorderLevel) return 'Low Stock'
  return 'In Stock'
}

function statusStyle(status: StockStatus) {
  if (status === 'In Stock') return { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' }
  if (status === 'Low Stock') return { bg: '#fffbeb', border: '#fde68a', text: '#d97706' }
  if (status === 'Critical') return { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' }
  return { bg: '#f3f4f6', border: '#d1d5db', text: '#6b7280' }
}

function categoryColor(cat: string) {
  const map: Record<string, string> = {
    Sativa: '#8b5cf6', Indica: '#ec4899', Hybrid: '#6366f1',
    Concentrate: '#f59e0b', Edible: '#10b981', Wellness: '#06b6d4', Processed: '#6b7280',
  }
  return map[cat] ?? '#6b7280'
}

// ─── Demo fallback data ────────────────────────────────────────────────────────

const DEMO_PRODUCTS: Product[] = [
  { id: '1', sku: 'SKU-001', name: 'Purple Haze', category: 'Sativa', stock: 28, reorderLevel: 10, price: 850, unit: '3.5g' },
  { id: '2', sku: 'SKU-002', name: 'Northern Lights', category: 'Indica', stock: 14, reorderLevel: 10, price: 720, unit: '3.5g' },
  { id: '3', sku: 'SKU-003', name: 'OG Kush', category: 'Hybrid', stock: 21, reorderLevel: 10, price: 780, unit: '3.5g' },
  { id: '4', sku: 'SKU-004', name: 'THC Gummies', category: 'Edible', stock: 42, reorderLevel: 15, price: 350, unit: 'pack' },
  { id: '5', sku: 'SKU-005', name: 'Water Hash', category: 'Concentrate', stock: 4, reorderLevel: 5, price: 1200, unit: '1g' },
  { id: '6', sku: 'SKU-006', name: 'CBD Oil 1000mg', category: 'Wellness', stock: 35, reorderLevel: 10, price: 650, unit: '30ml' },
  { id: '7', sku: 'SKU-007', name: 'Sour Diesel', category: 'Sativa', stock: 8, reorderLevel: 10, price: 800, unit: '3.5g' },
  { id: '8', sku: 'SKU-008', name: 'Blue Dream', category: 'Hybrid', stock: 0, reorderLevel: 10, price: 750, unit: '3.5g' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(3px)',
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '18px', padding: '28px 32px',
        width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: '#f3f4f6',
          border: 'none', borderRadius: '8px', width: '32px', height: '32px',
          cursor: 'pointer', fontSize: '16px', color: '#6b7280', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
        {children}
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div style={{
      background: '#ffffff', border: `1px solid ${accent ? '#bbf7d0' : '#d1fae5'}`,
      borderRadius: '14px', padding: '18px 22px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      ...(accent ? { background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%)' } : {}),
    }}>
      <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '26px', fontWeight: 800, color: accent ? '#16a34a' : '#111827', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '11px', color: '#6b7280' }}>{sub}</div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InventoryPage() {
  const { activeClub, isDemo } = useClub()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [adjustmentItem, setAdjustmentItem] = useState<Product | null>(null)
  const [adjustment, setAdjustment] = useState<Adjustment>({ type: 'receive', qty: 1, reason: '', notes: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState<Partial<Product>>({
    name: '', sku: '', category: 'Sativa', stock: 0, reorderLevel: 10, price: 0, unit: '3.5g',
  })

  // ── Load products from Supabase ─────────────────────────────────────────────
  useEffect(() => {
    if (!activeClub?.id) return

    // Use demo data only when Supabase is unavailable / demo mode is active.
    if (isDemo) {
      setProducts(DEMO_PRODUCTS)
      return
    }

    setLoading(true)
    getProducts(activeClub.id)
      .then((dbProducts) => {
        setProducts(dbProducts.map(mapDbProduct))
      })
      .catch((err) => {
        console.error('[inventory] getProducts error:', err)
        setProducts([])
      })
      .finally(() => setLoading(false))
  }, [activeClub?.id, isDemo])

  // ── Filtered products ───────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }, [products, search])

  // ── Dynamic stats ───────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalProducts = products.length
    const totalValue = products.reduce((s, p) => s + p.stock * p.price, 0)
    const lowStock = products.filter(p => getStatus(p.stock, p.reorderLevel) === 'Low Stock' || getStatus(p.stock, p.reorderLevel) === 'Critical').length
    const outOfStock = products.filter(p => p.stock === 0).length
    return { totalProducts, totalValue, lowStock, outOfStock }
  }, [products])

  // ── Row selection ───────────────────────────────────────────────────────────
  const toggleRow = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  const toggleAll = useCallback(() => {
    setSelected(prev =>
      prev.size === filtered.length
        ? new Set()
        : new Set(filtered.map(p => p.id))
    )
  }, [filtered])

  // ── Stock adjustment ────────────────────────────────────────────────────────
  const applyAdjustment = async () => {
    if (!adjustmentItem || adjustment.qty <= 0) return

    // Compute new stock value locally for responsive UX
    let newStock = adjustmentItem.stock
    switch (adjustment.type) {
      case 'receive': newStock += adjustment.qty; break
      case 'return': newStock += adjustment.qty; break
      case 'sale': newStock = Math.max(0, newStock - adjustment.qty); break
      case 'damage': newStock = Math.max(0, newStock - adjustment.qty); break
      case 'writeoff': newStock = Math.max(0, newStock - adjustment.qty); break
    }

    // Update local state immediately
    setProducts(prev => prev.map(p =>
      p.id === adjustmentItem.id ? { ...p, stock: newStock } : p
    ))

    const qtyChange = adjustment.type === 'receive' || adjustment.type === 'return'
      ? adjustment.qty
      : -adjustment.qty

    // Map UI adjustment type to DB reason
    const reasonMap: Record<AdjustmentType, string> = {
      receive: 'restock',
      return: 'return',
      sale: 'sale',
      damage: 'damage',
      writeoff: 'manual',
    }

    // Persist to Supabase (fire-and-forget — local state already updated)
    if (!isDemo && activeClub?.id) {
      adjustStock(activeClub.id, adjustmentItem.id, qtyChange, reasonMap[adjustment.type] as any, 'system')
        .catch(err => console.error('[inventory] adjustStock error:', err))
    }

    setAdjustmentItem(null)
    setAdjustment({ type: 'receive', qty: 1, reason: '', notes: '' })
  }

  // ── Add product ─────────────────────────────────────────────────────────────
  const addProduct = async () => {
    if (!addForm.name || !addForm.sku || !addForm.price) return

    const newProduct: Product = {
      id: crypto.randomUUID(),
      sku: addForm.sku,
      name: addForm.name,
      category: (addForm.category as Product['category']) ?? 'Sativa',
      stock: addForm.stock ?? 0,
      reorderLevel: addForm.reorderLevel ?? 10,
      price: addForm.price ?? 0,
      unit: addForm.unit ?? '3.5g',
    }

    // Optimistically add to local state
    setProducts(prev => [...prev, newProduct])
    setShowAdd(false)
    setAddForm({ name: '', sku: '', category: 'Sativa', stock: 0, reorderLevel: 10, price: 0, unit: '3.5g' })

    // Persist to Supabase if not in demo mode
    if (!isDemo && activeClub?.id) {
      const { error } = await supabase().from('products').insert({
        tenant_id: activeClub.id,
        sku: newProduct.sku,
        name: newProduct.name,
        category: newProduct.category.toLowerCase() as any,
        weight_grams: null,
        unit_label: newProduct.unit,
        price_incl_vat_zar: newProduct.price,
        price_excl_vat_zar: newProduct.price / 1.15,
        vat_amount_zar: newProduct.price - (newProduct.price / 1.15),
        stock_qty: newProduct.stock,
        reorder_threshold: newProduct.reorderLevel,
        is_active: true,
      })
      if (error) console.error('[inventory] addProduct error:', error)
    }
  }

  // ── Delete product ──────────────────────────────────────────────────────────
  const deleteProduct = async (id: string) => {
    // Optimistically remove locally
    setProducts(prev => prev.filter(p => p.id !== id))
    setSelected(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })

    // Persist to Supabase if not in demo mode
    if (!isDemo && activeClub?.id) {
      const { error } = await supabase()
        .from('products')
        .update({ is_active: false })
        .eq('id', id)
        .eq('tenant_id', activeClub.id)
      if (error) console.error('[inventory] deleteProduct error:', error)
    }
  }

  // ── CSV Export ──────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const headers = ['SKU', 'Name', 'Category', 'Stock', 'Unit', 'Reorder At', 'Price (ZAR)', 'Status']
    const rows = filtered.map(p => [
      p.sku, p.name, p.category, p.stock, p.unit, p.reorderLevel, p.price, getStatus(p.stock, p.reorderLevel),
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `inventory-${new Date().toISOString().slice(0, 10)}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const selectedCount = selected.size

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoading && products.length === 0) {
    return (
      <ClubLayout title='Inventory Management'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '12px', color: '#d1fae5' }}>◈</div>
            <div style={{ fontSize: '13px', color: '#9ca3af' }}>Loading inventory...</div>
          </div>
        </div>
      </ClubLayout>
    )
  }

  return (
    <ClubLayout title={`Inventory Management${selectedCount > 0 ? ` (${selectedCount} selected)` : ''}`}>

      {/* ── Stats Row ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <StatCard label='Total Products' value={String(stats.totalProducts)} sub='Across all categories' />
        <StatCard label='Total Stock Value' value={`R ${stats.totalValue.toLocaleString()}`} sub='At current prices' accent />
        <StatCard label='Low Stock Alerts' value={String(stats.lowStock)} sub='Below reorder level' />
        <StatCard label='Out of Stock' value={String(stats.outOfStock)} sub='Zero items unavailable' />
      </div>

      {/* ── Bulk Action Bar (appears when rows selected) ─────────────────────── */}
      {selectedCount > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
          border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 20px',
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>
            {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
            <button onClick={() => {
              const first = products.find(p => selected.has(p.id))
              if (first) { setAdjustmentItem(first); setAdjustment({ type: 'receive', qty: 1, reason: '', notes: '' }) }
            }} style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Adjust Stock
            </button>
            <button onClick={() => setSelected(new Set())} style={{ background: '#fff', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* ── Main Table Card ───────────────────────────────────────────────────── */}
      <div style={{
        background: '#ffffff', border: '1px solid #d1fae5',
        borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        {/* Table Header */}
        <div style={{
          padding: '16px 24px', borderBottom: '1px solid #f3f4f6',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>
            Product Inventory
            <span style={{ marginLeft: '8px', fontSize: '11px', color: '#9ca3af', fontWeight: 400 }}>
              ({filtered.length} of {products.length})
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={exportCSV} style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
              color: '#16a34a', fontSize: '11px', fontWeight: 600, padding: '7px 14px', cursor: 'pointer',
            }}>Export CSV</button>
            <button onClick={() => setShowAdd(true)} style={{
              background: '#16a34a', border: '1px solid #16a34a', borderRadius: '10px',
              color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '7px 16px', cursor: 'pointer',
            }}>+ Add Product</button>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search by name, SKU or category...'
              style={{
                background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px',
                padding: '7px 12px', fontSize: '12px', color: '#111827', width: '220px',
                outline: 'none', transition: 'border-color 0.15s',
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '10px 16px', width: '40px', borderBottom: '1px solid #f3f4f6' }}>
                  <input type='checkbox' checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
                </th>
                {['SKU', 'Product', 'Category', 'Stock', 'Reorder At', 'Unit Price', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                    No products found{search ? ` for &quot;${search}&quot;` : ''}
                  </td>
                </tr>
              )}
              {filtered.map((item, i) => {
                const status = getStatus(item.stock, item.reorderLevel)
                const sc = statusStyle(status)
                const isSelected = selected.has(item.id)
                return (
                  <tr key={item.id} style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                    background: isSelected ? '#f0fdf4' : 'transparent',
                    transition: 'background 0.1s',
                  }}>
                    <td style={{ padding: '12px 16px' }}>
                      <input type='checkbox' checked={isSelected} onChange={() => toggleRow(item.id)} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 700, color: '#16a34a', fontFamily: 'monospace' }}>{item.sku}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{item.name}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px',
                        background: categoryColor(item.category) + '18', color: categoryColor(item.category),
                        border: `1px solid ${categoryColor(item.category)}40`,
                      }}>{categoryLabel(item.category)}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: item.stock <= 5 ? '#dc2626' : '#111827' }}>
                      {item.stock} <span style={{ fontWeight: 400, fontSize: '11px', color: '#9ca3af' }}>{item.unit}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280' }}>
                      {item.reorderLevel} <span style={{ fontWeight: 400, fontSize: '11px', color: '#9ca3af' }}>{item.unit}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                      R {item.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
                        background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                      }}>{status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={() => { setAdjustmentItem(item); setAdjustment({ type: 'receive', qty: 1, reason: '', notes: '' }) }}
                          style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#16a34a', fontSize: '10px', fontWeight: 600, padding: '4px 10px', cursor: 'pointer' }}>
                          Adjust
                        </button>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '10px', fontWeight: 600, padding: '4px 10px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Stock Adjustment Modal ────────────────────────────────────────────── */}
      {adjustmentItem && (
        <ModalOverlay onClose={() => setAdjustmentItem(null)}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 800, color: '#111827' }}>
            Adjust Stock — {adjustmentItem.name}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Current Stock</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{adjustmentItem.stock} {adjustmentItem.unit}</span>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Adjustment Type</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(['receive', 'return', 'sale', 'damage', 'writeoff'] as AdjustmentType[]).map(type => (
                  <button key={type} onClick={() => setAdjustment(a => ({ ...a, type }))} style={{
                    padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                    border: `1px solid ${adjustment.type === type ? '#16a34a' : '#d1fae5'}`,
                    background: adjustment.type === type ? '#f0fdf4' : '#fff',
                    color: adjustment.type === type ? '#16a34a' : '#6b7280', cursor: 'pointer', textTransform: 'capitalize',
                  }}>{type}</button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Quantity</label>
              <input
                type='number'
                min='1'
                value={adjustment.qty}
                onChange={e => setAdjustment(a => ({ ...a, qty: parseInt(e.target.value) || 0 }))}
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #d1fae5', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Reason</label>
              <select
                value={adjustment.reason}
                onChange={e => setAdjustment(a => ({ ...a, reason: e.target.value }))}
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #d1fae5', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', background: '#fff',
                }}>
                <option value=''>Select reason...</option>
                <option value='supplier-delivery'>Supplier Delivery</option>
                <option value='member-return'>Member Return</option>
                <option value='inventory-count'>Inventory Count Correction</option>
                <option value='damaged-expired'>Damaged / Expired</option>
                <option value='quality-writeoff'>Quality Write-off</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Notes (optional)</label>
              <textarea
                value={adjustment.notes}
                onChange={e => setAdjustment(a => ({ ...a, notes: e.target.value }))}
                placeholder='Additional notes...'
                rows={2}
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #d1fae5', borderRadius: '10px',
                  fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Preview new stock */}
            {adjustment.qty > 0 && (
              <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#166534' }}>New Stock Level</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a' }}>
                  {(() => {
                    let ns = adjustmentItem.stock
                    if (adjustment.type === 'receive' || adjustment.type === 'return') ns += adjustment.qty
                    else ns = Math.max(0, ns - adjustment.qty)
                    return `${ns} ${adjustmentItem.unit}`
                  })()}
                </span>
              </div>
            )}

            <button
              onClick={applyAdjustment}
              disabled={adjustment.qty <= 0 || !adjustment.reason}
              style={{
                background: adjustment.qty > 0 && adjustment.reason ? '#16a34a' : '#d1fae5',
                color: adjustment.qty > 0 && adjustment.reason ? '#fff' : '#9ca3af',
                border: 'none', borderRadius: '10px', padding: '12px', fontSize: '13px', fontWeight: 700,
                cursor: adjustment.qty > 0 && adjustment.reason ? 'pointer' : 'not-allowed',
              }}>
              Apply Adjustment
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Add Product Modal ─────────────────────────────────────────────────── */}
      {showAdd && (
        <ModalOverlay onClose={() => setShowAdd(false)}>
          <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 800, color: '#111827' }}>Add New Product</h2>
          <div style={{ display: 'grid', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Product Name *</label>
                <input value={addForm.name ?? ''} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} placeholder='e.g. Purple Haze' style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>SKU *</label>
                <input value={addForm.sku ?? ''} onChange={e => setAddForm(f => ({ ...f, sku: e.target.value }))} placeholder='SKU-XXX' style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Category</label>
                <select value={addForm.category ?? 'Sativa'} onChange={e => setAddForm(f => ({ ...f, category: e.target.value as Product['category'] }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', background: '#fff' }}>
                  {['Sativa','Indica','Hybrid','Concentrate','Edible','Wellness','Processed'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Unit Label</label>
                <input value={addForm.unit ?? ''} onChange={e => setAddForm(f => ({ ...f, unit: e.target.value }))} placeholder='3.5g, 1g, pack' style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Price (ZAR) *</label>
                <input type='number' value={addForm.price ?? ''} onChange={e => setAddForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} placeholder='0.00' style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Initial Stock</label>
                <input type='number' value={addForm.stock ?? 0} onChange={e => setAddForm(f => ({ ...f, stock: parseFloat(e.target.value) || 0 }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Reorder Level</label>
                <input type='number' value={addForm.reorderLevel ?? 10} onChange={e => setAddForm(f => ({ ...f, reorderLevel: parseFloat(e.target.value) || 0 }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button
              onClick={addProduct}
              disabled={!addForm.name || !addForm.sku || !addForm.price}
              style={{
                background: addForm.name && addForm.sku && addForm.price ? '#16a34a' : '#d1fae5',
                color: addForm.name && addForm.sku && addForm.price ? '#fff' : '#9ca3af',
                border: 'none', borderRadius: '10px', padding: '12px', fontSize: '13px', fontWeight: 700,
                cursor: addForm.name && addForm.sku && addForm.price ? 'pointer' : 'not-allowed',
                marginTop: '4px',
              }}>
              Add Product
            </button>
          </div>
        </ModalOverlay>
      )}
    </ClubLayout>
  )
}