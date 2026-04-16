// =====================================================
// CannaBuy Platform — Shared TypeScript Types
// =====================================================

export type MemberStatus = 'active' | 'restricted' | 'suspended' | 'pending'
export type MembershipTier = 'standard' | 'premium' | 'founding'
export type FicaStatus = 'verified' | 'pending' | 'expired' | 'rejected'

export interface Tenant {
  id: string
  slug: string
  name: string
  vatNumber: string
  ficaOfficer: string
  brandColor: string
  logoUrl: string | null
  domain: string | null
  plan: 'starter' | 'growth' | 'enterprise'
  createdAt: string
  isActive: boolean
}

export interface Member {
  id: string
  tenantId: string
  memberNumber: string
  firstName: string
  lastName: string
  idNumber: string
  dateOfBirth: string
  ageVerified: boolean
  phone: string
  email: string
  province: string
  ficaStatus: FicaStatus
  ficaVerifiedAt: string | null
  ficaDocumentUrl: string | null
  membershipTier: MembershipTier
  membershipFeeZar: number
  monthlyGramLimit: number
  status: MemberStatus
  joinedAt: string
}

export type ProductCategory = 'sativa' | 'indica' | 'hybrid' | 'concentrate' | 'edible' | 'wellness' | 'processed'
export type StockStatus = 'in_stock' | 'low_stock' | 'critical' | 'out_of_stock'

export interface Product {
  id: string
  tenantId: string
  sku: string
  name: string
  category: ProductCategory
  weightGrams: number | null
  unitLabel: string
  priceInclVatZar: number
  priceExclVatZar: number
  vatAmountZar: number
  stockQty: number
  reorderThreshold: number
  stockStatus: StockStatus
  isActive: boolean
}

export type BatchStage = 'germination' | 'seedling' | 'vegetative' | 'flowering' | 'harvested' | 'destroyed'

export interface CultivationBatch {
  id: string
  tenantId: string
  batchCode: string
  strain: string
  plantCount: number
  startDate: string
  estimatedHarvestDate: string
  actualHarvestDate: string | null
  yieldGrams: number | null
  stage: BatchStage
  notes: string | null
  createdBy: string
}

export type PaymentMethod = 'eft' | 'cash' | 'snapscan' | 'yoco' | 'payfast'
export type TransactionType = 'sale' | 'refund' | 'membership_fee'
export type TransactionStatus = 'completed' | 'pending' | 'refunded' | 'failed'

export interface TransactionLineItem {
  productId: string
  productName: string
  qty: number
  unitPriceInclVatZar: number
  unitPriceExclVatZar: number
  vatAmountZar: number
  lineTotal: number
}

export interface Transaction {
  id: string
  tenantId: string
  invoiceNumber: string
  memberId: string
  memberName: string
  lineItems: TransactionLineItem[]
  subtotalExclVatZar: number
  vatAmountZar: number
  totalInclVatZar: number
  paymentMethod: PaymentMethod
  type: TransactionType
  status: TransactionStatus
  processedBy: string
  createdAt: string
}

export interface VatPeriod {
  tenantId: string
  periodMonth: string
  outputVatZar: number
  inputVatZar: number
  vatPayableZar: number
  submittedToSars: boolean
  submittedAt: string | null
}

export type ComplianceDocType =
  | 'club_constitution' | 'vat_registration' | 'zoning_approval'
  | 'popia_officer' | 'fica_member_pack' | 'other'

export interface ComplianceDocument {
  id: string
  tenantId: string
  docType: ComplianceDocType
  label: string
  fileUrl: string
  uploadedAt: string
  expiryDate: string | null
  isValid: boolean
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}
