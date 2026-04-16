'use client'

import { useEffect, useMemo, useState } from 'react'
import ClubLayout from '../../components/layout/ClubLayout'
import { useClub } from '../../components/context/ClubContext'
import {
  addMember,
  getAllMembers,
  getTransactions,
  updateMemberFICA,
} from '../../lib/supabase/queries'
import { hasSupabaseConfig } from '../../lib/supabase/client'
import type { Member as DbMember, Transaction as DbTransaction } from '../../lib/supabase/types'

interface TransactionSummary {
  id: string
  date: string
  type: string
  amount: number
  items: number
}

interface MemberUi {
  id: string
  memberNumber: string
  name: string
  idNumber: string
  email: string
  phone: string
  memberSince: string
  visits: number
  totalSpend: number
  ficaStatus: 'Verified' | 'Pending' | 'Rejected'
  status: 'Active' | 'Inactive' | 'Suspended'
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  monthlyGramLimit: number
  transactions: TransactionSummary[]
}

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  Bronze: { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' },
  Silver: { bg: '#f3f4f6', border: '#d1d5db', text: '#4b5563' },
  Gold: { bg: '#fef3c7', border: '#f59e0b', text: '#b45309' },
  Platinum: { bg: '#ede9fe', border: '#a78bfa', text: '#6d28d9' },
}

const ficaStatusColors: Record<string, { bg: string; border: string; text: string }> = {
  Verified: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
  Pending: { bg: '#fffbeb', border: '#fde68a', text: '#d97706' },
  Rejected: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
}

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  Active: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
  Inactive: { bg: '#f3f4f6', border: '#d1d5db', text: '#6b7280' },
  Suspended: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
}

