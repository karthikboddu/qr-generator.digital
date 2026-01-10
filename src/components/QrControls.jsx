import React from 'react';
import { Palette, Image as ImageIcon, X, Square, Circle, ScanLine } from 'lucide-react';
import { cn } from '../lib/utils';

const SimpleInput = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full p-3 bg-input border border-border rounded-md focus:ring-2 focus:ring-ring focus:outline-none transition-shadow"
  />
);

const TextAreaInput = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full min-h-[100px] p-3 bg-input border border-border rounded-md focus:ring-2 focus:ring-ring focus:outline-none transition-shadow"
  />
);

const WifiInput = ({ ssid, setSsid, password, setPassword, encryption, setEncryption }) => (
  <div className="space-y-3">
    <SimpleInput value={ssid} onChange={setSsid} placeholder="Network Name / SSID" />
    <SimpleInput type="password" value={password} onChange={setPassword} placeholder="Password" />
    <select value={encryption} onChange={e => setEncryption(e.target.value)} className="w-full p-3 bg-input border rounded-md focus:ring-2 focus:ring-ring focus:outline-none appearance-none">
      <option value="WPA">WPA/WPA2</option>
      <option value="WEP">WEP</option>
      <option value="nopass">None</option>
    </select>
  </div>
);

const VCardInput = ({ name, setName, phone, setPhone, email, setEmail }) => (
  <div className="space-y-3">
    <SimpleInput value={name} onChange={setName} placeholder="Name" />
    <SimpleInput type="tel" value={phone} onChange={setPhone} placeholder="Phone" />
    <SimpleInput type="email" value={email} onChange={setEmail} placeholder="Email" />
  </div>
);

const SmsInput = ({ to, setTo, body, setBody }) => (
  <div className="space-y-3">
    <SimpleInput type="tel" value={to} onChange={setTo} placeholder="Phone Number" />
    <TextAreaInput value={body} onChange={setBody} placeholder="Message" />
  </div>
);

const WhatsappInput = ({ to, setTo, body, setBody }) => (
  <div className="space-y-3">
    <SimpleInput type="tel" value={to} onChange={setTo} placeholder="Phone Number (with country code)" />
    <TextAreaInput value={body} onChange={setBody} placeholder="Initial Message (optional)" />
  </div>
);

const MapInput = ({ lat, setLat, lon, setLon }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <SimpleInput value={lat} onChange={setLat} placeholder="Latitude (e.g., 40.7128)" />
    <SimpleInput value={lon} onChange={setLon} placeholder="Longitude (e.g., -74.0060)" />
  </div>
);

const UpiInput = ({ pa, setPa, pn, setPn, am, setAm }) => (
  <div className="space-y-3">
    <SimpleInput value={pa} onChange={setPa} placeholder="UPI ID (e.g. user@bank)" />
    <SimpleInput value={pn} onChange={setPn} placeholder="Payee Name" />
    <SimpleInput type="number" value={am} onChange={setAm} placeholder="Amount (optional)" />
  </div>
);

const EventInput = ({ title, setTitle, start, setStart, end, setEnd, location, setLocation, description, setDescription }) => (
  <div className="space-y-3">
    <SimpleInput value={title} onChange={setTitle} placeholder="Event Title" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="text-xs text-muted-foreground">Start Time</label>
        <SimpleInput type="datetime-local" value={start} onChange={setStart} />
      </div>
      <div>
        <label className="text-xs text-muted-foreground">End Time</label>
        <SimpleInput type="datetime-local" value={end} onChange={setEnd} />
      </div>
    </div>
    <SimpleInput value={location} onChange={setLocation} placeholder="Location" />
    <TextAreaInput value={description} onChange={setDescription} placeholder="Description" />
  </div>
);

