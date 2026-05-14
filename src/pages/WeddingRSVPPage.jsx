import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import {
  ArrowRight,
  CalendarHeart,
  Check,
  Heart,
  Image as ImageIcon,
  Mail,
  MapPin,
  Palette,
  Sparkles,
  Users,
} from 'lucide-react';
import Seo from '../components/Seo';
import WeddingRSVPBuilder from '../components/WeddingRSVPBuilder';
import { blogPosts } from '../data/blogPosts';

const weddingPresets = [
  {
    id: 'floral-rsvp',
    name: 'Floral RSVP',
    description: 'Soft blush and floral invitation styling for romantic printed cards.',
    foreground: '#8f1d4c',
    background: '#fff7fb',
    frameText: 'Scan to RSVP',
    accent: '#f472b6',
    tags: ['Floral', 'Elegant', 'Pinterest-ready'],
  },
  {
    id: 'luxury-gold-wedding',
    name: 'Luxury Gold Wedding',
    description: 'Champagne gold styling for premium, black-tie invitations.',
    foreground: '#8a5b0f',
    background: '#fff8eb',
    frameText: 'RSVP',
    accent: '#f59e0b',
    tags: ['Luxury', 'Gold', 'Formal'],
  },
  {
    id: 'minimal-white-wedding',
    name: 'Minimal White Wedding',
    description: 'Crisp monochrome look for modern editorial wedding suites.',
    foreground: '#0f172a',
    background: '#ffffff',
    frameText: 'Details & RSVP',
    accent: '#cbd5e1',
    tags: ['Minimal', 'Modern', 'Clean'],
  },
  {
    id: 'rustic-wedding',
    name: 'Rustic Wedding',
    description: 'Earthy terracotta palette for barn, vineyard, and outdoor weddings.',
    foreground: '#7c2d12',
    background: '#fff7ed',
    frameText: 'Wedding RSVP',
    accent: '#fb923c',
    tags: ['Rustic', 'Warm', 'Outdoor'],
  },
  {
    id: 'indian-wedding-qr',
    name: 'Indian Wedding QR',
    description: 'Festive jewel tones for multi-day celebrations and family invites.',
    foreground: '#7e22ce',
    background: '#fff7ed',
    frameText: 'Celebrate With Us',
    accent: '#e879f9',
    tags: ['Indian Wedding', 'Festive', 'Vibrant'],
  },
  {
    id: 'save-the-date-qr',
    name: 'Save The Date QR',
    description: 'Simple, announcement-style QR for wedding announcements and reminders.',
    foreground: '#0f766e',
    background: '#ecfeff',
    frameText: 'Save The Date',
    accent: '#14b8a6',
    tags: ['Save the date', 'Simple', 'Shareable'],
  },
  {
    id: 'reception-qr',
    name: 'Reception QR',
    description: 'Perfect for table cards, seating notes, menu cards, and photo uploads.',
    foreground: '#1d4ed8',
    background: '#eff6ff',
    frameText: 'Reception Details',
    accent: '#60a5fa',
    tags: ['Reception', 'Table cards', 'Guest info'],
  },
];

const weddingFaqs = [
  {
    q: 'Can guests submit RSVPs directly after scanning?',
    a: 'Yes. This page creates a dynamic QR with an RSVP form in front of your wedding website or schedule, so guests scan, confirm attendance, and then continue.',
  },
  {
    q: 'What RSVP details can I collect?',
    a: 'The current setup collects name, attendance status, guest count, and optionally meal preference, email, and song requests. It is built on the lead-capture fields already supported by the platform.',
  },
  {
    q: 'Will the QR still work after the invitations are printed?',
    a: 'Yes. Because it uses dynamic QR links, you can update the post-submit destination later without reprinting cards, which is helpful when schedules, hotels, or event details change.',
  },
  {
    q: 'Can I use this for Indian weddings or multi-day events?',
    a: 'Yes. The page is well suited for multi-event wedding schedules, family functions, mehendi, sangeet, ceremony, reception, and hotel coordination links.',
  },
];

