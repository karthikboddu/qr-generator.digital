import React, { useRef, useEffect } from 'react';

function ContentTypeSelector({ selected, onSelect, activeTab, setActiveTab, qrTypes }) {
  const scrollRef = useRef(null);
  const activeTabRef = useRef(null);

  useEffect(() => {
    if (activeTabRef.current && scrollRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={scrollRef}
      className="content-type-scroll"
      style={{ 
        paddingBottom: '0', 
        marginBottom: '0',
        display: 'flex',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        gap: '2px',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 10px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {qrTypes.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={isActive ? activeTabRef : null}
            onClick={() => {
              setActiveTab(tab.id);
              onSelect(tab.id);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '14px 20px',
              border: 'none',
              borderBottom: isActive
                ? '3px solid #6366f1'
                : '3px solid transparent',
              background: 'transparent',
              color: isActive ? '#6366f1' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              borderRadius: '0',
              flexShrink: 0,
              outline: 'none',
              minWidth: '80px',
              position: 'relative'
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
            onFocus={e => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
            }}
            onBlur={e => {
              if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={{ 
              opacity: isActive ? 1 : 0.6, 
              fontSize: '20px', 
              lineHeight: 1,
              transform: isActive ? 'translateY(-2px) scale(1.1)' : 'translateY(0) scale(1)',
              transition: 'all 0.3s ease',
              marginBottom: '2px'
            }}>
              {tab.icon}
            </span>
            <span style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              fontSize: '9px',
              opacity: isActive ? 1 : 0.7,
              fontWeight: isActive ? 800 : 600
            }}>
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ContentTypeSelector;
