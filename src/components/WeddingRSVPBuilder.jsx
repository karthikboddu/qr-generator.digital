import React, { useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Heart, Mail, QrCode, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createDynamicQR } from '../lib/dynamicQR';

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {hint && <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '6px 0 0' }}>{hint}</p>}
    </div>
  );
}

function Toggle({ label, checked, onChange, hint }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '12px 14px',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        cursor: 'pointer',
      }}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="custom-checkbox" style={{ marginTop: 2 }} />
      <span>
        <span style={{ display: 'block', color: 'var(--text-primary)', fontSize: 13, fontWeight: 700 }}>{label}</span>
        {hint && <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 11, lineHeight: 1.5, marginTop: 2 }}>{hint}</span>}
      </span>
    </label>
  );
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function WeddingRSVPBuilder({ customization, onQrValueChange, selectedTemplateName }) {
  const { user } = useAuth();
  const [coupleNames, setCoupleNames] = useState('Aarav & Meera');
  const [destinationUrl, setDestinationUrl] = useState('https://your-wedding-site.com/schedule');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('Jaipur, India');
  const [deadline, setDeadline] = useState('');
  const [collectMealPreference, setCollectMealPreference] = useState(true);
  const [collectEmail, setCollectEmail] = useState(true);
  const [collectSongRequest, setCollectSongRequest] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [createdQR, setCreatedQR] = useState(null);
  const [copied, setCopied] = useState(false);

  const liveUrl = createdQR ? `${window.location.origin}/r/${createdQR.short_id}` : '';

  const leadCaptureFields = useMemo(() => {
    const fields = [
      {
        label: 'Full Name',
        name: 'guest_name',
        type: 'text',
        required: true,
        placeholder: 'Guest full name',
      },
      {
        label: 'Attendance',
        name: 'attendance',
        type: 'select',
        required: true,
        options: ['Joyfully attending', 'Regretfully declining'],
      },
      {
        label: 'Guest Count',
        name: 'guest_count',
        type: 'number',
        required: true,
        placeholder: '1',
      },
    ];

    if (collectMealPreference) {
      fields.push({
        label: 'Meal Preference',
        name: 'meal_preference',
        type: 'select',
        required: true,
        options: ['Vegetarian', 'Non-vegetarian', 'Vegan', 'Jain'],
      });
    }

    if (collectEmail) {
      fields.push({
        label: 'Email Address',
        name: 'email',
        type: 'email',
        required: false,
        placeholder: 'guest@example.com',
      });
    }

    if (collectSongRequest) {
      fields.push({
        label: 'Song Request',
        name: 'song_request',
        type: 'textarea',
        required: false,
        placeholder: 'Share a favorite song for the celebration',
      });
    }

    return fields;
  }, [collectEmail, collectMealPreference, collectSongRequest]);

  const handleCreate = async () => {
    setError('');

    if (!user) {
      setError('Please sign in to create and save your wedding RSVP QR code.');
      return;
    }

    const finalDestination = normalizeUrl(destinationUrl);
    if (!finalDestination) {
      setError('Add the page guests should visit after submitting the RSVP.');
      return;
    }

    setIsSaving(true);
    try {
      const title = `${coupleNames.trim() || 'Wedding'} RSVP`;
      const formattedDate = eventDate ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
      const weddingMessageParts = [
        `Please confirm your attendance for ${coupleNames || 'our wedding'}.`,
        formattedDate ? `Event date: ${formattedDate}.` : '',
        venue ? `Venue: ${venue}.` : '',
        deadline ? `RSVP by ${new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}.` : '',
      ].filter(Boolean);

      const qr = await createDynamicQR({
        userId: user.id,
        title,
        destinationUrl: finalDestination,
        customization,
        qrType: 'wedding-rsvp',
        leadCaptureEnabled: true,
        leadCaptureTitle: `${coupleNames || 'Wedding'} RSVP`,
        leadCaptureMessage: weddingMessageParts.join(' '),
        leadCaptureFields,
      });

      setCreatedQR(qr);
      onQrValueChange?.(`${window.location.origin}/r/${qr.short_id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not create the wedding RSVP QR.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!liveUrl) return;
    await navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div
        style={{
          border: '1px solid rgba(244,114,182,0.22)',
          borderRadius: 18,
          padding: 18,
          background: 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(253,224,71,0.06))',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #f472b6, #f59e0b)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Heart size={20} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 21, color: '#fff7fb', margin: 0 }}>
              Wedding RSVP QR builder
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, margin: '6px 0 0' }}>
              Create one elegant QR for invitations, save-the-date cards, wedding websites, and printed inserts. Guests scan, submit their RSVP, and continue to your schedule or event page.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <Field label="Couple Names">
          <input className="dark-input" value={coupleNames} onChange={(e) => setCoupleNames(e.target.value)} placeholder="Riya & Arjun" />
        </Field>
        <Field label="Wedding Website / Destination">
          <input className="dark-input" value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} placeholder="https://your-wedding-site.com" />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <Field label="Event Date">
          <input className="dark-input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </Field>
        <Field label="Venue / City">
          <input className="dark-input" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Udaipur, India" />
        </Field>
        <Field label="RSVP Deadline" hint="Optional but recommended for printed invites.">
          <input className="dark-input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </Field>
      </div>

      <div>
        <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: '0 0 10px' }}>Included RSVP fields</p>
        <div style={{ display: 'grid', gap: 10 }}>
          <Toggle label="Collect meal preference" checked={collectMealPreference} onChange={setCollectMealPreference} hint="Perfect for plated dinners and multiple cuisine choices." />
          <Toggle label="Collect email address" checked={collectEmail} onChange={setCollectEmail} hint="Useful for reminder updates, hotel info, and event schedule follow-ups." />
          <Toggle label="Collect song request" checked={collectSongRequest} onChange={setCollectSongRequest} hint="A nice touch for reception planning and guest engagement." />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 10,
          padding: 14,
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Template</p>
          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>{selectedTemplateName}</p>
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Lead Capture</p>
          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>{leadCaptureFields.length} RSVP fields</p>
        </div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Guest Experience</p>
          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>Scan → RSVP → Wedding details</p>
        </div>
      </div>

      {error && (
        <div style={{ border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.1)', color: '#fecaca', borderRadius: 12, padding: 12, fontSize: 13 }}>
          {error}
        </div>
      )}

      {createdQR ? (
        <div style={{ border: '1px solid rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.08)', borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Check size={15} color="#4ade80" />
            <p style={{ color: '#bbf7d0', fontSize: 13, fontWeight: 700, margin: 0 }}>Wedding RSVP QR created</p>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12, wordBreak: 'break-all', margin: '0 0 12px' }}>{liveUrl}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={handleCopy} style={{ padding: '8px 12px', fontSize: 12 }}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy RSVP link'}
            </button>
            <Link to="/dashboard" className="btn-primary" style={{ padding: '8px 12px', fontSize: 12, textDecoration: 'none' }}>
              <ExternalLink size={13} />
              View RSVP responses
            </Link>
          </div>
        </div>
      ) : (
        <button className="btn-primary" onClick={handleCreate} disabled={isSaving} style={{ width: 'fit-content' }}>
          <QrCode size={15} />
          {isSaving ? 'Creating wedding RSVP QR...' : user ? 'Create wedding RSVP QR' : 'Sign in to create RSVP QR'}
        </button>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <span className="badge badge-purple"><Sparkles size={10} /> Beautiful on invites</span>
        <span className="badge badge-purple"><Mail size={10} /> Collects responses</span>
        <span className="badge badge-purple"><Heart size={10} /> Built for weddings</span>
      </div>
    </div>
  );
}

export default WeddingRSVPBuilder;
