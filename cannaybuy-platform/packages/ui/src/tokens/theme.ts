// =====================================================
// CannaBuy Design Tokens — White-label theme layer
// Override these per tenant via CSS custom properties
// =====================================================

export interface CannaBuyTheme {
  brandColor: string        // Primary green — clubs can override
  brandColorLight: string   // Light tint for backgrounds
  brandColorDark: string    // Dark shade for hover states
  logoUrl: string | null    // Club logo — null = CannaBuy default
  appName: string           // "CannaBuy" or white-label name
  fontFamily: string        // Override per club if needed
  borderRadius: string      // Default: '8px'
}

export const defaultTheme: CannaBuyTheme = {
  brandColor: '#1a7a4a',
  brandColorLight: '#e8f5ef',
  brandColorDark: '#155e39',
  logoUrl: null,
  appName: 'CannaBuy',
  fontFamily: 'Inter, system-ui, sans-serif',
  borderRadius: '8px',
}

// Inject theme as CSS custom properties on :root
// Call this in your root layout with the tenant's theme
export function applyTheme(theme: Partial<CannaBuyTheme>) {
  const t = { ...defaultTheme, ...theme }
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.style.setProperty('--brand', t.brandColor)
  root.style.setProperty('--brand-light', t.brandColorLight)
  root.style.setProperty('--brand-dark', t.brandColorDark)
  root.style.setProperty('--font-body', t.fontFamily)
  root.style.setProperty('--radius', t.borderRadius)
}
