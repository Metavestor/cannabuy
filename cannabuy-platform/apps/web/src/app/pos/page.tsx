import Link from 'next/link'

export default function POSPage() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f8f9fa' }}>
      <aside style={{ width:'240px', background:'white', borderRight:'0.5px solid #e5e7eb', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'20px 16px 16px', borderBottom:'0.5px solid #e5e7eb' }}>
          <img src="https://raw.githubusercontent.com/Metavestor/cannabuy/main/cannabuy-platform/logo.png" alt="CannaBuy" style={{ width:'180px', height:'auto', display:'block' }} />
          <div style={{ fontSize:'11px', color:'#6b7280', marginTop:'2px' }}>Cannabis Club Management</div>
          <div style={{ display:'inline-block', marginTop:'8px', background:'#e8f5ef', color:'#1a7a4a', fontSize:'10px', fontWeight:'600', padding:'2px 8px', borderRadius:'10px' }}>ZA COMPLIANT</div>
        </div>
        <nav style={{ padding:'12px 8px', flex:1 }}>
          {[
            { label:'Dashboard', href:'/dashboard', icon:'▦' },
            { label:'Members', href:'/members', icon:'👥' },
            { label:'Inventory', href:'/inventory', icon:'📦' },
            { label:'Point of Sale', href:'/pos', icon:'🧾', active:true },
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
          <div style={{ fontSize:'15px', fontWeight:'600' }}>Point of Sale</div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#e8f5ef', color:'#1a7a4a', padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'600' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#1a7a4a', display:'inline-block' }} />
              System Active
            </div>
          </div>
        </header>

        <div style={{ padding:'24px', flex:1, display:'grid', gridTemplateColumns:'1fr 380px', gap:'20px' }}>
          {/* Product Catalog Section */}
          <div style={{ background:'white', border:'0.5px solid #e5e7eb', borderRadius:'12px', overflow:'hidden' }}>
            <div style={{ padding:'16px 20px', borderBottom:'0.5px solid #e5e7eb', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:'14px', fontWeight:'600' }}>Product Catalog</div>
              <input 
                type="text" 
                placeholder="Search products..." 
                style={{ 
                  width:'250px', 
                  padding:'8px 12px', 
                  border:'1px solid #e5e7eb', 
                  borderRadius:'8px', 
                  fontSize:'13px',
                  outline:'none'
                }}
              />
            </div>
            
            {/* Category Filters */}
            <div style={{ padding:'12px 20px', borderBottom:'0.5px solid #e5e7eb', display:'flex', gap:'8px' }}>
              {['All', 'Flower', 'Edibles', 'Concentrates', 'Accessories'].map((cat, i) => (
                <button 
                  key={cat}
                  style={{ 
                    padding:'6px 14px', 
                    borderRadius:'20px', 
                    border:'1px solid #e5e7eb', 
                    background: i === 0 ? '#1a7a4a' : 'white',
                    color: i === 0 ? 'white' : '#6b7280',
                    fontSize:'12px',
                    fontWeight:'500',
                    cursor:'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Products Grid */}
            <div style={{ padding:'16px 20px', overflowY:'auto', height:'calc(100vh - 280px)' }}>
              <div style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', 
                gap:'12px'
              }}>
                {/* Sample Products - These would be loaded from database */}
                {[
                  { name: 'Premium Flower', price: 'R 350', strain: 'Indica', thc: '22%' },
                  { name: 'Hybrid Blend', price: 'R 280', strain: 'Hybrid', thc: '18%' },
                  { name: 'Sativa Special', price: 'R 320', strain: 'Sativa', thc: '20%' },
                  { name: 'CBD Oil', price: 'R 450', strain: 'CBD', thc: '0%' },
                  { name: 'Pre-Roll Pack', price: 'R 180', strain: 'Mixed', thc: '15%' },
                  { name: 'Edible Gummies', price: 'R 220', strain: 'Hybrid', thc: '10%' },
                ].map((product, i) => (
                  <div 
                    key={i}
                    style={{ 
                      background:'#f9fafb', 
                      borderRadius:'10px', 
                      padding:'12px',
                      cursor:'pointer',
                      transition:'all 0.2s',
                      border:'1px solid transparent'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#1a7a4a'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div style={{ 
                      width:'100%', 
                      height:'80px', 
                      background:'#e5e7eb', 
                      borderRadius:'8px',
                      marginBottom:'8px',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      fontSize:'24px'
                    }}>
                      🌿
                    </div>
                    <div style={{ fontSize:'12px', fontWeight:'600', marginBottom:'4px' }}>{product.name}</div>
                    <div style={{ fontSize:'11px', color:'#6b7280', marginBottom:'4px' }}>{product.strain} · THC: {product.thc}</div>
                    <div style={{ fontSize:'14px', fontWeight:'700', color:'#1a7a4a' }}>{product.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div style={{ background:'white', border:'0.5px solid #e5e7eb', borderRadius:'12px', display:'flex', flexDirection:'column' }}>
            <div style={{ padding:'16px 20px', borderBottom:'0.5px solid #e5e7eb' }}>
              <div style={{ fontSize:'14px', fontWeight:'600', marginBottom:'12px' }}>Current Transaction</div>
              
              {/* Customer Selection */}
              <div style={{ display:'flex', gap:'8px', marginBottom:'12px' }}>
                <button 
                  style={{ 
                    flex:1,
                    padding:'10px', 
                    borderRadius:'8px', 
                    border:'1px solid #1a7a4a', 
                    background:'#e8f5ef',
                    color:'#1a7a4a',
                    fontSize:'12px',
                    fontWeight:'600',
                    cursor:'pointer'
                  }}
                >
                  👤 Member
                </button>
                <button 
                  style={{ 
                    flex:1,
                    padding:'10px', 
                    borderRadius:'8px', 
                    border:'1px solid #e5e7eb', 
                    background:'white',
                    color:'#6b7280',
                    fontSize:'12px',
                    fontWeight:'500',
                    cursor:'pointer'
                  }}
                >
                  🚶 Walk-in
                </button>
              </div>
            </div>
            
            {/* Cart Items */}
            <div style={{ flex:1, padding:'16px 20px', overflowY:'auto' }}>
              <div style={{ textAlign:'center', color:'#9ca3af', padding:'40px 20px' }}>
                <div style={{ fontSize:'40px', marginBottom:'12px' }}>🛒</div>
                <div style={{ fontSize:'13px' }}>Cart is empty</div>
                <div style={{ fontSize:'12px', marginTop:'4px' }}>Click products to add them</div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div style={{ padding:'16px 20px', borderTop:'0.5px solid #e5e7eb' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px' }}>
                <span style={{ color:'#6b7280' }}>Subtotal</span>
                <span style={{ fontWeight:'500' }}>R 0.00</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px' }}>
                <span style={{ color:'#6b7280' }}>VAT (15%)</span>
                <span style={{ fontWeight:'500' }}>R 0.00</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px', fontSize:'15px', fontWeight:'700' }}>
                <span>Total</span>
                <span style={{ color:'#1a7a4a' }}>R 0.00</span>
              </div>
              
              {/* Payment Buttons */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'12px' }}>
                <button 
                  style={{ 
                    padding:'12px', 
                    borderRadius:'8px', 
                    border:'none', 
                    background:'#1a7a4a',
                    color:'white',
                    fontSize:'13px',
                    fontWeight:'600',
                    cursor:'pointer'
                  }}
                >
                  💵 Cash
                </button>
                <button 
                  style={{ 
                    padding:'12px', 
                    borderRadius:'8px', 
                    border:'1px solid #e5e7eb', 
                    background:'white',
                    color:'#111',
                    fontSize:'13px',
                    fontWeight:'600',
                    cursor:'pointer'
                  }}
                >
                  💳 Card
                </button>
              </div>
              
              <button 
                style={{ 
                  width:'100%',
                  padding:'14px', 
                  borderRadius:'8px', 
                  border:'none', 
                  background:'#059669',
                  color:'white',
                  fontSize:'14px',
                  fontWeight:'700',
                  cursor:'pointer',
                  opacity: 0.5
                }}
                disabled
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}