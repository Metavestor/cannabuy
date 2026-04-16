'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockProducts = [
  { id: '1', sku: 'FLW-001', name: 'Purple Haze', category: 'sativa', stock_qty: 150, reorder_threshold: 50, is_active: true },
  { id: '2', sku: 'FLW-002', name: 'Northern Lights', category: 'indica', stock_qty: 85, reorder_threshold: 50, is_active: true },
  { id: '3', sku: 'EDB-001', name: 'THC Gummies (10pk)', category: 'edible', stock_qty: 42, reorder_threshold: 20, is_active: true },
  { id: '4', sku: 'CON-001', name: 'Water Hash', category: 'concentrate', stock_qty: 8, reorder_threshold: 15, is_active: true },
  { id: '5', sku: 'HYB-001', name: 'OG Kush', category: 'hybrid', stock_qty: 0, reorder_threshold: 50, is_active: true },
  { id: '6', sku: 'WEL-001', name: 'CBD Oil 1000mg', category: 'wellness', stock_qty: 65, reorder_threshold: 25, is_active: true },
  { id: '7', sku: 'FLW-003', name: 'Blue Dream', category: 'sativa', stock_qty: 12, reorder_threshold: 50, is_active: true },
  { id: '8', sku: 'CON-002', name: 'Bubble Hash', category: 'concentrate', stock_qty: 3, reorder_threshold: 10, is_active: true },
]

const mockAdjustments = [
  { id: '1', product_name: 'Purple Haze', reason: 'restock', qty_change: 50, staff: 'Admin', created_at: '2024-04-15 10:00:00' },
  { id: '2', product_name: 'Water Hash', reason: 'damage', qty_change: -2, staff: 'Admin', created_at: '2024-04-14 15:30:00' },
  { id: '3', product_name: 'OG Kush', reason: 'count_correction', qty_change: -10, staff: 'Admin', created_at: '2024-04-13 09:00:00' },
]

const categories = ['all', 'sativa', 'indica', 'hybrid', 'concentrate', 'edible', 'wellness', 'processed']

