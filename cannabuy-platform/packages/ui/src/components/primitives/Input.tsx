import { clsx } from 'clsx'

const base = 'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[var(--brand,#1a7a4a)] focus:ring-2 focus:ring-[var(--brand-light,#e8f5ef)] placeholder:text-gray-400'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(base, className)} {...props} />
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={clsx(base, 'cursor-pointer', className)} {...props} />
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx(base, 'resize-none', className)} {...props} />
}

interface FormGroupProps {
  label: string
  children: React.ReactNode
  error?: string
  className?: string
}

export function FormGroup({ label, children, error, className }: FormGroupProps) {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label className="text-xs text-gray-500">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
