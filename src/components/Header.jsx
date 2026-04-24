import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { QrCode, LayoutDashboard, LogOut, User, LogIn, ChevronDown, Newspaper, Sparkles, Package, Zap, HelpCircle, Tag, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="header-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
            }}>
              <QrCode size={20} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '18px',
              color: '#f0f0f8',
              letterSpacing: '-0.02em',
            }}>
              QR Gen
              <span style={{ color: '#6366f1' }}>.digital</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {[
              { path: '/', label: 'Generator', icon: QrCode },
              { path: '/generator/dynamic-qr-generator', label: 'Dynamic', icon: Zap },
              { path: '/features', label: 'Features', icon: Star },
              { path: '/pricing', label: 'Pricing', icon: Tag },
              { path: '/templates', label: 'Templates', icon: LayoutDashboard },
              { path: '/bulk', label: 'Bulk', icon: Package },
              { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { path: '/blog', label: 'Blog', icon: Newspaper },
              // { path: '/faq', label: 'FAQ', icon: HelpCircle },
            ].map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: isActive(path) ? '#6366f1' : 'rgba(240, 240, 248, 0.6)',
                  background: isActive(path) ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive(path)) {
                    e.currentTarget.style.color = '#f0f0f8';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(path)) {
                    e.currentTarget.style.color = 'rgba(240, 240, 248, 0.6)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user ? (
              <>
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '13px',
                    color: 'rgba(240, 240, 248, 0.7)',
                  }}>
                    <User size={13} />
                    <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.name || user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost"
                    style={{ fontSize: '13px', padding: '7px 12px' }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex" style={{ alignItems: 'center', gap: '10px' }}>
                <Link to="/login"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: 500,
                    color: 'rgba(240, 240, 248, 0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#f0f0f8';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(240, 240, 248, 0.7)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <LogIn size={15} />
                  Log in
                </Link>
                <Link to="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                  <Sparkles size={14} />
                  Start free
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden btn-ghost"
              style={{ padding: '8px' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div style={{ width: 20, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ height: 2, background: '#f0f0f8', borderRadius: 2, transition: 'all 0.2s', transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
                <div style={{ height: 2, background: '#f0f0f8', borderRadius: 2, opacity: mobileOpen ? 0 : 1, transition: 'all 0.2s' }} />
                <div style={{ height: 2, background: '#f0f0f8', borderRadius: 2, transition: 'all 0.2s', transform: mobileOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(10, 10, 15, 0.98)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 24px 20px',
          animation: 'fadeInUp 0.2s ease-out',
        }}>
          {[
            { path: '/', label: 'Generator', icon: QrCode },
            { path: '/generator/dynamic-qr-generator', label: 'Dynamic', icon: Zap },
            { path: '/features', label: 'Features', icon: Star },
            { path: '/pricing', label: 'Pricing', icon: Tag },
            { path: '/templates', label: 'Templates', icon: LayoutDashboard },
            { path: '/bulk', label: 'Bulk', icon: Package },
            { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { path: '/blog', label: 'Blog', icon: Newspaper },
            { path: '/faq', label: 'FAQ', icon: HelpCircle },
          ].map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: '15px', fontWeight: 500,
                color: isActive(path) ? '#6366f1' : 'rgba(240,240,248,0.7)',
                textDecoration: 'none',
              }}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            {user ? (
              <button onClick={handleLogout} className="btn-secondary" style={{ flex: 1 }}>
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-secondary" style={{ flex: 1, textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
                <Link to="/register" className="btn-primary" style={{ flex: 1, textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
