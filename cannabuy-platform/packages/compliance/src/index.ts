// =====================================================
// CannaBuy — ZA Compliance Package
// =====================================================

export const ZA_VAT_RATE = 0.15

export function calcExclVat(inclVat: number): number {
  return Number((inclVat / (1 + ZA_VAT_RATE)).toFixed(2))
}
export function calcVatAmount(inclVat: number): number {
  return Number((inclVat - calcExclVat(inclVat)).toFixed(2))
}
export function calcInclVat(exclVat: number): number {
  return Number((exclVat * (1 + ZA_VAT_RATE)).toFixed(2))
}
export function calcVatPayable(outputVat: number, inputVat: number): number {
  return Number((outputVat - inputVat).toFixed(2))
}

export function validateSaId(id: string): {
  valid: boolean; dateOfBirth: string | null; age: number | null; isCitizen: boolean | null; error: string | null
} {
  if (!id || id.length !== 13 || !/^\d{13}$/.test(id))
    return { valid: false, dateOfBirth: null, age: null, isCitizen: null, error: 'ID must be exactly 13 digits' }

  const digits = id.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 12; i++) {
    let d = digits[i]
    if (i % 2 !== 0) { d *= 2; if (d > 9) d -= 9 }
    sum += d
  }
  if ((10 - (sum % 10)) % 10 !== digits[12])
    return { valid: false, dateOfBirth: null, age: null, isCitizen: null, error: 'Invalid checksum' }

  const yy = id.substring(0, 2), mm = id.substring(2, 4), dd = id.substring(4, 6)
  const year = parseInt(yy) <= new Date().getFullYear() % 100 ? `20${yy}` : `19${yy}`
  const dob = `${year}-${mm}-${dd}`
  const dobDate = new Date(dob)
  if (isNaN(dobDate.getTime()))
    return { valid: false, dateOfBirth: null, age: null, isCitizen: null, error: 'Invalid date in ID' }

  const today = new Date()
  let age = today.getFullYear() - dobDate.getFullYear()
  const m = today.getMonth() - dobDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--

  return { valid: true, dateOfBirth: dob, age, isCitizen: id[10] === '0', error: null }
}

export function isAgeVerified(dateOfBirth: string, minimum = 18): boolean {
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
  return age >= minimum
}

export const DAA_LIMITS = {
  plantsPerPerson: 4,
  privateStashGrams: 600,
  publicCarryGrams: 100,
} as const

export const TIER_GRAM_LIMITS: Record<string, number> = {
  standard: 30,
  premium: 60,
  founding: 120,
}

export function checkMemberAllowance(tier: string, usedGrams: number, requestedGrams: number) {
  const limit = TIER_GRAM_LIMITS[tier] ?? 30
  const remaining = limit - usedGrams
  if (requestedGrams > remaining)
    return { allowed: false, remaining, message: `Exceeds remaining allowance of ${remaining}g` }
  return { allowed: true, remaining: remaining - requestedGrams, message: `Approved. ${remaining - requestedGrams}g remaining.` }
}

export function ficaIsExpired(verifiedAt: string | null, expiryMonths = 24): boolean {
  if (!verifiedAt) return true
  const expiry = new Date(verifiedAt)
  expiry.setMonth(expiry.getMonth() + expiryMonths)
  return new Date() > expiry
}

export function buildVat201Summary(vendorName: string, vatNumber: string, periodMonth: string, outputVat: number, inputVat: number) {
  const [year, month] = periodMonth.split('-').map(Number)
  return {
    vendorName,
    vatNumber,
    periodStart: new Date(year, month - 1, 1).toISOString().split('T')[0],
    periodEnd: new Date(year, month, 0).toISOString().split('T')[0],
    outputVat: Number(outputVat.toFixed(2)),
    inputVat: Number(inputVat.toFixed(2)),
    netVatPayable: calcVatPayable(outputVat, inputVat),
    dueDate: new Date(year, month, 25).toISOString().split('T')[0],
  }
}
