import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ChevronLeft, Layout, Facebook, Instagram, Twitter, Youtube, MessageCircle, Linkedin, Music, Ghost, Pin, Send, MessageSquare, Twitch, Github, Dribbble, Figma, Slack, Bitcoin, Apple, Chrome, Trello, Gitlab, X } from 'lucide-react';

const createBrandIconSvg = (color, paths) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const templates = [
  { id: 'b1', label: 'Facebook', foreground: '#1877F2', background: '#ffffff', cornerStyle: 'square', Icon: Facebook, paths: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { id: 'b2', label: 'Instagram', foreground: '#E1306C', background: '#ffffff', cornerStyle: 'rounded', Icon: Instagram, paths: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>' },
  { id: 'b3', label: 'Twitter / X', foreground: '#000000', background: '#ffffff', cornerStyle: 'square', Icon: Twitter, paths: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>' },
  { id: 'b4', label: 'YouTube', foreground: '#FF0000', background: '#ffffff', cornerStyle: 'rounded', Icon: Youtube, paths: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>' },
  { id: 'b5', label: 'WhatsApp', foreground: '#25D366', background: '#ffffff', cornerStyle: 'rounded', Icon: MessageCircle, paths: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>' },
  { id: 'b6', label: 'LinkedIn', foreground: '#0A66C2', background: '#ffffff', cornerStyle: 'square', Icon: Linkedin, paths: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>' },
  { id: 'b7', label: 'TikTok', foreground: '#000000', background: '#69C9D0', cornerStyle: 'rounded', Icon: Music, paths: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' },
  { id: 'b8', label: 'Spotify', foreground: '#1DB954', background: '#191414', cornerStyle: 'rounded', Icon: Music, paths: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>' },
  { id: 'b9', label: 'Snapchat', foreground: '#FFFC00', background: '#000000', cornerStyle: 'rounded', Icon: Ghost, paths: '<path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>' },
  { id: 'b10', label: 'Pinterest', foreground: '#E60023', background: '#ffffff', cornerStyle: 'rounded', Icon: Pin, paths: '<line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>' },
  { id: 'b11', label: 'Telegram', foreground: '#0088cc', background: '#ffffff', cornerStyle: 'rounded', Icon: Send, paths: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>' },
  { id: 'b12', label: 'Reddit', foreground: '#FF4500', background: '#ffffff', cornerStyle: 'rounded', Icon: MessageSquare, paths: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
  { id: 'b13', label: 'Twitch', foreground: '#9146FF', background: '#ffffff', cornerStyle: 'rounded', Icon: Twitch, paths: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>' },
  { id: 'b14', label: 'GitHub', foreground: '#24292e', background: '#ffffff', cornerStyle: 'square', Icon: Github, paths: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 5.2 5.2 0 0 0 .1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.2 5.2 0 0 0 .1 3.8A5.2 5.2 0 0 0 3 11c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"/><path d="M9 19c-5 1.5-5-2.5-7-3"/>' },
  { id: 'b15', label: 'Figma', foreground: '#F24E1E', background: '#ffffff', cornerStyle: 'rounded', Icon: Figma, paths: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>' },
  { id: 'b16', label: 'Slack', foreground: '#E01E5A', background: '#ffffff', cornerStyle: 'square', Icon: Slack, paths: '<rect width="3" height="8" x="13" y="2" rx="1.5"/><path d="M19 8.5v1a1.5 1.5 0 0 1-3 0v-1a1.5 1.5 0 0 1 3 0z"/><rect width="3" height="8" x="8" y="14" rx="1.5"/><path d="M5 15.5v-1a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1-3 0z"/><rect width="8" height="3" x="14" y="13" rx="1.5"/><path d="M15.5 19h-1a1.5 1.5 0 0 1 0-3h1a1.5 1.5 0 0 1 0 3z"/><rect width="8" height="3" x="2" y="8" rx="1.5"/><path d="M8.5 5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1 0-3z"/>' },
  { id: 'b17', label: 'Dribbble', foreground: '#EA4C89', background: '#ffffff', cornerStyle: 'rounded', Icon: Dribbble, paths: '<circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/>' },
  { id: 'b18', label: 'Bitcoin', foreground: '#F7931A', background: '#ffffff', cornerStyle: 'rounded', Icon: Bitcoin, paths: '<path d="M11.3 5.3c-1.5-.5-3.3.4-3.8 1.9"/><path d="M13 5.8c-1.5-.5-3.3.4-3.8 1.9"/><path d="M9.5 7.7h6"/><path d="M8.5 11.5h7"/><path d="M7 16h8c1.5 0 2.8-1 3.2-2.5s-.6-3.2-2-3.6c1.3-.3 2.1-1.6 1.8-2.9-.3-1.3-1.6-2.1-2.9-1.8H7v11z"/><path d="M10 3v2"/><path d="M13 3v2"/><path d="M10 17v2"/><path d="M13 17v2"/>' },
  { id: 'b19', label: 'Apple', foreground: '#000000', background: '#f5f5f7', cornerStyle: 'rounded', Icon: Apple, paths: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>' },
  { id: 'b20', label: 'Chrome', foreground: '#4285F4', background: '#ffffff', cornerStyle: 'rounded', Icon: Chrome, paths: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/>' },
  { id: 'b21', label: 'Trello', foreground: '#0052CC', background: '#ffffff', cornerStyle: 'rounded', Icon: Trello, paths: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><rect width="3" height="9" x="7" y="7"/><rect width="3" height="5" x="14" y="7"/>' },
  { id: 'b22', label: 'GitLab', foreground: '#FC6D26', background: '#ffffff', cornerStyle: 'square', Icon: Gitlab, paths: '<path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"/>' },
];

function TemplateModal({ isOpen, onClose, currentSettings, onSelect }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0f172a] z-10 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layout className="text-indigo-400" size={20} />
              All Brand QR Code Templates
            </h2>
            <p className="text-sm text-gray-400 mt-1">Select a popular brand to instantly generate a custom social media QR code with its official colors and logo.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(85vh - 85px)' }}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {templates.map((t) => {
              const isSelected = currentSettings.foreground === t.foreground && 
                                currentSettings.background === t.background &&
                                currentSettings.cornerStyle === t.cornerStyle;
              
              return (
                <button
                  key={t.id}
                  title={`Generate ${t.label} QR Code`}
                  aria-label={`Create a custom ${t.label} QR code template`}
                  onClick={() => {
                    let logoDataURL = null;
                    if (t.paths) {
                      const iconColor = t.background !== '#ffffff' ? '#ffffff' : t.foreground;
                      logoDataURL = createBrandIconSvg(iconColor, t.paths);
                    }
                    onSelect({ ...t, logoDataURL });
                    onClose();
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all hover:scale-105 ${
                    isSelected 
                      ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg border border-black/10 relative overflow-hidden flex items-center justify-center shadow-inner" style={{ background: t.background }}>
                    <div 
                      className="w-[60%] h-[60%] opacity-80 flex items-center justify-center"
                      style={{ 
                        background: t.foreground, 
                        borderRadius: t.cornerStyle === 'rounded' ? '6px' : '0px' 
                      }}
                    >
                      {t.Icon && <t.Icon size={24} color={t.background !== '#ffffff' ? '#ffffff' : '#ffffff'} />}
                    </div>
                    {/* Simulated dots */}
                    <div className="absolute top-[10%] left-[10%] w-1 h-1" style={{ background: t.foreground, borderRadius: t.cornerStyle === 'rounded' ? '2px' : '0' }} />
                    <div className="absolute top-[10%] right-[10%] w-1 h-1" style={{ background: t.foreground, borderRadius: t.cornerStyle === 'rounded' ? '2px' : '0' }} />
                    <div className="absolute bottom-[10%] left-[10%] w-1 h-1" style={{ background: t.foreground, borderRadius: t.cornerStyle === 'rounded' ? '2px' : '0' }} />
                  </div>
                  <span className={`text-xs font-medium w-full text-center truncate ${isSelected ? 'text-indigo-400' : 'text-gray-300'}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function TemplateSelector({ currentSettings, onSelect }) {
  const scrollRef = React.useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ position: 'relative', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layout size={15} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Popular Brand Templates</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              aria-label="View all popular brand QR code templates"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-1 rounded-md border border-indigo-500/20"
            >
              View All ({templates.length})
            </button>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="btn-ghost" 
                style={{ padding: '4px', borderRadius: '6px' }}
              >
                <ChevronLeft size={14} />
              </button>
              <button 
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="btn-ghost" 
                style={{ padding: '4px', borderRadius: '6px' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          style={{ 
            display: 'flex', 
            gap: '10px', 
            overflowX: 'auto', 
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="no-scrollbar"
        >
          {templates.map((t) => {
            const isSelected = currentSettings.foreground === t.foreground && 
                              currentSettings.background === t.background &&
                              currentSettings.cornerStyle === t.cornerStyle;
            
            return (
              <button
                key={t.id}
                title={`Generate ${t.label} QR Code`}
                aria-label={`Create ${t.label} QR code`}
                onClick={() => {
                  let logoDataURL = null;
                  if (t.paths) {
                    const iconColor = t.background !== '#ffffff' ? '#ffffff' : t.foreground;
                    logoDataURL = createBrandIconSvg(iconColor, t.paths);
                  }
                  onSelect({ ...t, logoDataURL });
                }}
                style={{
                  flexShrink: 0,
                  width: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '1', 
                  borderRadius: '8px',
                  background: t.background,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '60%', 
                    height: '60%', 
                    background: t.foreground,
                    borderRadius: t.cornerStyle === 'rounded' ? '4px' : '0px',
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {t.Icon && <t.Icon size={18} color={t.background !== '#ffffff' ? '#ffffff' : '#ffffff'} />}
                  </div>
                  {/* Simulated dots */}
                  <div style={{ position: 'absolute', top: '10%', left: '10%', width: '4px', height: '4px', background: t.foreground, borderRadius: t.cornerStyle === 'rounded' ? '1px' : '0' }} />
                  <div style={{ position: 'absolute', top: '10%', right: '10%', width: '4px', height: '4px', background: t.foreground, borderRadius: t.cornerStyle === 'rounded' ? '1px' : '0' }} />
                  <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '4px', height: '4px', background: t.foreground, borderRadius: t.cornerStyle === 'rounded' ? '1px' : '0' }} />
                </div>
                <span style={{ 
                  fontSize: '10px', 
                  color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: isSelected ? 600 : 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <TemplateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentSettings={currentSettings} 
        onSelect={onSelect} 
      />
    </>
  );
}

export default TemplateSelector;
