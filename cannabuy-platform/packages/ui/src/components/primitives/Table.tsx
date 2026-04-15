import { clsx } from 'clsx'

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={clsx('w-full border-collapse text-sm', className)} {...props} />
}

export function Th({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={clsx('text-left text-xs font-normal text-gray-400 px-3 py-2 border-b border-gray-100', className)}
      {...props}
    />
  )
}

export function Td({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={clsx('px-3 py-2.5 text-sm text-gray-700 border-b border-gray-50 align-middle', className)}
      {...props}
    />
  )
}

export function Tr({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={clsx('hover:bg-gray-50 transition-colors last:border-0', className)}
      {...props}
    />
  )
}