const CryptoInput = ({ coin, setCoin, address, setAddress, amount, setAmount }) => (
  <div className="space-y-3">
    <select value={coin} onChange={e => setCoin(e.target.value)} className="w-full p-3 bg-input border rounded-md focus:ring-2 focus:ring-ring focus:outline-none appearance-none">
      <option value="bitcoin">Bitcoin (BTC)</option>
      <option value="ethereum">Ethereum (ETH)</option>
      <option value="litecoin">Litecoin (LTC)</option>
      <option value="dogecoin">Dogecoin (DOGE)</option>
    </select>
    <SimpleInput value={address} onChange={setAddress} placeholder="Wallet Address" />
    <SimpleInput type="number" value={amount} onChange={setAmount} placeholder="Amount (optional)" />
  </div>
);


function QrControls({
  qrTypes, activeTab, setActiveTab,
  text, setText,
  wifiSsid, setWifiSsid, wifiPassword, setWifiPassword, wifiEncryption, setWifiEncryption,
  vcardName, setVcardName, vcardPhone, setVcardPhone, vcardEmail, setVcardEmail,
  smsTo, setSmsTo, smsBody, setSmsBody,
  whatsappTo, setWhatsappTo, whatsappBody, setWhatsappBody,
  mapLat, setMapLat, mapLon, setMapLon,
  upiPa, setUpiPa, upiPn, setUpiPn, upiAm, setUpiAm,
  eventTitle, setEventTitle, eventStart, setEventStart, eventEnd, setEventEnd, eventLocation, setEventLocation, eventDesc, setEventDesc,
  cryptoCoin, setCryptoCoin, cryptoAddress, setCryptoAddress, cryptoAmount, setCryptoAmount,
  fgColor, setFgColor, bgColor, setBgColor,
  setLogoImage, logoImage,
  frameText, setFrameText,
  cornerStyle, setCornerStyle,
}) {

  const renderInputs = () => {
    const currentType = qrTypes.find(t => t.id === activeTab);
    const placeholder = currentType?.placeholder || '';
    
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
      default: // for url, email, phone, socials, file
        return <SimpleInput value={text} onChange={setText} placeholder={placeholder} type={activeTab === 'url' ? 'url' : 'text'} />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-foreground mb-3">Content Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {qrTypes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center justify-center text-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              )}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-lg font-medium text-foreground">
          Your Content
        </label>
        <div className="mt-2">{renderInputs()}</div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            Customize Design
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-md">
              <label htmlFor="fgColor" className="text-sm font-medium text-secondary-foreground">Foreground</label>
              <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border">
                <input type="color" id="fgColor" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-md">
              <label htmlFor="bgColor" className="text-sm font-medium text-secondary-foreground">Background</label>
              <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border">
                <input type="color" id="bgColor" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-4">
             <label className="text-sm font-medium text-secondary-foreground">Corners</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button onClick={() => setCornerStyle('square')} className={cn("flex items-center justify-center gap-2 p-3 rounded-md", cornerStyle === 'square' ? 'bg-purple-600 text-white' : 'bg-input')}>
                <Square className="w-5 h-5" /> Square
              </button>
              <button onClick={() => setCornerStyle('rounded')} className={cn("flex items-center justify-center gap-2 p-3 rounded-md", cornerStyle === 'rounded' ? 'bg-purple-600 text-white' : 'bg-input')}>
                <Circle className="w-5 h-5" /> Rounded
              </button>
            </div>
          </div>
        </div>

        <div>
           <h2 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-purple-400" />
            Add Frame
          </h2>
          <SimpleInput value={frameText} onChange={setFrameText} placeholder="SCAN ME" />
        </div>

        <div>
          <h2 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            Add Logo
          </h2>
          {logoImage ? (
            <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
              <p className="text-sm text-muted-foreground truncate w-48">{logoImage.name}</p>
              <button onClick={() => setLogoImage(null)} className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label htmlFor="logo-upload" className="cursor-pointer w-full flex justify-center px-6 py-10 border-2 border-dashed border-border rounded-md hover:border-primary transition-colors">
              <div className="text-center">
                <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, SVG up to 1MB</p>
              </div>
              <input id="logo-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => setLogoImage(e.target.files[0])} />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default QrControls;
