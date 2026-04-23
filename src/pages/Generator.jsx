import React, { useState, useEffect, useMemo } from 'react';
import { createEvent } from 'ics';
import QRCode from 'qrcode';
import ContentTypeSelector from '../components/ContentTypeSelector';
import ContentInput from '../components/ContentInput';
import CustomizeDesign from '../components/CustomizeDesign';
import InfoSection from '../components/InfoSection';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { QR_TYPES } from '../constants';
import QrCodePreview from '../components/QrCodePreview';
import DynamicQRCreator from '../components/DynamicQRCreator';
import SocialHubBuilder from '../components/SocialHubBuilder';
import PlatformShowcase from '../components/PlatformShowcase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { ArrowRight, BarChart2, Sparkles, Palette, Image } from 'lucide-react';

const ROUTE_TO_TAB = {
  'bank-account-qr-generator': 'bank-account',
  'file-qr-generator': 'file',
  'dynamic-qr-generator': 'dynamic',
  'social-hub-qr-generator': 'social-hub',
  'menu-qr-code-generator': 'menu',
  'google-review-qr-code-generator': 'google-review',
  'resume-qr-code-generator': 'resume',
};

const TAB_TO_ROUTE = {
  'bank-account': 'bank-account-qr-generator',
  dynamic: 'dynamic-qr-generator',
  'social-hub': 'social-hub-qr-generator',
  menu: 'menu-qr-code-generator',
  'google-review': 'google-review-qr-code-generator',
  resume: 'resume-qr-code-generator',
};

function getInitialTab(initialContentType) {
  if (!initialContentType || initialContentType === 'url') return 'url';
  return ROUTE_TO_TAB[initialContentType] || initialContentType.replace(/-qr-generator$/, '');
}

