import React, { useState, useMemo, useEffect } from 'react';
import { createEvent } from 'ics';
import QrControls from '../components/QrControls';
// import QrPreview from '../components/QrPreview copy';
import Header from '../components/Header';
import { QR_TYPES } from '../constants';

function QrGenerator() {
  const [activeTab, setActiveTab] = useState(QR_TYPES[0].id);
  
  // Simple inputs
  const [text, setText] = useState('');

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

  // Customization
  const [fgColor, setFgColor] = useState('#0A2540');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [logoImage, setLogoImage] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [frameText, setFrameText] = useState('');
  const [cornerStyle, setCornerStyle] = useState('square');

  useEffect(() => {
    if (logoImage) {
      const url = URL.createObjectURL(logoImage);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl(null);
    }
  }, [logoImage]);

  useEffect(() => {
    const simpleTypes = ['url', 'text', 'email', 'phone', 'facebook', 'twitter', 'instagram', 'youtube', 'file'];
    if (simpleTypes.includes(activeTab)) {
      if (['url', 'facebook', 'twitter', 'instagram', 'youtube', 'file'].includes(activeTab)) {
         setText(text || 'https://');
      }
    } else {
      setText('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
      case 'bank-account':
        if (!bankAccountNumber || !bankIfsc) return '';
        return `BANK:IFSC=${bankIfsc};ACCT=${bankAccountNumber};NAME=${bankBeneficiaryName};BANKNAME=${bbankName};;`;

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
      default:
        return '';
    }
  }, [
    activeTab, text, wifiSsid, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail,
    smsTo, smsBody, whatsappTo, whatsappBody, mapLat, mapLon, upiPa, upiPn, upiAm,
    bankBeneficiaryName, bankAccountNumber, bankIfsc, bbankName,
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

  const customizationProps = {
    fgColor, setFgColor, bgColor, setBgColor,
    logoImage, setLogoImage,
    frameText, setFrameText,
    cornerStyle, setCornerStyle,
  };

  return (
    <div className="space-y-8">
      {/* <Header /> */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="md:col-span-1 lg:col-span-3">
          <QrControls
            qrTypes={QR_TYPES}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            {...stateProps}
            {...customizationProps}
          />
        </div>
        {/* <div className="md:col-span-1 lg:col-span-2">
          <QrPreview
            value={qrValue}
            fgColor={fgColor}
            bgColor={bgColor}
            logoUrl={logoUrl}
            activeTab={activeTab}
            frameText={frameText}
            cornerStyle={cornerStyle}
          />
        </div> */}
      </div>
    </div>
  );
}

export default QrGenerator;
