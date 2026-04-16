// CannaBuy — Database Entity Types
// Auto-generated from database schema (migrations 001 + 002)
// These types map 1:1 to Supabase tables.

export type Plan = 'starter' | 'growth' | 'enterprise'
export type FicaStatus = 'verified' | 'pending' | 'expired' | 'rejected'
export type MembershipTier = 'standard' | 'premium' | 'founding'
export type MemberStatus = 'active' | 'restricted' | 'suspended' | 'pending'
export type ProductCategory = 'sativa' | 'indica' | 'hybrid' | 'concentrate' | 'edible' | 'wellness' | 'processed'
export type BatchStage = 'germination' | 'seedling' | 'vegetative' | 'flowering' | 'harvested' | 'destroyed'
export type PaymentMethod = 'eft' | 'cash' | 'snapscan' | 'yoco' | 'payfast'
export type TransactionType = 'sale' | 'refund' | 'membership_fee'
export type TransactionStatus = 'completed' | 'pending' | 'refunded' | 'failed'
export type DocType = 'club_constitution' | 'vat_registration' | 'zoning_approval' | 'popia_officer' | 'fica_member_pack' | 'other'
export type AdjustmentReason = 'restock' | 'sale' | 'damage' | 'count_correction' | 'return' | 'expired' | 'manual'
export type UserRole = 'super_admin' | 'admin' | 'manager' | 'budtender' | 'viewer'
export type ComplianceAction = 'create' | 'update' | 'delete' | 'void' | 'refund' | 'login' | 'logout'
export type EntityType = 'member' | 'product' | 'transaction' | 'stock_adjustment' | 'user' | 'tenant' | 'batch' | 'compliance_doc'

// ---------------------------------------------------------------------------
// Tenants (Cannabis Clubs)
// ---------------------------------------------------------------------------
export interface Tenant {
  id: string
  slug: string
  name: string
  vat_number: string
  fica_officer: string
  brand_color: string
  logo_url: string | null
  domain: string | null
  plan: Plan
  is_active: boolean
  created_at: string
  updated_at: string
}

// ---------------------------------------------------------------------------
// Members
// ---------------------------------------------------------------------------
export interface Member {
  id: string
  tenant_id: string
  member_number: string
  first_name: string
  last_name: string
  id_number_encrypted: string
  date_of_birth: string       // ISO date string
  age_verified: boolean
  phone: string
  email: string
  province: string
  fica_status: FicaStatus
  fica_verified_at: string | null
  fica_document_path: string | null
  membership_tier: MembershipTier
  membership_fee_zar: number
  monthly_gram_limit: number
  status: MemberStatus
  joined_at: string
  created_at: string
  updated_at: string
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export interface Product {
  id: string
  tenant_id: string
  sku: string
  name: string
  category: ProductCategory
  weight_grams: number | null
  unit_label: string
  price_incl_vat_zar: number
  price_excl_vat_zar: number   // generated column
  vat_amount_zar: number      // generated column
  stock_qty: number
  reorder_threshold: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ---------------------------------------------------------------------------
// Cultivation Batches
// ---------------------------------------------------------------------------
export interface CultivationBatch {
  id: string
  tenant_id: string
  batch_code: string
  strain: string
  plant_count: number
  start_date: string          // ISO date string
  estimated_harvest_date: string
  actual_harvest_date: string | null
  yield_grams: number | null
  stage: BatchStage
  notes: string | null
  created_by: string
  created_at: string
  updated_at: string
}

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------
export interface Transaction {
  id: string
  tenant_id: string
  invoice_number: string
  member_id: string
  subtotal_excl_vat_zar: number
  vat_amount_zar: number
  total_incl_vat_zar: number
  payment_method: PaymentMethod
  type: TransactionType
  status: TransactionStatus
  processed_by: string
  created_at: string
}

// ---------------------------------------------------------------------------
// Transaction Line Items
// ---------------------------------------------------------------------------
export interface TransactionLineItem {
  id: string
  transaction_id: string
  product_id: string
  product_name: string
  qty: number
  unit_price_incl_vat_zar: number
  unit_price_excl_vat_zar: number
  vat_amount_zar: number
  line_total: number
}

// ---------------------------------------------------------------------------
// Compliance Documents
// ---------------------------------------------------------------------------
export interface ComplianceDocument {
  id: string
  tenant_id: string
  doc_type: DocType
  label: string
  file_path: string
  uploaded_at: string
  expiry_date: string | null
  is_valid: boolean
  uploaded_by: string
}

// ---------------------------------------------------------------------------
// User Profiles (links Supabase Auth to tenant + role)
// ---------------------------------------------------------------------------
export interface UserProfile {
  id: string
  tenant_id: string
  email: string
  full_name: string | null
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

// ---------------------------------------------------------------------------
// Stock Adjustments
// ---------------------------------------------------------------------------
export interface StockAdjustment {
  id: string
  tenant_id: string
  product_id: string
  qty_before: number
  qty_change: number
  qty_after: number
  reason: AdjustmentReason
  notes: string | null
  adjusted_by: string
  created_at: string
}

// ---------------------------------------------------------------------------
// Compliance Logs (append-only audit trail)
// ---------------------------------------------------------------------------
export interface ComplianceLog {
  id: string
  tenant_id: string
  actor_id: string | null
  actor_email: string
  action: ComplianceAction
  entity_type: EntityType
  entity_id: string | null
  description: string
  before_state: Record<string, unknown> | null
  after_state: Record<string, unknown> | null
  metadata: Record<string, unknown> | null
  created_at: string
}

// ---------------------------------------------------------------------------
// Supabase Auth Types (extends Supabase built-in)
// ---------------------------------------------------------------------------
export interface Session {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number
  token_type: string
  user: User
}

export interface User {
  id: string
  email: string
  role?: string
  email_confirmed_at?: string
  created_at?: string
  updated_at?: string
  user_metadata?: Record<string, unknown>
  app_metadata?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Combined auth user with profile (used in AuthContext)
// ---------------------------------------------------------------------------
export interface AuthUser {
  id: string
  email: string
  profile: UserProfile
}
