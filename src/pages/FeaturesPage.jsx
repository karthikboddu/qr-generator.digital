import React from 'react';
import Seo from '../components/Seo';
import PlatformShowcase from '../components/PlatformShowcase';
import { Sparkles } from 'lucide-react';

function FeaturesPage() {
  return (
    <>
      <Seo
        title="Features | AI-Powered QR Marketing Platform"
        description="Explore the powerful features of QR Gen. From dynamic AI-styled QR codes and real-time scan analytics to bulk generation and branded social hubs."
        path="/features"
      />
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px 0' }}>
        <div className="animate-fadeInUp relative z-10 max-w-5xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Platform Features
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.03em' }}>
              Everything you need to grow
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', margin: '0 auto', maxWidth: '600px', lineHeight: 1.6 }}>
              Discover the tools that turn standard QR codes into measurable, highly converting marketing campaigns.
            </p>
          </div>
        </div>
        <div style={{ paddingBottom: '60px' }}>
          <PlatformShowcase />
        </div>
      </div>
    </>
  );
}

export default FeaturesPage;
