'use client'
import Link from 'next/link'
import { useState } from 'react'

const pendingMembers = [
  { id: 'm9', name: 'Kabelo Mthembu', memberNo: 'MBR-009', idNumber: '9001015234089', dob: '1990-01-01', submitted: '2026-04-14', docs: ['ID Document', 'Proof of Address'] },
  { id: 'm10', name: 'Fatima Hoosain', memberNo: 'MBR-010', idNumber: '8805057482093', dob: '1988-05-05', submitted: '2026-04-15', docs: ['ID Document', 'Proof of Address'] },
  { id: 'm11', name: 'Bongani Zwane', memberNo: 'MBR-011', idNumber: '9102026189087', dob: '1991-02-02', submitted: '2026-04-16', docs: ['ID Document'] },
]

const verifiedMembers = [
  { id: 'm1', name: 'Thabo Molefe', memberNo: 'MBR-001', verifiedAt: '2026-03-01', verifiedBy: 'admin@cannaclub.co.za' },
  { id: 'm2', name: 'Priya Kartik', memberNo: 'MBR-002', verifiedAt: '2026-03-05', verifiedBy: 'admin@cannaclub.co.za' },
  { id: 'm3', name: 'Johan Snyman', memberNo: 'MBR-003', verifiedAt: '2026-03-08', verifiedBy: 'manager@cannaclub.co.za' },
]

const rejectedMembers = [
  { id: 'm12', name: 'John Doe', memberNo: 'MBR-012', rejectedAt: '2026-04-10', reason: 'ID document expired — resubmission required' },
]

function validateZAId(idNumber: string): { valid: boolean; message: string; age?: number } {
  if (!/^\d{13}$/.test(idNumber)) return { valid: false, message: 'Must be 13 digits' }
  const dob = idNumber.substring(0, 2)
  const month = idNumber.substring(2, 4)
  const day = idNumber.substring(4, 6)
  if (parseInt(month) < 1 || parseInt(month) > 12) return { valid: false, message: 'Invalid date component' }
  if (parseInt(day) < 1 || parseInt(day) > 31) return { valid: false, message: 'Invalid date component' }
  const currentYear = new Date().getFullYear()
  const idYear = parseInt(dob) > 26 ? 1900 + parseInt(dob) : 2000 + parseInt(dob)
  const age = currentYear - idYear
  if (age < 18) return { valid: false, message: 'Must be 18 or older', age }
  return { valid: true, message: 'Valid ZA ID format', age }
}

