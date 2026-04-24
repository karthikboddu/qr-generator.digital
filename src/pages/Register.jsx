import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, QrCode, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      setSuccessMessage('Registration successful! Please check your email inbox to verify your account before logging in.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Register"
        description="Create a QR Gen account to save QR codes, track scans, and manage shared links."
        path="/register"
        robots="noindex,nofollow"
      />
      
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '0', right: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="animate-fadeInUp relative z-10 w-full" style={{ maxWidth: '460px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Join the ecosystem
            </div>
            
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
              width: '64px', height: '64px', 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              borderRadius: '20px', marginBottom: '20px',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <QrCode size={32} color="#fff" />
            </div>
            
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '32px', 
              color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' 
            }}>
              Create Account
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Start generating and tracking QR codes today
            </p>
          </div>

          <div className="dark-card" style={{ padding: '40px', background: 'rgba(22, 22, 31, 0.8)', backdropFilter: 'blur(10px)' }}>
            {error && (
              <div style={{ 
                marginBottom: '24px', padding: '14px 18px', 
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#f87171', borderRadius: '12px', fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171' }} />
                {error}
              </div>
            )}
            
            {successMessage && (
              <div style={{ 
                marginBottom: '24px', padding: '14px 18px', 
                background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#34d399', borderRadius: '12px', fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="dark-input"
                    style={{ paddingLeft: '48px', height: '50px' }}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="dark-input"
                    style={{ paddingLeft: '48px', height: '50px' }}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="dark-input"
                    style={{ paddingLeft: '48px', height: '50px' }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="form-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="dark-input"
                    style={{ paddingLeft: '48px', height: '50px' }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', height: '52px', fontSize: '15px', marginTop: '8px' }}
              >
                <span>{loading ? 'Creating account...' : 'Create Account'}</span>
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-secondary)'} onMouseLeave={e => e.target.style.color = 'var(--accent-primary)'}>
                Sign in
              </Link>
            </div>
          </div>
          
          <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            By creating an account, you agree to our <br />
            <Link to="/privacy-policy" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Terms of Service</Link> and <Link to="/privacy-policy" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
