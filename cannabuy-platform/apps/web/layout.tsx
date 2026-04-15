'use client'
import { useState } from 'react'
import Link from 'next/link'

const provinces = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','Free State','North West','Northern Cape']

export default function NewMemberPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', idNumber: '',
    phone: '', email: '', province: 'Gauteng',
    membershipTier: 'standard', ageVerified: false, ficaConsent: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: any) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.ageVerified || !form.ficaConsent) {
      setError('You must confirm age verification and FICA consent before registering.')
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Member Registered</div>
        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>
          {form.firstName} {form.lastName} has been added. FICA verification is pending.
        </div>
        <Link href="/members">
          <button style={{ background: '#1a7a4a', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            View Members →
          </button>
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '24px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <div style={{ marginBottom: '20px' }}>
          <Link href="/members" style={{ fontSize: '13px', color: '#1a7a4a', textDecoration: 'none' }}>← Back to Members</Link>
          <h1 style={{ fontSize: '20px', fontWeight: '600', marginTop: '8px' }}>Register New Member</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>All fields required for FICA/KYC compliance</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '16px', color: '#111' }}>Personal Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'First Name', field: 'firstName', type: 'text', placeholder: 'Sipho' },
                { label: 'Last Name', field: 'lastName', type: 'text', placeholder: 'Dlamini' },
              ].map(f => (
                <div key={f.field}>
                  <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder}
                    value={(form as any)[f.field]}
                    onChange={e => set(f.field, e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: '#f9fafb', outline: 'none' }}
                  />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>SA ID Number</label>
                <input type="text" required placeholder="8501015800088" maxLength={13}
                  value={form.idNumber}
                  onChange={e => set('idNumber', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: '#f9fafb', outline: 'none' }}
                />
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>13 digits — stored encrypted per POPIA</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>Phone</label>
                <input type="tel" required placeholder="+27 82 000 0000"
                  value={form.phone} onChange={e => set('phone', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: '#f9fafb', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>Email</label>
                <input type="email" required placeholder="sipho@email.com"
                  value={form.email} onChange={e => set('email', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: '#f9fafb', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>Province</label>
                <select value={form.province} onChange={e => set('province', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: '#f9fafb', outline: 'none' }}>
                  {provinces.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>Membership Tier</label>
                <select value={form.membershipTier} onChange={e => set('membershipTier', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: '#f9fafb', outline: 'none' }}>
                  <option value="standard">Standard — R150/mo (30g)</option>
                  <option value="premium">Premium — R350/mo (60g)</option>
                  <option value="founding">Founding — R600/mo (120g)</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '16px', color: '#111' }}>Compliance Confirmation</div>
            {[
              { field: 'ageVerified', label: 'Age 18+ confirmed — SA ID document sighted and verified' },
              { field: 'ficaConsent', label: 'FICA/POPIA consent obtained — member signed application form' },
            ].map(c => (
              <label key={c.field} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={(form as any)[c.field]} onChange={e => set(c.field, e.target.checked)}
                  style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: '#1a7a4a' }}
                />
                <span style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>{c.label}</span>
              </label>
            ))}
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Link href="/members">
              <button type="button" style={{ padding: '10px 20px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', background: 'white', cursor: 'pointer' }}>
                Cancel
              </button>
            </Link>
            <button type="submit" disabled={loading} style={{
              padding: '10px 24px', background: loading ? '#6b9e82' : '#1a7a4a',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '13px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? 'Registering...' : 'Register Member →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
