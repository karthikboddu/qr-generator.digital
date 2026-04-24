import React from 'react';
import Seo from '../components/Seo';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing Plans | AI-Powered QR Marketing Platform"
        description="Simple, transparent pricing for creators and businesses. Start generating dynamic, AI-designed QR codes for free. Upgrade for advanced analytics and features."
        path="/pricing"
      />
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px' }}>
        <div className="animate-fadeInUp relative z-10 max-w-5xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Transparent Pricing
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.03em' }}>
              Simple pricing for everyone
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', margin: '0 auto', maxWidth: '600px', lineHeight: 1.6 }}>
              Whether you are a creator generating your first QR code or a business running massive campaigns, we have a plan for you.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="dark-card" style={{ flex: '1 1 300px', padding: '40px', maxWidth: '400px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Free Tier</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Perfect for individuals and small projects.</p>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '32px' }}>$0<span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/mo</span></div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {['Unlimited Static QR Codes', '5 Dynamic QR Codes', 'Basic Scan Analytics', 'Standard Templates', 'Standard AI Styles'].map(feature => (
                  <li key={feature} style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-primary)' }}>
                    <Check size={18} color="#10b981" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Get Started</Link>
            </div>
            <div className="dark-card" style={{ flex: '1 1 300px', padding: '40px', maxWidth: '400px', border: '1px solid var(--accent-primary)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 'bold' }}>MOST POPULAR</div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Pro Plan</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Advanced features for growing businesses.</p>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '32px' }}>$19<span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/mo</span></div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {['Unlimited Dynamic QR Codes', 'Advanced Scan Analytics & Export', 'Custom Branded Domains', 'Premium Brand Templates', 'Bulk QR Generation (CSV)'].map(feature => (
                  <li key={feature} style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-primary)' }}>
                    <Check size={18} color="#6366f1" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Upgrade to Pro</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingPage;
