'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockMembers = [
  { id: '1', member_number: 'MBR-001', first_name: 'John', last_name: 'Smith', id_number: '890123****6789', phone: '0821234567', email: 'john.smith@email.com', membership_tier: 'premium', monthly_gram_limit: 200, status: 'active', fica_status: 'verified', joined_at: '2024-01-15', total_visits: 42, monthly_usage: 85 },
  { id: '2', member_number: 'MBR-002', first_name: 'Jane', last_name: 'Doe', id_number: '910101****5432', phone: '0832345678', email: 'jane.doe@email.com', membership_tier: 'standard', monthly_gram_limit: 100, status: 'active', fica_status: 'verified', joined_at: '2024-02-20', total_visits: 28, monthly_usage: 45 },
  { id: '3', member_number: 'MBR-003', first_name: 'Mike', last_name: 'Johnson', id_number: '880202****8765', phone: '0843456789', email: 'mike.j@email.com', membership_tier: 'founding', monthly_gram_limit: 500, status: 'active', fica_status: 'verified', joined_at: '2023-11-01', total_visits: 156, monthly_usage: 320 },
  { id: '4', member_number: 'MBR-004', first_name: 'Sarah', last_name: 'Williams', id_number: '900505****2341', phone: '0814567890', email: 'sarah.w@email.com', membership_tier: 'standard', monthly_gram_limit: 100, status: 'pending', fica_status: 'pending', joined_at: '2024-04-01', total_visits: 0, monthly_usage: 0 },
  { id: '5', member_number: 'MBR-005', first_name: 'Tom', last_name: 'Brown', id_number: '870808****1122', phone: '0825678901', email: 'tom.b@email.com', membership_tier: 'premium', monthly_gram_limit: 200, status: 'suspended', fica_status: 'expired', joined_at: '2024-03-10', total_visits: 15, monthly_usage: 180 },
]

const membershipTiers = ['standard', 'premium', 'founding']

