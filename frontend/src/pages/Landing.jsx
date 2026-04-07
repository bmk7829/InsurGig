import CoverageEstimator from '../components/CoverageEstimator';
import LiveXAIFeed from '../components/LiveXAIFeed';

export default function Landing({ setCurrentView }) {
  return (
    <div style={{background: '#0B0F19', color:'white', minHeight:'100vh', paddingBottom:'80px', fontFamily:'"Inter", sans-serif', overflowX:'hidden'}}>
      
      {/* Sentinel Background Radar Effects */}
      <div style={{position:'absolute', top:'-10%', left:'-10%', width:'500px', height:'500px', background:'rgba(59, 130, 246, 0.15)', filter:'blur(100px)', borderRadius:'50%', zIndex:0}}></div>
      <div style={{position:'absolute', top:'30%', right:'-5%', width:'400px', height:'400px', background:'rgba(16, 185, 129, 0.1)', filter:'blur(120px)', borderRadius:'50%', zIndex:0}}></div>

      <nav style={{display:'flex', justifyContent:'space-between', padding:'20px', alignItems:'center', maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:10}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'18px', fontWeight:'900', cursor:'pointer', color:'white'}} onClick={() => { setCurrentView('landing'); }}>
           <span style={{background:'#3b82f6', color:'white', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', boxShadow:'0 0 15px rgba(59,130,246,0.5)'}}>⊞</span> InsurGig AI
        </div>
        <div style={{display:'flex', gap:'15px'}}>
           <button style={{background:'rgba(255,255,255,0.05)', color:'white', border:'1px solid rgba(255,255,255,0.1)', padding:'10px 20px', borderRadius:'12px', fontWeight:'800', cursor:'pointer', backdropFilter:'blur(10px)'}} onClick={() => setCurrentView('plans')}>Pricing</button>
           <button style={{background:'#3b82f6', color:'white', border:'none', padding:'10px 20px', borderRadius:'12px', fontWeight:'800', cursor:'pointer', boxShadow:'0 0 20px rgba(59,130,246,0.4)'}} onClick={() => setCurrentView('auth')}>Login</button>
        </div>
      </nav>

      <section className="flow-grid" style={{maxWidth:'1200px', margin:'60px auto', padding:'40px 20px', position:'relative', zIndex:10, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'50px', alignItems:'center'}}>
        {/* Left Side: Hero Text */}
        <div style={{textAlign:'left'}}>
           <div style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(59, 130, 246, 0.1)', color:'#3b82f6', padding:'8px 16px', borderRadius:'20px', fontSize:'11px', fontWeight:'800', letterSpacing:'1px', marginBottom:'30px', border:'1px solid rgba(59, 130, 246, 0.2)'}}>
              <span className="dot" style={{background:'#3b82f6', width:'8px', height:'8px', borderRadius:'50%', boxShadow:'0 0 10px #3b82f6'}}></span> GIG WORKER SAFETY NET
           </div>
           
           <h1 style={{fontSize:'clamp(46px, 6vw, 64px)', lineHeight:'1.1', fontWeight:'900', letterSpacing:'-2px', margin:'0 0 25px 0', color:'white'}}>
              The <span style={{color:'#3b82f6', textShadow:'0 0 30px rgba(59,130,246,0.4)'}}>AI-Sentinel</span><br/>
              Monitoring Your<br/>
              <span style={{background:'linear-gradient(90deg, #3b82f6, #10b981)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Income.</span>
           </h1>
           
           <p style={{fontSize:'18px', lineHeight:'1.8', color:'#94a3b8', marginBottom:'40px', maxWidth:'600px', margin:'0 auto', paddingBottom:'20px'}}>
             Don't file claims. Let the AI do it for you. We monitor real-time weather and traffic variables in your zone. When a disruption hits, you get paid automatically. Powered by Explainable AI.
           </p>
           
           <div style={{display:'flex', gap:'15px', flexWrap:'wrap'}}>
              <button style={{background:'#3b82f6', color:'white', border:'none', padding:'18px 36px', borderRadius:'16px', fontSize:'16px', fontWeight:'800', cursor:'pointer', boxShadow:'0 0 25px rgba(59,130,246,0.5)', display:'flex', alignItems:'center', gap:'10px'}} onClick={() => setCurrentView('auth')}>
                 Get Started <span style={{fontSize:'18px', lineHeight:0}}>➔</span>
              </button>
              <button style={{background:'rgba(255,255,255,0.05)', color:'white', border:'1px solid rgba(255,255,255,0.1)', padding:'18px 36px', borderRadius:'16px', fontSize:'16px', fontWeight:'800', cursor:'pointer', backdropFilter:'blur(10px)'}} onClick={() => document.getElementById('features').scrollIntoView({behavior:'smooth'})}>
                 Live Demo
              </button>
           </div>
           
           <div style={{marginTop:'50px', display:'flex', alignItems:'center', gap:'20px', fontSize:'13px', fontWeight:'700', color:'#64748b'}}>
              <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                 <span style={{color:'#10b981', fontSize:'16px'}}>✔</span> High Trust = Lower Premium
              </div>
              <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
                 <span style={{color:'#10b981', fontSize:'16px'}}>✔</span> Web3-Level Security
              </div>
           </div>
        </div>

        {/* Right Side: Visual Components */}
        <div style={{position:'relative', display:'flex', flexDirection:'column', gap:'30px'}}>
           <LiveXAIFeed />
           <div style={{position:'absolute', right:'-50px', bottom:'-50px', transform:'scale(0.85)', zIndex:20}}>
             <CoverageEstimator />
           </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section id="features" style={{maxWidth:'1200px', margin:'120px auto 0 auto', padding:'0 20px', position:'relative', zIndex:10}}>
         <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'30px'}}>
            <div className="hover-card" style={{background:'rgba(255,255,255,0.02)', borderRadius:'32px', padding:'40px', border:'1px solid rgba(255,255,255,0.05)', backdropFilter:'blur(20px)'}}>
               <div style={{width:'50px', height:'50px', background:'rgba(59,130,246,0.1)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', color:'#3b82f6', fontSize:'24px', marginBottom:'25px'}}>🧠</div>
               <h3 style={{fontSize:'22px', fontWeight:'900', color:'white', marginBottom:'15px'}}>Compound AI Detection</h3>
               <p style={{fontSize:'15px', color:'#94a3b8', lineHeight:'1.6', margin:0}}>Unlike standard weather covers, our engine detects stacked disruptions (E.g. Mild Rain + High Traffic) that normally wouldn't trigger a payout.</p>
            </div>
            
            <div className="hover-card" style={{background:'rgba(255,255,255,0.02)', borderRadius:'32px', padding:'40px', border:'1px solid rgba(255,255,255,0.05)', backdropFilter:'blur(20px)'}}>
               <div style={{width:'50px', height:'50px', background:'rgba(16,185,129,0.1)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', color:'#10b981', fontSize:'24px', marginBottom:'25px'}}>💎</div>
               <h3 style={{fontSize:'22px', fontWeight:'900', color:'white', marginBottom:'15px'}}>Trust Gamification</h3>
               <p style={{fontSize:'15px', color:'#94a3b8', lineHeight:'1.6', margin:0}}>Our internal Honor Score engine monitors behavior. Avoid GPS spoofing and maintain high trust to drop your weekly premiums by 15%.</p>
            </div>
            
            <div className="hover-card" style={{background:'rgba(255,255,255,0.02)', borderRadius:'32px', padding:'40px', border:'1px solid rgba(255,255,255,0.05)', backdropFilter:'blur(20px)'}}>
               <div style={{width:'50px', height:'50px', background:'rgba(244,63,94,0.1)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', color:'#f43f5e', fontSize:'24px', marginBottom:'25px'}}>⚡</div>
               <h3 style={{fontSize:'22px', fontWeight:'900', color:'white', marginBottom:'15px'}}>Zero-Claim Execution</h3>
               <p style={{fontSize:'15px', color:'#94a3b8', lineHeight:'1.6', margin:0}}>Do not call us. Do not text us. The moment localized APIs confirm extreme conditions in your zone, funding routing is altered to your wallet instantly.</p>
            </div>
         </div>
      </section>

      {/* 6 Events Trigger Grid Component */}
      <section style={{padding: '120px 20px 0 20px', position:'relative'}}>
         <div style={{position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:'800px', height:'400px', background:'radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 70%)', zIndex:0}}></div>
         <div style={{maxWidth:'1200px', margin:'0 auto', textAlign:'center', position:'relative', zIndex:10}}>
            <h2 style={{fontSize:'clamp(28px, 4vw, 36px)', fontWeight:'900', color:'white', marginBottom:'15px'}}>Sentinel Breach Triggers</h2>
            <p style={{fontSize:'16px', color:'#94a3b8', maxWidth:'600px', margin:'0 auto 50px auto', lineHeight:'1.6'}}>When environmental limits are exceeded in your delivery zone, the smart contract fires.</p>
            
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'20px', textAlign:'left'}}>
               <div className="hover-card" style={{background:'rgba(15,23,42,0.8)', borderRadius:'16px', padding:'30px', border:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'20px', alignItems:'flex-start', backdropFilter:'blur(10px)'}}>
                  <div style={{fontSize:'28px', color:'#3b82f6', textShadow:'0 0 15px rgba(59,130,246,0.6)'}}>🌧️</div>
                  <div>
                     <h4 style={{fontSize:'16px', fontWeight:'800', color:'white', margin:'0 0 8px 0'}}>Heavy Rain</h4>
                     <p style={{fontSize:'13px', color:'#94a3b8', margin:0, lineHeight:'1.5'}}>Rainfall {">"} 35mm/hr or IMD Red Alert</p>
                  </div>
               </div>
               <div className="hover-card" style={{background:'rgba(15,23,42,0.8)', borderRadius:'16px', padding:'30px', border:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'20px', alignItems:'flex-start', backdropFilter:'blur(10px)'}}>
                  <div style={{fontSize:'28px', color:'#ef4444', textShadow:'0 0 15px rgba(239,68,68,0.6)'}}>⚠️</div>
                  <div>
                     <h4 style={{fontSize:'16px', fontWeight:'800', color:'white', margin:'0 0 8px 0'}}>Extreme Heat</h4>
                     <p style={{fontSize:'13px', color:'#94a3b8', margin:0, lineHeight:'1.5'}}>Temperature {">"} 44°C + heat index {">"} 54°C</p>
                  </div>
               </div>
               <div className="hover-card" style={{background:'rgba(15,23,42,0.8)', borderRadius:'16px', padding:'30px', border:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'20px', alignItems:'flex-start', backdropFilter:'blur(10px)'}}>
                  <div style={{fontSize:'28px', color:'#8b5cf6', textShadow:'0 0 15px rgba(139,92,246,0.6)'}}>💨</div>
                  <div>
                     <h4 style={{fontSize:'16px', fontWeight:'800', color:'white', margin:'0 0 8px 0'}}>Severe AQI</h4>
                     <p style={{fontSize:'13px', color:'#94a3b8', margin:0, lineHeight:'1.5'}}>Air Quality Index {">"} 300 (Very Poor)</p>
                  </div>
               </div>
               <div className="hover-card" style={{background:'rgba(15,23,42,0.8)', borderRadius:'16px', padding:'30px', border:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:'20px', alignItems:'flex-start', backdropFilter:'blur(10px)'}}>
                  <div style={{fontSize:'28px', color:'#3b82f6', textShadow:'0 0 15px rgba(59,130,246,0.6)'}}>⚡</div>
                  <div>
                     <h4 style={{fontSize:'16px', fontWeight:'800', color:'white', margin:'0 0 8px 0'}}>Multi-Layered Compound</h4>
                     <p style={{fontSize:'13px', color:'#94a3b8', margin:0, lineHeight:'1.5'}}>Rain {">"} 20mm/hr AND AQI {">"} 200 together</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section style={{maxWidth:'800px', margin:'120px auto 40px auto', padding:'60px 20px', background:'linear-gradient(145deg, #1e3a8a, #0f172a)', borderRadius:'40px', textAlign:'center', color:'white', position:'relative', overflow:'hidden', boxShadow:'0 30px 60px rgba(0,0,0,0.5)', border:'1px solid rgba(59,130,246,0.2)'}}>
         <div style={{position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at center, rgba(59,130,246,0.2) 1px, transparent 1px)', backgroundSize:'20px 20px', opacity:0.3}}></div>
         <h2 style={{fontSize:'clamp(32px, 5vw, 42px)', fontWeight:'900', margin:'0 0 20px 0', position:'relative'}}>Ready to Access the Grid?</h2>
         <p style={{fontSize:'16px', color:'#94a3b8', margin:'0 auto 40px auto', maxWidth:'400px', position:'relative', lineHeight:'1.6'}}>Log in with your Google account and activate your Sentinel monitoring in under 60 seconds.</p>
         <button style={{background:'#3b82f6', color:'white', border:'none', padding:'20px 40px', borderRadius:'16px', fontSize:'16px', fontWeight:'800', cursor:'pointer', position:'relative', boxShadow:'0 0 20px rgba(59,130,246,0.4)'}} onClick={() => setCurrentView('auth')}>Login to InsurGig</button>
      </section>
      
    </div>
  )
}
