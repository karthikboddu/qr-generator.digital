import React from 'react';
import { Sparkles, Heart, Zap } from 'lucide-react';
import Seo from '../components/Seo';
import { useNavigate } from 'react-router-dom';

const inspirationItems = [
  { 
    id: 1, 
    title: 'Luxury Restaurant Menu', 
    category: 'Hospitality', 
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60', 
    likes: 124,
    type: 'menu',
    customization: { foreground: '#4338ca', background: '#ffffff', cornerStyle: 'dot' }
  },
  { 
    id: 2, 
    title: 'Minimalist Instagram Bio', 
    category: 'Social', 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60', 
    likes: 89,
    type: 'social-hub',
    customization: { foreground: '#be185d', background: '#fdf2f8', cornerStyle: 'extra-rounded' }
  },
  { 
    id: 3, 
    title: 'Professional Tech vCard', 
    category: 'Business', 
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60', 
    likes: 56,
    type: 'vcard',
    customization: { foreground: '#0f172a', background: '#f8fafc', cornerStyle: 'square' }
  },
  { 
    id: 4, 
    title: 'Wedding RSVP QR', 
    category: 'Events', 
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60', 
    likes: 210,
    type: 'event',
    customization: { foreground: '#b45309', background: '#fffbeb', cornerStyle: 'dot' }
  },
  { 
    id: 5, 
    title: 'Industrial Design Portfolio', 
    category: 'Business', 
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60', 
    likes: 45,
    type: 'url',
    customization: { foreground: '#1e293b', background: '#ffffff', cornerStyle: 'square' }
  },
  { 
    id: 6, 
    title: 'Neo-Tokyo Nightclub Hub', 
    category: 'Social', 
    image: 'https://images.unsplash.com/photo-1514525253361-bee8a48790c3?w=800&auto=format&fit=crop&q=60', 
    likes: 167,
    type: 'dynamic',
    customization: { foreground: '#7e22ce', background: '#faf5ff', cornerStyle: 'extra-rounded' }
  },
];

function InspirationGallery() {
  const navigate = useNavigate();

  const handleUseTemplate = (item) => {
    const route = item.type === 'url' ? '/' : `/generator/${item.type}-qr-code-generator`;
    navigate(route, { state: { initialCustomization: item.customization } });
  };

  return (
    <>
      <Seo 
        title="QR Code Design Inspiration Gallery"
        description="Browse the world's most beautiful and effective QR code designs. Get inspired for your next restaurant menu, wedding, or marketing campaign."
        path="/inspiration"
      />
      
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px' }}>
        <div className="animate-fadeInUp relative z-10 max-w-7xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Inspiration Hub
            </div>
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', 
              color: 'var(--text-primary)', margin: '0 0 20px', letterSpacing: '-0.04em'
            }}>
              QR <span className="gradient-text">Design Gallery</span>
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto',
              lineHeight: 1.6
            }}>
              Discover premium QR code designs from our community. From minimalist vCards to vibrant social hubs and luxury menus.
            </p>
          </div>

          {/* Pinterest-style Grid */}
          <div style={{ 
            columns: '3 300px', 
            columnGap: '24px',
          }}>
            {inspirationItems.map((item, i) => (
              <div 
                key={item.id} 
                className="dark-card animate-fadeInUp group"
                style={{ 
                  breakInside: 'avoid',
                  marginBottom: '24px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${i * 0.1}s`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default'
                }}
              >
                <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s ease' }}
                    className="group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleUseTemplate(item)}
                      className="btn-primary" 
                      style={{ padding: '10px 20px', fontSize: '14px' }}
                    >
                      <Zap size={14} />
                      Use Template
                    </button>
                  </div>
                </div>
                
                <div style={{ padding: '0 8px 8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      <Heart size={12} />
                      {item.likes}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Outfit', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <button className="btn-secondary">
              Load More Inspiration
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InspirationGallery;
