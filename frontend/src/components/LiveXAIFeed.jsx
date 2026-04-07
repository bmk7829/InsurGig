import React, { useEffect, useState } from 'react';

const mockClaims = [
  { platform: 'Zomato', location: 'Madhapur', payout: 350, xai: "Compound Event ⭐: Combined Heavy Rain (35mm) and Gridlock Traffic (Idx: 8.5)" },
  { platform: 'Swiggy', location: 'Gachibowli', payout: 200, xai: "Primary Trigger: Hazardous AQI (310)" },
  { platform: 'Uber', location: 'Kukatpally', payout: 400, xai: "Compound Event ⭐: Extreme Heat (44°C) and Severe Traffic (Idx: 9.0)" },
  { platform: 'Zepto', location: 'Jubilee Hills', payout: 150, xai: "Primary Trigger: Flash Flood Alert Active" },
  { platform: 'Blinkit', location: 'Banjara Hills', payout: 500, xai: "Compound Event ⭐: Combined Heavy Rain (45mm) and Low Demand (Drop 40%)" }
];

export default function LiveXAIFeed() {
  const [feed, setFeed] = useState([mockClaims[0], mockClaims[1]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => {
        const nextClaim = mockClaims[Math.floor(Math.random() * mockClaims.length)];
        const newFeed = [nextClaim, ...prev];
        if (newFeed.length > 3) newFeed.pop();
        return newFeed;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'rgba(11, 15, 25, 0.9)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '24px',
      padding: '30px',
      color: 'white',
      maxWidth: '450px',
      margin: '0 auto'
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
           <div style={{width:'8px', height:'8px', background:'#10b981', borderRadius:'50%', boxShadow:'0 0 10px #10b981', animation:'pulse 2s infinite'}}></div>
           <span style={{fontSize:'12px', fontWeight:'800', letterSpacing:'1px', color:'#94a3b8'}}>LIVE XAI FEED</span>
        </div>
        <span style={{background:'rgba(56, 189, 248, 0.1)', color:'#38bdf8', padding:'4px 10px', borderRadius:'20px', fontSize:'10px', fontWeight:'800'}}>Sentinel Monitoring</span>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:'15px', position:'relative' }}>
        {feed.map((item, idx) => (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.05)', 
            padding: '15px', 
            borderRadius: '16px',
            animation: idx === 0 ? 'fadeInUp 0.5s ease-out' : 'none',
            opacity: idx === 0 ? 1 : (idx === 1 ? 0.7 : 0.3),
            transform: idx === 0 ? 'scale(1)' : (idx === 1 ? 'scale(0.98)' : 'scale(0.95)'),
            transition: 'all 0.5s ease'
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
               <div style={{fontSize:'13px', fontWeight:'800', color:'#e2e8f0'}}>{item.platform} Rider • {item.location}</div>
               <div style={{color:'#10b981', fontWeight:'900', fontSize:'14px'}}>+₹{item.payout}</div>
            </div>
            <div style={{background:'rgba(59, 130, 246, 0.05)', borderLeft:'3px solid #3b82f6', padding:'8px 12px', borderRadius:'4px', fontSize:'11px', color:'#cbd5e1', lineHeight:'1.5'}}>
               <span style={{color:'#3b82f6', fontWeight:'800'}}>AI Reason:</span> {item.xai}
            </div>
          </div>
        ))}
        
        {/* Fading bottom edge */}
        <div style={{position:'absolute', bottom:0, left:0, width:'100%', height:'40px', background:'linear-gradient(transparent, rgba(11, 15, 25, 0.9))'}}></div>
      </div>
    </div>
  );
}