export default function FicaVerificationPage() {
  const [tab, setTab] = useState<'pending' | 'verified' | 'rejected'>('pending')
  const [selectedMember, setSelectedMember] = useState<typeof pendingMembers[0] | null>(null)
  const [reviewNote, setReviewNote] = useState('')

  const sidebar = (
    <aside style={{ width: '256px', background: '#ffffff', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #d1fae5', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid #d1fae5' }}>
        <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
          <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Cannabis Club Management</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: '#f0fdf4', color: '#16a34a', fontSize: '9px', fontWeight: 700, padding: '5px 10px', borderRadius: '20px', letterSpacing: '0.8px', border: '1px solid #bbf7d0' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
            ZA COMPLIANT
          </div>
        </div>
      </div>
      <nav style={{ padding: '20px 12px', flex: 1 }}>
        <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: '10px' }}>Navigation</div>
        {[
          { label: 'Dashboard', href: '/dashboard', icon: '◫' },
          { label: 'Members', href: '/members', icon: '◉' },
          { label: 'Inventory', href: '/inventory', icon: '◈' },
          { label: 'Point of Sale', href: '/pos', icon: '◇' },
          { label: 'Products', href: '/admin/products', icon: '◆' },
          { label: 'Transactions', href: '/transactions', icon: '▣' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', color: '#6b7280' }}>
              <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
        <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', margin: '20px 0 10px' }}>Compliance</div>
        {[
          { label: 'Audit Trail', href: '/admin/audit', icon: '▤' },
          { label: 'FICA Verification', href: '/admin/fica', icon: '▥', active: true },
          { label: 'VAT Reports', href: '/reports/vat', icon: '▦' },
          { label: 'DAA Reports', href: '/reports/daa', icon: '▧' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', background: (item as any).active ? '#f0fdf4' : 'transparent', color: (item as any).active ? '#16a34a' : '#6b7280', fontWeight: (item as any).active ? 600 : 400, border: (item as any).active ? '1px solid #bbf7d0' : '1px solid transparent' }}>
              <span style={{ fontSize: '13px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
      <div style={{ padding: '20px 20px', borderTop: '1px solid #d1fae5' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>CannaBuy POS</div>
        <div style={{ fontSize: '10px', color: '#d1d5db', marginTop: '3px' }}>Phase 2 · South Africa</div>
      </div>
    </aside>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {sidebar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Member FICA Verification</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '4px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '3px' }}>
              {([['pending', 'Pending', pendingMembers.length], ['verified', 'Verified', verifiedMembers.length], ['rejected', 'Rejected', rejectedMembers.length]] as const).map(([t, label, count]) => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 14px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: 'none', cursor: 'pointer', background: tab === t ? '#ffffff' : 'transparent', color: tab === t ? '#374151' : '#9ca3af', boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </header>

        <main style={{ padding: '28px' }}>
          {/* FICA Info */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>ℹ</span>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>
              <strong>FICA Requirements:</strong> Identity must be verified before providing cannabis services. Documents retained for 5+ years. Age verification (18+) mandatory. Suspicious transactions must be reported to the <strong>Financial Intelligence Centre (FIC)</strong>.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: tab === 'pending' && selectedMember ? '1fr 420px' : '1fr', gap: '20px' }}>
            {/* Main List */}
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              {tab === 'pending' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      {['Member', 'ID Number', 'DOB', 'Submitted', 'Documents', ''].map(h => (
                        <th key={h} style={{ padding: '11px 14px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pendingMembers.map((m, i) => (
                      <tr key={m.id} style={{ borderBottom: i < pendingMembers.length - 1 ? '1px solid #f3f4f6' : 'none', background: selectedMember?.id === m.id ? '#f0fdf4' : 'transparent', cursor: 'pointer' }} onClick={() => setSelectedMember(m)}>
                        <td style={{ padding: '13px 14px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</div>
                          <div style={{ fontSize: '11px', color: '#9ca3af' }}>{m.memberNo}</div>
                        </td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151', fontFamily: 'monospace' }}>{m.idNumber}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.dob}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.submitted}</td>
                        <td style={{ padding: '13px 14px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {m.docs.map(d => (
                              <span key={d} style={{ fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '10px', background: '#dbeafe', color: '#1e40af' }}>📄 {d}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '13px 14px', textAlign: 'center', color: '#16a34a' }}>→</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === 'verified' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      {['Member', 'Member No.', 'Verified At', 'Verified By'].map(h => (
                        <th key={h} style={{ padding: '11px 14px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedMembers.map((m, i) => (
                      <tr key={m.id} style={{ borderBottom: i < verifiedMembers.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.memberNo}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151' }}>{m.verifiedAt}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.verifiedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === 'rejected' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      {['Member', 'Member No.', 'Rejected At', 'Reason'].map(h => (
                        <th key={h} style={{ padding: '11px 14px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedMembers.map((m, i) => (
                      <tr key={m.id} style={{ borderBottom: i < rejectedMembers.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.memberNo}</td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.rejectedAt}</td>
                        <td style={{ padding: '13px 14px', fontSize: '12px', color: '#dc2626' }}>{m.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab !== 'pending' && (
                <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                  {tab === 'verified' ? `${verifiedMembers.length} members verified` : `${rejectedMembers.length} rejected`}
                </div>
              )}
            </div>

            {/* Review Panel */}
            {tab === 'pending' && selectedMember && (
              <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', height: 'fit-content', position: 'sticky', top: '28px' }}>
                <div style={{ padding: '18px 22px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Review: {selectedMember.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{selectedMember.memberNo}</div>
                </div>
                <div style={{ padding: '20px' }}>
                  {/* ID Validation */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>ID Validation</div>
                    {(() => {
                      const result = validateZAId(selectedMember.idNumber)
                      return (
                        <div style={{ background: result.valid ? '#f0fdf4' : '#fef2f2', border: `1px solid ${result.valid ? '#bbf7d0' : '#fecaca'}`, borderRadius: '10px', padding: '12px 14px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: result.valid ? '#166534' : '#991b1b', marginBottom: '4px' }}>
                            {result.valid ? '✓ Valid South African ID' : '✗ Invalid ID'}
                          </div>
                          <div style={{ fontSize: '11px', color: result.valid ? '#15803d' : '#dc2626' }}>{result.message}</div>
                          {result.age && <div style={{ fontSize: '11px', color: result.age >= 18 ? '#15803d' : '#dc2626', marginTop: '2px' }}>Age: {result.age} years old {result.age >= 18 ? '✓ (18+ verified)' : '✗ (under 18)'}</div>}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Documents */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Documents</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedMember.docs.map(doc => (
                        <div key={doc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>📄 {doc}</div>
                          <span style={{ fontSize: '10px', fontWeight: 600, color: '#16a34a', padding: '2px 8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>Uploaded</span>
                        </div>
                      ))}
                      <button style={{ padding: '10px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#ffffff', border: '1px dashed #d1d5db', borderRadius: '8px', cursor: 'pointer' }}>
                        + Upload Additional Document
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Review Notes</div>
                    <textarea
                      value={reviewNote}
                      onChange={e => setReviewNote(e.target.value)}
                      placeholder="Add review notes (optional for approved, required for rejected)..."
                      rows={3}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', outline: 'none' }}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button style={{ padding: '12px', fontSize: '13px', fontWeight: 700, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                      ✓ Approve & Verify
                    </button>
                    <button style={{ padding: '12px', fontSize: '13px', fontWeight: 700, color: '#ffffff', background: '#dc2626', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                      ✗ Reject — Request Resubmission
                    </button>
                    <button onClick={() => setSelectedMember(null)} style={{ padding: '10px', fontSize: '12px', fontWeight: 600, color: '#6b7280', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
