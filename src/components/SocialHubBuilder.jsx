import React, { useState } from 'react';
import { Check, Copy, Globe, Instagram, Linkedin, Plus, Trash2, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createSocialHub } from '../lib/dynamicQR';

const normalizeUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

function SocialHubBuilder({ onQrValueChange }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('QR Gen Studio');
  const [bio, setBio] = useState('All our important links in one scan.');
  const [theme, setTheme] = useState('dark');
  const [links, setLinks] = useState([
    { label: 'Website', url: 'https://qr-generator.digital', type: 'website' },
    { label: 'Instagram', url: 'https://instagram.com/', type: 'instagram' },
    { label: 'YouTube', url: 'https://youtube.com/', type: 'youtube' },
  ]);
  const [createdHub, setCreatedHub] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const hubUrl = createdHub ? `${window.location.origin}/hub/${createdHub.short_id}` : '';

  const updateLink = (index, key, value) => {
    setLinks((current) => current.map((link, i) => (i === index ? { ...link, [key]: value } : link)));
  };

  const addLink = () => {
    setLinks((current) => [...current, { label: 'New Link', url: '', type: 'website' }]);
  };

  const removeLink = (index) => {
    setLinks((current) => current.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    setError('');

    if (!user) {
      setError('Please sign in to create and save a social media QR hub.');
      return;
    }

    const cleanLinks = links
      .map((link) => ({
        ...link,
        label: link.label.trim(),
        url: normalizeUrl(link.url),
      }))
      .filter((link) => link.label && link.url);

    if (!title.trim() || cleanLinks.length === 0) {
      setError('Add a hub title and at least one valid link.');
      return;
    }

    setSaving(true);
    try {
      const hub = await createSocialHub({
        userId: user.id,
        title: title.trim(),
        bio: bio.trim(),
        links: cleanLinks,
        theme,
      });

      setCreatedHub(hub);
      const url = `${window.location.origin}/hub/${hub.short_id}`;
      onQrValueChange?.(url);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not create the social hub.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!hubUrl) return;
    await navigator.clipboard.writeText(hubUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(230px, 0.9fr)', gap: 18 }} className="hub-builder-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div
          style={{
            border: '1px solid rgba(6,182,212,0.22)',
            borderRadius: 16,
            padding: 16,
            background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(99,102,241,0.06))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Globe size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', color: '#f8fafc', fontWeight: 800, fontSize: 18, margin: 0 }}>
                Social media QR hub
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, margin: '6px 0 0' }}>
                Build a Linktree-style mobile page for Instagram, YouTube, LinkedIn, WhatsApp, offers, and websites.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <div>
            <label className="form-label">Hub Title</label>
            <input className="dark-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your brand name" />
          </div>
          <div>
            <label className="form-label">Theme</label>
            <select className="dark-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="dark">Midnight neon</option>
              <option value="light">Clean light</option>
              <option value="sunset">Sunset gradient</option>
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Short Bio</label>
          <textarea className="dark-textarea" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell scanners what they can find here." />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: 0 }}>Links</p>
          <button type="button" className="btn-secondary" onClick={addLink} style={{ padding: '7px 11px', fontSize: 12 }}>
            <Plus size={13} />
            Add link
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map((link, index) => (
            <div
              key={`${link.type}-${index}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px minmax(0, 1fr) 36px',
                gap: 8,
                alignItems: 'center',
              }}
              className="hub-link-row"
            >
              <input className="dark-input" value={link.label} onChange={(e) => updateLink(index, 'label', e.target.value)} placeholder="Label" />
              <input className="dark-input" value={link.url} onChange={(e) => updateLink(index, 'url', e.target.value)} placeholder="https://..." />
              <button type="button" className="btn-ghost" onClick={() => removeLink(index)} style={{ padding: 9, color: '#f87171' }} aria-label="Remove link">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {error && (
          <div style={{ color: '#fecaca', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: 12, fontSize: 13 }}>
            {error}
          </div>
        )}

        {createdHub ? (
          <div style={{ border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: 14, background: 'rgba(34,197,94,0.08)' }}>
            <p style={{ color: '#bbf7d0', fontWeight: 700, fontSize: 13, margin: '0 0 8px' }}>Social hub created</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, wordBreak: 'break-all', margin: '0 0 12px' }}>{hubUrl}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn-secondary" onClick={handleCopy} style={{ padding: '8px 12px', fontSize: 12 }}>
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy hub URL'}
              </button>
              <Link className="btn-primary" to="/dashboard" style={{ padding: '8px 12px', fontSize: 12, textDecoration: 'none' }}>
                Manage hub
              </Link>
            </div>
          </div>
        ) : (
          <button className="btn-primary" onClick={handleCreate} disabled={saving} style={{ width: 'fit-content' }}>
            <Globe size={15} />
            {saving ? 'Publishing hub...' : user ? 'Create social hub QR' : 'Sign in to create hub'}
          </button>
        )}
      </div>

      <div
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          padding: 14,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))',
          alignSelf: 'start',
        }}
      >
        <div
          style={{
            borderRadius: 20,
            padding: 18,
            minHeight: 420,
            background:
              theme === 'light'
                ? 'linear-gradient(180deg, #f8fafc, #e0f2fe)'
                : theme === 'sunset'
                  ? 'linear-gradient(160deg, #451a03, #7c2d12 45%, #312e81)'
                  : 'radial-gradient(circle at top, rgba(99,102,241,0.35), transparent 42%), #080812',
            color: theme === 'light' ? '#0f172a' : '#f8fafc',
          }}
        >
          <div style={{ width: 70, height: 70, borderRadius: 22, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px auto 14px' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 24 }}>{title.trim().charAt(0) || 'Q'}</span>
          </div>
          <h4 style={{ color: 'inherit', fontFamily: 'Outfit, sans-serif', textAlign: 'center', fontSize: 20, fontWeight: 800, margin: 0 }}>
            {title || 'Your Hub'}
          </h4>
          <p style={{ color: theme === 'light' ? '#475569' : 'rgba(248,250,252,0.7)', textAlign: 'center', fontSize: 12, lineHeight: 1.6, margin: '8px 0 18px' }}>
            {bio || 'All your links in one QR scan.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {links.slice(0, 5).map((link, index) => {
              const Icon = index === 1 ? Instagram : index === 2 ? Youtube : index === 3 ? Linkedin : Globe;
              return (
                <div
                  key={`${link.label}-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 12px',
                    borderRadius: 14,
                    background: theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.1)',
                    border: theme === 'light' ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.12)',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  <Icon size={15} />
                  {link.label || 'Link'}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialHubBuilder;
