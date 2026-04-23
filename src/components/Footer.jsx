import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 24px 32px',
      marginTop: '64px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      textAlign: 'center',
      background: 'var(--bg-primary)',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: 28, height: 28,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={14} color="#fff" />
        </div>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px', color: '#f0f0f8' }}>
          QR Generator<span style={{ color: '#6366f1' }}>.digital</span>
        </span>
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { to: '/templates', label: 'Templates' },
          { to: '/about', label: 'About' },
          { to: '/faq', label: 'FAQ' },
          { to: '/contact', label: 'Contact' },
          { to: '/privacy-policy', label: 'Privacy' },
          { to: '/blog', label: 'Blog' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f0f0f8'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {label}
          </Link>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
        © 2026 QR Generator.digital — All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
