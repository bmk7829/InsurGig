import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function Auth({ role, setRole, setUserId, setUserName, setSubscription, setHonorScore, setIsLoggedIn, setCurrentView }) {
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ email: '', password: '' })
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', city: '', role: 'worker' })
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuthSubmit = async () => {
    setAuthError('');
    setAuthSuccess('');
    if (!authForm.email || !authForm.email.trim()) { setAuthError('Please enter your email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authForm.email)) { setAuthError('Please enter a valid email address.'); return; }
    if (!authForm.password || authForm.password.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });
      if (!res.ok) { 
          setAuthError("Access Denied: Invalid Email or Password. Please try creating an account."); 
          return; 
      }
      const data = await res.json();
      setRole(data.role); 
      setUserId(data.user_id);
      setUserName(data.name || 'Worker');
      
      if (data.subscription) {
        setSubscription(data.subscription);
      } else {
        setSubscription(null);
      }

      if (data.honor_score !== undefined) {
        setHonorScore(data.honor_score);
      }

      setIsLoggedIn(true);
      setCurrentView(data.role === 'admin' ? 'admin' : 'dashboard');
    } catch (e) {
      console.error("Auth Offline:", e);
      setAuthError("Network Error: InsurGig AI Server is currently offline.");
    } finally {
      setLoading(false);
    }
  }

  const handleRegSubmit = async () => {
    setAuthError('');
    setAuthSuccess('');
    if (!regForm.name || regForm.name.trim().length < 2) { setAuthError('Please enter your full name (at least 2 characters).'); return; }
    if (!regForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) { setAuthError('Please enter a valid email address.'); return; }
    if (!regForm.password || regForm.password.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
    if (!regForm.city || regForm.city.trim().length < 2) { setAuthError('Please enter your city.'); return; }
    setLoading(true);
    try {
      const payload = { ...regForm, role: role };
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) { 
          setAuthError("Registration Failed: Email might be in use."); 
          return; 
      }
      setAuthSuccess("Account created! Please login.");
      setAuthMode('login');
      setAuthForm({...authForm, email: regForm.email, password: regForm.password});
    } catch (e) {
      console.error("Auth Offline:", e);
      setAuthError("Network Error: InsurGig AI Server is currently offline.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', fontFamily: '"Inter", sans-serif', backgroundColor: '#f8fafc' }}>
      {/* Left Blue Panel (Hidden on very small screens) */}
      <div style={{
        flex: 1,
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '60px 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: '800', marginBottom: '60px' }}>
            <div style={{ background: '#e0e7ff', color: '#2563eb', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div> 
            InsurGig <span style={{ fontWeight: '400', opacity: 0.9 }}>AI</span>
          </div>

          <h1 style={{ fontSize: '56px', fontWeight: '900', lineHeight: '1.1', marginBottom: '30px', maxWidth: '500px', letterSpacing: '-1px' }}>
            The Financial Safety Net for Gig Workers.
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0.9, maxWidth: '400px' }}>
            Instant parametric payouts, dynamically priced coverage, and AI-driven protection against daily operational risks.
          </p>
        </div>

        {/* Live System Activity Widget */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '24px',
          maxWidth: '450px',
          marginTop: '60px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
            <span>Live System Activity</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></div> Secure</span>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🌧️</div>
                <div>
                   <div style={{ fontWeight: '700', fontSize: '14px' }}>Auto-Claim Triggered</div>
                   <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Mumbai • Heavy Rain</div>
                </div>
             </div>
             <div style={{ color: '#4ade80', fontWeight: '800' }}>+₹1,450</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🚦</div>
                <div>
                   <div style={{ fontWeight: '700', fontSize: '14px' }}>Coverage Active</div>
                   <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Delhi • Urban Strike</div>
                </div>
             </div>
             <div style={{ color: 'white', fontWeight: '800' }}>Protected</div>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '40px' }}>
          © 2026 InsurGig AI Intelligence Network
        </div>
      </div>

      {/* Right White Form Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '460px',
          background: 'white',
          borderRadius: '32px',
          padding: '60px 50px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          
          {/* Form Header */}
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '40px' }}>
            {authMode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Join the platform as a new worker.'}
          </p>

          {/* Conditional Form Render */}
          {authMode === 'login' ? (
             <form onSubmit={(e) => { e.preventDefault(); handleAuthSubmit(); }}>
                <div style={{ marginBottom: '24px' }}>
                   <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Email Address</label>
                   <div style={{ position: 'relative' }}>
                     <svg style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                     <input type="email" value={authForm.email} onChange={(e) => setAuthForm({...authForm, email: e.target.value})} placeholder="email@example.com" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid transparent', background: '#f1f5f9', fontSize: '15px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} onFocus={(e) => e.target.style.border = '1px solid #3b82f6'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                   </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                   <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Password</label>
                   <div style={{ position: 'relative' }}>
                     <svg style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                     <input type="password" value={authForm.password} onChange={(e) => setAuthForm({...authForm, password: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid transparent', background: '#f1f5f9', fontSize: '15px', color: '#0f172a', outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} onFocus={(e) => e.target.style.border = '1px solid #3b82f6'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                   </div>
                   {authError && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', fontWeight: '500' }}>{authError}</div>}
                   {authSuccess && <div style={{ color: '#22c55e', fontSize: '13px', marginTop: '8px', fontWeight: '500' }}>{authSuccess}</div>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', fontSize: '13px', fontWeight: '600' }}>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }} defaultChecked /> Remember me
                   </label>
                   <div style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '700' }} onClick={() => setAuthMode('register')}>Create account</div>
                </div>

                <button type="submit" disabled={loading} style={{ width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s ease', opacity: loading ? 0.9 : 1 }}>
                    {loading ? 'Authenticating...' : 'Enter Dashboard →'}
                </button>
             </form>
          ) : (
             <form onSubmit={(e) => { e.preventDefault(); handleRegSubmit(); }}>
                <div style={{ marginBottom: '20px' }}>
                   <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Full Name</label>
                   <div style={{ position: 'relative' }}>
                     <svg style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     <input type="text" value={regForm.name} onChange={(e) => setRegForm({...regForm, name: e.target.value})} placeholder="John Doe" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid transparent', background: '#f1f5f9', fontSize: '15px', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.border = '1px solid #3b82f6'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                   </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                   <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Email Address</label>
                   <div style={{ position: 'relative' }}>
                     <svg style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                     <input type="email" value={regForm.email} onChange={(e) => setRegForm({...regForm, email: e.target.value})} placeholder="email@example.com" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid transparent', background: '#f1f5f9', fontSize: '15px', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.border = '1px solid #3b82f6'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                   </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                   <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Password</label>
                   <div style={{ position: 'relative' }}>
                     <svg style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                     <input type="password" value={regForm.password} onChange={(e) => setRegForm({...regForm, password: e.target.value})} placeholder="Create a password" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid transparent', background: '#f1f5f9', fontSize: '15px', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.border = '1px solid #3b82f6'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                   </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                   <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>City</label>
                   <div style={{ position: 'relative' }}>
                     <svg style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                     <input type="text" value={regForm.city} onChange={(e) => setRegForm({...regForm, city: e.target.value})} placeholder="e.g. Mumbai" style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid transparent', background: '#f1f5f9', fontSize: '15px', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }} onFocus={(e) => e.target.style.border = '1px solid #3b82f6'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
                   </div>
                </div>

                {authError && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', fontWeight: '500' }}>{authError}</div>}

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', fontSize: '13px', fontWeight: '600' }}>
                   <div style={{ color: '#64748b', cursor: 'pointer' }} onClick={() => setAuthMode('login')}>← Back to Login</div>
                </div>

                <button type="submit" disabled={loading} style={{ width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', opacity: loading ? 0.9 : 1 }}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
             </form>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0', gap: '15px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '1px', textTransform: 'uppercase' }}>OR CONTINUE WITH</div>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px'}}>
              <GoogleLogin
                  onSuccess={credentialResponse => {
                     const decodeJwt = (token) => {
                        try { return JSON.parse(atob(token.split('.')[1])); } catch (e) { return null; }
                     };
                     const userInfo = decodeJwt(credentialResponse.credential);
                     if (userInfo) {
                        setRole('worker');
                        setUserId(Math.floor(Math.random() * 1000));
                        setUserName(userInfo.name || 'Google User');
                        setSubscription(null);
                        setHonorScore(100.0);
                        setIsLoggedIn(true);
                        setCurrentView('dashboard');
                     }
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                  shape="pill"
                  width="320"
              />
          </div>

          <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '11px', color: '#94a3b8', lineHeight: '1.6' }}>
             By continuing, you agree to InsurGig AI's Terms of<br/>Service and Privacy Policy. Secure encrypted<br/>connection.
          </p>

        </div>
      </div>
    </div>
  )
}
