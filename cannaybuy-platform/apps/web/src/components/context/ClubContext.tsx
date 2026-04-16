'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

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

const mockClubs: Club[] = [
  { id: 't1', name: 'CannaClub Gauteng', slug: 'cannaclub-gauteng', plan: 'enterprise', isActive: true, memberCount: 142, monthlyRevenue: 89420, vatNumber: '4912345678', brandColor: '#1a7a4a', createdAt: '2025-01-15' },
  { id: 't2', name: 'Green Leaf Western Cape', slug: 'greenleaf-wc', plan: 'growth', isActive: true, memberCount: 67, monthlyRevenue: 42180, vatNumber: '4987654321', brandColor: '#0f766e', createdAt: '2025-06-01' },
  { id: 't3', name: 'Cape Cannabis Co.', slug: 'capecannaco', plan: 'starter', isActive: true, memberCount: 28, monthlyRevenue: 18240, vatNumber: '4123456789', brandColor: '#7c3aed', createdAt: '2025-09-20' },
  { id: 't4', name: 'KwaZulu Bud Club', slug: 'kznbud', plan: 'starter', isActive: false, memberCount: 12, monthlyRevenue: 0, vatNumber: '4876543210', brandColor: '#b45309', createdAt: '2025-11-10' },
]

interface ClubContextValue {
  activeClub: Club
  setActiveClub: (club: Club) => void
  activeClubId: string
  clubs: Club[]
}

const ClubContext = createContext<ClubContextValue | null>(null)

export function ClubProvider({ children }: { children: ReactNode }) {
  const defaultClub = mockClubs.find(c => c.isActive) ?? mockClubs[0]
  const [activeClub, setActiveClub] = useState<Club>(defaultClub)

  return (
    <ClubContext.Provider value={{ activeClub, setActiveClub, activeClubId: activeClub.id, clubs: mockClubs }}>
      {children}
    </ClubContext.Provider>
  )
}

export function useClub() {
  const ctx = useContext(ClubContext)
  if (!ctx) throw new Error('useClub must be used within ClubProvider')
  return ctx
}
