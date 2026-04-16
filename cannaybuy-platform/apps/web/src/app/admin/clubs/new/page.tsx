'use client'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  { id: 'starter', name: 'Starter', price: 499, clubs: 1, members: 50, desc: 'Perfect for new clubs getting started' },
  { id: 'growth', name: 'Growth', price: 1499, clubs: 3, members: 200, desc: 'For growing clubs with multiple locations' },
  { id: 'enterprise', name: 'Enterprise', price: 4999, clubs: 'Unlimited', members: 'Unlimited', desc: 'Full platform for large operations' },
]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function NewClubPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', slug: '', vatNumber: '', ficaOfficer: '', brandColor: '#1a7a4a',
    domain: '', plan: 'growth',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value, ...(field === 'name' && !f.slug ? { slug: slugify(value) } : {}) }))
    if (errors[field]) setErrors(e => { const n = {...e}; delete n[field]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Club name is required'
    if (!form.slug.trim()) e.slug = 'URL slug is required'
    else if (!/^[a-z0-9-]+$/.test(form.slug)) e.slug = 'Only lowercase letters, numbers, and hyphens'
    if (!form.vatNumber.trim()) e.vatNumber = 'VAT number is required'
    else if (!/^\d{10}$/.test(form.vatNumber)) e.vatNumber = 'Must be 10 digits'
    if (!form.ficaOfficer.trim()) e.ficaOfficer = 'FICA officer contact is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !validate()) return
    setStep(s => s + 1)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <aside style={{ width: '256px', background: '#ffffff', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #d1fae5', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid #d1fae5' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannaybuy-platform/logo.png" alt="CannaBuy" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #d1fae5' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Super Admin</div>
          </div>
        </div>
        <div style={{ padding: '20px 12px' }}>
          <Link href="/admin/clubs" style={{ textDecoration: 'none', display: 'block', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
              <span style={{ fontSize: '12px' }}>←</span> Back to Clubs
            </div>
          </Link>
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 4px', marginBottom: '12px' }}>Steps</div>
          {['Basic Info', 'Compliance', 'Plan', 'Review'].map((label, i) => {
            const n = i + 1
            const done = step > n
            const active = step === n
            return (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: done ? '#16a34a' : active ? '#2563eb' : '#e5e7eb', color: done || active ? '#ffffff' : '#9ca3af', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {done ? '✓' : n}
                </div>
                <span style={{ fontSize: '12px', fontWeight: active ? 700 : 400, color: active ? '#111827' : done ? '#16a34a' : '#9ca3af' }}>{label}</span>
              </div>
            )
          })}
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <Link href="/admin/clubs" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '13px', marginRight: '20px' }}>← Clubs</Link>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Register New Club</div>
        </header>

        <main style={{ padding: '32px 40px', maxWidth: '720px' }}>
          {step === 1 && (
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Basic Information</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '28px' }}>Enter your cannabis club's basic details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Club Name *</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. CannaClub Gauteng" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${errors.name ? '#dc2626' : '#d1d5db'}`, borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  {errors.name && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>{errors.name}</div>}
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>URL Slug *</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#9ca3af', background: '#f3f4f6', padding: '10px 12px', border: `1px solid ${errors.slug ? '#dc2626' : '#d1d5db'}`, borderRight: 'none', borderRadius: '10px 0 0 10px' }}>cannabuy.io/</span>
                    <input value={form.slug} onChange={e => update('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} placeholder="cannaclub-gauteng" style={{ flex: 1, padding: '10px 14px', border: `1px solid ${errors.slug ? '#dc2626' : '#d1d5db'}`, borderRadius: '0 10px 10px 0', fontSize: '14px', outline: 'none' }} />
                  </div>
                  {errors.slug && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>{errors.slug}</div>}
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Brand Color</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="color" value={form.brandColor} onChange={e => update('brandColor', e.target.value)} style={{ width: '48px', height: '40px', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer' }} />
                    <input value={form.brandColor} onChange={e => update('brandColor', e.target.value)} style={{ flex: 1, padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'monospace' }} />
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: form.brandColor, border: '1px solid #d1d5db' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>Custom Domain (optional)</label>
                  <input value={form.domain} onChange={e => update('domain', e.target.value)} placeholder="e.g. shop.cannaclub.co.za" style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Compliance Details</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '28px' }}>South African tax and regulatory compliance information</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>VAT Number *</label>
                  <input value={form.vatNumber} onChange={e => update('vatNumber', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit SARS VAT number" maxLength={10} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${errors.vatNumber ? '#dc2626' : '#d1d5db'}`, borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                  {errors.vatNumber && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>{errors.vatNumber}</div>}
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>10-digit number issued by SARS upon VAT registration</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>FICA Compliance Officer *</label>
                  <input value={form.ficaOfficer} onChange={e => update('ficaOfficer', e.target.value)} placeholder="Name and email of responsible person" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${errors.ficaOfficer ? '#dc2626' : '#d1d5db'}`, borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  {errors.ficaOfficer && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>{errors.ficaOfficer}</div>}
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>Required under Financial Intelligence Centre Act</div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Select Plan</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '28px' }}>Choose the plan that fits your club's needs</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plans.map(plan => (
                  <div key={plan.id} onClick={() => update('plan', plan.id)} style={{ padding: '20px 22px', borderRadius: '14px', border: `2px solid ${form.plan === plan.id ? '#16a34a' : '#e5e7eb'}`, cursor: 'pointer', background: form.plan === plan.id ? '#f0fdf4' : '#ffffff', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{plan.name}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>{plan.desc}</div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          {[
                            ['Clubs', plan.clubs],
                            ['Members', plan.members],
                          ].map(([label, val]) => (
                            <div key={label as string} style={{ fontSize: '11px', color: '#6b7280' }}>
                              <span style={{ fontWeight: 700, color: '#374151' }}>{val}</span> {label}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>R{plan.price.toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>/month excl. VAT</div>
                      </div>
                    </div>
                    {form.plan === plan.id && <div style={{ marginTop: '12px', padding: '8px 12px', background: '#16a34a', color: '#ffffff', fontSize: '11px', fontWeight: 700, borderRadius: '6px', textAlign: 'center' }}>✓ SELECTED — {plan.id.toUpperCase()} PLAN</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>Review & Create</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '28px' }}>Confirm your club details before creating</div>
              <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '18px 22px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{form.name || '—'}</div>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: '#16a34a15', color: '#16a34a', border: '1px solid #16a34a30' }}>{(plans.find(p => p.id === form.plan) || plans[1]).name.toUpperCase()}</span>
                </div>
                {[
                  ['URL', `cannabuy.io/${form.slug}`],
                  ['VAT Number', form.vatNumber || '—'],
                  ['FICA Officer', form.ficaOfficer || '—'],
                  ['Brand Color', form.brandColor],
                  ['Domain', form.domain || '— (using CannaBuy subdomain)'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 22px', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>{label}</span>
                    <span style={{ color: '#374151', fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
                <div style={{ padding: '18px 22px', background: '#fffbeb', borderTop: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>
                    <strong>Note:</strong> A new tenant will be created in the database. Staff accounts will need to be invited separately.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 600, color: '#6b7280', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.5 : 1 }}>
              ← Back
            </button>
            {step < 4 ? (
              <button onClick={handleNext} style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 700, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Continue →
              </button>
            ) : (
              <button style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 700, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ✓ Create Club
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
