'use client'
import Link from 'next/link'
import { useState } from 'react'

const LEGAL_LIMIT = 30 // grams per month

const members = [
  { id: 'm1', name: 'Thabo Molefe', memberNo: 'MBR-001', tier: 'standard', usedGrams: 28.5, limit: 30, visits: 8, lastVisit: '2026-04-16', status: 'ok' },
  { id: 'm2', name: 'Priya Kartik', memberNo: 'MBR-002', tier: 'premium', usedGrams: 31.2, limit: 60, visits: 12, lastVisit: '2026-04-15', status: 'exceeded' },
  { id: 'm3', name: 'Johan Snyman', memberNo: 'MBR-003', tier: 'founding', usedGrams: 22.0, limit: 100, visits: 6, lastVisit: '2026-04-14', status: 'ok' },
  { id: 'm4', name: 'Lisa Nkosi', memberNo: 'MBR-004', tier: 'standard', usedGrams: 27.5, limit: 30, visits: 9, lastVisit: '2026-04-13', status: 'warning' },
  { id: 'm5', name: 'Ahmed Patel', memberNo: 'MBR-005', tier: 'standard', usedGrams: 18.0, limit: 30, visits: 5, lastVisit: '2026-04-12', status: 'ok' },
  { id: 'm6', name: 'Emma van der Berg', memberNo: 'MBR-006', tier: 'premium', usedGrams: 58.0, limit: 60, visits: 14, lastVisit: '2026-04-16', status: 'warning' },
  { id: 'm7', name: 'Sipho Dlamini', memberNo: 'MBR-007', tier: 'standard', usedGrams: 30.1, limit: 30, visits: 10, lastVisit: '2026-04-11', status: 'exceeded' },
  { id: 'm8', name: 'Naledi Moagi', memberNo: 'MBR-008', tier: 'founding', usedGrams: 45.0, limit: 100, visits: 7, lastVisit: '2026-04-10', status: 'ok' },
]

const batches = [
  { code: 'BTH-001', strain: 'Pink Panther', stage: 'harvested', plantCount: 12, yieldGrams: 480, harvestDate: '2026-03-15' },
  { code: 'BTH-002', strain: 'Sour Diesel', stage: 'harvested', plantCount: 8, yieldGrams: 320, harvestDate: '2026-03-20' },
  { code: 'BTH-003', strain: 'Gelato 41', stage: 'flowering', plantCount: 10, yieldGrams: null, harvestDate: null },
  { code: 'BTH-004', strain: 'Wappa', stage: 'vegetative', plantCount: 15, yieldGrams: null, harvestDate: null },
  { code: 'BTH-005', strain: 'Kosher Kush', stage: 'seedling', plantCount: 6, yieldGrams: null, harvestDate: null },
]

const stageColors: Record<string, string> = {
  germination: '#6b7280', seedling: '#2563eb', vegetative: '#16a34a',
  flowering: '#d97706', harvested: '#16a34a', destroyed: '#dc2626',
}

