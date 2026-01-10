import React from 'react';

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

const BankAccountInput = ( {beneficiaryName, setBeneficiaryName,accountNumber, setAccountNumber,
   ifsc, setIfsc, bankName, setBankName}) => (
  <div className="space-y-3">
    <SimpleInput type="number" value={beneficiaryName} onChange={setBeneficiaryName} placeholder="Beneficiary Name" />
    <SimpleInput value={accountNumber} onChange={setAccountNumber} placeholder="Account Number" />
    <SimpleInput value={ifsc} onChange={setIfsc} placeholder="IFSC Code" />
    <SimpleInput value={bankName} onChange={setBankName} placeholder="Bank Name" />
  
  </div>
   );
// const BankAccountInput = ({ pa, setPa, pn, setPn, am, setAm }) => (
//   <div className="space-y-3">
//     <SimpleInput value={pa} onChange={setPa} placeholder="UPI1 ID (e.g. user@bank)" />
//     <SimpleInput value={pn} onChange={setPn} placeholder="Payee Name" />
//     <SimpleInput type="number" value={am} onChange={setAm} placeholder="Amount (optional)" />
//   </div>
// );

function ContentInput({ contentType, value, onChange,  qrTypes, activeTab, setActiveTab,
  text, setText,
  wifiSsid, setWifiSsid, wifiPassword, setWifiPassword, wifiEncryption, setWifiEncryption,
  vcardName, setVcardName, vcardPhone, setVcardPhone, vcardEmail, setVcardEmail,
  smsTo, setSmsTo, smsBody, setSmsBody,
  whatsappTo, setWhatsappTo, whatsappBody, setWhatsappBody,
  mapLat, setMapLat, mapLon, setMapLon,
  upiPa, setUpiPa, upiPn, setUpiPn, upiAm, setUpiAm,
   bankBeneficiaryName, setBankBeneficiaryName,bankAccountNumber, setBankAccountNumber,
   bankIfsc, setBankIfsc, bbankName, setBBankName,
  eventTitle, setEventTitle, eventStart, setEventStart, eventEnd, setEventEnd, eventLocation, setEventLocation, eventDesc, setEventDesc,
  cryptoCoin, setCryptoCoin, cryptoAddress, setCryptoAddress, cryptoAmount, setCryptoAmount }) {
  

  const renderInputs = () => {
    const currentType = qrTypes.find(t => t.id === activeTab);
    const placeholder = currentType?.placeholder || '';
    console.log(activeTab, "rendering inputs for type" );
    
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
        return <BankAccountInput beneficiaryName={bankBeneficiaryName} setBeneficiaryName={setBankBeneficiaryName}
          setAccountNumber = {setBankAccountNumber} accountNumber = {bankAccountNumber}
          ifsc = {bankIfsc} setIfsc = {setBankIfsc} 
           bankName ={bbankName} setBankName ={setBBankName} 
           />;  
      default: // for url, email, phone, socials, file
        return <SimpleInput value={text} onChange={setText} placeholder={placeholder} type={activeTab === 'url' ? 'url' : 'text'} />;
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Content</h3>
      <div className="mt-2">{renderInputs()}</div>
    </div>
  );
}

export default ContentInput;
