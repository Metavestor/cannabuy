interface VatSummaryProps {
  exclVat: number
  vatAmount: number
  total: number
  vatRate?: number
  currency?: string
}

function fmt(n: number, currency = 'R') {
  return `${currency} ${n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function VatSummary({ exclVat, vatAmount, total, vatRate = 15, currency = 'R' }: VatSummaryProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 space-y-2 text-sm">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal (excl. VAT)</span>
        <span className="tabular-nums">{fmt(exclVat, currency)}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>VAT @ {vatRate}%</span>
        <span className="tabular-nums">{fmt(vatAmount, currency)}</span>
      </div>
      <div className="flex justify-between font-medium text-gray-900 border-t border-gray-200 pt-2">
        <span>Total</span>
        <span className="tabular-nums text-[var(--brand,#1a7a4a)]">{fmt(total, currency)}</span>
      </div>
    </div>
  )
}
