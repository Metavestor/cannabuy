import { clsx } from 'clsx'

type ComplianceStatus = 'compliant' | 'warning' | 'expired' | 'pending'

interface CompliancePillProps {
  label: string
  status: ComplianceStatus
  detail?: string
}

const statusStyles: Record<ComplianceStatus, string> = {
  compliant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning:   'bg-amber-50 text-amber-700 border-amber-200',
  expired:   'bg-red-50 text-red-700 border-red-200',
  pending:   'bg-gray-50 text-gray-600 border-gray-200',
}

const statusDot: Record<ComplianceStatus, string> = {
  compliant: 'bg-emerald-500',
  warning:   'bg-amber-400',
  expired:   'bg-red-500',
  pending:   'bg-gray-400',
}

export function CompliancePill({ label, status, detail }: CompliancePillProps) {
  return (
    <div className={clsx('flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium', statusStyles[status])}>
      <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', statusDot[status])} />
      <span>{label}</span>
      {detail && <span className="opacity-60">· {detail}</span>}
    </div>
  )
}
