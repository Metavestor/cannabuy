'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock product data - in production this would come from Supabase
const mockProducts = [
  { id: '1', sku: 'FLW-001', name: 'Purple Haze', category: 'sativa', weight_grams: 28, unit_label: '28g', price_incl_vat_zar: 850.00, stock_qty: 150, reorder_threshold: 50, is_active: true },
  { id: '2', sku: 'FLW-002', name: 'Northern Lights', category: 'indica', weight_grams: 28, unit_label: '28g', price_incl_vat_zar: 720.00, stock_qty: 85, reorder_threshold: 50, is_active: true },
  { id: '3', sku: 'EDB-001', name: 'THC Gummies (10pk)', category: 'edible', weight_grams: 100, unit_label: '100g', price_incl_vat_zar: 350.00, stock_qty: 42, reorder_threshold: 20, is_active: true },
  { id: '4', sku: 'CON-001', name: 'Water Hash', category: 'concentrate', weight_grams: 7, unit_label: '7g', price_incl_vat_zar: 1200.00, stock_qty: 8, reorder_threshold: 15, is_active: true },
  { id: '5', sku: 'HYB-001', name: 'OG Kush', category: 'hybrid', weight_grams: 28, unit_label: '28g', price_incl_vat_zar: 780.00, stock_qty: 0, reorder_threshold: 50, is_active: true },
  { id: '6', sku: 'WEL-001', name: 'CBD Oil 1000mg', category: 'wellness', weight_grams: 30, unit_label: '30ml', price_incl_vat_zar: 650.00, stock_qty: 65, reorder_threshold: 25, is_active: true },
]

const categories = ['sativa', 'indica', 'hybrid', 'concentrate', 'edible', 'wellness', 'processed']

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    sku: '', name: '', category: 'sativa', weight_grams: 28, unit_label: '28g',
    price_incl_vat_zar: 0, stock_qty: 0, reorder_threshold: 50, is_active: true
  })

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const lowStockCount = products.filter(p => p.stock_qty < p.reorder_threshold && p.stock_qty > 0).length
  const outOfStockCount = products.filter(p => p.stock_qty === 0).length

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({ ...product })
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setFormData({ sku: '', name: '', category: 'sativa', weight_grams: 28, unit_label: '28g',
      price_incl_vat_zar: 0, stock_qty: 0, reorder_threshold: 50, is_active: true })
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p))
    } else {
      setProducts([...products, { ...formData, id: String(Date.now()) }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const getStockStatus = (product: any) => {
    if (product.stock_qty === 0) return { label: 'Out of Stock', color: '#dc2626', bg: '#fef2f2' }
    if (product.stock_qty < product.reorder_threshold) return { label: 'Low Stock', color: '#d97706', bg: '#fffbeb' }
    return { label: 'In Stock', color: '#059669', bg: '#ecfdf5' }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside style={{ width: '240px', background: 'white', borderRight: '0.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '12px 8px 8px', borderBottom: '0.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '240px', height: 'auto', display: 'block', margin: '0 auto' }} />
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', textAlign: 'center' }}>Cannabis Club Management</div>
          <div style={{ display: 'inline-block', marginTop: '6px', background: '#e8f5ef', color: '#1a7a4a', fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '10px', textAlign: 'center' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '▦' },
            { label: 'Members', href: '/members', icon: '👥' },
            { label: 'Inventory', href: '/inventory', icon: '📦' },
            { label: 'Point of Sale', href: '/pos', icon: '🧾' },
            { label: 'Products', href: '/admin/products', icon: '📋', active: true },
            { label: 'Financials', href: '/financial', icon: '💰' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', fontSize: '13px', background: (item as any).active ? '#e8f5ef' : 'transparent', color: (item as any).active ? '#1a7a4a' : '#6b7280', fontWeight: (item as any).active ? '600' : '400' }}>
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
          <div style={{ fontSize: '15px', fontWeight: '600' }}>Product Management</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {(lowStockCount > 0 || outOfStockCount > 0) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: outOfStockCount > 0 ? '#fef2f2' : '#fffbeb', color: outOfStockCount > 0 ? '#dc2626' : '#d97706', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                {outOfStockCount > 0 && `${outOfStockCount} Out of Stock`}
                {lowStockCount > 0 && `${lowStockCount} Low Stock`}
              </div>
            )}
            <button onClick={handleAdd} style={{ background: '#1a7a4a', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ Add Product</button>
          </div>
        </header>

        <div style={{ padding: '24px', flex: 1 }}>
          {/* Filters */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '280px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#6b7280' }}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Products Table */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>SKU</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Product</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Category</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Price (ZAR)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Stock</th>
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
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '500' }}>{product.name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>{product.weight_grams}{product.unit_label}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', background: '#f3f4f6', color: '#4b5563' }}>
                          {product.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '500' }}>
                        R {product.price_incl_vat_zar.toFixed(2)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px' }}>
                        <span style={{ fontWeight: '600' }}>{product.stock_qty}</span>
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}> / min {product.reorder_threshold}</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', background: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button onClick={() => handleEdit(product)} style={{ background: 'none', border: 'none', color: '#1a7a4a', fontSize: '12px', fontWeight: '500', cursor: 'pointer', marginRight: '12px' }}>Edit</button>
                        <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>Delete</button>
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
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '480px', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</div>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>SKU</label>
                <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Product Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Weight (g)</label>
                  <input type="number" value={formData.weight_grams} onChange={e => setFormData({...formData, weight_grams: Number(e.target.value)})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Price (ZAR incl VAT)</label>
                  <input type="number" step="0.01" value={formData.price_incl_vat_zar} onChange={e => setFormData({...formData, price_incl_vat_zar: Number(e.target.value)})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Unit Label</label>
                  <input type="text" value={formData.unit_label} onChange={e => setFormData({...formData, unit_label: e.target.value})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Stock Qty</label>
                  <input type="number" value={formData.stock_qty} onChange={e => setFormData({...formData, stock_qty: Number(e.target.value)})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Reorder Threshold</label>
                  <input type="number" value={formData.reorder_threshold} onChange={e => setFormData({...formData, reorder_threshold: Number(e.target.value)})} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
                </div>
              </div>
              {editingProduct && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="is_active" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                  <label htmlFor="is_active" style={{ fontSize: '13px' }}>Product is active</label>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', background: 'white' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: '#1a7a4a', color: 'white' }}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
