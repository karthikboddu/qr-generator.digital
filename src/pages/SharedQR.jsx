import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Eye, QrCode as QrCodeIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import QRCode from 'qrcode';
import Seo from '../components/Seo';

function SharedQR() {
  const { qrId } = useParams();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQrDataAndTrackScan = async () => {
      if (!qrId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch QR data by ID or Short ID
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(qrId);
        
        let query = supabase
          .from('qr_codes')
          .select('*, scans:qr_scans(count)');

        if (isUuid) {
          query = query.or(`id.eq.${qrId},short_id.eq.${qrId}`);
        } else {
          query = query.eq('short_id', qrId);
        }

        const { data, error } = await query.single();

        if (error || !data) throw error || new Error('QR code not found');
        
        // Track the scan asynchronously
        await supabase.from('qr_scans').insert({ qr_code_id: data.id });

        const formattedData = {
          id: data.id,
          type: data.content_type,
          content: data.content_data,
          qrImage: data.image_url,
          scans: (data.scans[0]?.count || 0) + 1, // Add 1 for the current scan
          createdAt: data.created_at,
          customization: data.customization_options,
        };

        setQrData(formattedData);
      } catch (err) {
        console.error('Error fetching QR data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQrDataAndTrackScan();
  }, [qrId]);
  
  const handleDownload = async (format) => {
    if (!qrData) return;
    
    try {
      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `qrcode-${qrData.id}.png`;
        link.href = qrData.qrImage;
        link.click();
      } else if (format === 'svg') {
        const svg = await QRCode.toString(qrData.content, {
          type: 'svg',
          color: {
            dark: qrData.customization.foreground,
            light: qrData.customization.background
          },
          errorCorrectionLevel: 'H'
        });

        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qrcode-${qrData.id}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
      alert(`Failed to download ${format}.`);
    }
  };

  const seoElement = (
    <Seo
      title={qrData ? `${qrData.type} Shared QR Code` : 'Shared QR Code'}
      description="View and download a shared QR code."
      path={`/qr/${qrId}`}
      robots="noindex,nofollow"
    />
  );

  if (loading) {
    return (
      <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Seo title="Loading..." robots="noindex,nofollow" />
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading QR details...</p>
        </div>
      </div>
    );
  }

  if (!qrData) {
    return (
      <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Seo title="Not Found" robots="noindex,nofollow" />
        <div className="dark-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <QrCodeIcon size={32} color="#ef4444" />
          </div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>QR Code Not Found</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>The QR code you are looking for might have been deleted or the link is incorrect.</p>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', padding: '80px 20px 40px' }}>
      {seoElement}
      <div style={{ maxWidth: '500px', margin: '0 auto' }} className="animate-fadeInUp">
        <div className="dark-card" style={{ padding: '40px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '32px', 
              color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.03em' 
            }}>
              Shared <span className="gradient-text">QR Code</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Scan or download this QR code</p>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            borderRadius: '24px', 
            padding: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            <div style={{ 
              background: '#fff', 
              padding: '16px', 
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
              <img
                src={qrData.qrImage}
                alt="QR Code"
                style={{ width: '220px', height: '220px', display: 'block' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.04)'
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>Type</span>
              <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>{qrData.type}</span>
            </div>

            <div style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.04)'
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>Total Scans</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f8fafc', fontWeight: 700 }}>
                <Eye size={14} color="var(--accent-primary)" />
                {qrData.scans}
              </div>
            </div>

            <div style={{ 
              padding: '16px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.04)'
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 500, marginBottom: '6px' }}>Content</p>
              <p style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 600, wordBreak: 'break-all', margin: 0 }}>
                {qrData.content}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button 
              onClick={() => handleDownload('png')} 
              className="btn-primary"
              style={{ width: '100%', height: '48px', fontSize: '14px', fontWeight: 700, borderRadius: '12px' }}
            >
              <Download size={16} />
              PNG
            </button>
            <button 
              onClick={() => handleDownload('svg')} 
              className="btn-secondary"
              style={{ width: '100%', height: '48px', fontSize: '14px', fontWeight: 700, borderRadius: '12px' }}
            >
              <Download size={16} />
              SVG
            </button>
          </div>

          <Link to="/" style={{ 
            display: 'block', textAlign: 'center', marginTop: '24px', 
            color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' 
          }}>
            Create your own at <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>qr-generator.digital</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SharedQR;
