export default function PaymentModal({ selectedPlan, paymentStep, paymentMethod, setPaymentMethod, setShowPaymentModal, handlePaymentSubmit }) {
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}}>
      <div style={{background:'white', borderRadius:'32px', padding:'0', maxWidth:'600px', width:'100%', boxShadow:'0 30px 80px rgba(0,0,0,0.15)', position:'relative', display:'flex', overflow:'hidden'}}>
        
        {paymentStep === 'select' && (
          <div style={{display:'flex'}}>
            {/* Razorpay sidebar style */}
            <div style={{width:'160px', background:'#021676', borderRadius:'32px 0 0 32px', padding:'30px 20px', color:'white', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <div>
                   <div style={{width:'40px', height:'40px', background:'white', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#021676', fontWeight:'900', fontSize:'20px', marginBottom:'15px'}}>⊞</div>
                   <div style={{fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.7)', letterSpacing:'1px', marginBottom:'5px'}}>MERCHANT</div>
                   <div style={{fontSize:'16px', fontWeight:'800', lineHeight:'1.2'}}>InsurGig AI</div>
                </div>
                <div>
                   <div style={{fontSize:'11px', color:'rgba(255,255,255,0.7)'}}>Amount to pay</div>
                   <div style={{fontSize:'24px', fontWeight:'900'}}>₹{selectedPlan.premium}</div>
                </div>
            </div>

            {/* Main content area */}
            <div style={{flex:1, padding:'40px 30px', position:'relative'}}>
                <button onClick={() => setShowPaymentModal(false)} style={{position:'absolute', top:'15px', right:'15px', background:'transparent', border:'none', color:'#94a3b8', fontSize:'18px', cursor:'pointer'}}>✕</button>
                
                <h3 style={{fontSize:'18px', fontWeight:'800', color:'#0f172a', marginBottom:'20px'}}>Select Payment Method</h3>
                
                <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'25px'}}>
                  {[{id:'upi', label:'UPI / QR', desc:'Google Pay, PhonePe, Paytm', icon:'📱'}, {id:'card', label:'Card', desc:'Visa, MasterCard, RuPay', icon:'💳'}, {id:'netbanking', label:'Netbanking', desc:'All Indian banks', icon:'🏦'}].map(m => (
                    <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{padding:'12px 15px', borderRadius:'10px', border: paymentMethod === m.id ? '2px solid #3b82f6' : '1px solid #e2e8f0', background: paymentMethod === m.id ? '#eff6ff' : 'white', cursor:'pointer', display:'flex', alignItems:'center', gap:'15px'}}>
                      <div style={{fontSize:'20px'}}>{m.icon}</div>
                      <div>
                         <div style={{fontSize:'14px', fontWeight:'700', color:'#0f172a'}}>{m.label}</div>
                         <div style={{fontSize:'11px', color:'#64748b'}}>{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div style={{display:'grid', gap:'15px', marginBottom:'25px'}}>
                    <input type="text" placeholder="Card Number" defaultValue="4111 1111 1111 1111" style={{width:'100%', padding:'12px 15px', borderRadius:'8px', border:'1px solid #cbd5e1', fontSize:'14px', outline:'none'}} />
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                      <input type="text" placeholder="MM/YY" defaultValue="12/28" style={{width:'100%', padding:'12px 15px', borderRadius:'8px', border:'1px solid #cbd5e1', fontSize:'14px', outline:'none'}} />
                      <input type="text" placeholder="CVV" defaultValue="123" style={{width:'100%', padding:'12px 15px', borderRadius:'8px', border:'1px solid #cbd5e1', fontSize:'14px', outline:'none'}} />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div style={{marginBottom:'25px', background:'#f8fafc', padding:'20px', borderRadius:'8px', textAlign:'center', border:'1px dashed #cbd5e1'}}>
                     <div style={{width:'120px', height:'120px', background:'white', border:'1px solid #e2e8f0', margin:'0 auto 10px auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
                         <div style={{width:'100px', height:'100px', background:'repeating-linear-gradient(45deg, #0f172a, #0f172a 10px, transparent 10px, transparent 20px)'}}></div>
                     </div>
                     <div style={{fontSize:'12px', fontWeight:'600', color:'#64748b'}}>Scan QR with any UPI App</div>
                  </div>
                )}

                <button onClick={handlePaymentSubmit} style={{width:'100%', padding:'15px', background:'#3b82f6', color:'white', border:'none', borderRadius:'8px', fontSize:'15px', fontWeight:'800', cursor:'pointer'}}>
                  Pay ₹{selectedPlan.premium} Now
                </button>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', marginTop:'15px', color:'#94a3b8', fontSize:'10px', fontWeight:'700'}}>
                    <span>⚡ Razorpay</span> • <span>Trusted Business</span>
                </div>
            </div>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div style={{flex:1, textAlign:'center', padding:'80px 40px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <div style={{width:'80px', height:'80px', border:'4px solid #e2e8f0', borderTop:'4px solid #021676', borderRadius:'50%', margin:'0 auto 25px auto', animation:'spin 1s linear infinite'}}></div>
            <h3 style={{fontSize:'22px', fontWeight:'900', color:'#0f172a', margin:'0 0 10px 0'}}>Processing Payment</h3>
            <p style={{color:'#64748b', fontSize:'14px', margin:0}}>Verifying your {paymentMethod === 'card' ? 'card' : paymentMethod === 'upi' ? 'UPI' : 'wallet'} payment...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {paymentStep === 'success' && (
          <div style={{flex:1, textAlign:'center', padding:'60px 40px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <div style={{width:'80px', height:'80px', background:'#dcfce7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px auto', fontSize:'40px'}}>✅</div>
            <h3 style={{fontSize:'24px', fontWeight:'900', color:'#166534', margin:'0 0 10px 0'}}>Payment Successful!</h3>
            <p style={{color:'#64748b', fontSize:'14px', margin:'0 0 10px 0'}}>{selectedPlan.name} Plan activated for 7 days.</p>
            <div style={{fontSize:'28px', fontWeight:'900', color:'#021676'}}>₹{selectedPlan.premium}</div>
            <p style={{color:'#94a3b8', fontSize:'12px', marginTop:'15px'}}>Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  )
}
