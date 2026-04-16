/**
 * CannaBuy — Typed Supabase Query Helpers
 *
 * These helpers:
 * - guard against missing Supabase env vars
 * - keep page components clean
 * - centralize tenant-scoped reads/writes
 */

import { hasSupabaseConfig, supabase } from './client'
import type {
  Product,
  Member,
  Tenant,
  Transaction,
  TransactionLineItem,
  StockAdjustment,
  UserProfile,
} from './types'

function ready() {
  return hasSupabaseConfig()
}

function empty<T>(): T[] {
  return []
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export async function getProducts(tenantId: string): Promise<Product[]> {
  if (!ready()) return empty<Product>()

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
  if (!ready()) return null

  const { data, error } = await supabase()
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Product
}

// ---------------------------------------------------------------------------
// Members
// ---------------------------------------------------------------------------

export async function getMembers(tenantId: string): Promise<Member[]> {
  if (!ready()) return empty<Member>()

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
  if (!ready()) return null

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
  if (!ready()) return empty<Member>()

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

export async function addMember(payload: {
  tenantId: string
  firstName: string
  lastName: string
  idNumberEncrypted: string
  dateOfBirth: string
  phone: string
  email: string
  province: string
  membershipTier: Member['membership_tier']
}): Promise<Member | null> {
  if (!ready()) return null

  // Generate next member number for this tenant
  const { data: existing } = await supabase()
    .from('members')
    .select('member_number')
    .eq('tenant_id', payload.tenantId)
    .order('created_at', { ascending: false })
    .limit(1)

  const nextNum = existing && existing.length > 0
    ? parseInt(existing[0].member_number.replace(/\D/g, '')) + 1
    : 1
  const memberNumber = `MBR${String(nextNum).padStart(3, '0')}`

  const { data, error } = await supabase()
    .from('members')
    .insert({
      tenant_id: payload.tenantId,
      member_number: memberNumber,
      first_name: payload.firstName,
      last_name: payload.lastName,
      id_number_encrypted: payload.idNumberEncrypted,
      date_of_birth: payload.dateOfBirth,
      age_verified: false,
      phone: payload.phone,
      email: payload.email,
      province: payload.province,
      fica_status: 'pending',
      membership_tier: payload.membershipTier,
      membership_fee_zar: 0,
      monthly_gram_limit: 100,
      status: 'pending',
      joined_at: new Date().toISOString().split('T')[0],
    })
    .select()
    .single()

  if (error) {
    console.error('[queries] addMember error:', error)
    return null
  }

  return data as Member
}

export async function updateMemberFICA(
  memberId: string,
  status: 'verified' | 'rejected'
): Promise<boolean> {
  if (!ready()) return false

  const { error } = await supabase()
    .from('members')
    .update({
      fica_status: status,
      fica_verified_at: status === 'verified' ? new Date().toISOString() : null,
    })
    .eq('id', memberId)

  if (error) {
    console.error('[queries] updateMemberFICA error:', error)
    return false
  }

  return true
}

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

export async function getTransactions(
  tenantId: string,
  limit = 100
): Promise<Transaction[]> {
  if (!ready()) return empty<Transaction>()

  const { data, error } = await supabase()
    .from('transactions')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[queries] getTransactions error:', error)
    return []
  }

  return (data as Transaction[]) ?? []
}

export async function getTransactionLineItems(
  transactionId: string
): Promise<TransactionLineItem[]> {
  if (!ready()) return empty<TransactionLineItem>()

  const { data, error } = await supabase()
    .from('transaction_line_items')
    .select('*')
    .eq('transaction_id', transactionId)
    .order('id')

  if (error) {
    console.error('[queries] getTransactionLineItems error:', error)
    return []
  }

  return (data as TransactionLineItem[]) ?? []
}

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
  if (!ready()) return null

  const invoiceNumber = generateInvoiceNumber()

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

export async function refundTransaction(
  transactionId: string,
  tenantId: string,
  processedBy: string
): Promise<boolean> {
  if (!ready()) return false

  const { error } = await supabase()
    .from('transactions')
    .update({
      status: 'refunded',
      type: 'refund',
      processed_by: processedBy,
    })
    .eq('id', transactionId)
    .eq('tenant_id', tenantId)
    .eq('status', 'completed')

  if (error) {
    console.error('[queries] refundTransaction error:', error)
    return false
  }

  return true
}

// ---------------------------------------------------------------------------
// Stock Adjustments
// ---------------------------------------------------------------------------

export async function adjustStock(
  tenantId: string,
  productId: string,
  qtyChange: number,
  reason: StockAdjustment['reason'],
  adjustedBy: string
): Promise<boolean> {
  if (!ready()) return false

  const { data: product, error: fetchError } = await supabase()
    .from('products')
    .select('stock_qty')
    .eq('id', productId)
    .single()

  if (fetchError || !product) return false

  const qtyBefore = product.stock_qty as number
  const qtyAfter = Math.max(0, qtyBefore + qtyChange)

  const { error: updateError } = await supabase()
    .from('products')
    .update({ stock_qty: qtyAfter })
    .eq('id', productId)

  if (updateError) {
    console.error('[queries] adjustStock update error:', updateError)
    return false
  }

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

// ---------------------------------------------------------------------------
// Tenants
// ---------------------------------------------------------------------------

export async function getTenants(): Promise<Tenant[]> {
  if (!ready()) return empty<Tenant>()

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
  if (!ready()) return null

  const { data, error } = await supabase()
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Tenant
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateInvoiceNumber(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 9000) + 1000)
  return `INV-${year}${month}${day}-${rand}`
}
