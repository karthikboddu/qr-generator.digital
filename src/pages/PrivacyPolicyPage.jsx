import React from 'react';
import Seo from '../components/Seo';
import { ShieldCheck, Lock, FileText, Sparkles } from 'lucide-react';

function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the QR Gen privacy policy to understand how QR code data, uploaded logos, analytics, and local browser storage are handled."
        path="/privacy-policy"
      />
      
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: '100%', padding: '60px 20px' }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="animate-fadeInUp relative z-10 max-w-4xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <ShieldCheck size={10} />
              Privacy First
            </div>
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', 
              color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.03em' 
            }}>
              Privacy Policy
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', fontSize: '15px', margin: '0 auto'
            }}>
              Last updated: April 23, 2026
            </p>
          </div>

          <div className="dark-card" style={{ padding: '48px', background: 'rgba(22, 22, 31, 0.7)', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Lock size={20} color="var(--accent-primary)" />
                  <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    1. Our Commitment
                  </h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                  Welcome to QR Gen. We are committed to protecting your privacy. This Privacy Policy explains our stance on data collection and usage. Our core principle is simple: **your data is your own**.
                </p>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <ShieldCheck size={20} color="#10b981" />
                  <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    2. Data Collection and Usage
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>We do not collect, store, or transmit any personal data you enter to create QR codes.</strong>
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    All data processing required to generate the QR code happens entirely within your web browser on your device (client-side). The information you input into the fields (such as URLs, text, contact information, etc.) is never sent to our servers or any third party.
                  </p>
                </div>
              </section>

              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  2.1. Uploaded Logos
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  When you upload a logo to embed in your QR code, the image file is processed directly in your browser. It is not uploaded to our servers, and we do not store or see the images you use.
                </p>
              </div>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Sparkles size={20} color="var(--accent-secondary)" />
                  <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    3. Website Analytics
                  </h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                  We may use privacy-friendly analytics tools to collect anonymous usage data about our website. This data helps us understand how users interact with the site, which features are popular, and how we can improve our service. This data is always aggregated and does not contain any personally identifiable information.
                </p>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FileText size={20} color="var(--accent-primary)" />
                  <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    4. Cookies and Local Storage
                  </h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                  Our website does not use cookies for tracking or advertising purposes. We may use your browser's local storage to save your preferences (like color choices) for a better user experience. This information is stored only on your device and is not accessible by us.
                </p>
              </section>

              <div style={{ marginTop: '20px', paddingTop: '32px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                  We may update this Privacy Policy from time to time. You are advised to review this page periodically for any changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
