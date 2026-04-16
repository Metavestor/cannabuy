import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer border',
  {
    variants: {
      variant: {
        primary:  'bg-[var(--brand,#1a7a4a)] text-white border-[var(--brand,#1a7a4a)] hover:bg-[var(--brand-dark,#155e39)]',
        secondary:'bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50',
        ghost:    'bg-transparent text-gray-600 border-transparent hover:bg-gray-100',
        danger:   'bg-red-600 text-white border-red-600 hover:bg-red-700',
        outline:  'bg-white text-[var(--brand,#1a7a4a)] border-[var(--brand,#1a7a4a)] hover:bg-[var(--brand-light,#e8f5ef)]',
      },
      size: {
        sm:  'px-3 py-1.5 text-xs',
        md:  'px-4 py-2 text-sm',
        lg:  'px-5 py-2.5 text-base',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
