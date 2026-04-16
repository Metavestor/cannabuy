/**
 * CannaBuy — Typed Supabase Query Helpers
 * Reusable data-access functions that wrap Supabase calls with proper
 * type safety, error handling, and demo-data fallbacks.
 */

import { supabase } from './client'
import type {
  Product,
  Member,
  Tenant,
  Transaction,
  TransactionLineItem,
  StockAdjustment,
  UserProfile,
} from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────────────────────────────────────

export async function getProducts(tenantId: string): Promise<Product[]> {
  const { data, error } = await supabase()
    .from('products')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('[queries] getProducts error:', error)
    return []
  }
  return (data as Product[]) ?? []
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase()
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Product
}

// ─────────────────────────────────────────────────────────────────────────────
// Members
// ─────────────────────────────────────────────────────────────────────────────

export async function getMembers(tenantId: string): Promise<Member[]> {
  const { data, error } = await supabase()
    .from('members')
    .select('*')
    .eq('tenant_id', tenantId)
    .in('status', ['active', 'restricted'])
    .order('first_name')

  if (error) {
    console.error('[queries] getMembers error:', error)
    return []
  }
  return (data as Member[]) ?? []
}

export async function getMemberById(id: string): Promise<Member | null> {
  const { data, error } = await supabase()
    .from('members')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Member
}

export async function searchMembers(
  tenantId: string,
  query: string
): Promise<Member[]> {
  const { data, error } = await supabase()
    .from('members')
    .select('*')
    .eq('tenant_id', tenantId)
    .in('status', ['active', 'restricted'])
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,member_number.ilike.%${query}%`)
    .limit(10)

  if (error) {
    console.error('[queries] searchMembers error:', error)
    return []
  }
  return (data as Member[]) ?? []
}

// ─────────────────────────────────────────────────────────────────────────────
// Transactions
// ─────────────────────────────────────────────────────────────────────────────

export async function createTransaction(payload: {
  tenantId: string
  memberId: string | null
  subtotalExclVat: number
  vatAmount: number
  totalInclVat: number
  paymentMethod: Transaction['payment_method']
  processedBy: string
  lineItems: Array<{
    productId: string
    productName: string
    qty: number
    unitPriceInclVat: number
    unitPriceExclVat: number
    vatAmount: number
    lineTotal: number
  }>
}): Promise<Transaction | null> {
  const invoiceNumber = generateInvoiceNumber()

  // Insert transaction header
  const { data: txData, error: txError } = await supabase()
    .from('transactions')
    .insert({
      tenant_id: payload.tenantId,
      invoice_number: invoiceNumber,
      member_id: payload.memberId,
      subtotal_excl_vat_zar: payload.subtotalExclVat,
      vat_amount_zar: payload.vatAmount,
      total_incl_vat_zar: payload.totalInclVat,
      payment_method: payload.paymentMethod,
      type: 'sale',
      status: 'completed',
      processed_by: payload.processedBy,
    })
    .select()
    .single()

  if (txError || !txData) {
    console.error('[queries] createTransaction error:', txError)
    return null
  }

  // Insert line items
  const lineItemRows = payload.lineItems.map(item => ({
    transaction_id: txData.id,
    product_id: item.productId,
    product_name: item.productName,
    qty: item.qty,
    unit_price_incl_vat_zar: item.unitPriceInclVat,
    unit_price_excl_vat_zar: item.unitPriceExclVat,
    vat_amount_zar: item.vatAmount,
    line_total: item.lineTotal,
  }))

  const { error: lineError } = await supabase()
    .from('transaction_line_items')
    .insert(lineItemRows)

  if (lineError) {
    console.error('[queries] createTransaction lineItems error:', lineError)
  }

  return txData as Transaction
}

// ─────────────────────────────────────────────────────────────────────────────
// Stock Adjustments (called after each sale to deduct stock)
// ─────────────────────────────────────────────────────────────────────────────

export async function adjustStock(
  tenantId: string,
  productId: string,
  qtyChange: number,
  reason: StockAdjustment['reason'],
  adjustedBy: string
): Promise<boolean> {
  // First get current stock
  const { data: product, error: fetchError } = await supabase()
    .from('products')
    .select('stock_qty')
    .eq('id', productId)
    .single()

  if (fetchError || !product) return false

  const qtyBefore = product.stock_qty as number
  const qtyAfter = Math.max(0, qtyBefore + qtyChange)

  // Update product stock
  const { error: updateError } = await supabase()
    .from('products')
    .update({ stock_qty: qtyAfter })
    .eq('id', productId)

  if (updateError) {
    console.error('[queries] adjustStock update error:', updateError)
    return false
  }

  // Log the adjustment
  await supabase().from('stock_adjustments').insert({
    tenant_id: tenantId,
    product_id: productId,
    qty_before: qtyBefore,
    qty_change: qtyChange,
    qty_after: qtyAfter,
    reason,
    adjusted_by: adjustedBy,
  })

  return true
}

// ─────────────────────────────────────────────────────────────────────────────
// Tenants (Clubs)
// ─────────────────────────────────────────────────────────────────────────────

export async function getTenants(): Promise<Tenant[]> {
  const { data, error } = await supabase()
    .from('tenants')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('[queries] getTenants error:', error)
    return []
  }
  return (data as Tenant[]) ?? []
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  const { data, error } = await supabase()
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Tenant
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateInvoiceNumber(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 9000) + 1000)
  return `INV-${year}${month}${day}-${rand}`
}
