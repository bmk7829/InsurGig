import React, { useState } from 'react';

export default function CoverageEstimator() {
  const [trustScore, setTrustScore] = useState(100);
  const [zoneRisk, setZoneRisk] = useState('Low'); // Low, Medium, High

  const getBasePremium = () => {
     if(zoneRisk === 'Low') return 40;
     if(zoneRisk === 'Medium') return 70;
     return 100;
  };

  const calculatePremium = () => {
    let base = getBasePremium();
    // Trust Score Discount logic
    if (trustScore >= 90) return Math.round(base * 0.85); // 15% discount for high trust
    if (trustScore <= 50) return Math.round(base * 1.50); // 50% penalty for low trust
    return base;
  };

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.8)', 
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      borderRadius: '24px',
      padding: '40px',
      color: 'white',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.05)',
      maxWidth: '500px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{position:'absolute', top:0, left:0, width:'100%', height:'4px', background:'linear-gradient(90deg, #3b82f6, #10b981)'}}></div>
      
      <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'30px'}}>
        <div style={{width:'40px', height:'40px', borderRadius:'12px', background:'rgba(56, 189, 248, 0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'#3b82f6', fontSize:'20px'}}>🛡️</div>
        <div>
          <h3 style={{margin:0, fontSize:'20px', fontWeight:'800'}}>Pricing Estimator</h3>
          <p style={{margin:0, fontSize:'12px', color:'#94a3b8'}}>Gamified Trust Protocol</p>
        </div>
      </div>

      <div style={{marginBottom:'30px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
          <label style={{fontSize:'12px', fontWeight:'700', color:'#94a3b8', letterSpacing:'1px'}}>YOUR TRUST SCORE</label>
          <span style={{fontSize:'14px', fontWeight:'900', color: trustScore >= 90 ? '#10b981' : (trustScore <= 50 ? '#ef4444' : '#f59e0b')}}>{trustScore} / 100</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={trustScore} 
          onChange={(e) => setTrustScore(Number(e.target.value))}
          style={{width:'100%', accentColor: '#3b82f6', cursor: 'grab'}}
        />
        <p style={{fontSize:'11px', color:'#64748b', marginTop:'10px', lineHeight:'1.5'}}>
          {trustScore >= 90 ? '✨ Excellent! You unlock a 15% discount.' : (trustScore <= 50 ? '⚠️ High Fraud Risk. Premiums increased by 50%.' : 'Maintain your score above 90 for discounts.')}
        </p>
      </div>

      <div style={{marginBottom:'30px'}}>
        <label style={{fontSize:'12px', fontWeight:'700', color:'#94a3b8', letterSpacing:'1px', display:'block', marginBottom:'10px'}}>SELECT ZONE RISK</label>
        <div style={{display:'flex', gap:'10px'}}>
          {['Low', 'Medium', 'High'].map(r => (
            <button 
              key={r}
              onClick={() => setZoneRisk(r)}
              style={{
                flex:1, padding:'10px', borderRadius:'10px', fontWeight:'700', fontSize:'13px', cursor:'pointer',
                background: zoneRisk === r ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                border: zoneRisk === r ? '1px solid #3b82f6' : '1px solid #334155',
                color: zoneRisk === r ? '#38bdf8' : '#94a3b8'
              }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div style={{background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.1)', padding:'20px', borderRadius:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontSize:'11px', color:'#94a3b8', fontWeight:'700', letterSpacing:'1px', marginBottom:'5px'}}>WEEKLY PREMIUM</div>
          <div style={{fontSize:'36px', fontWeight:'900', color:'white'}}>
            ₹{calculatePremium()}
          </div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:'11px', color:'#94a3b8', fontWeight:'700', letterSpacing:'1px', marginBottom:'5px'}}>GUARANTEED PAYOUT</div>
          <div style={{fontSize:'24px', fontWeight:'800', color:'#10b981'}}>
            ₹{zoneRisk === 'Low' ? 700 : (zoneRisk === 'Medium' ? 1200 : 1700)}
          </div>
        </div>
      </div>
    </div>
  );
}
