'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getTenants } from '@/lib/supabase/queries'
import type { Tenant } from '@/lib/supabase/types'

// ─── Local Club shape (used internally) ──────────────────────────────────────

export interface Club {
  id: string
  name: string
  slug: string
  plan: 'starter' | 'growth' | 'enterprise'
  isActive: boolean
  memberCount: number
  monthlyRevenue: number
  vatNumber: string
  brandColor: string
  createdAt: string
}

// ─── Demo data — used when Supabase is unavailable ────────────────────────────

const DEMO_CLUBS: Club[] = [
  {
    id: 't1',
    name: 'CannaClub Gauteng',
    slug: 'cannaclub-gauteng',
    plan: 'enterprise',
    isActive: true,
    memberCount: 142,
    monthlyRevenue: 89420,
    vatNumber: '4912345678',
    brandColor: '#1a7a4a',
    createdAt: '2025-01-15',
  },
  {
    id: 't2',
    name: 'Green Leaf Western Cape',
    slug: 'greenleaf-wc',
    plan: 'growth',
    isActive: true,
    memberCount: 67,
    monthlyRevenue: 42180,
    vatNumber: '4987654321',
    brandColor: '#0f766e',
    createdAt: '2025-06-01',
  },
  {
    id: 't3',
    name: 'Cape Cannabis Co.',
    slug: 'capecannaco',
    plan: 'starter',
    isActive: true,
    memberCount: 28,
    monthlyRevenue: 18240,
    vatNumber: '4123456789',
    brandColor: '#7c3aed',
    createdAt: '2025-09-20',
  },
  {
    id: 't4',
    name: 'KwaZulu Bud Club',
    slug: 'kznbud',
    plan: 'starter',
    isActive: false,
    memberCount: 12,
    monthlyRevenue: 0,
    vatNumber: '4876543210',
    brandColor: '#b45309',
    createdAt: '2025-11-10',
  },
]

// ─── Tenant → Club mapper ─────────────────────────────────────────────────────

function tenantToClub(t: Tenant): Club {
  return {
    id: t.id,
    name: t.name,
    slug: t.slug,
    plan: t.plan,
    isActive: t.is_active,
    memberCount: 0,
    monthlyRevenue: 0,
    vatNumber: t.vat_number,
    brandColor: t.brand_color,
    createdAt: t.created_at,
  }
}

// ─── Context value shape ──────────────────────────────────────────────────────

interface ClubContextValue {
  activeClub: Club
  setActiveClub: (club: Club) => void
  activeClubId: string
  clubs: Club[]
  isDemo: boolean
}

const ClubContext = createContext<ClubContextValue | null>(null)

// ─── Provider ────────────────────────────────────────────────────────────────

export function ClubProvider({ children }: { children: ReactNode }) {
  const [clubs, setClubs] = useState<Club[]>(DEMO_CLUBS)
  const [activeClub, setActiveClubState] = useState<Club>(DEMO_CLUBS[0])
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    async function loadClubs() {
      try {
        const tenants = await getTenants()
        if (tenants.length > 0) {
          const mapped = tenants.map(tenantToClub)
          setClubs(mapped)
          // Pick the first active club, or fall back to demo
          const active = mapped.find(c => c.isActive) ?? mapped[0]
          setActiveClubState(active)
          setIsDemo(false)
          return
        }
      } catch (err) {
        console.warn('[ClubContext] Supabase unavailable, using demo data:', err)
      }
      // Fall back to demo data
      setClubs(DEMO_CLUBS)
      const defaultClub = DEMO_CLUBS.find(c => c.isActive) ?? DEMO_CLUBS[0]
      setActiveClubState(defaultClub)
      setIsDemo(true)
    }

    loadClubs()
  }, [])

  function setActiveClub(club: Club) {
    setActiveClubState(club)
  }

  return (
    <ClubContext.Provider
      value={{
        activeClub,
        setActiveClub,
        activeClubId: activeClub.id,
        clubs,
        isDemo,
      }}
    >
      {children}
    </ClubContext.Provider>
  )
}

export function useClub() {
  const ctx = useContext(ClubContext)
  if (!ctx) throw new Error('useClub must be used within ClubProvider')
  return ctx
}
