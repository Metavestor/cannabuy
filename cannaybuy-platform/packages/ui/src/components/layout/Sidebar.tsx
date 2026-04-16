'use client'
import { clsx } from 'clsx'
import { useState } from 'react'

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

const defaultNav: NavItem[] = [
  { label: 'Dashboard',   href: '/dashboard',   icon: '▦' },
  { label: 'Members',     href: '/members',     icon: '👥' },
  { label: 'Inventory',   href: '/inventory',   icon: '📦' },
  { label: 'Point of Sale', href: '/pos',       icon: '🧾' },
  { label: 'Financials',  href: '/financial',   icon: '💰' },
  { label: 'Compliance',  href: '/compliance',  icon: '🛡' },
]

interface SidebarProps {
  appName?: string
  logoUrl?: string | null
  vatNumber?: string
  currentPath?: string
  navItems?: NavItem[]
  memberBadge?: number
}

export function Sidebar({
  appName = 'CannaBuy',
  logoUrl = null,
  vatNumber,
  currentPath = '/dashboard',
  navItems = defaultNav,
  memberBadge,
}: SidebarProps) {
  return (
    <aside className="w-56 h-screen flex flex-col bg-white border-r border-gray-100 flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100">
        {logoUrl
          ? <img src={logoUrl} alt={appName} className="h-7 object-contain" />
          : <span className="text-sm font-medium text-gray-900">{appName}</span>
        }
        <span className="mt-1 inline-block text-xs bg-[var(--brand-light,#e8f5ef)] text-[var(--brand,#1a7a4a)] px-2 py-0.5 rounded-full font-medium">
          ZA Compliant
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map((item) => {
          const active = currentPath.startsWith(item.href)
          return (
            <a
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-[var(--brand-light,#e8f5ef)] text-[var(--brand,#1a7a4a)] font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className="text-base w-4 text-center" style={{ fontSize: 14 }}>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.label === 'Members' && memberBadge != null && (
                <span className="text-xs bg-[var(--brand,#1a7a4a)] text-white px-1.5 py-0.5 rounded-full">
                  {memberBadge}
                </span>
              )}
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400 space-y-0.5">
        <div>v1.0 · South Africa</div>
        {vatNumber && <div>VAT: {vatNumber}</div>}
      </div>
    </aside>
  )
}