export default function DAAReportsPage() {
  const [tab, setTab] = useState<'members' | 'batches' | 'reports'>('members')
  const [filterStatus, setFilterStatus] = useState('all')

  const exceeded = members.filter(m => m.status === 'exceeded').length
  const warning = members.filter(m => m.status === 'warning').length
  const totalMembers = members.length

  const filtered = filterStatus === 'all' ? members : members.filter(m => m.status === filterStatus)

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
          { label: 'FICA Verification', href: '/admin/fica', icon: '▥' },
          { label: 'VAT Reports', href: '/reports/vat', icon: '▦' },
          { label: 'DAA Reports', href: '/reports/daa', icon: '▧', active: true },
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
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>DAA Cannabis Club Reporting</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              ⬇ Export DAA Report
            </button>
            <button style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#111827', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer' }}>
              🖨 Print Compliance Report
            </button>
          </div>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Alert banner */}
          {(exceeded > 0 || warning > 0) && (
            <div style={{ background: exceeded > 0 ? '#fef2f2' : '#fffbeb', border: `1px solid ${exceeded > 0 ? '#fecaca' : '#fde68a'}`, borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '18px' }}>⚠</span>
              <div style={{ fontSize: '12px', color: exceeded > 0 ? '#991b1b' : '#92400e' }}>
                {exceeded > 0 && <strong>{exceeded} member{exceeded > 1 ? 's' : ''} exceeded monthly gram limit.</strong>}
                {exceeded > 0 && warning > 0 && ' '}
                {warning > 0 && <strong>{warning} member{warning > 1 ? 's' : ''} approaching limit (&gt;90%).</strong>}
                {' '}DAA requires immediate review.
              </div>
            </div>
          )}

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Members', value: totalMembers, color: '#111827' },
              { label: 'At Legal Limit', value: exceeded, color: '#dc2626', sub: 'Exceeded this month' },
              { label: 'Near Limit', value: warning, color: '#d97706', sub: '>90% of limit' },
              { label: 'Within Limits', value: totalMembers - exceeded - warning, color: '#16a34a', sub: 'All clear' },
            ].map(card => (
              <div key={card.label} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{card.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: card.color }}>{card.value}</div>
                {'sub' in card && <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{card.sub}</div>}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '10px', padding: '4px', width: 'fit-content', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            {(['members', 'batches', 'reports'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '7px', border: 'none', cursor: 'pointer', background: tab === t ? '#16a34a' : 'transparent', color: tab === t ? '#ffffff' : '#6b7280', textTransform: 'capitalize' }}>
                {t === 'batches' ? 'Cultivation Batches' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'members' && (
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Filter:</span>
                {['all', 'exceeded', 'warning', 'ok'].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '20px', border: '1px solid', cursor: 'pointer', textTransform: 'capitalize',
                    background: filterStatus === s ? (s === 'exceeded' ? '#dc2626' : s === 'warning' ? '#d97706' : '#16a34a') : '#ffffff',
                    color: filterStatus === s ? '#ffffff' : '#6b7280',
                    borderColor: filterStatus === s ? 'transparent' : '#e5e7eb',
                  }}>
                    {s}
                  </button>
                ))}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Member', 'Tier', 'This Month', 'Limit', 'Usage', 'Visits', 'Last Visit', 'Status'].map(h => (
                      <th key={h} style={{ padding: '11px 14px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: h === 'Usage' ? 'left' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => {
                    const pct = (m.usedGrams / m.limit) * 100
                    return (
                      <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '13px 14px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{m.name}</div>
                          <div style={{ fontSize: '11px', color: '#9ca3af' }}>{m.memberNo}</div>
                        </td>
                        <td style={{ padding: '13px 14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: m.tier === 'founding' ? '#fef3c7' : m.tier === 'premium' ? '#dbeafe' : '#f0fdf4', color: m.tier === 'founding' ? '#92400e' : m.tier === 'premium' ? '#1e40af' : '#16a34a', textTransform: 'capitalize' }}>
                            {m.tier}
                          </span>
                        </td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 700, color: m.status === 'exceeded' ? '#dc2626' : m.status === 'warning' ? '#d97706' : '#374151' }}>
                          {m.usedGrams}g
                        </td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{m.limit}g</td>
                        <td style={{ padding: '13px 14px', minWidth: '120px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: '4px', background: pct > 100 ? '#dc2626' : pct > 90 ? '#d97706' : '#16a34a' }} />
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: pct > 100 ? '#dc2626' : pct > 90 ? '#d97706' : '#6b7280', minWidth: '36px' }}>{pct.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151' }}>{m.visits}</td>
                        <td style={{ padding: '13px 14px', fontSize: '12px', color: '#6b7280' }}>{m.lastVisit}</td>
                        <td style={{ padding: '13px 14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: m.status === 'exceeded' ? '#fee2e2' : m.status === 'warning' ? '#fef3c7' : '#f0fdf4', color: m.status === 'exceeded' ? '#dc2626' : m.status === 'warning' ? '#d97706' : '#16a34a', textTransform: 'uppercase' }}>
                            {m.status === 'exceeded' ? '⚠ EXCEEDED' : m.status === 'warning' ? '⚠ WARNING' : '✓ OK'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'batches' && (
            <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Batch Code', 'Strain', 'Stage', 'Plants', 'Yield (g)', 'Harvest Date'].map(h => (
                      <th key={h} style={{ padding: '11px 14px', fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b, i) => (
                    <tr key={b.code} style={{ borderBottom: i < batches.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>{b.code}</td>
                      <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151' }}>{b.strain}</td>
                      <td style={{ padding: '13px 14px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: stageColors[b.stage] + '15', color: stageColors[b.stage], border: `1px solid ${stageColors[b.stage]}30`, textTransform: 'capitalize' }}>
                          {b.stage}
                        </span>
                      </td>
                      <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151' }}>{b.plantCount}</td>
                      <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 600, color: b.yieldGrams ? '#16a34a' : '#9ca3af' }}>{b.yieldGrams ? `${b.yieldGrams}g` : '—'}</td>
                      <td style={{ padding: '13px 14px', fontSize: '13px', color: '#6b7280' }}>{b.harvestDate || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'reports' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { title: 'Monthly Member Report', desc: 'All member purchases, gram usage, visit frequency for the current month', period: 'April 2026' },
                { title: 'Quarterly Compliance Report', desc: 'Q1 2026 aggregate data for DAA submission — members, cultivation, compliance incidents', period: 'Q1 2026' },
                { title: 'Annual Membership Report', desc: 'Full year member summary, churn rate, gram totals, new registrations', period: '2025/2026' },
              ].map((r, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: '14px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, marginBottom: '8px' }}>{r.period}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>{r.title}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px', lineHeight: 1.5 }}>{r.desc}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ flex: 1, padding: '8px', fontSize: '12px', fontWeight: 600, color: '#ffffff', background: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Generate</button>
                    <button style={{ flex: 1, padding: '8px', fontSize: '12px', fontWeight: 600, color: '#374151', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>Preview</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
