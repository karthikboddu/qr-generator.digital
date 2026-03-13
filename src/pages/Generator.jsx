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
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';

const ROUTE_TO_TAB = {
  'bank-account-qr-generator': 'bank-account',
  'file-qr-generator': 'file',
};

function getInitialTab(initialContentType) {
  if (!initialContentType || initialContentType === 'url') {
    return 'url';
  }

  return ROUTE_TO_TAB[initialContentType] || initialContentType.replace(/-qr-generator$/, '');
}


function Generator({ initialContentType = 'url' }) {
  const startingTab = getInitialTab(initialContentType);
  const [contentType, setContentType] = useState(startingTab);
  const [qrDataURL, setQrDataURL] = useState('');
  const [activeTab, setActiveTab] = useState(startingTab);
  const navigate = useNavigate();

 // Simple inputs
  const [text, setText] = useState('');

  useEffect(() => {
    const nextTab = getInitialTab(initialContentType);
    setContentType(nextTab);
    setActiveTab(nextTab);
  }, [initialContentType]);

  const currentQrType = QR_TYPES.find((type) => type.id === activeTab) || QR_TYPES[0];
  const generatorPath = activeTab === 'url' ? '/' : `/generator/${activeTab}-qr-generator`;
  const generatorTitle =
    activeTab === 'url' ? 'Free QR Code Generator' : `${currentQrType.name} QR Code Generator`;
  const generatorDescription =
    activeTab === 'url'
      ? 'Create custom QR codes for URLs, Wi-Fi, UPI, vCard, text, social links, and more with instant downloads and logo support.'
      : `Create a ${currentQrType.name} QR code online for free. Customize colors, add a logo, and download your QR code instantly.`;

  const handleContentTypeSelect = (newContentType) => {
    setContentType(newContentType);

    if (newContentType === 'url') {
      navigate('/');
    } else {
      navigate(`/generator/${newContentType}-qr-generator`);
    }
  };

  // Complex inputs
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
          return text;
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
          const startArr = new Date(eventStart).toISOString().split(/[-:.]/);
          const endArr = new Date(eventEnd).toISOString().split(/[-:.]/);
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
                return `Beneficiary: ${bankBeneficiaryName || ''}
                  Account No: ${bankAccountNumber || ''}
                  IFSC: ${bankIfsc || ''}
                  Bank: ${bbankName || ''}`;
        default:
          return '';
      }
    }, [
      activeTab, text, wifiSsid, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail,
      smsTo, smsBody, whatsappTo, whatsappBody, mapLat, mapLon, upiPa, upiPn, upiAm,bankAccountNumber,bankBeneficiaryName, bankIfsc, bbankName,
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
      bankBeneficiaryName, setBankBeneficiaryName,bankAccountNumber, setBankAccountNumber,
      bankIfsc, setBankIfsc, bbankName, setBBankName,
    };
  const [customization, setCustomization] = useState({
    foreground: '#1e3a8a',
    background: '#ffffff',
    cornerStyle: 'square',
    frameText: '',
    logoFile: null,
    logoDataURL: null
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedQrId, setSavedQrId] = useState(null);
  const { user } = useAuth();

  const generateQR = async (output = 'dataURL') => {
    const qrPayload = qrValue || 'https://';
    const options = {
      width: 400,
      margin: 2,
      color: {
        dark: customization.foreground,
        light: customization.background
      },
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

    if (output === 'blob') {
      return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    }
    
    return canvas.toDataURL('image/png');
  };

  useEffect(() => {
    const updateQR = async () => {
      const dataUrl = await generateQR();
      setQrDataURL(dataUrl);
    };
    updateQR();
    setSavedQrId(null); // Reset saved state on change
  }, [qrValue, customization, contentType]);

  const handleSave = async () => {
    if (!user) {
      alert('You must be logged in to save QR codes.');
      return;
    }

    setIsSaving(true);
    try {
      const qrBlob = await generateQR('blob');
      const fileName = `${user.id}/${Date.now()}.png`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('qr_codes')
        .upload(fileName, qrBlob);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('qr_codes')
        .getPublicUrl(fileName);

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
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <Seo
        title={generatorTitle}
        description={generatorDescription}
        path={generatorPath}
        jsonLd={generatorJsonLd}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            {activeTab === 'url' ? 'Free Online QR Code Generator' : `${currentQrType.name} QR Code Generator`}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {activeTab === 'url'
              ? 'No sign-up required. Create and download custom QR codes instantly for URLs, Wi-Fi, UPI, and more.'
              : `Generate, customize, and download a ${currentQrType.name} QR code in seconds.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="space-y-6">
             <ContentTypeSelector
              selected={contentType}
              onSelect={handleContentTypeSelect}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              qrTypes={QR_TYPES}
            />

            <ContentInput
              contentType={contentType}
              value={qrValue}
              onChange={() => {}}
              qrTypes={QR_TYPES}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              {...stateProps}
            />
            <CustomizeDesign
              customization={customization}
              onChange={setCustomization}
            />
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
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

        <InfoSection />
      </div>
    </>
  );
}

export default Generator;
