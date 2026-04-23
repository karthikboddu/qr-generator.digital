import React, { useState } from 'react';
import { Upload, FileText, Check, Loader } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '10px',
  color: '#f0f0f8',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  transition: 'all 0.2s',
  outline: 'none',
};

const inputFocus = {
  borderColor: '#6366f1',
  background: 'rgba(99, 102, 241, 0.05)',
  boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
};

const SimpleInput = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="dark-input"
    style={{ '--placeholder-color': 'var(--text-muted)' }}
  />
);

const TextAreaInput = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="dark-textarea"
    rows={4}
  />
);

const LabeledInput = ({ label, children }) => (
  <div>
    <label className="form-label">{label}</label>
    {children}
  </div>
);

const WifiInput = ({ ssid, setSsid, password, setPassword, encryption, setEncryption }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Network Name (SSID)">
      <SimpleInput value={ssid} onChange={setSsid} placeholder="MyWiFiNetwork" />
    </LabeledInput>
    <LabeledInput label="Password">
      <SimpleInput type="password" value={password} onChange={setPassword} placeholder="••••••••" />
    </LabeledInput>
    <LabeledInput label="Security Type">
      <select value={encryption} onChange={e => setEncryption(e.target.value)} className="dark-select">
        <option value="WPA">WPA / WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">None</option>
      </select>
    </LabeledInput>
  </div>
);

const VCardInput = ({ name, setName, phone, setPhone, email, setEmail }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Full Name">
      <SimpleInput value={name} onChange={setName} placeholder="John Doe" />
    </LabeledInput>
    <LabeledInput label="Phone Number">
      <SimpleInput type="tel" value={phone} onChange={setPhone} placeholder="+1 234 567 8900" />
    </LabeledInput>
    <LabeledInput label="Email Address">
      <SimpleInput type="email" value={email} onChange={setEmail} placeholder="john@example.com" />
    </LabeledInput>
  </div>
);

const SmsInput = ({ to, setTo, body, setBody }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Phone Number">
      <SimpleInput type="tel" value={to} onChange={setTo} placeholder="+1 234 567 8900" />
    </LabeledInput>
    <LabeledInput label="Message">
      <TextAreaInput value={body} onChange={setBody} placeholder="Your message..." />
    </LabeledInput>
  </div>
);

const WhatsappInput = ({ to, setTo, body, setBody }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Phone Number (with country code)">
      <SimpleInput type="tel" value={to} onChange={setTo} placeholder="+1 234 567 8900" />
    </LabeledInput>
    <LabeledInput label="Pre-filled Message (optional)">
      <TextAreaInput value={body} onChange={setBody} placeholder="Hello..." />
    </LabeledInput>
  </div>
);

const MapInput = ({ lat, setLat, lon, setLon }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
    <LabeledInput label="Latitude">
      <SimpleInput value={lat} onChange={setLat} placeholder="40.7128" />
    </LabeledInput>
    <LabeledInput label="Longitude">
      <SimpleInput value={lon} onChange={setLon} placeholder="-74.0060" />
    </LabeledInput>
  </div>
);

const UpiInput = ({ pa, setPa, pn, setPn, am, setAm }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="UPI ID">
      <SimpleInput value={pa} onChange={setPa} placeholder="yourname@okhdfcbank" />
    </LabeledInput>
    <LabeledInput label="Payee Name">
      <SimpleInput value={pn} onChange={setPn} placeholder="John Doe" />
    </LabeledInput>
    <LabeledInput label="Amount (optional)">
      <SimpleInput type="number" value={am} onChange={setAm} placeholder="0.00" />
    </LabeledInput>
  </div>
);

const EventInput = ({ title, setTitle, start, setStart, end, setEnd, location, setLocation, description, setDescription }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Event Title">
      <SimpleInput value={title} onChange={setTitle} placeholder="My Event" />
    </LabeledInput>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <LabeledInput label="Start Time">
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="dark-input" />
      </LabeledInput>
      <LabeledInput label="End Time">
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="dark-input" />
      </LabeledInput>
    </div>
    <LabeledInput label="Location">
      <SimpleInput value={location} onChange={setLocation} placeholder="New York, USA" />
    </LabeledInput>
    <LabeledInput label="Description">
      <TextAreaInput value={description} onChange={setDescription} placeholder="Event details..." />
    </LabeledInput>
  </div>
);

const CryptoInput = ({ coin, setCoin, address, setAddress, amount, setAmount }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Cryptocurrency">
      <select value={coin} onChange={e => setCoin(e.target.value)} className="dark-select">
        <option value="bitcoin">Bitcoin (BTC)</option>
        <option value="ethereum">Ethereum (ETH)</option>
        <option value="litecoin">Litecoin (LTC)</option>
        <option value="dogecoin">Dogecoin (DOGE)</option>
      </select>
    </LabeledInput>
    <LabeledInput label="Wallet Address">
      <SimpleInput value={address} onChange={setAddress} placeholder="bc1qar0srrr7xfkvy5l..." />
    </LabeledInput>
    <LabeledInput label="Amount (optional)">
      <SimpleInput type="number" value={amount} onChange={setAmount} placeholder="0.000" />
    </LabeledInput>
  </div>
);

const BankAccountInput = ({ beneficiaryName, setBeneficiaryName, accountNumber, setAccountNumber, ifsc, setIfsc, bankName, setBankName }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <LabeledInput label="Beneficiary Name">
      <SimpleInput value={beneficiaryName} onChange={setBeneficiaryName} placeholder="John Doe" />
    </LabeledInput>
    <LabeledInput label="Account Number">
      <SimpleInput value={accountNumber} onChange={setAccountNumber} placeholder="00001234567890" />
    </LabeledInput>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <LabeledInput label="IFSC Code">
        <SimpleInput value={ifsc} onChange={setIfsc} placeholder="HDFC0000001" />
      </LabeledInput>
      <LabeledInput label="Bank Name">
        <SimpleInput value={bankName} onChange={setBankName} placeholder="HDFC Bank" />
      </LabeledInput>
    </div>
  </div>
);

