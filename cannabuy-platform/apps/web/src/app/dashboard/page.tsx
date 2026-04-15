import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f8f9fa' }}>
      <aside style={{ width:'220px', background:'white', borderRight:'0.5px solid #e5e7eb', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'20px 16px 16px', borderBottom:'0.5px solid #e5e7eb' }}>
          <img src="/logo.png" alt="CannaBuy" style={{ height: '36px', objectFit: 'contain' }} />
          <div style={{ fontSize:'11px', color:'#6b7280', marginTop:'2px' }}>Cannabis Club Management</div>
          <div style={{ display:'inline-block', marginTop:'8px', background:'#e8f5ef', color:'#1a7a4a', fontSize:'10px', fontWeight:'600', padding:'2px 8px', borderRadius:'10px' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding:'12px 8px', flex:1 }}>
          {[
            { label:'Dashboard', href:'/dashboard', icon:'▦', active:true },
            { label:'Members', href:'/members', icon:'👥' },
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
          <div style={{ fontSize:'15px', fontWeight:'600' }}>Dashboard</div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#e8f5ef', color:'#1a7a4a', padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#1a7a4a', display:'inline-block' }} />
              System Active
            </div>
            <Link href="/members/new">
              <button style={{ background:'#1a7a4a', color:'white', border:'none', padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer' }}>+ Add Member</button>
            </Link>
          </div>
        </header>

        <div style={{ padding:'24px', flex:1 }}>
          <div style={{ background:'white', border:'0.5px solid #e5e7eb', borderRadius:'12px', padding:'20px 24px', marginBottom:'20px', borderLeft:'4px solid #1a7a4a' }}>
            <div style={{ fontSize:'15px', fontWeight:'600', marginBottom:'4px' }}>Welcome to CannaBuy 🌿</div>
            <div style={{ fontSize:'13px', color:'#6b7280', lineHeight:'1.6' }}>Your platform is live. Start by adding your first member, setting up your product inventory, and configuring your club details.</div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px', marginBottom:'20px' }}>
            {[
              { label:'Active Members', value:'0', sub:'Register your first member' },
              { label:'Monthly Revenue', value:'R 0', sub:'No sales yet' },
              { label:'VAT Payable (15%)', value:'R 0', sub:'Due 25th of next month' },
              { label:'Low Stock Items', value:'0', sub:'Add products to inventory' },
            ].map(m => (
              <div key={m.label} style={{ background:'#f0faf4', borderRadius:'10px', padding:'16px', border:'0.5px solid #d1fae5' }}>
                <div style={{ fontSize:'11px', color:'#6b7280', marginBottom:'6px' }}>{m.label}</div>
                <div style={{ fontSize:'24px', fontWeight:'600', color:'#111' }}>{m.value}</div>
                <div style={{ fontSize:'11px', color:'#9ca3af', marginTop:'4px' }}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px' }}>
            {[
              { title:'Register a Member', desc:'Add your first club member with FICA verification', href:'/members/new', icon:'👥' },
              { title:'Add Products', desc:'Set up your product catalogue with ZAR pricing', href:'/inventory', icon:'📦' },
              { title:'Run Compliance Check', desc:'Review FICA, DAA and SARS VAT status', href:'/compliance', icon:'🛡' },
            ].map(action => (
              <Link key={action.href} href={action.href} style={{ textDecoration:'none' }}>
                <div style={{ background:'white', border:'0.5px solid #e5e7eb', borderRadius:'12px', padding:'20px', cursor:'pointer' }}>
                  <div style={{ fontSize:'24px', marginBottom:'10px' }}>{action.icon}</div>
                  <div style={{ fontSize:'13px', fontWeight:'600', marginBottom:'4px', color:'#111' }}>{action.title}</div>
                  <div style={{ fontSize:'12px', color:'#6b7280', lineHeight:'1.5' }}>{action.desc}</div>
                  <div style={{ marginTop:'12px', fontSize:'12px', color:'#1a7a4a', fontWeight:'600' }}>Get started →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
