'use client'
import Link from 'next/link'
import { useState } from 'react'

const mockClub = {
  id: 't1', name: 'CannaClub Gauteng', slug: 'cannaclub-gauteng', plan: 'enterprise',
  isActive: true, memberCount: 142, monthlyRevenue: 89420, vatNumber: '4912345678',
  ficaOfficer: 'Johan Snyman — fica@cannaclub.co.za', brandColor: '#1a7a4a',
  domain: 'shop.cannaclub.co.za', createdAt: '2025-01-15', staff: 8,
}

const planLabels: Record<string, string> = { starter: 'STARTER', growth: 'GROWTH', enterprise: 'ENTERPRISE' }
const planColors: Record<string, string> = { starter: '#6b7280', growth: '#2563eb', enterprise: '#16a34a' }

export default function EditClubPage() {
  const [club, setClub] = useState(mockClub)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
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
              <span style={{ fontSize: '12px' }}>←</span> All Clubs
            </div>
          </Link>
          <div style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 4px', marginBottom: '12px' }}>Sections</div>
          {['General', 'Compliance', 'Plan & Billing', 'Danger Zone'].map((s, i) => (
            <div key={s} style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280', padding: '6px 8px', borderRadius: '6px', marginBottom: '2px', cursor: 'pointer' }}>{s}</div>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{ background: '#ffffff', borderBottom: '1px solid #d1fae5', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/admin/clubs" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '13px' }}>← Clubs</Link>
            <div style={{ width: '1px', height: '20px', background: '#e5e7eb' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: club.brandColor + '20', border: `2px solid ${club.brandColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: club.brandColor }}>{club.name[0]}</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{club.name}</div>
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', background: planColors[club.plan] + '15', color: planColors[club.plan], border: `1px solid ${planColors[club.plan]}30` }}>
                {planLabels[club.plan]}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 700, color: club.isActive ? '#16a34a' : '#dc2626' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: club.isActive ? '#16a34a' : '#dc2626', display: 'inline-block' }}></span>
                {club.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <button onClick={handleSave} style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', background: saved ? '#16a34a' : '#111827', border: 'none', borderRadius: '8px', padding: '9px 18px', cursor: 'pointer', transition: 'background 0.2s' }}>
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </header>

        <main style={{ padding: '32px 40px', maxWidth: '800px' }}>
          {/* Overview stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
            {[
              { label: 'Members', value: club.memberCount },
              { label: 'Monthly Revenue', value: `R ${club.monthlyRevenue.toLocaleString()}` },
              { label: 'Staff', value: club.staff },
              { label: 'Since', value: club.createdAt },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '10px', padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* General Settings */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>General</div>
            </div>
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '6px' }}>CLUB NAME</label>
                  <input value={club.name} onChange={e => setClub(c => ({ ...c, name: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '6px' }}>URL SLUG</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af', background: '#f3f4f6', padding: '9px 10px', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '8px 0 0 8px' }}>cannabuy.io/</span>
                    <input value={club.slug} readOnly style={{ flex: 1, padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '0 8px 8px 0', fontSize: '13px', color: '#6b7280', background: '#f9fafb' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '6px' }}>BRAND COLOR</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input type="color" value={club.brandColor} onChange={e => setClub(c => ({ ...c, brandColor: e.target.value }))} style={{ width: '40px', height: '36px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }} />
                    <input value={club.brandColor} onChange={e => setClub(c => ({ ...c, brandColor: e.target.value }))} style={{ flex: 1, padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', fontFamily: 'monospace' }} />
                    <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: club.brandColor, border: '1px solid #d1d5db' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '6px' }}>CUSTOM DOMAIN</label>
                  <input value={club.domain} placeholder="None" style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Compliance</div>
            </div>
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '6px' }}>VAT NUMBER</label>
                  <input value={club.vatNumber} style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '6px' }}>FICA OFFICER</label>
                  <input value={club.ficaOfficer} style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Plan & Billing */}
          <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Plan & Billing</div>
            </div>
            <div style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>Enterprise Plan</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Unlimited clubs and members · R4,999/month</div>
              </div>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>Change Plan</button>
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{ background: '#ffffff', border: '1px solid #fecaca', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #fecaca', background: '#fef2f2' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b' }}>Danger Zone</div>
            </div>
            <div style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '2px' }}>
                  {club.isActive ? 'Deactivate Club' : 'Reactivate Club'}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {club.isActive ? 'Club will be hidden from all users immediately' : 'Club will be re-activated for all users'}
                </div>
              </div>
              <button style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: '#ffffff', background: club.isActive ? '#dc2626' : '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                {club.isActive ? 'Deactivate' : 'Reactivate'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
