import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, Lock, QrCode, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import { supabase } from '../supabaseClient';
import { detectDevice, incrementDynamicQRScanCount, logScanEvent } from '../lib/dynamicQR';

function CenterCard({ icon: Icon = QrCode, title, message, children }) {
  return (
    <div style={{ minHeight: '100%', display: 'grid', placeItems: 'center', padding: 24, background: 'var(--bg-primary)', flex: 1 }}>
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 22,
          padding: 28,
          textAlign: 'center',
          background: 'radial-gradient(circle at top, rgba(99,102,241,0.16), transparent 42%), var(--bg-card)',
          boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(99,102,241,0.14)',
            margin: '0 auto 16px',
          }}
        >
          <Icon size={26} color="#818cf8" />
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, margin: '0 0 20px' }}>{message}</p>
        {children}
      </div>
    </div>
  );
}

function resolveDestination(qr) {
  const rules = qr.redirect_rules || {};
  const device = detectDevice();

  if (rules.device?.mobile && device === 'mobile') return rules.device.mobile;
  if (rules.device?.desktop && device === 'desktop') return rules.device.desktop;

  return qr.destination_url;
}

function DynamicQRRedirect() {
  const { shortId } = useParams();
  const [qr, setQr] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [leadError, setLeadError] = useState('');

  const destination = useMemo(() => (qr ? resolveDestination(qr) : ''), [qr]);

  useEffect(() => {
    let cancelled = false;

    const loadQR = async () => {
      if (!shortId) {
        setStatus('not-found');
        return;
      }

      try {
        const { data, error } = await supabase.from('dynamic_qrs').select('*').eq('short_id', shortId).single();
        if (error || !data) throw error || new Error('Dynamic QR not found');
        if (cancelled) return;

        if (!data.is_active) {
          setStatus('paused');
          return;
        }

        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          setStatus('expired');
          return;
        }

        setQr(data);
        if (data.lead_capture_enabled) {
          setStatus('lead-capture');
        } else {
          setStatus(data.access_password ? 'locked' : 'redirecting');
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setErrorMessage('This QR code is unavailable, paused, or has been removed.');
          setStatus('not-found');
        }
      }
    };

    loadQR();
    return () => {
      cancelled = true;
    };
  }, [shortId]);

  useEffect(() => {
    if (status !== 'redirecting' || !qr || !destination) return;

    const redirect = async () => {
      try {
        await logScanEvent(qr.id);
        await incrementDynamicQRScanCount(qr.short_id);
      } catch (err) {
        console.error(err);
      } finally {
        window.location.replace(destination);
      }
    };

    const timer = window.setTimeout(redirect, 650);
    return () => window.clearTimeout(timer);
  }, [destination, qr, status]);

  const unlock = () => {
    if (!qr) return;
    if (password === qr.access_password) {
      setPasswordError('');
      setStatus('redirecting');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadError('');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await supabase.from('lead_submissions').insert({
        dynamic_qr_id: qr.id,
        data: data,
      });
      if (error) throw error;
      setStatus(qr.access_password ? 'locked' : 'redirecting');
    } catch (err) {
      console.error(err);
      setLeadError('Failed to submit form. Please try again.');
    }
  };

  const renderLeadField = (field, idx) => {
    const name = field.name || field.label.toLowerCase().replace(/\s+/g, '_');
    const commonProps = {
      name,
      required: field.required,
      className: 'dark-input',
      placeholder: field.placeholder,
    };

    if (field.type === 'textarea') {
      return <textarea {...commonProps} className="dark-textarea" rows={4} />;
    }

    if (field.type === 'select') {
      return (
        <select {...commonProps} className="dark-select" defaultValue="">
          <option value="" disabled>{field.placeholder || `Select ${field.label}`}</option>
          {(field.options || []).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return <input {...commonProps} type={field.type || 'text'} />;
  };

  const seoElement = <Seo title="Opening Dynamic QR" description="Redirecting to a dynamic QR code destination." path={`/r/${shortId}`} robots="noindex,nofollow" />;

  if (status === 'loading') {
    return (
      <>
        {seoElement}
        <CenterCard title="Reading QR" message="Checking the latest destination and scan settings..." />
      </>
    );
  }

  if (status === 'lead-capture') {
    return (
      <>
        {seoElement}
        <CenterCard 
          icon={QrCode} 
          title={qr.lead_capture_title || 'Contact Information'} 
          message={qr.lead_capture_message || 'Please fill out the form to continue.'}
        >
          <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(qr.lead_capture_fields && Array.isArray(qr.lead_capture_fields) && qr.lead_capture_fields.length > 0) ? (
              qr.lead_capture_fields.map((field, idx) => (
                <div key={idx} style={{ textAlign: 'left' }}>
                  <label className="form-label">{field.label}</label>
                  {renderLeadField(field, idx)}
                </div>
              ))
            ) : (
              <>
                <div style={{ textAlign: 'left' }}>
                  <label className="form-label">Full Name</label>
                  <input name="name" type="text" required className="dark-input" placeholder="John Doe" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label className="form-label">Email Address</label>
                  <input name="email" type="email" required className="dark-input" placeholder="john@example.com" />
                </div>
              </>
            )}
            {leadError && <p style={{ color: '#fca5a5', fontSize: 12, margin: 0 }}>{leadError}</p>}
            <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: 8 }}>
              Continue to destination
              <ArrowRight size={15} />
            </button>
          </form>
        </CenterCard>
      </>
    );
  }

  if (status === 'locked') {
    return (
      <>
        {seoElement}
        <CenterCard icon={Lock} title="Password Required" message="This dynamic QR is protected. Enter the access code to continue.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              className="dark-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              onKeyDown={(e) => {
                if (e.key === 'Enter') unlock();
              }}
            />
            {passwordError && <p style={{ color: '#fca5a5', fontSize: 12, margin: 0 }}>{passwordError}</p>}
            <button className="btn-primary" onClick={unlock} style={{ width: '100%' }}>
              Unlock and continue
              <ArrowRight size={15} />
            </button>
          </div>
        </CenterCard>
      </>
    );
  }

  if (status === 'redirecting') {
    return (
      <>
        {seoElement}
        <CenterCard icon={ShieldCheck} title="Opening Destination" message="Your QR destination is being verified and opened now.">
          <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, #6366f1, #06b6d4)', animation: 'loadingSweep 1s ease-in-out infinite alternate' }} />
          </div>
        </CenterCard>
      </>
    );
  }

  const statusMap = {
    expired: {
      title: 'QR Code Expired',
      message: 'This campaign has reached its expiration date. Contact the QR owner for an updated link.',
    },
    paused: {
      title: 'QR Code Paused',
      message: 'The QR owner has temporarily paused this campaign.',
    },
    'not-found': {
      title: 'QR Code Unavailable',
      message: errorMessage || 'We could not find an active destination for this QR code.',
    },
  };

  const copy = statusMap[status] || statusMap['not-found'];

  return (
    <>
      {seoElement}
      <CenterCard icon={AlertCircle} title={copy.title} message={copy.message}>
        <Link to="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
          Create your own QR code
        </Link>
      </CenterCard>
    </>
  );
}

export default DynamicQRRedirect;