function WeddingRSVPPage() {
  const [selectedPresetId, setSelectedPresetId] = useState(weddingPresets[0].id);
  const [liveQrValue, setLiveQrValue] = useState('https://qr-generator.digital/wedding-rsvp-qr-code-generator');

  const selectedPreset = weddingPresets.find((preset) => preset.id === selectedPresetId) || weddingPresets[0];
  const customization = useMemo(() => ({
    foreground: selectedPreset.foreground,
    background: selectedPreset.background,
    cornerStyle: selectedPreset.id === 'minimal-white-wedding' ? 'square' : 'rounded',
    frameText: selectedPreset.frameText,
    logoFile: null,
    logoDataURL: null,
  }), [selectedPreset]);

  const weddingArticles = blogPosts.filter((post) => [
    'qr-codes-for-wedding-invitations',
    'how-to-create-wedding-rsvp-qr-codes',
    'best-wedding-qr-styles',
    'digital-rsvp-wedding-guide',
    'elegant-wedding-qr-examples',
  ].includes(post.slug));

  return (
    <>
      <Seo
        title="Wedding RSVP QR Code Generator | Free Elegant Wedding QR"
        description="Create beautiful wedding RSVP QR codes with elegant templates, RSVP form capture, guest details, wedding website redirects, and invitation-ready designs."
        path="/wedding-rsvp-qr-code-generator"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Wedding RSVP QR Code Generator',
            url: 'https://qr-generator.digital/wedding-rsvp-qr-code-generator',
            description: 'Create elegant wedding RSVP QR codes with guest response collection and invitation-ready templates.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: weddingFaqs.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qr-generator.digital/' },
              { '@type': 'ListItem', position: 2, name: 'Wedding RSVP QR Code Generator', item: 'https://qr-generator.digital/wedding-rsvp-qr-code-generator' },
            ],
          },
        ]}
      />

      <div className="grid-bg relative overflow-hidden" style={{ minHeight: '100%', padding: '56px 20px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <section style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="badge badge-purple" style={{ marginBottom: 16 }}>
              <Heart size={10} />
              Wedding QR Suite
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(38px, 6vw, 72px)', color: 'var(--text-primary)', margin: '0 0 18px', lineHeight: 0.98, letterSpacing: '-0.05em' }}>
              Create Beautiful <span className="gradient-text">Wedding RSVP</span> QR Codes
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.7, maxWidth: 780, margin: '0 auto 26px' }}>
              Build elegant invitation QR codes that send guests through a modern RSVP flow, collect attendance details, and redirect to your wedding website, schedule, venue, or hotel information.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
              <span className="badge badge-purple"><Users size={10} /> Guest responses</span>
              <span className="badge badge-purple"><Palette size={10} /> Invitation-ready templates</span>
              <span className="badge badge-purple"><Mail size={10} /> Digital RSVP flow</span>
              <span className="badge badge-purple"><CalendarHeart size={10} /> Save-the-date friendly</span>
            </div>
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)', gap: 22, alignItems: 'start', marginBottom: 74 }} className="wedding-suite-grid">
            <div className="dark-card" style={{ padding: 24 }}>
              <WeddingRSVPBuilder
                customization={customization}
                onQrValueChange={setLiveQrValue}
                selectedTemplateName={selectedPreset.name}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  borderRadius: 28,
                  padding: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))',
                }}
              >
                <div
                  style={{
                    borderRadius: 22,
                    padding: 24,
                    background: `radial-gradient(circle at top, ${selectedPreset.accent}33, transparent 38%), ${selectedPreset.background}`,
                    color: selectedPreset.foreground,
                    boxShadow: '0 30px 70px rgba(0,0,0,0.25)',
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.15em', color: selectedPreset.foreground, opacity: 0.7, margin: '0 0 6px' }}>
                      {selectedPreset.name}
                    </p>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, margin: 0, color: selectedPreset.foreground }}>
                      RSVP
                    </h2>
                    <p style={{ fontSize: 12, opacity: 0.72, margin: '6px 0 0' }}>Invitation preview</p>
                  </div>
                  <div style={{ width: 220, margin: '0 auto', background: selectedPreset.background, padding: 14, borderRadius: 20, boxShadow: '0 18px 30px rgba(0,0,0,0.12)' }}>
                    <QRCode
                      value={liveQrValue}
                      size={192}
                      fgColor={selectedPreset.foreground}
                      bgColor={selectedPreset.background}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <p style={{ textAlign: 'center', margin: '10px 0 0', fontSize: 12, fontWeight: 700, letterSpacing: '.11em', textTransform: 'uppercase' }}>
                      {selectedPreset.frameText}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 }}>
                    {selectedPreset.tags.map((tag) => (
                      <span key={tag} style={{ padding: '6px 9px', borderRadius: 999, background: `${selectedPreset.accent}1f`, fontSize: 11, fontWeight: 800 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="dark-card" style={{ padding: 20 }}>
                <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Wedding use cases</p>
                <div style={{ display: 'grid', gap: 10 }}>
                  {[
                    ['Invitation QR', 'Place one elegant QR on the main invitation or insert card.'],
                    ['Save-the-date', 'Share RSVP and schedule links before the full wedding suite is ready.'],
                    ['Reception cards', 'Use QR codes for menu details, tables, photos, and playlist requests.'],
                    ['Indian weddings', 'Perfect for multi-event pages across mehendi, sangeet, wedding, and reception.'],
                  ].map(([title, body]) => (
                    <div key={title} style={{ padding: 12, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                      <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{title}</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 74 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
              <div>
                <div className="section-kicker">
                  <Palette size={14} />
                  Wedding templates
                </div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 46px)', color: 'var(--text-primary)', margin: '14px 0 10px', letterSpacing: '-0.04em' }}>
                  Designed for wedding invitations, not generic flyers.
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 720, margin: 0 }}>
                  Use wedding-specific presets for floral, minimal, luxury, rustic, Indian wedding, save-the-date, and reception QR designs.
                </p>
              </div>
              <Link to="/templates" className="btn-secondary" style={{ textDecoration: 'none' }}>
                Browse all templates
                <ArrowRight size={15} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {weddingPresets.map((preset) => (
                <button
                  key={preset.id}
                  id={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className="style-card"
                  style={{
                    textAlign: 'left',
                    padding: 18,
                    borderColor: selectedPresetId === preset.id ? `${preset.accent}` : undefined,
                    boxShadow: selectedPresetId === preset.id ? `0 0 0 1px ${preset.accent}, 0 12px 28px rgba(0,0,0,0.18)` : undefined,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {[preset.foreground, preset.background, preset.accent].map((color) => (
                      <span key={color} style={{ width: 24, height: 24, borderRadius: '50%', background: color, border: '1px solid rgba(255,255,255,0.12)' }} />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 800, margin: '0 0 6px' }}>{preset.name}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>{preset.description}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {preset.tags.map((tag) => (
                      <span key={tag} style={{ padding: '5px 7px', fontSize: 10, borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 74 }}>
            <div className="section-kicker">
              <Users size={14} />
              Built for conversion
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', margin: '14px 0 12px', letterSpacing: '-0.04em' }}>
              Wedding QR ecosystem: RSVP, schedule, venue, and guest details.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
              {[
                {
                  icon: Mail,
                  title: 'Digital RSVP collection',
                  body: 'Collect attendance, guest count, meal choices, and optional follow-up info without paper reply cards.',
                },
                {
                  icon: MapPin,
                  title: 'Venue and travel support',
                  body: 'Redirect guests to directions, accommodation blocks, transport notes, or multi-day event schedules.',
                },
                {
                  icon: ImageIcon,
                  title: 'Photo and reception flows',
                  body: 'Use companion QR codes for photo uploads, playlist suggestions, table menus, and thank-you pages.',
                },
                {
                  icon: CalendarHeart,
                  title: 'Event-suite friendly',
                  body: 'Ideal for save-the-date campaigns, wedding websites, ceremony pages, and reception information hubs.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="dark-card" style={{ padding: 20 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(244,114,182,0.12)', display: 'grid', placeItems: 'center', marginBottom: 14 }}>
                    <Icon size={20} color="#f472b6" />
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: 18, margin: '0 0 8px' }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 74 }}>
            <div className="section-kicker">
              <Sparkles size={14} />
              Wedding content cluster
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)', margin: '14px 0 12px', letterSpacing: '-0.04em' }}>
              Blog content built around your emerging wedding SEO niche.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {weddingArticles.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="dark-card" style={{ textDecoration: 'none', padding: 18 }}>
                  <p style={{ color: '#f472b6', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                    Wedding QR SEO
                  </p>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: 18, lineHeight: 1.35, margin: '0 0 10px' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, margin: '0 0 12px' }}>{post.excerpt}</p>
                  <span style={{ color: '#a5b4fc', fontSize: 13, fontWeight: 700 }}>Read guide →</span>
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 70 }}>
            <div className="dark-card" style={{ padding: 28 }}>
              <div className="section-kicker">
                <Check size={14} />
                FAQ
              </div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)', margin: '14px 0 20px', letterSpacing: '-0.04em' }}>
                Wedding RSVP QR questions couples actually ask
              </h2>
              <div style={{ display: 'grid', gap: 14 }}>
                {weddingFaqs.map((item) => (
                  <div key={item.q} style={{ padding: 16, borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                    <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 800, margin: '0 0 6px' }}>{item.q}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="dark-card" style={{ padding: 28, textAlign: 'center' }}>
            <div className="badge badge-purple" style={{ marginBottom: 16 }}>
              <Heart size={10} />
              Monetizable wedding niche
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 46px)', color: 'var(--text-primary)', margin: '0 0 14px', letterSpacing: '-0.04em' }}>
              Launch the wedding QR suite from here.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, maxWidth: 760, margin: '0 auto 20px' }}>
              This page gives you a strong niche landing page today and a clean expansion path toward premium wedding templates, guest exports, landing pages, branding removal, and RSVP analytics.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
              <Link to="/pricing" className="btn-primary" style={{ textDecoration: 'none' }}>
                See premium path
                <ArrowRight size={15} />
              </Link>
              <Link to="/templates" className="btn-secondary" style={{ textDecoration: 'none' }}>
                Explore more templates
              </Link>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .wedding-suite-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default WeddingRSVPPage;
