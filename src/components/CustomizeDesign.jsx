import React, { useState } from 'react';
import { Image, ChevronRight, ChevronDown, Square, Circle, Palette, FrameIcon, Upload, Trash2, AlignCenter } from 'lucide-react';
import TemplateSelector from './TemplateSelector';

function AccordionSection({ icon, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: 'var(--text-secondary)', display: 'flex' }}>{icon}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
            {title}
          </span>
        </div>
        <span style={{
          color: 'var(--text-muted)',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(90deg)' : 'none',
          display: 'flex',
        }}>
          <ChevronRight size={16} />
        </span>
      </button>
      {open && (
        <div className="accordion-content" style={{ animation: 'fadeInUp 0.2s ease-out' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function ColorSwatch({ label, value, onChange }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <div
        className="color-swatch"
        style={{ background: value }}
        title={`Current color: ${value}`}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div style={{
          position: 'absolute', bottom: 4, right: 6,
          fontSize: '10px', fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.7)',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 4,
          padding: '1px 5px',
          backdropFilter: 'blur(4px)',
        }}>
          {value.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

function CustomizeDesign({ customization, onChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ ...customization, logoFile: file, logoDataURL: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...customization, logoFile: null, logoDataURL: null });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      
      <div style={{ padding: '4px 4px 16px' }}>
        <TemplateSelector 
          currentSettings={customization} 
          onSelect={(t) => onChange({ 
            ...customization, 
            foreground: t.foreground, 
            background: t.background, 
            cornerStyle: t.cornerStyle,
            ...(t.logoDataURL ? { logoDataURL: t.logoDataURL, logoFile: null } : {})
          })} 
        />
      </div>

      {/* Logo & Text */}
      <AccordionSection icon={<Image size={15} />} title="Logo & Text" defaultOpen>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Logo upload */}
          <div>
            <label className="form-label">Logo / Icon</label>
            {customization.logoDataURL ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={customization.logoDataURL} alt="Logo" className="logo-preview" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Logo applied</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <label htmlFor="logo-upload-change" style={{ cursor: 'pointer' }}>
                      <span className="btn-secondary" style={{ fontSize: '12px', padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Upload size={11} /> Change
                      </span>
                    </label>
                    <button onClick={removeLogo} className="btn-ghost" style={{ fontSize: '12px', padding: '5px 10px', color: '#ef4444' }}>
                      <Trash2 size={11} /> Remove
                    </button>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="logo-upload-change" />
                </div>
              </div>
            ) : (
              <label htmlFor="logo-upload" className="upload-zone" style={{ display: 'block' }}>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="logo-upload" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Upload size={18} color="#6366f1" />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                      <span style={{ color: '#6366f1', fontWeight: 600 }}>Click to upload</span> or drag and drop
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '3px 0 0' }}>PNG, JPG, SVG up to 1MB</p>
                  </div>
                </div>
              </label>
            )}
          </div>

          {/* Frame text */}
          <div>
            <label className="form-label">Frame Text</label>
            <input
              type="text"
              placeholder="e.g. SCAN ME"
              value={customization.frameText}
              onChange={(e) => onChange({ ...customization, frameText: e.target.value })}
              className="dark-input"
            />
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
              Add a label below your QR code
            </p>
          </div>
        </div>
      </AccordionSection>

      {/* Body Shape */}
      <AccordionSection icon={<Square size={15} />} title="Body Shape">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label className="form-label">Corner Style</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { value: 'square', label: 'Square', icon: <Square size={18} /> },
              { value: 'rounded', label: 'Rounded', icon: <Circle size={18} /> },
            ].map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => onChange({ ...customization, cornerStyle: value })}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 14px', borderRadius: '8px',
                  border: customization.cornerStyle === value
                    ? '1px solid rgba(99, 102, 241, 0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: customization.cornerStyle === value
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'transparent',
                  color: customization.cornerStyle === value ? '#6366f1' : 'var(--text-secondary)',
                  fontSize: '13px', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </AccordionSection>

      {/* Foreground */}
      <AccordionSection icon={<Palette size={15} />} title="Foreground">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <ColorSwatch
            label="QR Code Color"
            value={customization.foreground}
            onChange={(val) => onChange({ ...customization, foreground: val })}
          />
          <div>
            <label className="form-label">Quick Presets</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['#1e3a8a', '#6366f1', '#7c3aed', '#0f172a', '#059669', '#dc2626', '#d97706', '#0891b2'].map(color => (
                <button
                  key={color}
                  onClick={() => onChange({ ...customization, foreground: color })}
                  title={color}
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: color, border: 'none', cursor: 'pointer',
                    boxShadow: customization.foreground === color ? `0 0 0 2px rgba(255,255,255,0.2), 0 0 0 4px ${color}` : 'none',
                    transition: 'all 0.15s',
                    transform: customization.foreground === color ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Background */}
      <AccordionSection icon={<Palette size={15} />} title="Background">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <ColorSwatch
            label="Background Color"
            value={customization.background}
            onChange={(val) => onChange({ ...customization, background: val })}
          />
          <div>
            <label className="form-label">Quick Presets</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['#ffffff', '#f8fafc', '#fef3c7', '#ecfdf5', '#eff6ff', '#fdf2f8', '#0f172a', '#18181b'].map(color => (
                <button
                  key={color}
                  onClick={() => onChange({ ...customization, background: color })}
                  title={color}
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: color, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                    boxShadow: customization.background === color ? `0 0 0 2px rgba(255,255,255,0.3), 0 0 0 4px rgba(255,255,255,0.1)` : 'none',
                    transition: 'all 0.15s',
                    transform: customization.background === color ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </AccordionSection>

    </div>
  );
}

export default CustomizeDesign;
