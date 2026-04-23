import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  MapPin,
  Pause,
  Smartphone,
  UserCircle,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { createDynamicQR } from '../lib/dynamicQR';

const normalizeUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {hint && <p style={{ color: 'var(--text-muted)', fontSize: 11, margin: '6px 0 0' }}>{hint}</p>}
    </div>
  );
}

function FeaturePill({ icon: Icon, title, detail }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: 12,
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: 'rgba(99,102,241,0.13)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={15} color="#818cf8" />
      </div>
      <div>
        <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>{title}</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.5, margin: '3px 0 0' }}>{detail}</p>
      </div>
    </div>
  );
}

function DynamicQRCreator({ customization, onQrValueChange }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('Spring Campaign QR');
  const [destinationUrl, setDestinationUrl] = useState('https://example.com/spring-offer');
  const [expiresAt, setExpiresAt] = useState('');
  const [accessPassword, setAccessPassword] = useState('');
  const [mobileUrl, setMobileUrl] = useState('');
  const [desktopUrl, setDesktopUrl] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [countryUrl, setCountryUrl] = useState('');
  const [createdQR, setCreatedQR] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [isPdfMode, setIsPdfMode] = useState(false);
  const [leadCaptureEnabled, setLeadCaptureEnabled] = useState(false);
  const [leadCaptureTitle, setLeadCaptureTitle] = useState('Contact Information');
  const [leadCaptureMessage, setLeadCaptureMessage] = useState('Please fill out the form to continue.');

  const createdUrl = createdQR ? `${window.location.origin}/r/${createdQR.short_id}` : '';

  const redirectRules = useMemo(() => {
    const rules = {};
    const normalizedMobile = normalizeUrl(mobileUrl);
    const normalizedDesktop = normalizeUrl(desktopUrl);
    const normalizedCountry = normalizeUrl(countryUrl);

    if (normalizedMobile || normalizedDesktop) {
      rules.device = {
        mobile: normalizedMobile || null,
        desktop: normalizedDesktop || null,
      };
    }

    if (normalizedCountry && countryCode.trim()) {
      rules.geo = {
        country: countryCode.trim().toUpperCase(),
        url: normalizedCountry,
      };
    }

    return rules;
  }, [countryCode, countryUrl, desktopUrl, mobileUrl]);

  const handleCreate = async () => {
    setError('');

    if (!user) {
      setError('Please sign in to create editable and trackable QR codes.');
      return;
    }

    let finalUrl = destinationUrl;

    if (isPdfMode) {
      if (!pdfFile) {
        setError('Please select a PDF file to upload.');
        return;
      }
      setSaving(true);
      try {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('pdfs')
          .upload(fileName, pdfFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('pdfs').getPublicUrl(fileName);
        finalUrl = publicUrlData.publicUrl;
      } catch (err) {
        console.error('PDF upload error:', err);
        setError('Failed to upload PDF. Please try again.');
        setSaving(false);
        return;
      }
    }

    const normalizedDestination = isPdfMode ? finalUrl : normalizeUrl(finalUrl);
    if (!normalizedDestination) {
      setError('Add a destination URL or upload a PDF before creating the dynamic QR.');
      return;
    }

    setSaving(true);
    try {
      const qr = await createDynamicQR({
        userId: user.id,
        title: title.trim() || (isPdfMode ? 'PDF Menu' : 'Untitled dynamic QR'),
        destinationUrl: normalizedDestination,
        customization,
        qrType: isPdfMode ? 'menu' : 'url',
        expiresAt: expiresAt || null,
        accessPassword: accessPassword.trim(),
        redirectRules,
        leadCaptureEnabled,
        leadCaptureTitle: leadCaptureTitle.trim(),
        leadCaptureMessage: leadCaptureMessage.trim(),
        leadCaptureFields: [
          { label: 'Full Name', name: 'name', type: 'text', required: true, placeholder: 'John Doe' },
          { label: 'Email Address', name: 'email', type: 'email', required: true, placeholder: 'john@example.com' }
        ]
      });

      setCreatedQR(qr);
      const redirectUrl = `${window.location.origin}/r/${qr.short_id}`;
      onQrValueChange?.(redirectUrl);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not create the dynamic QR. Check your Supabase migration and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!createdUrl) return;
    await navigator.clipboard.writeText(createdUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div
        style={{
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 16,
          padding: 16,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.06))',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Zap size={20} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: '#f8fafc', fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, margin: 0 }}>
              Editable QR codes for campaigns
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, margin: '6px 0 0' }}>
              Print one QR once, then update destinations, pause traffic, add expiry windows, and track scans from the dashboard.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            background: 'rgba(255,255,255,0.05)', 
            padding: '4px', 
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <button 
              onClick={() => setIsPdfMode(false)}
              style={{
                padding: '6px 12px',
                borderRadius: '7px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: !isPdfMode ? 'var(--accent-primary)' : 'transparent',
                color: !isPdfMode ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >URL</button>
            <button 
              onClick={() => setIsPdfMode(true)}
              style={{
                padding: '6px 12px',
                borderRadius: '7px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: isPdfMode ? 'var(--accent-primary)' : 'transparent',
                color: isPdfMode ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >PDF Menu</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
        <FeaturePill icon={Pause} title="Pause anytime" detail="Turn campaigns on or off after printing." />
        <FeaturePill icon={CalendarClock} title="Expiration" detail="Retire limited-time offers automatically." />
        <FeaturePill icon={Lock} title="Access gate" detail="Add a simple password step for private scans." />
        <FeaturePill icon={Smartphone} title="Device routing" detail="Send mobile and desktop users to different URLs." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        <Field label="Campaign Name">
          <input className="dark-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Restaurant menu campaign" />
        </Field>
        {isPdfMode ? (
          <Field label="Upload PDF Menu">
            <div style={{ position: 'relative' }}>
              <input 
                type="file" 
                accept=".pdf" 
                onChange={(e) => setPdfFile(e.target.files[0])}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 2
                }}
              />
              <div className="dark-input" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={16} color="var(--accent-primary)" />
                <span style={{ color: pdfFile ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '13px' }}>
                  {pdfFile ? pdfFile.name : 'Choose PDF file...'}
                </span>
              </div>
            </div>
          </Field>
        ) : (
          <Field label="Destination URL">
            <input
              className="dark-input"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://your-domain.com/offer"
              type="url"
            />
          </Field>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <Field label="Expiration Date" hint="Optional. Leave empty for no expiration.">
          <input className="dark-input" type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
        </Field>
        <Field label="Password Gate" hint="Optional access code for the redirect page.">
          <input
            className="dark-input"
            value={accessPassword}
            onChange={(e) => setAccessPassword(e.target.value)}
            placeholder="campaign-pin"
            type="password"
          />
        </Field>
      </div>

      <div
        style={{
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14,
          padding: 14,
          background: 'rgba(255,255,255,0.025)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Smartphone size={15} color="#818cf8" />
          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>Smart redirect rules</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          <Field label="Mobile URL">
            <input className="dark-input" value={mobileUrl} onChange={(e) => setMobileUrl(e.target.value)} placeholder="https://m.example.com" />
          </Field>
          <Field label="Desktop URL">
            <input className="dark-input" value={desktopUrl} onChange={(e) => setDesktopUrl(e.target.value)} placeholder="https://example.com/desktop" />
          </Field>
          <Field label="Country Code">
            <input className="dark-input" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} maxLength={2} placeholder="IN" />
          </Field>
          <Field label="Geo URL">
            <input className="dark-input" value={countryUrl} onChange={(e) => setCountryUrl(e.target.value)} placeholder="https://example.in" />
          </Field>
        </div>
        <p style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 11, margin: '10px 0 0' }}>
          <MapPin size={12} />
          Geo routing is stored with the QR and ready for edge/IP based routing when you enable location resolution.
        </p>
      </div>

      <div
        style={{
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14,
          padding: 14,
          background: 'rgba(255,255,255,0.025)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserCircle size={15} color="#818cf8" />
            <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>Lead Capture Form</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={leadCaptureEnabled} onChange={(e) => setLeadCaptureEnabled(e.target.checked)} />
            <span className="slider round"></span>
          </label>
        </div>
        
        {leadCaptureEnabled && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 12 }}>
            <Field label="Form Title">
              <input className="dark-input" value={leadCaptureTitle} onChange={(e) => setLeadCaptureTitle(e.target.value)} placeholder="Contact Information" />
            </Field>
            <Field label="Form Message">
              <input className="dark-input" value={leadCaptureMessage} onChange={(e) => setLeadCaptureMessage(e.target.value)} placeholder="Please fill out the form to continue." />
            </Field>
          </div>
        )}
        <p style={{ color: 'var(--text-muted)', fontSize: 11, margin: '10px 0 0' }}>
          When enabled, users will see a contact form before being redirected to the destination URL.
        </p>
      </div>

      {error && (
        <div style={{ color: '#fecaca', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: 12, fontSize: 13 }}>
          {error}
        </div>
      )}

      {createdQR ? (
        <div
          style={{
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 14,
            padding: 14,
            background: 'rgba(34,197,94,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Check size={16} color="#4ade80" />
            <p style={{ color: '#bbf7d0', fontWeight: 700, fontSize: 13, margin: 0 }}>Dynamic QR created</p>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12, wordBreak: 'break-all', margin: '0 0 12px' }}>{createdUrl}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={handleCopy} style={{ padding: '8px 12px', fontSize: 12 }}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy redirect URL'}
            </button>
            <Link className="btn-primary" to="/dashboard" style={{ padding: '8px 12px', fontSize: 12, textDecoration: 'none' }}>
              <ExternalLink size={13} />
              View analytics
            </Link>
          </div>
        </div>
      ) : (
        <button className="btn-primary" onClick={handleCreate} disabled={saving} style={{ width: 'fit-content' }}>
          <Zap size={15} />
          {saving ? 'Creating dynamic QR...' : user ? 'Create editable QR' : 'Sign in to create editable QR'}
        </button>
      )}
    </div>
  );
}

export default DynamicQRCreator;
