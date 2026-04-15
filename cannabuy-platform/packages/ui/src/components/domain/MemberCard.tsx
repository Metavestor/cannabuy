import { StatusBadge } from '../primitives/Badge'
import type { Member } from '@cannabuy/types'

interface MemberCardProps {
  member: Pick<Member, 'memberNumber' | 'firstName' | 'lastName' | 'membershipTier' | 'ficaStatus' | 'status'>
  onClick?: () => void
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase()
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-[var(--brand-light,#e8f5ef)] flex items-center justify-center text-sm font-medium text-[var(--brand,#1a7a4a)] flex-shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {member.firstName} {member.lastName}
        </p>
        <p className="text-xs text-gray-400">{member.memberNumber}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <StatusBadge status={member.status} />
        <StatusBadge status={member.ficaStatus} />
      </div>
    </div>
  )
}
