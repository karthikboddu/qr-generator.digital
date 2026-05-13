import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, QrCode, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Login"
        description="Sign in to your QR Gen account to manage saved QR codes and shared links."
        path="/login"
        robots="noindex,nofollow"
      />
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="animate-fadeInUp relative z-10 w-full" style={{ maxWidth: '440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Welcome back
            </div>

            <div style={{
              width: 64, height: 64,
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              borderRadius: '20px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-glow)',
            }}>
              <QrCode size={32} color="#fff" />
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '32px', color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Account Login
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
              Access your QR Gen workspace
            </p>
          </div>

          <div className="dark-card" style={{ padding: '40px', background: 'rgba(22, 22, 31, 0.8)', backdropFilter: 'blur(10px)' }}>
            {error && (
              <div style={{
                marginBottom: '24px', padding: '14px 18px',
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                color: '#f87171', fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171' }} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Password</label>
                  <Link to="/contact" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>Forgot?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', height: '52px', fontSize: '15px', marginTop: '8px' }}
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
              Don&apos;t have an account?{' '}
              <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-secondary)'} onMouseLeave={e => e.target.style.color = 'var(--accent-primary)'}>
                Create one
              </Link>
            </div>
          </div>
          
          <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Need help? <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Contact Support</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
