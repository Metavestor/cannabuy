'use client'
import { useState, useRef, useEffect } from 'react'
import { useClub } from '../context/ClubContext'

const planLabels = { starter: 'STARTER', growth: 'GROWTH', enterprise: 'ENTERPRISE' }
const planColors = { starter: '#6b7280', growth: '#2563eb', enterprise: '#16a34a' }

export default function ClubSwitcher() {
  const { activeClub, setActiveClub, clubs } = useClub()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '7px 14px',
          background: activeClub.brandColor + '12',
          border: `1px solid ${activeClub.brandColor}30`,
          borderRadius: '10px',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: activeClub.brandColor, flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{activeClub.name}</span>
        <span style={{
          fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px',
          background: planColors[activeClub.plan] + '15', color: planColors[activeClub.plan],
          border: `1px solid ${planColors[activeClub.plan]}30`, letterSpacing: '0.5px',
        }}>
          {planLabels[activeClub.plan]}
        </span>
        <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: '2px' }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          minWidth: '260px',
          zIndex: 1000,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Switch Club
            </div>
          </div>
          {clubs.map(club => (
            <button
              key={club.id}
              onClick={() => { setActiveClub(club); setOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 14px',
                background: club.id === activeClub.id ? '#f9fafb' : 'transparent',
                border: 'none',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
              onMouseLeave={e => (e.currentTarget.style.background = club.id === activeClub.id ? '#f9fafb' : 'transparent')}
            >
              <div style={{
                width: '34px', height: '34px', borderRadius: '9px',
                background: club.brandColor + '20',
                border: `2px solid ${club.brandColor}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: club.brandColor }}>
                  {club.name[0]}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {club.name}
                  {!club.isActive && (
                    <span style={{ fontSize: '9px', color: '#dc2626', background: '#fef2f2', padding: '1px 6px', borderRadius: '10px', fontWeight: 600 }}>Inactive</span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '1px' }}>/{club.slug}</div>
              </div>
              <span style={{
                fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px',
                background: planColors[club.plan] + '15', color: planColors[club.plan],
                border: `1px solid ${planColors[club.plan]}30`, letterSpacing: '0.5px', flexShrink: 0,
              }}>
                {planLabels[club.plan]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
