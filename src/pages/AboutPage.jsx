import React from 'react';
import Seo from '../components/Seo';
import { Target, Zap, ShieldCheck, Sparkles, Award, Users, Rocket } from 'lucide-react';

function AboutPage() {
  return (
    <>
      <Seo
        title="About QR Gen"
        description="Learn about QR Gen, our privacy-first QR code generator, and how we help people create custom QR codes online for free."
        path="/about"
      />
      
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: '100%', padding: '60px 20px' }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="animate-fadeInUp relative z-10 max-w-5xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Our Mission
            </div>
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 56px)', 
              color: 'var(--text-primary)', margin: '0 0 20px', letterSpacing: '-0.04em', lineHeight: 1.1
            }}>
              The bridge between <br />
              <span className="gradient-text">Physical & Digital</span>
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto',
              lineHeight: 1.6
            }}>
              We provide the simplest, most powerful, and privacy-respecting QR code tool on the web, helping you connect with your audience anywhere.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
            {[
              { 
                icon: Target, 
                title: "Powerful & Free", 
                desc: "Create high-quality, custom QR codes for any purpose, completely free of charge.",
                color: "var(--accent-primary)"
              },
              { 
                icon: Zap, 
                title: "Blazing Fast", 
                desc: "Generated instantly in your browser. No server-side processing means zero waiting time.",
                color: "#f59e0b"
              },
              { 
                icon: ShieldCheck, 
                title: "Privacy First", 
                desc: "Your data never leaves your device. We don't track, store, or see your content.",
                color: "#10b981"
              }
            ].map((feature, i) => (
              <div key={i} className="dark-card" style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                  width: 56, height: 56, borderRadius: '16px', 
                  background: 'rgba(255,255,255,0.03)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px', color: feature.color, border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <feature.icon size={28} />
                </div>
                <h3 style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div className="dark-card" style={{ padding: '40px', background: 'rgba(22, 22, 31, 0.6)', backdropFilter: 'blur(10px)' }}>
              <h2 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                Why QR Gen?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                  In a digital-first world, QR codes are the essential link. We saw a need for a tool that was powerful, respected privacy, and was incredibly easy to use. 
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                  Whether you're a small business owner, a marketer, or just sharing contact info, our tool is designed for you. With support for URLs, WiFi, vCards, and more, you have everything you need.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: Award, title: "Industry Standard", desc: "Using high error correction for maximum scannability." },
                { icon: Users, title: "User Centric", desc: "Built based on feedback from thousands of daily users." },
                { icon: Rocket, title: "Constant Growth", desc: "Regularly adding new features and customization options." }
              ].map((item, i) => (
                <div key={i} className="dark-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
