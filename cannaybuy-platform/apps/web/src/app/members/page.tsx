'use client'
import ClubLayout from '../../components/layout/ClubLayout'

const members = [
  { id: 1, name: 'Thabo Molefe', idNumber: '8901025371082', memberSince: '2024-01-15', visits: 48, totalSpend: 28400, ficaStatus: 'Verified', status: 'Active' },
  { id: 2, name: 'Priya Kartik', idNumber: '9412205472083', memberSince: '2024-03-22', visits: 31, totalSpend: 19800, ficaStatus: 'Verified', status: 'Active' },
  { id: 3, name: 'Johan Snyman', idNumber: '8205106231094', memberSince: '2023-11-08', visits: 67, totalSpend: 42100, ficaStatus: 'Verified', status: 'Active' },
  { id: 4, name: 'Lisa Nkosi', idNumber: '9603056284097', memberSince: '2024-06-14', visits: 22, totalSpend: 11400, ficaStatus: 'Pending', status: 'Active' },
  { id: 5, name: 'David Rossouw', idNumber: '8811224055089', memberSince: '2023-08-30', visits: 89, totalSpend: 55600, ficaStatus: 'Verified', status: 'Active' },
  { id: 6, name: 'Amara Diallo', idNumber: '9307012345091', memberSince: '2024-09-01', visits: 12, totalSpend: 6200, ficaStatus: 'Pending', status: 'Active' },
  { id: 7, name: 'Keitumetse Moiloa', idNumber: '8905150324088', memberSince: '2024-02-18', visits: 41, totalSpend: 23900, ficaStatus: 'Verified', status: 'Active' },
  { id: 8, name: 'Jannes van der Merwe', idNumber: '8510095478102', memberSince: '2023-05-10', visits: 103, totalSpend: 68400, ficaStatus: 'Verified', status: 'Active' },
]

export default function MembersPage() {
  return (
    <ClubLayout title="Member Management">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Members', value: '48', sub: 'Registered members' },
          { label: 'FICA Verified', value: '42', sub: '87.5% compliance' },
          { label: 'Pending FICA', value: '6', sub: 'Action required' },
          { label: 'Active Today', value: '8', sub: 'Members on site' },
        ].map(s => (
          <div key={s.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '18px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Members Table */}
      <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>All Members</div>
          <input placeholder="Search members..." style={{ background: '#f9fafb', border: '1px solid #d1fae5', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', color: '#111827', outline: 'none', width: '180px' }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Member', 'ID Number', 'Member Since', 'Visits', 'Total Spend', 'FICA Status', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 20px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: 'left', borderBottom: '1px solid #f3f4f6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => {
              const ficaStyle = m.ficaStatus === 'Verified'
                ? { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' }
                : { bg: '#fffbeb', border: '#fde68a', text: '#d97706' }
              return (
                <tr key={m.id} style={{ borderBottom: i < members.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</td>
                  <td style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{m.idNumber}</td>
                  <td style={{ padding: '14px 20px', fontSize: '12px', color: '#6b7280' }}>{m.memberSince}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.visits}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>R {m.totalSpend.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: ficaStyle.bg, color: ficaStyle.text, border: `1px solid ${ficaStyle.border}` }}>{m.ficaStatus}</span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>{m.status}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </ClubLayout>
  )
}
