import React from 'react';

function ContentTypeSelector({ selected, onSelect, activeTab, setActiveTab, qrTypes }) {
  return (
    <div
      className="content-type-scroll"
      style={{ paddingBottom: '0', marginBottom: '0' }}
    >
      {qrTypes.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onSelect(tab.id);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              padding: '10px 14px',
              border: 'none',
              borderBottom: isActive
                ? '2px solid #6366f1'
                : '2px solid transparent',
              background: 'transparent',
              color: isActive ? '#6366f1' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              borderRadius: '0',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <span style={{ opacity: isActive ? 1 : 0.7, fontSize: '16px', lineHeight: 1 }}>
              {tab.icon}
            </span>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '10px' }}>
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ContentTypeSelector;