export default function MembersPage() {
  const [members] = useState(mockMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const filteredMembers = members.filter(m => {
    const fullName = `${m.first_name} ${m.last_name}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || m.member_number.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return { color: '#059669', bg: '#ecfdf5' }
      case 'pending': return { color: '#d97706', bg: '#fffbeb' }
      case 'suspended': return { color: '#dc2626', bg: '#fef2f2' }
      default: return { color: '#6b7280', bg: '#f3f4f6' }
    }
  }

  const getFicaStyle = (status: string) => {
    switch (status) {
      case 'verified': return { color: '#059669', bg: '#ecfdf5' }
      case 'pending': return { color: '#d97706', bg: '#fffbeb' }
      case 'expired': return { color: '#dc2626', bg: '#fef2f2' }
      default: return { color: '#6b7280', bg: '#f3f4f6' }
    }
  }

  const getUsagePercent = (usage: number, limit: number) => (usage / limit) * 100

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside style={{ width: '240px', background: 'white', borderRight: '0.5px solid #e5e7eb', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px 16px', borderBottom: '0.5px solid #e5e7eb' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '240px', height: 'auto', display: 'block' }} />
          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>Cannabis Club Management</div>
          <div style={{ display: 'inline-block', marginTop: '8px', background: '#e8f5ef', color: '#1a7a4a', fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '10px' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '▦' },
            { label: 'Members', href: '/members', icon: '👥', active: true },
            { label: 'Inventory', href: '/inventory', icon: '📦' },
            { label: 'Point of Sale', href: '/pos', icon: '🧾' },
            { label: 'Products', href: '/admin/products', icon: '📋' },
            { label: 'Transactions', href: '/transactions', icon: '📊' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', fontSize: '13px', background: (item as any).active ? '#e8f5ef' : 'transparent', color: (item as any).active ? '#1a7a4a' : '#6b7280', fontWeight: (item as any).active ? '600' : '400' }}>
                <span style={{ fontSize: '14px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '0.5px solid #e5e7eb', fontSize: '11px', color: '#9ca3af' }}>v1.0 · South Africa</div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'white', borderBottom: '0.5px solid #e5e7eb', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '15px', fontWeight: '600' }}>Member Management</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/members/new">
              <button style={{ background: '#1a7a4a', color: 'white', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ Add Member</button>
            </Link>
          </div>
        </header>

        <div style={{ padding: '24px', flex: 1 }}>
          {/* Filters */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by name or member number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '300px', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#6b7280' }}>
              {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Members Table */}
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '0.5px solid #e5e7eb' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Member #</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Contact</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Tier</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>FICA</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Monthly Usage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => {
                  const statusStyle = getStatusStyle(member.status)
                  const ficaStyle = getFicaStyle(member.fica_status)
                  const usagePercent = getUsagePercent(member.monthly_usage, member.monthly_gram_limit)
                  const isNearLimit = usagePercent >= 80

                  return (
                    <tr key={member.id} style={{ borderBottom: '0.5px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontFamily: 'monospace' }}>{member.member_number}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '500' }}>{member.first_name} {member.last_name}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>ID: {member.id_number}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '12px' }}>{member.phone}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>{member.email}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', background: '#ede9fe', color: '#6d28d9', textTransform: 'capitalize' }}>
                          {member.membership_tier}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', background: ficaStyle.bg, color: ficaStyle.color }}>
                          {member.fica_status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '500', background: statusStyle.bg, color: statusStyle.color }}>
                          {member.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                          <div style={{ width: '60px', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${Math.min(usagePercent, 100)}%`, height: '100%', background: isNearLimit ? (usagePercent >= 100 ? '#dc2626' : '#d97706') : '#1a7a4a', borderRadius: '3px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '500', color: isNearLimit ? (usagePercent >= 100 ? '#dc2626' : '#d97706') : '#111' }}>
                            {member.monthly_usage}/{member.monthly_gram_limit}g
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button onClick={() => setSelectedMember(member)} style={{ background: 'none', border: 'none', color: '#1a7a4a', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>View</button>
                      </td>
                    </tr>
                  )
                })}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: '40px 16px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                      No members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Compliance Note */}
          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#fffbeb', border: '0.5px solid #fde68a', borderRadius: '8px', fontSize: '12px', color: '#92400e' }}>
            <strong>SA Compliance:</strong> Monthly gram limits per membership tier — Standard: 100g | Premium: 200g | Founding: 500g. Members approaching 80% of limit are flagged.
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '480px', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>{selectedMember.first_name} {selectedMember.last_name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{selectedMember.member_number}</div>
              </div>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', background: getStatusStyle(selectedMember.status).bg, color: getStatusStyle(selectedMember.status).color }}>
                {selectedMember.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>ID Number</div>
                <div style={{ fontSize: '13px' }}>{selectedMember.id_number}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>Phone</div>
                <div style={{ fontSize: '13px' }}>{selectedMember.phone}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>Email</div>
                <div style={{ fontSize: '13px' }}>{selectedMember.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '2px' }}>Member Since</div>
                <div style={{ fontSize: '13px' }}>{selectedMember.joined_at}</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Monthly Usage</span>
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{selectedMember.monthly_usage}g / {selectedMember.monthly_gram_limit}g</span>
              </div>
              <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(getUsagePercent(selectedMember.monthly_usage, selectedMember.monthly_gram_limit), 100)}%`, height: '100%', background: getUsagePercent(selectedMember.monthly_usage, selectedMember.monthly_gram_limit) >= 80 ? '#d97706' : '#1a7a4a', borderRadius: '4px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '600' }}>{selectedMember.total_visits}</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>Total Visits</div>
              </div>
              <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '600', textTransform: 'capitalize' }}>{selectedMember.membership_tier}</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>Tier</div>
              </div>
              <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '600' }}>{selectedMember.monthly_gram_limit}g</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>Monthly Limit</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedMember(null)} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', background: 'white' }}>Close</button>
              <button style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: '#1a7a4a', color: 'white' }}>Edit Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
