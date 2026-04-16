'use client'
import { useState, useMemo, useCallback } from 'react'
import ClubLayout from '../../components/layout/ClubLayout'

interface Transaction {
  id: string
  date: string
  type: string
  amount: number
  items: number
}

interface Member {
  id: number
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
  transactions: Transaction[]
}

const generateTransactions = (memberId: number): Transaction[] => {
  const types = ['Purchase', 'Top-up', 'Redemption', 'Renewal']
  const count = Math.floor(Math.random() * 8) + 2
  return Array.from({ length: count }, (_, i) => ({
    id: `TX${memberId}${String(i + 1).padStart(4, '0')}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 2000) + 100,
    items: Math.floor(Math.random() * 5) + 1,
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const initialMembers: Member[] = [
  { id: 1, memberNumber: 'MBR001', name: 'Thabo Molefe', idNumber: '8901025371082', email: 'thabo.molefe@email.com', phone: '0821234567', memberSince: '2024-01-15', visits: 48, totalSpend: 28400, ficaStatus: 'Verified', status: 'Active', tier: 'Gold', transactions: generateTransactions(1) },
  { id: 2, memberNumber: 'MBR002', name: 'Priya Kartik', idNumber: '9412205472083', email: 'priya.kartik@email.com', phone: '0832345678', memberSince: '2024-03-22', visits: 31, totalSpend: 19800, ficaStatus: 'Verified', status: 'Active', tier: 'Silver', transactions: generateTransactions(2) },
  { id: 3, memberNumber: 'MBR003', name: 'Johan Snyman', idNumber: '8205106231094', email: 'johan.snyman@email.com', phone: '0843456789', memberSince: '2023-11-08', visits: 67, totalSpend: 42100, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', transactions: generateTransactions(3) },
  { id: 4, memberNumber: 'MBR004', name: 'Lisa Nkosi', idNumber: '9603056284097', email: 'lisa.nkosi@email.com', phone: '0854567890', memberSince: '2024-06-14', visits: 22, totalSpend: 11400, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', transactions: generateTransactions(4) },
  { id: 5, memberNumber: 'MBR005', name: 'David Rossouw', idNumber: '8811224055089', email: 'david.rossouw@email.com', phone: '0865678901', memberSince: '2023-08-30', visits: 89, totalSpend: 55600, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', transactions: generateTransactions(5) },
  { id: 6, memberNumber: 'MBR006', name: 'Amara Diallo', idNumber: '9307012345091', email: 'amara.diallo@email.com', phone: '0876789012', memberSince: '2024-09-01', visits: 12, totalSpend: 6200, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', transactions: generateTransactions(6) },
  { id: 7, memberNumber: 'MBR007', name: 'Keitumetse Moiloa', idNumber: '8905150324088', email: 'keitumetse.m@email.com', phone: '0887890123', memberSince: '2024-02-18', visits: 41, totalSpend: 23900, ficaStatus: 'Verified', status: 'Active', tier: 'Silver', transactions: generateTransactions(7) },
  { id: 8, memberNumber: 'MBR008', name: 'Jannes van der Merwe', idNumber: '8510095478102', email: 'jannes.vdm@email.com', phone: '0898901234', memberSince: '2023-05-10', visits: 103, totalSpend: 68400, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', transactions: generateTransactions(8) },
  { id: 9, memberNumber: 'MBR009', name: 'Fatima Patel', idNumber: '8709012345093', email: 'fatima.patel@email.com', phone: '0719012345', memberSince: '2024-04-05', visits: 18, totalSpend: 8900, ficaStatus: 'Verified', status: 'Active', tier: 'Bronze', transactions: generateTransactions(9) },
  { id: 10, memberNumber: 'MBR010', name: 'Mikael Botha', idNumber: '8803035051087', email: 'mikael.botha@email.com', phone: '0720123456', memberSince: '2024-07-20', visits: 8, totalSpend: 4200, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', transactions: generateTransactions(10) },
  { id: 11, memberNumber: 'MBR011', name: 'Naledi Dlamini', idNumber: '9104056284094', email: 'naledi.dlamini@email.com', phone: '0731234567', memberSince: '2023-12-01', visits: 55, totalSpend: 31200, ficaStatus: 'Verified', status: 'Active', tier: 'Gold', transactions: generateTransactions(11) },
  { id: 12, memberNumber: 'MBR012', name: 'Pieter Strauss', idNumber: '8602205473089', email: 'pieter.strauss@email.com', phone: '0742345678', memberSince: '2024-01-30', visits: 27, totalSpend: 15800, ficaStatus: 'Verified', status: 'Inactive', tier: 'Silver', transactions: generateTransactions(12) },
  { id: 13, memberNumber: 'MBR013', name: 'Chioma Adeyemi', idNumber: '9508082345092', email: 'chioma.adeyemi@email.com', phone: '0753456789', memberSince: '2024-05-15', visits: 14, totalSpend: 7600, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', transactions: generateTransactions(13) },
  { id: 14, memberNumber: 'MBR014', name: 'Werner Nel', idNumber: '8407124055086', email: 'werner.nel@email.com', phone: '0764567890', memberSince: '2023-09-12', visits: 76, totalSpend: 48900, ficaStatus: 'Verified', status: 'Active', tier: 'Gold', transactions: generateTransactions(14) },
  { id: 15, memberNumber: 'MBR015', name: 'Zanele Zwane', idNumber: '9210150324089', email: 'zanele.zwane@email.com', phone: '0775678901', memberSince: '2024-08-03', visits: 6, totalSpend: 3100, ficaStatus: 'Verified', status: 'Active', tier: 'Bronze', transactions: generateTransactions(15) },
  { id: 16, memberNumber: 'MBR016', name: 'Henk van Wyk', idNumber: '8105055478103', email: 'henk.vanwyk@email.com', phone: '0786789012', memberSince: '2023-06-22', visits: 92, totalSpend: 59800, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', transactions: generateTransactions(16) },
  { id: 17, memberNumber: 'MBR017', name: 'Amina Hassim', idNumber: '8902032345098', email: 'amina.hassim@email.com', phone: '0797890123', memberSince: '2024-02-14', visits: 33, totalSpend: 18700, ficaStatus: 'Verified', status: 'Active', tier: 'Silver', transactions: generateTransactions(17) },
  { id: 18, memberNumber: 'MBR018', name: 'Louis Oosthuizen', idNumber: '8509106231091', email: 'louis.oosthuizen@email.com', phone: '0818901234', memberSince: '2023-10-18', visits: 61, totalSpend: 37600, ficaStatus: 'Verified', status: 'Active', tier: 'Gold', transactions: generateTransactions(18) },
  { id: 19, memberNumber: 'MBR019', name: 'Ruth Modise', idNumber: '9606024055084', email: 'ruth.modise@email.com', phone: '0829012345', memberSince: '2024-10-01', visits: 3, totalSpend: 1200, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', transactions: generateTransactions(19) },
  { id: 20, memberNumber: 'MBR020', name: 'Stefan Engelbrecht', idNumber: '8711085478105', email: 'stefan.engel@email.com', phone: '0830123456', memberSince: '2023-07-08', visits: 84, totalSpend: 51200, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', transactions: generateTransactions(20) },
  { id: 21, memberNumber: 'MBR021', name: 'Lerato Mokoena', idNumber: '9304050324083', email: 'lerato.mokoena@email.com', phone: '0841234567', memberSince: '2024-03-28', visits: 19, totalSpend: 9800, ficaStatus: 'Verified', status: 'Active', tier: 'Bronze', transactions: generateTransactions(21) },
  { id: 22, memberNumber: 'MBR022', name: 'Braam van Tonder', idNumber: '8207032345097', email: 'braam.vantonder@email.com', phone: '0852345678', memberSince: '2024-01-05', visits: 38, totalSpend: 22100, ficaStatus: 'Verified', status: 'Active', tier: 'Silver', transactions: generateTransactions(22) },
  { id: 23, memberNumber: 'MBR023', name: 'Kagiso Moloto', idNumber: '9101025472089', email: 'kagiso.moloto@email.com', phone: '0863456789', memberSince: '2023-11-25', visits: 52, totalSpend: 29800, ficaStatus: 'Verified', status: 'Suspended', tier: 'Gold', transactions: generateTransactions(23) },
  { id: 24, memberNumber: 'MBR024', name: 'Elize van der Berg', idNumber: '9508084055082', email: 'elize.vdb@email.com', phone: '0874567890', memberSince: '2024-09-12', visits: 9, totalSpend: 4500, ficaStatus: 'Pending', status: 'Active', tier: 'Bronze', transactions: generateTransactions(24) },
  { id: 25, memberNumber: 'MBR025', name: 'Sibusiso Zwane', idNumber: '8805066284096', email: 'sibusiso.zwane@email.com', phone: '0885678901', memberSince: '2023-04-17', visits: 71, totalSpend: 44300, ficaStatus: 'Verified', status: 'Active', tier: 'Gold', transactions: generateTransactions(25) },
  { id: 26, memberNumber: 'MBR026', name: 'Mariana Costa', idNumber: '9203102345094', email: 'mariana.costa@email.com', phone: '0896789012', memberSince: '2024-06-08', visits: 16, totalSpend: 8200, ficaStatus: 'Verified', status: 'Active', tier: 'Bronze', transactions: generateTransactions(26) },
  { id: 27, memberNumber: 'MBR027', name: 'Johan Breedt', idNumber: '8307055478108', email: 'johan.breedt@email.com', phone: '0817890123', memberSince: '2023-08-14', visits: 88, totalSpend: 56700, ficaStatus: 'Verified', status: 'Active', tier: 'Platinum', transactions: generateTransactions(27) },
  { id: 28, memberNumber: 'MBR028', name: 'Tshegofatso Pilane', idNumber: '9409120324087', email: 'tshego.pilane@email.com', phone: '0828901234', memberSince: '2024-04-22', visits: 24, totalSpend: 13200, ficaStatus: 'Verified', status: 'Active', tier: 'Silver', transactions: generateTransactions(28) },
]

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

export default function MembersPage() {
  const [members] = useState<Member[]>(initialMembers)
  const [search, setSearch] = useState('')
  const [ficaFilter, setFicaFilter] = useState<string>('All')
  const [tierFilter, setTierFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    idNumber: '',
    email: '',
    phone: '',
    tier: 'Bronze',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const stats = useMemo(() => {
    const total = members.length
    const verified = members.filter(m => m.ficaStatus === 'Verified').length
    const pending = members.filter(m => m.ficaStatus === 'Pending').length
    const activeToday = Math.floor(members.length * 0.3)
    return {
      total,
      ficaPercent: total > 0 ? Math.round((verified / total) * 100) : 0,
      verified,
      pending,
      activeToday,
    }
  }, [members])

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const searchLower = search.toLowerCase()
      const matchesSearch =
        m.name.toLowerCase().includes(searchLower) ||
        m.idNumber.includes(search) ||
        m.memberNumber.toLowerCase().includes(searchLower)
      const matchesFica = ficaFilter === 'All' || m.ficaStatus === ficaFilter
      const matchesTier = tierFilter === 'All' || m.tier === tierFilter
      return matchesSearch && matchesFica && matchesTier
    })
  }, [members, search, ficaFilter, tierFilter])

  const totalPages = Math.ceil(filteredMembers.length / 10)
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * 10, currentPage * 10)

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }, [])

  const handleFicaFilter = useCallback((value: string) => {
    setFicaFilter(value)
    setCurrentPage(1)
  }, [])

  const handleTierFilter = useCallback((value: string) => {
    setTierFilter(value)
    setCurrentPage(1)
  }, [])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!newMember.name.trim()) errors.name = 'Name is required'
    if (!newMember.idNumber.trim()) errors.idNumber = 'ID number is required'
    else if (!/^\d{13}$/.test(newMember.idNumber)) errors.idNumber = 'ID number must be 13 digits'
    if (!newMember.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMember.email)) errors.email = 'Invalid email format'
    if (!newMember.phone.trim()) errors.phone = 'Phone is required'
    else if (!/^0\d{9}$/.test(newMember.phone)) errors.phone = 'Phone must be 10 digits starting with 0'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddMember = () => {
    if (!validateForm()) return
    const nextId = Math.max(...members.map(m => m.id)) + 1
    const nextNumber = `MBR${String(nextId).padStart(3, '0')}`
    const member: Member = {
      id: nextId,
      memberNumber: nextNumber,
      name: newMember.name,
      idNumber: newMember.idNumber,
      email: newMember.email,
      phone: newMember.phone,
      memberSince: new Date().toISOString().split('T')[0],
      visits: 0,
      totalSpend: 0,
      ficaStatus: 'Pending',
      status: 'Active',
      tier: newMember.tier as Member['tier'],
      transactions: [],
    }
    members.unshift(member)
    setIsAddModalOpen(false)
    setNewMember({ name: '', idNumber: '', email: '', phone: '', tier: 'Bronze' })
    setFormErrors({})
  }

  const exportCSV = () => {
    const headers = ['Member Number', 'Name', 'ID Number', 'Email', 'Phone', 'Member Since', 'Tier', 'FICA Status', 'Status', 'Visits', 'Total Spend']
    const rows = filteredMembers.map(m => [
      m.memberNumber,
      m.name,
      m.idNumber,
      m.email,
      m.phone,
      m.memberSince,
      m.tier,
      m.ficaStatus,
      m.status,
      m.visits,
      m.totalSpend,
    ])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `members-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 14px',
    border: `1px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
    borderRadius: '8px',
    fontSize: '13px',
    color: '#111827',
    outline: 'none',
    background: '#ffffff',
    boxSizing: 'border-box',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
  }

  const errorStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#ef4444',
    marginTop: '4px',
  }

  const statCardStyle: React.CSSProperties = {
    background: '#ffffff',
    border: '1px solid #d1fae5',
    borderRadius: '14px',
    padding: '18px 22px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }

  const modalStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
  }

  return (
    <ClubLayout title="Member Management">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Total Members</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{stats.total}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Registered members</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>FICA Verified</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{stats.verified}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>{stats.ficaPercent}% compliance</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Pending FICA</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{stats.pending}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Action required</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Active Today</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{stats.activeToday}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>Members on site</div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '16px 24px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder="Search by name, ID, or member#..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            style={{ ...inputStyle(false), width: '260px', background: '#f9fafb' }}
          />
          <select value={ficaFilter} onChange={e => handleFicaFilter(e.target.value)} style={{ ...inputStyle(false), width: '150px', cursor: 'pointer' }}>
            <option value="All">All FICA Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={tierFilter} onChange={e => handleTierFilter(e.target.value)} style={{ ...inputStyle(false), width: '140px', cursor: 'pointer' }}>
            <option value="All">All Tiers</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <button onClick={exportCSV} style={{ padding: '10px 18px', background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
              Export CSV
            </button>
            <button onClick={() => setIsAddModalOpen(true)} style={{ padding: '10px 18px', background: '#059669', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}>
              + Add Member
            </button>
          </div>
        </div>
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
          Showing {paginatedMembers.length} of {filteredMembers.length} members
        </div>
      </div>

      {/* Members Table */}
      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Member', 'Member #', 'ID Number', 'Tier', 'FICA Status', 'Status', 'Visits', 'Total Spend'].map(h => (
                <th key={h} style={{ padding: '12px 16px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.map((m, i) => (
              <tr
                key={m.id}
                onClick={() => setSelectedMember(m)}
                style={{ borderBottom: i < paginatedMembers.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{m.memberNumber}</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{m.idNumber}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: tierColors[m.tier].bg, color: tierColors[m.tier].text, border: `1px solid ${tierColors[m.tier].border}` }}>{m.tier}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: ficaStatusColors[m.ficaStatus].bg, color: ficaStatusColors[m.ficaStatus].text, border: `1px solid ${ficaStatusColors[m.ficaStatus].border}` }}>{m.ficaStatus}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: statusColors[m.status].bg, color: statusColors[m.status].text, border: `1px solid ${statusColors[m.status].border}` }}>{m.status}</span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.visits}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {m.totalSpend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Page {currentPage} of {totalPages}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ padding: '8px 14px', background: currentPage === 1 ? '#f3f4f6' : '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: currentPage === 1 ? '#9ca3af' : '#374151', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{ padding: '8px 12px', background: page === currentPage ? '#059669' : '#ffffff', border: '1px solid', borderColor: page === currentPage ? '#059669' : '#d1d5db', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: page === currentPage ? '#ffffff' : '#374151', cursor: 'pointer' }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ padding: '8px 14px', background: currentPage === totalPages ? '#f3f4f6' : '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: currentPage === totalPages ? '#9ca3af' : '#374151', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsAddModalOpen(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Add New Member</div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#9ca3af', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '24px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    value={newMember.name}
                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                    style={inputStyle(!!formErrors.name)}
                  />
                  {formErrors.name && <div style={errorStyle}>{formErrors.name}</div>}
                </div>
                <div>
                  <label style={labelStyle}>ID Number *</label>
                  <input
                    value={newMember.idNumber}
                    onChange={e => setNewMember({ ...newMember, idNumber: e.target.value })}
                    placeholder="13 digit SA ID"
                    maxLength={13}
                    style={inputStyle(!!formErrors.idNumber)}
                  />
                  {formErrors.idNumber && <div style={errorStyle}>{formErrors.idNumber}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    value={newMember.email}
                    onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="email@example.com"
                    type="email"
                    style={inputStyle(!!formErrors.email)}
                  />
                  {formErrors.email && <div style={errorStyle}>{formErrors.email}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    value={newMember.phone}
                    onChange={e => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="0821234567"
                    maxLength={10}
                    style={inputStyle(!!formErrors.phone)}
                  />
                  {formErrors.phone && <div style={errorStyle}>{formErrors.phone}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Membership Tier</label>
                  <select
                    value={newMember.tier}
                    onChange={e => setNewMember({ ...newMember, tier: e.target.value })}
                    style={inputStyle(false)}
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleAddMember} style={{ padding: '10px 20px', background: '#059669', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}>
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div style={modalOverlayStyle} onClick={() => setSelectedMember(null)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Member Details</div>
              <button onClick={() => setSelectedMember(null)} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#9ca3af', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '24px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
              {/* Profile Section */}
              <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                    {selectedMember.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{selectedMember.name}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>{selectedMember.memberNumber}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>ID NUMBER</div>
                    <div style={{ fontSize: '13px', color: '#111827', fontFamily: 'monospace' }}>{selectedMember.idNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>EMAIL</div>
                    <div style={{ fontSize: '13px', color: '#111827' }}>{selectedMember.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>PHONE</div>
                    <div style={{ fontSize: '13px', color: '#111827' }}>{selectedMember.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '4px' }}>MEMBER SINCE</div>
                    <div style={{ fontSize: '13px', color: '#111827' }}>{selectedMember.memberSince}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: tierColors[selectedMember.tier].bg, color: tierColors[selectedMember.tier].text, border: `1px solid ${tierColors[selectedMember.tier].border}` }}>{selectedMember.tier}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: ficaStatusColors[selectedMember.ficaStatus].bg, color: ficaStatusColors[selectedMember.ficaStatus].text, border: `1px solid ${ficaStatusColors[selectedMember.ficaStatus].border}` }}>{selectedMember.ficaStatus}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: statusColors[selectedMember.status].bg, color: statusColors[selectedMember.status].text, border: `1px solid ${statusColors[selectedMember.status].border}` }}>{selectedMember.status}</span>
                </div>
              </div>

              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>TOTAL VISITS</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{selectedMember.visits}</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>TOTAL SPEND</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>R {selectedMember.totalSpend.toLocaleString()}</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, marginBottom: '8px' }}>TRANSACTIONS</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{selectedMember.transactions.length}</div>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Transaction History</div>
                {selectedMember.transactions.length === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af', background: '#f9fafb', borderRadius: '12px' }}>No transactions yet</div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        {['Transaction ID', 'Date', 'Type', 'Items', 'Amount'].map(h => (
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
                          <td style={{ padding: '12px 16px', fontSize: '12px', color: '#111827' }}>{tx.items}</td>
                          <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#111827' }}>R {tx.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ClubLayout>
  )
}