function buildDemoTransactions(seed: number): TransactionSummary[] {
  const types = ['Purchase', 'Top-up', 'Redemption', 'Renewal']
  const count = Math.floor(Math.random() * 6) + 2
  return Array.from({ length: count }, (_, i) => ({
    id: `TX${seed}${String(i + 1).padStart(4, '0')}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 2000) + 100,
    items: Math.floor(Math.random() * 5) + 1,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const DEMO_MEMBERS: MemberUi[] = [
  { id: '1', memberNumber: 'MBR001', name: 'Thabo Molefe', idNumber: '8901025371082', email: 'thabo.molefe@email.com', phone: '0821234567', memberSince: '2024-01-15', visits: 48, totalSpend: 28400, ficaStatus: 'Verified', status: 'Active', tier: 'Gold', monthlyGramLimit: 200, transactions: buildDemoTransactions(1) },
  { id: '2', memberNumber: 'MBR002', name: 'Priya Kartik', idNumber: '9412205472083', email: 'priya.kartik@email.com', phone: '0832345678', memberSince: '2024-03-22', visits: 31, totalSpend: 19800, ficaStatus: 'Verified', status: 'Active', tier: 'Silver', monthlyGramLimit: 100, transactions: buildDemoTransactions(2) },
  { id: '3', memberNumber: 'MBR003', name: 'Johan Snyman', idNumber: '8205106231094', email: 'johan.snyman@email.com', phone: '0843456789', memberSince: '2023-11-08', visits: 67, totalSpend: 42100, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', monthlyGramLimit: 500, transactions: buildDemoTransactions(3) },
  { id: '4', memberNumber: 'MBR004', name: 'Lisa Nkosi', idNumber: '9603056284097', email: 'lisa.nkosi@email.com', phone: '0854567890', memberSince: '2024-06-14', visits: 22, totalSpend: 11400, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', monthlyGramLimit: 50, transactions: buildDemoTransactions(4) },
  { id: '5', memberNumber: 'MBR005', name: 'David Rossouw', idNumber: '8811224055089', email: 'david.rossouw@email.com', phone: '0865678901', memberSince: '2023-08-30', visits: 89, totalSpend: 55600, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', monthlyGramLimit: 500, transactions: buildDemoTransactions(5) },
]

function mapDbMember(member: DbMember, txns: DbTransaction[]): MemberUi {
  const memberTxns = txns
    .filter(tx => tx.member_id === member.id)
    .map(tx => ({
      id: tx.invoice_number,
      date: tx.created_at ? new Date(tx.created_at).toISOString().slice(0, 10) : '',
      type: tx.type === 'sale' ? 'Purchase' : tx.type === 'refund' ? 'Refund' : 'Membership Fee',
      amount: tx.total_incl_vat_zar,
      items: 0,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const totalSpend = memberTxns.reduce((sum, t) => sum + t.amount, 0)
  const visits = memberTxns.filter(t => t.type === 'Purchase').length

  return {
    id: member.id,
    memberNumber: member.member_number,
    name: `${member.first_name} ${member.last_name}`,
    idNumber: member.id_number_encrypted,
    email: member.email,
    phone: member.phone,
    memberSince: member.joined_at ? new Date(member.joined_at).toISOString().slice(0, 10) : '',
    visits,
    totalSpend,
    ficaStatus: member.fica_status === 'verified' ? 'Verified' : member.fica_status === 'rejected' ? 'Rejected' : 'Pending',
    status: member.status === 'active' ? 'Active' : member.status === 'suspended' ? 'Suspended' : 'Inactive',
    tier: member.membership_tier === 'standard' ? 'Bronze' : member.membership_tier === 'premium' ? 'Silver' : 'Gold',
    monthlyGramLimit: member.monthly_gram_limit,
    transactions: memberTxns,
  }
}

export default function MembersPage() {
  const { activeClubId, isDemo } = useClub()
  const [members, setMembers] = useState<MemberUi[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [ficaFilter, setFicaFilter] = useState<string>('All')
  const [tierFilter, setTierFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMember, setSelectedMember] = useState<MemberUi | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    phone: '',
    province: '',
    tier: 'Bronze' as MemberUi['tier'],
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!hasSupabaseConfig() || isDemo) {
        setMembers(DEMO_MEMBERS)
        return
      }

      if (!activeClubId) {
        setMembers([])
        return
      }

      setLoading(true)
      try {
        const [dbMembers, dbTxns] = await Promise.all([
          getAllMembers(activeClubId),
          getTransactions(activeClubId, 500),
        ])
        if (!cancelled) {
          const mapped = dbMembers.map(m => mapDbMember(m, dbTxns))
          setMembers(mapped)
        }
      } catch (error) {
        console.error('[members] load error:', error)
        if (!cancelled) setMembers([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [activeClubId, isDemo])

  const stats = useMemo(() => {
    const total = members.length
    const verified = members.filter(m => m.ficaStatus === 'Verified').length
    const pending = members.filter(m => m.ficaStatus === 'Pending').length
    const activeToday = members.filter(m => m.visits > 0).length
    return {
      total,
      verified,
      pending,
      activeToday,
      ficaPercent: total > 0 ? Math.round((verified / total) * 100) : 0,
    }
  }, [members])

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const q = search.toLowerCase()
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.idNumber.includes(search) || m.memberNumber.toLowerCase().includes(q)
      const matchesFica = ficaFilter === 'All' || m.ficaStatus === ficaFilter
      const matchesTier = tierFilter === 'All' || m.tier === tierFilter
      return matchesSearch && matchesFica && matchesTier
    })
  }, [members, search, ficaFilter, tierFilter])

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / 10))
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * 10, currentPage * 10)

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!newMember.firstName.trim()) errors.firstName = 'First name is required'
    if (!newMember.lastName.trim()) errors.lastName = 'Last name is required'
    if (!/^\d{13}$/.test(newMember.idNumber)) errors.idNumber = 'ID number must be 13 digits'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMember.email)) errors.email = 'Invalid email format'
    if (!/^0\d{9}$/.test(newMember.phone)) errors.phone = 'Phone must be 10 digits starting with 0'
    if (!newMember.province.trim()) errors.province = 'Province is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddMember = async () => {
    if (!validateForm()) return

    const optimistic: MemberUi = {
      id: crypto.randomUUID(),
      memberNumber: `MBR${String(members.length + 1).padStart(3, '0')}`,
      name: `${newMember.firstName} ${newMember.lastName}`,
      idNumber: newMember.idNumber,
      email: newMember.email,
      phone: newMember.phone,
      memberSince: new Date().toISOString().slice(0, 10),
      visits: 0,
      totalSpend: 0,
      ficaStatus: 'Pending',
      status: 'Active',
      tier: newMember.tier,
      monthlyGramLimit: newMember.tier === 'Platinum' ? 500 : newMember.tier === 'Gold' ? 250 : newMember.tier === 'Silver' ? 100 : 50,
      transactions: [],
    }

    setMembers(prev => [optimistic, ...prev])
    setIsAddModalOpen(false)
    setNewMember({ firstName: '', lastName: '', idNumber: '', email: '', phone: '', province: '', tier: 'Bronze' })
    setFormErrors({})

    if (hasSupabaseConfig() && !isDemo && activeClubId) {
      const created = await addMember({
        tenantId: activeClubId,
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        idNumberEncrypted: newMember.idNumber,
        dateOfBirth: '1990-01-01',
        phone: newMember.phone,
        email: newMember.email,
        province: newMember.province,
        membershipTier: newMember.tier === 'Bronze' ? 'standard' : newMember.tier === 'Silver' ? 'premium' : 'founding',
      })

      if (created) {
        const [dbMembers, dbTxns] = await Promise.all([
          getAllMembers(activeClubId),
          getTransactions(activeClubId, 500),
        ])
        setMembers(dbMembers.map(m => mapDbMember(m, dbTxns)))
      }
    }
  }

  const handleFicaUpdate = async (member: MemberUi, status: 'verified' | 'rejected') => {
    setMembers(prev => prev.map(m => m.id === member.id ? { ...m, ficaStatus: status === 'verified' ? 'Verified' : 'Rejected' } : m))
    setSelectedMember(prev => prev ? { ...prev, ficaStatus: status === 'verified' ? 'Verified' : 'Rejected' } : prev)

    if (hasSupabaseConfig() && !isDemo && activeClubId) {
      const ok = await updateMemberFICA(member.id, status)
      if (!ok) {
        console.error('[members] updateMemberFICA failed')
      }
    }
  }

  const exportCSV = () => {
    const headers = ['Member Number', 'Name', 'ID Number', 'Email', 'Phone', 'Member Since', 'Tier', 'FICA Status', 'Status', 'Visits', 'Total Spend']
    const rows = filteredMembers.map(m => [m.memberNumber, m.name, m.idNumber, m.email, m.phone, m.memberSince, m.tier, m.ficaStatus, m.status, m.visits, m.totalSpend])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `members-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ClubLayout title="Member Management">
      {loading && members.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px', color: '#9ca3af' }}>Loading members...</div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Members', value: stats.total, sub: 'Registered members' },
          { label: 'FICA Verified', value: stats.verified, sub: `${stats.ficaPercent}% compliance` },
          { label: 'Pending FICA', value: stats.pending, sub: 'Action required' },
          { label: 'Active Today', value: stats.activeToday, sub: 'Members on site' },
        ].map(card => (
          <div key={card.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{card.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{card.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '16px 24px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder="Search by name, ID, or member#..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            style={{ width: '260px', padding: '10px 14px', background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px' }}
          />
          <select value={ficaFilter} onChange={e => { setFicaFilter(e.target.value); setCurrentPage(1) }} style={{ width: '150px', padding: '10px 14px', background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px' }}>
            <option value="All">All FICA Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={tierFilter} onChange={e => { setTierFilter(e.target.value); setCurrentPage(1) }} style={{ width: '140px', padding: '10px 14px', background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', fontSize: '13px' }}>
            <option value="All">All Tiers</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <button onClick={exportCSV} style={{ padding: '10px 18px', background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Export CSV</button>
            <button onClick={() => setIsAddModalOpen(true)} style={{ padding: '10px 18px', background: '#059669', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}>+ Add Member</button>
          </div>
        </div>
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>Showing {paginatedMembers.length} of {filteredMembers.length} members</div>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Member', 'Member #', 'Tier', 'FICA Status', 'Status', 'Visits', 'Total Spend'].map(h => (
                <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No members found</td></tr>
            ) : paginatedMembers.map((m, i) => (
              <tr key={m.id} onClick={() => setSelectedMember(m)} style={{ borderBottom: i < paginatedMembers.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{m.memberNumber}</td>
                <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: tierColors[m.tier].bg, color: tierColors[m.tier].text, border: `1px solid ${tierColors[m.tier].border}` }}>{m.tier}</span></td>
                <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: ficaStatusColors[m.ficaStatus].bg, color: ficaStatusColors[m.ficaStatus].text, border: `1px solid ${ficaStatusColors[m.ficaStatus].border}` }}>{m.ficaStatus}</span></td>
                <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: statusColors[m.status].bg, color: statusColors[m.status].text, border: `1px solid ${statusColors[m.status].border}` }}>{m.status}</span></td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.visits}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {m.totalSpend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Page {currentPage} of {totalPages}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ padding: '8px 14px', background: currentPage === 1 ? '#f3f4f6' : '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: currentPage === 1 ? '#9ca3af' : '#374151', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} style={{ padding: '8px 12px', background: page === currentPage ? '#059669' : '#ffffff', border: '1px solid', borderColor: page === currentPage ? '#059669' : '#d1d5db', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: page === currentPage ? '#ffffff' : '#374151', cursor: 'pointer' }}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ padding: '8px 14px', background: currentPage === totalPages ? '#f3f4f6' : '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: currentPage === totalPages ? '#9ca3af' : '#374151', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
            </div>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setIsAddModalOpen(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Add New Member</div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#9ca3af', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '24px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  ['firstName', 'First Name', 'Enter first name'],
                  ['lastName', 'Last Name', 'Enter last name'],
                  ['idNumber', 'ID Number', '13 digit SA ID'],
                  ['email', 'Email Address', 'email@example.com'],
                  ['phone', 'Phone Number', '0821234567'],
                  ['province', 'Province', 'Gauteng'],
                ].map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>{label} *</label>
                    <input
                      value={(newMember as any)[key]}
                      onChange={e => setNewMember({ ...newMember, [key]: e.target.value })}
                      placeholder={placeholder}
                      style={{ width: '100%', padding: '10px 14px', border: `1px solid ${formErrors[key] ? '#ef4444' : '#d1d5db'}`, borderRadius: '8px', fontSize: '13px' }}
                    />
                    {formErrors[key] && <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{formErrors[key]}</div>}
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Membership Tier</label>
                  <select value={newMember.tier} onChange={e => setNewMember({ ...newMember, tier: e.target.value as MemberUi['tier'] })} style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px' }}>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleAddMember} style={{ padding: '10px 20px', background: '#059669', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}>Add Member</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMember && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedMember(null)}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '760px', width: '90%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Member Detail</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>{selectedMember.name}</div>
              </div>
              <button onClick={() => setSelectedMember(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>

            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>{selectedMember.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{selectedMember.name}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>{selectedMember.memberNumber}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>ID NUMBER</div><div style={{ fontSize: '13px', color: '#111827', fontFamily: 'monospace' }}>{selectedMember.idNumber}</div></div>
                <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>EMAIL</div><div style={{ fontSize: '13px', color: '#111827' }}>{selectedMember.email}</div></div>
                <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>PHONE</div><div style={{ fontSize: '13px', color: '#111827' }}>{selectedMember.phone}</div></div>
                <div><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>MEMBER SINCE</div><div style={{ fontSize: '13px', color: '#111827' }}>{selectedMember.memberSince}</div></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: tierColors[selectedMember.tier].bg, color: tierColors[selectedMember.tier].text, border: `1px solid ${tierColors[selectedMember.tier].border}` }}>{selectedMember.tier}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: ficaStatusColors[selectedMember.ficaStatus].bg, color: ficaStatusColors[selectedMember.ficaStatus].text, border: `1px solid ${ficaStatusColors[selectedMember.ficaStatus].border}` }}>{selectedMember.ficaStatus}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: statusColors[selectedMember.status].bg, color: statusColors[selectedMember.status].text, border: `1px solid ${statusColors[selectedMember.status].border}` }}>{selectedMember.status}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>TOTAL VISITS</div><div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{selectedMember.visits}</div></div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>TOTAL SPEND</div><div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>R {selectedMember.totalSpend.toLocaleString()}</div></div>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>MONTHLY LIMIT</div><div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{selectedMember.monthlyGramLimit}g</div></div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              {selectedMember.ficaStatus !== 'Verified' && <button onClick={() => handleFicaUpdate(selectedMember, 'verified')} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Verify FICA</button>}
              {selectedMember.ficaStatus !== 'Rejected' && <button onClick={() => handleFicaUpdate(selectedMember, 'rejected')} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Reject FICA</button>}
              <button onClick={() => setSelectedMember(null)} style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Transaction History</div>
              {selectedMember.transactions.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', background: '#f9fafb', borderRadius: '12px' }}>No transactions yet</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb' }}>
                      {['Transaction ID', 'Date', 'Type', 'Amount'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMember.transactions.map((tx, i) => (
                      <tr key={tx.id} style={{ borderBottom: i < selectedMember.transactions.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{tx.id}</td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#6b7280' }}>{tx.date}</td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#111827' }}>{tx.type}</td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#111827' }}>R {tx.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </ClubLayout>
  )
}
