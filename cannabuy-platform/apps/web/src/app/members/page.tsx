import Link from 'next/link'

export default function MembersPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f8f9fa' }}>
      <aside style={{ width:'220px', background:'white', borderRight:'0.5px solid #e5e7eb', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'20px 16px 16px', borderBottom:'0.5px solid #e5e7eb' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannabuy-platform/logo.png" alt="CannaBuy" style={{ height:'40px', objectFit:'contain', maxWidth:'160px' }} />
          <div style={{ display:'inline-block', marginTop:'8px', background:'#e8f5ef', color:'#1a7a4a', fontSize:'10px', fontWeight:'600', padding:'2px 8px', borderRadius:'10px' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding:'12px 8px', flex:1 }}>
          {[
            { label:'Dashboard', href:'/dashboard', icon:'▦' },
            { label:'Members', href:'/members', icon:'👥', active:true },
            { label:'Inventory', href:'/inventory', icon:'📦' },
            { label:'Point of Sale', href:'/pos', icon:'🧾' },
            { label:'Financials', href:'/financial', icon:'💰' },
            { label:'Compliance', href:'/compliance', icon:'🛡' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration:'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 10px', borderRadius:'8px', marginBottom:'2px', fontSize:'13px', background: item.active ? '#e8f5ef' : 'transparent', color: item.active ? '#1a7a4a' : '#6b7280', fontWeight: item.active ? '600' : '400' }}>
                <span style={{ fontSize:'14px', width:'18px', textAlign:'center' }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding:'12px 16px', borderTop:'0.5px solid #e5e7eb', fontSize:'11px', color:'#9ca3af' }}>v1.0 · South Africa</div>
      </aside>

      <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
        <header style={{ background:'white', borderBottom:'0.5px solid #e5e7eb', padding:'0 24px', height:'52px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:'15px', fontWeight:'600' }}>Members</div>
          <Link href="/members/new">
            <button style={{ background:'#1a7a4a', color:'white', border:'none', padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer' }}>+ Register Member</button>
          </Link>
        </header>

        <div style={{ padding:'24px' }}>
          <div style={{ background:'#fef3c7', border:'0.5px solid #fcd34d', borderRadius:'8px', padding:'10px 14px', fontSize:'12px', color:'#92400e', marginBottom:'16px' }}>
            ⚠ No members registered yet. FICA verification required for all members before they can receive products.
          </div>

          <div style={{ background:'white', border:'0.5px solid #e5e7eb', borderRadius:'12px', padding:'48px', textAlign:'center' }}>
            <div style={{ fontSize:'40px', marginBottom:'16px' }}>👥</div>
            <div style={{ fontSize:'16px', fontWeight:'600', marginBottom:'8px', color:'#111' }}>No members yet</div>
            <div style={{ fontSize:'13px', color:'#6b7280', marginBottom:'24px', maxWidth:'360px', margin:'0 auto 24px' }}>
              Register your first club member with FICA/KYC verification, age check, and membership tier.
            </div>
            <Link href="/members/new">
              <button style={{ background:'#1a7a4a', color:'white', border:'none', padding:'10px 20px', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>
                Register First Member →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