export default function InventoryPage() {
  const [products, setProducts] = useState(mockProducts)
  const [adjustments] = useState(mockAdjustments)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showAdjustModal, setShowAdjustModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [adjustReason, setAdjustReason] = useState('restock')
  const [adjustQty, setAdjustQty] = useState(0)
  const [activeTab, setActiveTab] = useState<'inventory' | 'history'>('inventory')

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const lowStockProducts = products.filter(p => p.stock_qty < p.reorder_threshold && p.stock_qty > 0)
  const outOfStockProducts = products.filter(p => p.stock_qty === 0)
  const criticalProducts = products.filter(p => p.stock_qty > 0 && p.stock_qty < (p.reorder_threshold * 0.2))

  const getStockStatus = (product: any) => {
    if (product.stock_qty === 0) return { label: 'Out of Stock', color: '#dc2626', bg: '#fef2f2', status: 'out' }
    if (product.stock_qty < product.reorder_threshold * 0.2) return { label: 'Critical', color: '#dc2626', bg: '#fef2f2', status: 'critical' }
    if (product.stock_qty < product.reorder_threshold) return { label: 'Low Stock', color: '#d97706', bg: '#fffbeb', status: 'low' }
    return { label: 'In Stock', color: '#059669', bg: '#ecfdf5', status: 'ok' }
  }

  const handleAdjust = (product: any) => {
    setSelectedProduct(product)
    setAdjustReason('restock')
    setAdjustQty(0)
    setShowAdjustModal(true)
  }

  const submitAdjustment = () => {
    if (selectedProduct && adjustQty !== 0) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, stock_qty: Math.max(0, p.stock_qty + adjustQty) } 
          : p
      ))
      setShowAdjustModal(false)
    }
  }

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'restock': return 'Restock'
      case 'damage': return 'Damage/Loss'
      case 'count_correction': return 'Count Correction'
      case 'return': return 'Customer Return'
      case 'expired': return 'Expired/Disposed'
      default: return reason
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside style={{ width: '240px', background: '#1a1a2e', borderRight: '0.5px solid #2a2a3e', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #2a2a3e' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '160px', height: 'auto', display: 'block' }} />
          <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px', letterSpacing: '0.3px' }}>Cannabis Club Management</div>
          <div style={{ display: 'inline-block', marginTop: '6px', background: '#16213e', color: '#4ade80', fontSize: '9px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px', border: '1px solid #1a3a2a' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding: '10px 8px', flex: 1 }}>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '▦', active: false },
            { label: 'Members', href: '/members', icon: '👥', active: false },
            { label: 'Inventory', href: '/inventory', icon: '📦', active: true },
            { label: 'Point of Sale', href: '/pos', icon: '🧾', active: false },
            { label: 'Products', href: '/admin/products', icon: '📋', active: false },
            { label: 'Transactions', href: '/transactions', icon: '📊', active: false },
          ].map((item: any) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '6px', marginBottom: '2px', fontSize: '13px', background: item.active ? '#4ade80' : 'transparent', color: item.active ? '#1a1a2e' : '#9ca3af', fontWeight: item.active ? '600' : '400' }}>
                <span style={{ fontSize: '14px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2a3e', fontSize: '11px', color: '#6b7280' }}>v1.0 · South Africa</div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'white', borderBottom: '0.5px solid #e5e7eb', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '15px', fontWeight: '600' }}>Inventory Management</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {lowStockProducts.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fffbeb', color: '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                {lowStockProducts.length} Low Stock
              </div>
            )}
            {outOfStockProducts.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#dc2626', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                {outOfStockProducts.length} Out of Stock
              </div>
            )}
          </div>
        </header>

        <div style={{ padding: '24px', flex: 1 }}>
          {/* Alert Banner */}
          {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
            <div style={{ background: '#fef2f2', border: '0.5px solid #fecaca', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', borderLeft: '4px solid #dc2626' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>⚠️ Stock Alert</div>
              <div style={{ fontSize: '13px', color: '#991b1b' }}>
                {outOfStockProducts.length > 0 && `${outOfStockProducts.length} product(s) out of stock: ${outOfStockProducts.map(p => p.name).join(', ')}`}
                {outOfStockProducts.length > 0 && lowStockProducts.length > 0 && ' • '}
                {lowStockProducts.length > 0 && `${lowStockProducts.length} product(s) below reorder threshold: ${lowStockProducts.map(p => p.name).join(', ')}`}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: '#f3f4f6', padding: '4px', borderRadius: '8px', width: 'fit-content' }}>
            <button
              onClick={() => setActiveTab('inventory')}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer', background: activeTab === 'inventory' ? 'white' : 'transparent', color: activeTab === 'inventory' ? '#111' : '#6b7280', boxShadow: activeTab === 'inventory' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer', background: activeTab === 'history' ? 'white' : 'transparent', color: activeTab === 'history' ? '#111' : '#6b7280', boxShadow: activeTab === 'history' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
            >
              Adjustment History
            </button>
          </div>

          {activeTab === 'inventory' && (
            <>
              {/* Filters */}
              <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '260px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
                >
                  {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
                <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#6b7280' }}>
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Inventory Table */}
              <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>SKU</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Product</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Category</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Current Stock</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Reorder Level</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => {
                      const status = getStockStatus(product)
                      return (
                        <tr key={product.id} style={{ borderBottom: '0.5px solid #f3f4f6' }}>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'monospace' }}>{product.sku}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500' }}>{product.name}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', background: '#f3f4f6', color: '#4b5563' }}>
                              {product.category}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{product.stock_qty}</span>
                            <span style={{ fontSize: '11px', color: '#9ca3af' }}> units</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#6b7280' }}>{product.reorder_threshold}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', background: status.bg, color: status.color }}>
                              {status.label}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <button onClick={() => handleAdjust(product)} style={{ background: 'none', border: '1px solid #e5e7eb', color: '#4b5563', fontSize: '12px', fontWeight: '500', cursor: 'pointer', padding: '4px 10px', borderRadius: '6px' }}>Adjust</button>
                          </td>
                        </tr>
                      )
                    })}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: '40px 16px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Product</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Reason</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Qty Change</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Staff</th>
                  </tr>
                </thead>
                <tbody>
                  {adjustments.map(adj => (
                    <tr key={adj.id} style={{ borderBottom: '0.5px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{adj.created_at}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>{adj.product_name}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', background: adj.qty_change > 0 ? '#ecfdf5' : '#fef2f2', color: adj.qty_change > 0 ? '#059669' : '#dc2626' }}>
                          {getReasonLabel(adj.reason)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: adj.qty_change > 0 ? '#059669' : '#dc2626' }}>
                        {adj.qty_change > 0 ? '+' : ''}{adj.qty_change}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px' }}>{adj.staff}</td>
                    </tr>
                  ))}
                  {adjustments.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px 16px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                        No adjustment history
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {showAdjustModal && selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '400px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Adjust Stock</div>
            <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>{selectedProduct.name}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Current stock: {selectedProduct.stock_qty} units</div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Adjustment Reason</label>
              <select
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
              >
                <option value="restock">Restock</option>
                <option value="damage">Damage/Loss</option>
                <option value="count_correction">Count Correction</option>
                <option value="return">Customer Return</option>
                <option value="expired">Expired/Disposed</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Quantity Change</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setAdjustQty(adjustQty - 1)}
                  style={{ width: '36px', height: '36px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', background: 'white' }}
                >−</button>
                <input
                  type="number"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  style={{ width: '80px', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}
                />
                <button
                  onClick={() => setAdjustQty(adjustQty + 1)}
                  style={{ width: '36px', height: '36px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', background: 'white' }}
                >+</button>
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                New stock will be: {Math.max(0, selectedProduct.stock_qty + adjustQty)} units
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAdjustModal(false)}
                style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', background: 'white' }}
              >Cancel</button>
              <button
                onClick={submitAdjustment}
                disabled={adjustQty === 0}
                style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: adjustQty === 0 ? 'not-allowed' : 'pointer', background: adjustQty === 0 ? '#d1d5db' : '#1a7a4a', color: 'white' }}
              >Submit Adjustment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
