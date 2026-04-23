import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, Globe, Instagram, Linkedin, MessageCircle, Youtube } from 'lucide-react';
import Seo from '../components/Seo';
import { supabase } from '../supabaseClient';
import { incrementSocialHubScanCount } from '../lib/dynamicQR';

const iconByType = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  website: Globe,
};

function SocialHubPage() {
  const { shortId } = useParams();
  const [hub, setHub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadHub = async () => {
      try {
        const { data, error } = await supabase.from('social_hubs').select('*').eq('short_id', shortId).single();
        if (error || !data || !data.is_active) throw error || new Error('Hub not found');
        if (cancelled) return;

        setHub(data);
        incrementSocialHubScanCount(data.short_id).catch((err) => console.error(err));
      } catch (err) {
        console.error(err);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadHub();
    return () => {
      cancelled = true;
    };
  }, [shortId]);

  const links = Array.isArray(hub?.links) ? hub.links : [];
  const isLight = hub?.theme === 'light';
  const isSunset = hub?.theme === 'sunset';

  const background = isLight
    ? 'linear-gradient(160deg, #f8fafc, #dbeafe 48%, #ecfeff)'
    : isSunset
      ? 'radial-gradient(circle at top left, rgba(251,146,60,0.42), transparent 32%), linear-gradient(160deg, #190b1f, #4c1d95 50%, #7c2d12)'
      : 'radial-gradient(circle at top, rgba(99,102,241,0.36), transparent 38%), linear-gradient(160deg, #050511, #111827 58%, #083344)';

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
        Loading social hub...
      </div>
    );
  }

  if (notFound || !hub) {
    return (
      <>
        <Seo title="Social Hub Not Found" description="This QR social hub is unavailable." path={`/hub/${shortId}`} robots="noindex,nofollow" />
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 420, textAlign: 'center', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>
            <Globe size={40} color="#818cf8" style={{ margin: '0 auto 14px', display: 'block' }} />
            <h1 style={{ color: '#f8fafc', fontFamily: 'Outfit, sans-serif', fontWeight: 900, margin: '0 0 8px' }}>Hub unavailable</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>This social hub may have been paused or removed.</p>
            <Link to="/" className="btn-primary" style={{ textDecoration: 'none', marginTop: 10 }}>
              Create a QR hub
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo 
        title={`${hub.title} Social QR Hub`} 
        description={hub.bio || 'Open this social media QR hub.'} 
        path={`/hub/${shortId}`} 
        robots="index,follow" 
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": hub.title,
            "description": hub.bio,
            "url": window.location.href,
            "sameAs": links.map(l => l.url)
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://qr-generator.digital/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": hub.title,
              "item": window.location.href
            }]
          }
        ]}
      />
      <main style={{ minHeight: '100vh', background, padding: '32px 18px', display: 'grid', placeItems: 'center' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 430,
            border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.14)',
            borderRadius: 30,
            padding: 22,
            background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(8,8,18,0.62)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 30px 90px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 28,
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'grid',
              placeItems: 'center',
              margin: '8px auto 18px',
              boxShadow: '0 20px 45px rgba(99,102,241,0.35)',
            }}
          >
            <span style={{ color: '#fff', fontSize: 32, fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>
              {hub.title?.charAt(0) || 'Q'}
            </span>
          </div>

          <h1 style={{ color: isLight ? '#0f172a' : '#f8fafc', fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 900, textAlign: 'center', margin: 0 }}>
            {hub.title}
          </h1>
          {hub.bio && (
            <p style={{ color: isLight ? '#475569' : 'rgba(248,250,252,0.72)', textAlign: 'center', fontSize: 14, lineHeight: 1.7, margin: '10px 0 24px' }}>
              {hub.bio}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {links.map((link, index) => {
              const Icon = iconByType[link.type] || Globe;
              return (
                <a
                  key={`${link.url}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 15px',
                    borderRadius: 18,
                    color: isLight ? '#0f172a' : '#fff',
                    background: isLight ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.1)',
                    border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.13)',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 800,
                    transition: 'transform 0.18s ease, background 0.18s ease',
                  }}
                >
                  <Icon size={18} />
                  <span style={{ flex: 1 }}>{link.label}</span>
                  <ExternalLink size={15} opacity={0.62} />
                </a>
              );
            })}
          </div>

          <Link
            to="/"
            style={{
              display: 'block',
              textAlign: 'center',
              color: isLight ? '#64748b' : 'rgba(248,250,252,0.46)',
              textDecoration: 'none',
              fontSize: 12,
              marginTop: 24,
            }}
          >
            Powered by QR Gen
          </Link>
        </div>
      </main>
    </>
  );
}

export default SocialHubPage;