function Generator({ initialContentType = 'url' }) {
  const startingTab = getInitialTab(initialContentType);
  const [contentType, setContentType] = useState(startingTab);
  const [qrDataURL, setQrDataURL] = useState('');
  const [activeTab, setActiveTab] = useState(startingTab);
  const [featureQrValue, setFeatureQrValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [text, setText] = useState('');

  useEffect(() => {
    const nextTab = getInitialTab(initialContentType);
    setContentType(nextTab);
    setActiveTab(nextTab);
  }, [initialContentType]);

  useEffect(() => {
    const queryTab = new URLSearchParams(location.search).get('tab');
    if (queryTab && QR_TYPES.some((type) => type.id === queryTab)) {
      setContentType(queryTab);
      setActiveTab(queryTab);
    }
  }, [location.search]);

  const currentQrType = QR_TYPES.find((type) => type.id === activeTab) || QR_TYPES[0];
  const generatorRoute = TAB_TO_ROUTE[activeTab] || `${activeTab}-qr-generator`;
  const generatorPath = activeTab === 'url' ? '/' : `/generator/${generatorRoute}`;
  const generatorTitle =
    activeTab === 'url' ? 'QR Gen - Free QR Code Generator' : `${currentQrType.name} QR Code Generator`;
  const generatorDescription =
    activeTab === 'url'
      ? 'Create custom static and dynamic QR codes for URLs, Wi-Fi, UPI, menus, social hubs, campaigns, and analytics-driven marketing.'
      : `Create a ${currentQrType.name} QR code online for free. Customize colors, add a logo, and download your QR code instantly.`;

  const handleContentTypeSelect = (newContentType) => {
    setContentType(newContentType);
    if (newContentType === 'url') {
      navigate('/');
    } else {
      navigate(`/generator/${TAB_TO_ROUTE[newContentType] || `${newContentType}-qr-generator`}`);
    }
  };

  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [vcardName, setVcardName] = useState('');
  const [vcardPhone, setVcardPhone] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [smsTo, setSmsTo] = useState('');
  const [smsBody, setSmsBody] = useState('');
  const [whatsappTo, setWhatsappTo] = useState('');
  const [whatsappBody, setWhatsappBody] = useState('');
  const [mapLat, setMapLat] = useState('');
  const [mapLon, setMapLon] = useState('');
  const [upiPa, setUpiPa] = useState('');
  const [upiPn, setUpiPn] = useState('');
  const [upiAm, setUpiAm] = useState('');
  const [bankBeneficiaryName, setBankBeneficiaryName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [bbankName, setBBankName] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [cryptoCoin, setCryptoCoin] = useState('bitcoin');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');

  const qrValue = useMemo(() => {
    switch (activeTab) {
      case 'url':
      case 'text':
      case 'facebook':
      case 'twitter':
      case 'instagram':
      case 'youtube':
      case 'file':
      case 'menu':
      case 'google-review':
      case 'resume':
        return text;
      case 'dynamic':
      case 'social-hub':
        return featureQrValue;
      case 'email':
        return text ? `mailto:${text}` : '';
      case 'phone':
        return text ? `tel:${text}` : '';
      case 'sms':
        if (!smsTo) return '';
        return `smsto:${smsTo}:${smsBody}`;
      case 'whatsapp':
        if (!whatsappTo) return '';
        const encodedBody = encodeURIComponent(whatsappBody);
        return `https://wa.me/${whatsappTo.replace(/\D/g, '')}?text=${encodedBody}`;
      case 'wifi':
        if (!wifiSsid) return '';
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      case 'vcard':
        if (!vcardName && !vcardPhone && !vcardEmail) return '';
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      case 'map':
        if (!mapLat || !mapLon) return '';
        return `geo:${mapLat},${mapLon}`;
      case 'upi':
        if (!upiPa || !upiPn) return '';
        const upiUrl = new URL('upi://pay');
        upiUrl.searchParams.set('pa', upiPa);
        upiUrl.searchParams.set('pn', upiPn);
        if (upiAm) upiUrl.searchParams.set('am', upiAm);
        upiUrl.searchParams.set('cu', 'INR');
        return upiUrl.toString();
      case 'event':
        if (!eventTitle || !eventStart || !eventEnd) return '';
        const startArr = new Date(eventStart).toISOString().split(/\D/);
        const endArr = new Date(eventEnd).toISOString().split(/\D/);
        const event = {
          title: eventTitle,
          start: [Number(startArr[0]), Number(startArr[1]), Number(startArr[2]), Number(startArr[3]), Number(startArr[4])],
          end: [Number(endArr[0]), Number(endArr[1]), Number(endArr[2]), Number(endArr[3]), Number(endArr[4])],
          location: eventLocation,
          description: eventDesc,
        };
        const { value } = createEvent(event);
        return value || '';
      case 'crypto':
        if (!cryptoAddress) return '';
        const cryptoUrl = new URL(`${cryptoCoin}:${cryptoAddress}`);
        if (cryptoAmount) cryptoUrl.searchParams.set('amount', cryptoAmount);
        return cryptoUrl.toString();
      case 'bank-account':
        if (!bankAccountNumber || !bankIfsc) return '';
        return `Beneficiary: ${bankBeneficiaryName || ''}\nAccount No: ${bankAccountNumber || ''}\nIFSC: ${bankIfsc || ''}\nBank: ${bbankName || ''}`;
      default:
        return '';
    }
  }, [
    activeTab, text, featureQrValue, wifiSsid, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail,
    smsTo, smsBody, whatsappTo, whatsappBody, mapLat, mapLon, upiPa, upiPn, upiAm,
    bankAccountNumber, bankBeneficiaryName, bankIfsc, bbankName,
    eventTitle, eventStart, eventEnd, eventLocation, eventDesc,
    cryptoCoin, cryptoAddress, cryptoAmount
  ]);

  const stateProps = {
    text, setText,
    wifiSsid, setWifiSsid, wifiPassword, setWifiPassword, wifiEncryption, setWifiEncryption,
    vcardName, setVcardName, vcardPhone, setVcardPhone, vcardEmail, setVcardEmail,
    smsTo, setSmsTo, smsBody, setSmsBody,
    whatsappTo, setWhatsappTo, whatsappBody, setWhatsappBody,
    mapLat, setMapLat, mapLon, setMapLon,
    upiPa, setUpiPa, upiPn, setUpiPn, upiAm, setUpiAm,
    eventTitle, setEventTitle, eventStart, setEventStart, eventEnd, setEventEnd, eventLocation, setEventLocation, eventDesc, setEventDesc,
    cryptoCoin, setCryptoCoin, cryptoAddress, setCryptoAddress, cryptoAmount, setCryptoAmount,
    bankBeneficiaryName, setBankBeneficiaryName, bankAccountNumber, setBankAccountNumber,
    bankIfsc, setBankIfsc, bbankName, setBBankName,
  };

  const [customization, setCustomization] = useState(() => {
    if (location.state?.initialCustomization) {
      return {
        foreground: '#1e3a8a',
        background: '#ffffff',
        cornerStyle: 'square',
        frameText: '',
        logoFile: null,
        logoDataURL: null,
        ...location.state.initialCustomization
      };
    }
    return {
      foreground: '#1e3a8a',
      background: '#ffffff',
      cornerStyle: 'square',
      frameText: '',
      logoFile: null,
      logoDataURL: null
    };
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedQrId, setSavedQrId] = useState(null);
  const { user } = useAuth();

  const generateQR = async (output = 'dataURL') => {
    const qrPayload = qrValue || 'https://';
    const options = {
      width: 400, margin: 2,
      color: { dark: customization.foreground, light: customization.background },
      errorCorrectionLevel: 'H'
    };

    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, qrPayload, options);
    const ctx = canvas.getContext('2d');

    if (customization.logoDataURL) {
      const img = new Image();
      img.src = customization.logoDataURL;
      await new Promise((resolve) => {
        img.onload = () => {
          const logoSize = canvas.width * 0.2;
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;
          ctx.fillStyle = customization.background;
          ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
          ctx.drawImage(img, x, y, logoSize, logoSize);
          resolve();
        };
      });
    }

    if (output === 'blob') return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return canvas.toDataURL('image/png');
  };

  useEffect(() => {
    const updateQR = async () => {
      const dataUrl = await generateQR();
      setQrDataURL(dataUrl);
    };
    updateQR();
    setSavedQrId(null);
  }, [qrValue, customization, contentType]);

  useEffect(() => {
    setFeatureQrValue('');
  }, [activeTab]);

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save QR codes.');
      return;
    }
    setIsSaving(true);
    try {
      const qrBlob = await generateQR('blob');
      const fileName = `${user.id}/${Date.now()}.png`;

      const { data: uploadData, error: uploadError } = await supabase.storage.from('qr_codes').upload(fileName, qrBlob);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('qr_codes').getPublicUrl(fileName);

      const { data: insertData, error: insertError } = await supabase
        .from('qr_codes')
        .insert({
          user_id: user.id,
          content_type: activeTab,
          content_data: qrValue,
          customization_options: customization,
          image_url: publicUrlData.publicUrl,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      setSavedQrId(insertData.id);
      alert('QR Code saved successfully!');
      return insertData;
    } catch (error) {
      console.error('Error saving QR code:', error);
      alert('Failed to save QR code.');
    } finally {
      setIsSaving(false);
    }
  };

  const generatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: generatorTitle,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    url: `https://qr-generator.digital${generatorPath === '/' ? '' : generatorPath}`,
    description: generatorDescription,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <Seo
        title={generatorTitle}
        description={generatorDescription}
        path={generatorPath}
        jsonLd={generatorJsonLd}
      />

      {/* ===== HERO SECTION ===== */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        paddingTop: '60px',
        paddingBottom: '48px',
        textAlign: 'center',
      }}
        className="grid-bg"
      >
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          {/* Badge */}
          <div style={{ marginBottom: '20px' }}>
            <span className="badge badge-purple">
              <Sparkles size={10} />
              QR Gen growth platform
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(32px, 5vw, 54px)',
            lineHeight: 1.1,
            color: '#f0f0f8',
            margin: '0 0 16px',
            letterSpacing: '-0.03em',
          }}>
            Dynamic QR codes, AI style concepts, and scan analytics.
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: 'rgba(144, 144, 176, 0.9)',
            lineHeight: 1.6,
            margin: '0 auto 28px',
            maxWidth: '520px',
          }}>
            {generatorDescription}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '26px' }}>
            <Link to="/generator/dynamic-qr-generator" className="btn-primary" style={{ textDecoration: 'none' }}>
              Create editable QR
              <ArrowRight size={15} />
            </Link>
            <Link to="/dashboard" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <BarChart2 size={15} />
              View analytics
            </Link>
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {['Dynamic QR', 'Analytics', 'AI styles', 'Social hub', 'PDF menu', 'Bulk CSV', 'UPI', 'Wi-Fi'].map(f => (
              <span key={f} style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '99px',
                fontSize: '12px',
                color: 'rgba(240,240,248,0.6)',
                fontFamily: 'Inter, sans-serif',
              }}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== GENERATOR STUDIO ===== */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '20px',
          alignItems: 'start',
        }}
          className="generator-grid"
        >
          {/* ===== LEFT COLUMN: Steps ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* STEP 1: QR Type */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              {/* Step header */}
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div className="step-badge">1</div>
                <p style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Make QR code from {currentQrType.name}
                </p>
              </div>

              {/* Scrollable type tabs */}
              <div style={{ padding: '0 8px' }}>
                <ContentTypeSelector
                  selected={contentType}
                  onSelect={handleContentTypeSelect}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  qrTypes={QR_TYPES}
                />
              </div>

              {/* Input form */}
              <div style={{ padding: '20px' }}>
                {activeTab === 'dynamic' ? (
                  <DynamicQRCreator customization={customization} onQrValueChange={setFeatureQrValue} />
                ) : activeTab === 'social-hub' ? (
                  <SocialHubBuilder onQrValueChange={setFeatureQrValue} />
                ) : (
                  <ContentInput
                    contentType={contentType}
                    value={qrValue}
                    onChange={() => {}}
                    qrTypes={QR_TYPES}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    {...stateProps}
                  />
                )}
              </div>
            </div>

            {/* STEP 2: Choose Your QR Code Style */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div className="step-badge">2</div>
                <p style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Choose Your QR Code Style
                </p>
              </div>
              <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {[
                  { id: 'custom', label: 'Custom QR', sub: 'Design your own', icon: Palette, active: true },
                  { id: 'image', label: 'Image QR', sub: 'With background image', icon: Image, active: false },
                  { id: 'art', label: 'QR Art', sub: 'AI-generated design', icon: Sparkles, active: false },
                ].map(s => (
                  <div 
                    key={s.id}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      background: s.active ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.03)',
                      border: s.active ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: s.active ? 'pointer' : 'not-allowed',
                      textAlign: 'center',
                      opacity: s.active ? 1 : 0.6,
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ 
                      width: '40px', height: '40px', margin: '0 auto 12px',
                      borderRadius: '10px', background: s.active ? '#6366f1' : 'rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <s.icon size={20} color="#fff" />
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>{s.label}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 3: Design Your QR Code */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div className="step-badge">3</div>
                <p style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Design Your QR Code
                </p>
              </div>
              <div style={{ padding: '16px' }}>
                <CustomizeDesign customization={customization} onChange={setCustomization} />
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: Preview ===== */}
          <div style={{ position: 'sticky', top: '84px' }}>
            <QrCodePreview
              qrDataURL={qrDataURL}
              value={qrValue}
              customization={customization}
              activeTab={activeTab}
              onSave={handleSave}
              isSaving={isSaving}
              savedQrId={savedQrId}
            />
          </div>
        </div>

        <PlatformShowcase />

        {/* Info Section */}
        <div style={{ marginTop: '80px' }}>
          <InfoSection activeTab={activeTab} currentQrTypeName={currentQrType.name} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .generator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

export default Generator;
