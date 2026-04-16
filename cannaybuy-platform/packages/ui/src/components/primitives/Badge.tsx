import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        green:  'bg-emerald-100 text-emerald-800',
        amber:  'bg-amber-100 text-amber-800',
        red:    'bg-red-100 text-red-800',
        blue:   'bg-blue-100 text-blue-800',
        gray:   'bg-gray-100 text-gray-700',
        purple: 'bg-purple-100 text-purple-800',
      },
    },
    defaultVariants: { variant: 'gray' },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={clsx(badgeVariants({ variant }), className)} {...props} />
}

// Convenience: map status strings to correct badge variant
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, VariantProps<typeof badgeVariants>['variant']> = {
    active: 'green', verified: 'green', paid: 'green', in_stock: 'green', completed: 'green',
    pending: 'amber', restricted: 'amber', low_stock: 'amber', processing: 'amber',
    suspended: 'red', rejected: 'red', expired: 'red', critical: 'red', failed: 'red',
    standard: 'gray', draft: 'gray',
    premium: 'blue', founding: 'purple',
  }
  const variant = map[status.toLowerCase()] ?? 'gray'
  return <Badge variant={variant}>{status.replace(/_/g, ' ')}</Badge>
}