const FileHostingInput = ({ value, onChange, label = 'Upload PDF / File' }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!user) {
      setError('Please sign in to upload and host files.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      const filePath = `hosted_files/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('qr_codes') // Reusing the same bucket for now, or create a new one
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('qr_codes')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <LabeledInput label={label}>
        <div 
          onClick={() => document.getElementById('file-upload').click()}
          style={{
            border: '2px dashed rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '32px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
        >
          <input id="file-upload" type="file" onChange={handleUpload} style={{ display: 'none' }} />
          
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Loader size={24} color="#6366f1" className="animate-spin" />
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Uploading file...</p>
            </div>
          ) : value ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Check size={24} color="#4ade80" />
              <p style={{ fontSize: '13px', color: '#4ade80', fontWeight: 600 }}>File Linked Successfully</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{value}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Upload size={24} color="var(--text-muted)" />
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Click to upload PDF or Image</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Max size: 5MB</p>
            </div>
          )}
        </div>
      </LabeledInput>
      
      {error && <p style={{ fontSize: '12px', color: '#f87171', margin: 0 }}>{error}</p>}
      
      {value && (
        <button 
          onClick={() => onChange('')} 
          className="btn-ghost" 
          style={{ fontSize: '12px', color: '#f87171', alignSelf: 'flex-start' }}
        >
          Remove File
        </button>
      )}
    </div>
  );
};

function ContentInput({
  contentType, value, onChange, qrTypes, activeTab, setActiveTab,
  text, setText,
  wifiSsid, setWifiSsid, wifiPassword, setWifiPassword, wifiEncryption, setWifiEncryption,
  vcardName, setVcardName, vcardPhone, setVcardPhone, vcardEmail, setVcardEmail,
  smsTo, setSmsTo, smsBody, setSmsBody,
  whatsappTo, setWhatsappTo, whatsappBody, setWhatsappBody,
  mapLat, setMapLat, mapLon, setMapLon,
  upiPa, setUpiPa, upiPn, setUpiPn, upiAm, setUpiAm,
  bankBeneficiaryName, setBankBeneficiaryName, bankAccountNumber, setBankAccountNumber,
  bankIfsc, setBankIfsc, bbankName, setBBankName,
  eventTitle, setEventTitle, eventStart, setEventStart, eventEnd, setEventEnd, eventLocation, setEventLocation, eventDesc, setEventDesc,
  cryptoCoin, setCryptoCoin, cryptoAddress, setCryptoAddress, cryptoAmount, setCryptoAmount,
}) {
  const currentType = qrTypes.find(t => t.id === activeTab);
  const placeholder = currentType?.placeholder || '';

  const renderInputs = () => {
    switch (activeTab) {
      case 'wifi':
        return <WifiInput ssid={wifiSsid} setSsid={setWifiSsid} password={wifiPassword} setPassword={setWifiPassword} encryption={wifiEncryption} setEncryption={setWifiEncryption} />;
      case 'vcard':
        return <VCardInput name={vcardName} setName={setVcardName} phone={vcardPhone} setPhone={setVcardPhone} email={vcardEmail} setEmail={setVcardEmail} />;
      case 'sms':
        return <SmsInput to={smsTo} setTo={setSmsTo} body={smsBody} setBody={setSmsBody} />;
      case 'whatsapp':
        return <WhatsappInput to={whatsappTo} setTo={setWhatsappTo} body={whatsappBody} setBody={setWhatsappBody} />;
      case 'map':
        return <MapInput lat={mapLat} setLat={setMapLat} lon={mapLon} setLon={setMapLon} />;
      case 'upi':
        return <UpiInput pa={upiPa} setPa={setUpiPa} pn={upiPn} setPn={setUpiPn} am={upiAm} setAm={setUpiAm} />;
      case 'event':
        return <EventInput title={eventTitle} setTitle={setEventTitle} start={eventStart} setStart={setEventStart} end={eventEnd} setEnd={setEventEnd} location={eventLocation} setLocation={setEventLocation} description={eventDesc} setDescription={setEventDesc} />;
      case 'crypto':
        return <CryptoInput coin={cryptoCoin} setCoin={setCryptoCoin} address={cryptoAddress} setAddress={setCryptoAddress} amount={cryptoAmount} setAmount={setCryptoAmount} />;
      case 'text':
        return <TextAreaInput value={text} onChange={setText} placeholder={placeholder} />;
      case 'bank-account':
        return (
          <BankAccountInput
            beneficiaryName={bankBeneficiaryName} setBeneficiaryName={setBankBeneficiaryName}
            accountNumber={bankAccountNumber} setAccountNumber={setBankAccountNumber}
            ifsc={bankIfsc} setIfsc={setBankIfsc}
            bankName={bbankName} setBankName={setBBankName}
          />
        );
      case 'file':
      case 'menu':
        return <FileHostingInput value={text} onChange={setText} label={activeTab === 'menu' ? 'Upload Restaurant Menu (PDF)' : 'Upload File to Link'} />;
      default:
        return <SimpleInput value={text} onChange={setText} placeholder={placeholder} type={activeTab === 'url' ? 'url' : 'text'} />;
    }
  };

  return (
    <div style={{ marginTop: '4px' }}>
      {renderInputs()}
    </div>
  );
}

export default ContentInput;
