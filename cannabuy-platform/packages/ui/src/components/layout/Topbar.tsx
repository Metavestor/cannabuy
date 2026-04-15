'use client'
import { Button } from '../primitives/Button'

interface TopbarProps {
  title: string
  onAddClick?: () => void
  addLabel?: string
  isActive?: boolean
}

export function Topbar({ title, onAddClick, addLabel = '+ Quick Add', isActive = true }: TopbarProps) {
  return (
    <header className="h-13 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-sm font-medium text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          {isActive ? 'System Active' : 'Offline'}
        </div>
        {onAddClick && (
          <Button variant="primary" size="sm" onClick={onAddClick}>
            {addLabel}
          </Button>
        )}
      </div>
    </header>
  )
}
