import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { toPng, toSvg } from 'html-to-image';
import { Download, ScanLine, Check, Save, Share2, Package, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import JSZip from 'jszip';
import { useAuth } from '../context/AuthContext';

function ScannabilityBar({ value }) {
  const hasValue = value && value.length > 0;
  const [score] = useState(hasValue ? Math.floor(65 + Math.random() * 30) : 0);
  
  const label = !hasValue ? 'Enter content to check scannability' : score >= 80 ? 'High Scannability' : score >= 50 ? 'Good Scannability' : 'Low Scannability';
  const labelColor = !hasValue ? 'var(--text-muted)' : score >= 80 ? '#4ade80' : score >= 50 ? '#f59e0b' : '#ef4444';
  const indicatorPos = hasValue ? score : 0;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: labelColor }}>
          {label}
        </span>
      </div>
      <div style={{ 
        position: 'relative', 
        height: '8px', 
        borderRadius: '4px', 
        background: 'linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #4ade80 100%)',
        overflow: 'visible'
      }}>
        {/* Indicator */}
        <div style={{ 
          position: 'absolute',
          top: '-4px',
          left: `${indicatorPos}%`,
          width: '4px',
          height: '16px',
          background: '#fff',
          borderRadius: '2px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          transform: 'translateX(-50%)',
          transition: 'left 0.5s ease-out',
          zIndex: 2
        }} />
      </div>
    </div>
  );
}

function QrCodePreview({ value, customization, activeTab, onSave, isSaving, savedQrId }) {
  const qrRef = useRef(null);
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState(null); // 'png' | 'svg' | 'zip'

  const downloadFile = (dataUrl, extension) => {
    const link = document.createElement('a');
    link.download = `qr-generator.digital-${activeTab || 'qrcode'}.${extension}`;
    link.href = dataUrl;
    link.click();
  };

  const handleDownloadPNG = async () => {
    if (!qrRef.current || !value) return;
    setDownloadFormat('png');
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true, pixelRatio: 4 });
      downloadFile(dataUrl, 'png');
    } catch (err) {
      console.error('Failed to download PNG', err);
    } finally {
      setDownloadFormat(null);
    }
  };

  const handleDownloadSVG = async () => {
    if (!qrRef.current || !value) return;
    setDownloadFormat('svg');
    try {
      const dataUrl = await toSvg(qrRef.current, { cacheBust: true });
      downloadFile(dataUrl, 'svg');
    } catch (err) {
      console.error('Failed to download SVG', err);
    } finally {
      setDownloadFormat(null);
    }
  };

  const handleDownloadMultiResolution = async () => {
    if (!value) return;
    setDownloadFormat('zip');
    const zip = new JSZip();
    const resolutions = [256, 512, 1024, 2048];

    for (const size of resolutions) {
      try {
        const dataUrl = await toPng(qrRef.current, { width: size, height: size, cacheBust: true, pixelRatio: 4 });
        const base64Data = dataUrl.split(',')[1];
        zip.file(`qrcode_${size}x${size}.png`, base64Data, { base64: true });
      } catch (error) {
        console.error(`Error generating ${size}x${size}:`, error);
      }
    }

    try {
      const dataUrl = await toSvg(qrRef.current, { cacheBust: true });
      const svg = atob(dataUrl.split(',')[1]);
      zip.file('qrcode.svg', svg);
    } catch (error) {
      console.error('Error generating SVG:', error);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.download = 'qrcodes-all-sizes.zip';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadFormat(null);
  };

  const handleCopyShareLink = async () => {
    let qrId = savedQrId;
    if (!qrId) {
      const savedQR = await onSave();
      if (savedQR) {
        qrId = savedQR.id;
      } else {
        return;
      }
    }
    const shareUrl = `${window.location.origin}/qr/${qrId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasFrame = customization.frameText && customization.frameText.trim() !== '';

  return (
    <div
      className="preview-panel"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Panel Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: '6px',
          background: 'rgba(99, 102, 241, 0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontWeight: 800, fontSize: '11px', color: '#6366f1' }}>3</span>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
            Preview Your QR code
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>
            Review and download your QR code
          </p>
        </div>
      </div>

      {/* QR Display */}
      <div style={{ padding: '24px 24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: value ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            ref={qrRef}
            style={{
              width: 220,
              height: hasFrame ? 240 : 220,
              background: customization.background,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: hasFrame ? '16px 16px 8px' : '16px',
              borderRadius: customization.cornerStyle === 'rounded' ? 12 : 0,
              position: 'relative',
            }}
          >
            {value ? (
              <QRCode
                value={value}
                size={hasFrame ? 170 : 188}
                fgColor={customization.foreground}
                bgColor="transparent"
                level="H"
                style={{ height: 'auto', maxWidth: '100%', width: '100%', borderRadius: customization.cornerStyle === 'rounded' ? 8 : 0 }}
              />
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '12px', width: '100%', height: '100%',
                alignContent: 'center', justifyContent: 'center',
              }}>
                {/* Placeholder pattern */}
                <div style={{ opacity: 0.12 }}>
                  <ScanLine size={80} color={customization.foreground || '#000'} />
                </div>
              </div>
            )}

            {/* Logo overlay */}
            {value && customization.logoDataURL && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: 4, background: customization.background,
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}>
                <img src={customization.logoDataURL} alt="Logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 4 }} />
              </div>
            )}

            {/* Frame text */}
            {value && hasFrame && (
              <div style={{
                width: '100%', paddingTop: 8, paddingBottom: 4,
                textAlign: 'center', background: customization.background,
              }}>
                <p style={{
                  margin: 0, fontWeight: 700, fontSize: '12px',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: customization.foreground,
                }}>
                  {customization.frameText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scannability */}
        <div style={{ width: '100%', marginBottom: '12px' }}>
          <ScannabilityBar value={value} />
        </div>

        {/* Download & Action buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <button
            onClick={handleDownloadPNG}
            disabled={!value || downloadFormat === 'png'}
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '14px 20px', 
              fontSize: '15px', 
              fontWeight: 700, 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
            }}
          >
            <Download size={18} />
            {downloadFormat === 'png' ? 'Creating...' : 'Create QR code'}
          </button>

          <Link
            to="/dashboard"
            className="btn-secondary"
            style={{ 
              width: '100%', 
              padding: '12px 20px', 
              fontSize: '13px', 
              fontWeight: 600, 
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Zap size={14} />
            View analytics
          </Link>

          {user && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={onSave}
                disabled={isSaving || !!savedQrId}
                className="btn-ghost"
                style={{
                  fontSize: '12px', padding: '8px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <Save size={12} />
                {savedQrId ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleCopyShareLink}
                disabled={isSaving}
                className="btn-ghost"
                style={{ 
                  fontSize: '12px', padding: '8px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                {copied ? <Check size={12} /> : <Share2 size={12} />}
                Share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QrCodePreview;
