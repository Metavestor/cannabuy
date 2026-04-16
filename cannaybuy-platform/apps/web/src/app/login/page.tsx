'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/context/AuthContext'
import { hasSupabaseConfig } from '../../lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message || 'Unable to sign in')
        return
      }
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f0f4f1', padding:'24px' }}>
      <div style={{ background:'white', borderRadius:'16px', padding:'40px', width:'100%', maxWidth:'400px', border:'0.5px solid #e5e7eb' }}>
        <div style={{ textAlign:'center', marginBottom:'24px' }}>
          <div style={{ width:'48px', height:'48px', background:'#1a7a4a', borderRadius:'12px', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:'12px', fontSize:'24px' }}>🌿</div>
          <h1 style={{ fontSize:'20px', fontWeight:'600', margin:'0 0 4px' }}>CannaBuy</h1>
          <p style={{ fontSize:'13px', color:'#6b7280', margin:0 }}>Manage. Comply. Grow.</p>
        </div>

        {!hasSupabaseConfig() && (
          <div style={{ background:'#fffbeb', border:'1px solid #fde68a', borderRadius:'10px', padding:'10px 12px', fontSize:'13px', color:'#92400e', marginBottom:'16px' }}>
            Supabase environment variables are missing. The app will stay in demo mode until they are configured.
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom:'16px' }}>
            <label style={{ display:'block', fontSize:'12px', color:'#374151', marginBottom:'6px', fontWeight:'500' }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@yourclub.co.za"
              style={{ width:'100%', padding:'10px 12px', border:'1px solid #d1d5db', borderRadius:'8px', fontSize:'14px', background:'#f9fafb', outline:'none' }}
            />
          </div>
          <div style={{ marginBottom:'24px' }}>
            <label style={{ display:'block', fontSize:'12px', color:'#374151', marginBottom:'6px', fontWeight:'500' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width:'100%', padding:'10px 12px', border:'1px solid #d1d5db', borderRadius:'8px', fontSize:'14px', background:'#f9fafb', outline:'none' }}
            />
          </div>
          {error && <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'8px', padding:'10px 12px', fontSize:'13px', color:'#dc2626', marginBottom:'16px' }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ width:'100%', padding:'11px', background: loading ? '#6b9e82' : '#1a7a4a', color:'white', border:'none', borderRadius:'8px', fontSize:'14px', fontWeight:'600', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign:'center', fontSize:'12px', color:'#9ca3af', marginTop:'24px' }}>South African Cannabis Club Management</p>
      </div>
    </div>
  )
}
