import { clsx } from 'clsx'

interface AlertProps {
  variant?: 'info' | 'warning' | 'danger' | 'success'
  children: React.ReactNode
  className?: string
}

export function Alert({ variant = 'info', children, className }: AlertProps) {
  return (
    <div className={clsx(
      'flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm border',
      variant === 'info'    && 'bg-blue-50 text-blue-800 border-blue-200',
      variant === 'warning' && 'bg-amber-50 text-amber-800 border-amber-200',
      variant === 'danger'  && 'bg-red-50 text-red-700 border-red-200',
      variant === 'success' && 'bg-emerald-50 text-emerald-800 border-emerald-200',
      className
    )}>
      {children}
    </div>
  )
}
