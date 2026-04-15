import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'flat' | 'metric'
}

export function Card({ className, variant = 'raised', ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl p-4',
        variant === 'raised'  && 'bg-white border border-gray-100',
        variant === 'flat'    && 'bg-gray-50',
        variant === 'metric'  && 'bg-gray-50 rounded-xl p-4',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('flex items-center justify-between mb-3', className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx('text-sm font-medium text-gray-900', className)} {...props} />
}

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ label, value, sub, trend }: MetricCardProps) {
  return (
    <Card variant="metric">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900">{value}</p>
      {sub && (
        <p className={clsx(
          'text-xs mt-1',
          trend === 'up'   && 'text-emerald-600',
          trend === 'down' && 'text-red-500',
          (!trend || trend === 'neutral') && 'text-gray-400'
        )}>
          {sub}
        </p>
      )}
    </Card>
  )
}
