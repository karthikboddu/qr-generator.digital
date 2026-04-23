import React from 'react';
import { ChevronRight, ChevronLeft, Layout } from 'lucide-react';

const templates = [
  { id: 't1', label: 'Classic Blue', foreground: '#1e3a8a', background: '#ffffff', cornerStyle: 'square' },
  { id: 't2', label: 'Neon Green', foreground: '#22c55e', background: '#0f172a', cornerStyle: 'rounded' },
  { id: 't3', label: 'Royal Purple', foreground: '#7c3aed', background: '#faf5ff', cornerStyle: 'rounded' },
  { id: 't4', label: 'Luxury Gold', foreground: '#b45309', background: '#fffbeb', cornerStyle: 'rounded' },
  { id: 't5', label: 'Soft Pink', foreground: '#db2777', background: '#fdf2f8', cornerStyle: 'rounded' },
  { id: 't6', label: 'Midnight', foreground: '#f8fafc', background: '#0f172a', cornerStyle: 'square' },
  { id: 't7', label: 'Ocean Breeze', foreground: '#0891b2', background: '#ecfeff', cornerStyle: 'rounded' },
  { id: 't8', label: 'Sunset', foreground: '#ea580c', background: '#fff7ed', cornerStyle: 'rounded' },
];

function TemplateSelector({ currentSettings, onSelect }) {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', marginTop: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layout size={15} color="var(--accent-primary)" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Quick Templates</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            onClick={() => scroll('left')}
            className="btn-ghost" 
            style={{ padding: '4px', borderRadius: '6px' }}
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="btn-ghost" 
            style={{ padding: '4px', borderRadius: '6px' }}
          >
            <ChevronRight size={14} />
          </button>
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
              onClick={() => onSelect(t)}
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
                  opacity: 0.8
                }} />
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
  );
}

export default TemplateSelector;
