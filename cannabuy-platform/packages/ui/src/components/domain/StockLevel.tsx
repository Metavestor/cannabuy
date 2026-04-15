interface StockLevelProps {
  qty: number
  max: number
  unit?: string
  threshold?: number
}

export function StockLevel({ qty, max, unit = 'g', threshold = 20 }: StockLevelProps) {
  const pct = Math.min(100, Math.round((qty / max) * 100))
  const color =
    pct <= 10 ? 'bg-red-500' :
    pct <= threshold ? 'bg-amber-400' :
    'bg-[var(--brand,#1a7a4a)]'

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-gray-100 flex-shrink-0">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 tabular-nums">
        {qty}{unit}
      </span>
    </div>
  )
}
