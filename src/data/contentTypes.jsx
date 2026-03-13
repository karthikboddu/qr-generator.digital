import { Link, Type, Mail, Phone,Landmark, MessageSquare, Wifi, CreditCard, MapPin, IndianRupee, Calendar, Bitcoin, Facebook, Twitter, Instagram, Youtube, FileText } from 'lucide-react';

export const contentTypes = [
  { id: 'url-qr-generator', label: 'URL', icon: Link, description: 'Generate a QR code for any website or URL.' },
  { id: 'text-qr-generator', label: 'Text', icon: Type, description: 'Generate a QR code for a plain text message.' },
  { id: 'email-qr-generator', label: 'Email', icon: Mail, description: 'Generate a QR code to pre-fill an email.' },
  { id: 'phone-qr-generator', label: 'Phone', icon: Phone, description: 'Generate a QR code to make a phone call.' },
  { id: 'sms-qr-generator', label: 'SMS', icon: MessageSquare, description: 'Generate a QR code to pre-fill an SMS message.' },
  { id: 'whatsapp-qr-generator', label: 'WhatsApp', icon: MessageSquare, description: 'Generate a QR code to start a WhatsApp chat.' },
  { id: 'wifi-qr-generator', label: 'Wi-Fi', icon: Wifi, description: 'Generate a QR code for easy Wi-Fi network access.' },
  { id: 'vcard-qr-generator', label: 'vCard', icon: CreditCard, description: 'Generate a QR code to share contact details.' },
  { id: 'map-qr-generator', label: 'Map', icon: MapPin, description: 'Generate a QR code for a Google Maps location.' },
  { id: 'bank-account-qr-generator', label: 'Bank', icon: Landmark, description: 'Generate a QR code for bank account details.' },
  { id: 'upi-qr-generator', label: 'UPI', icon: IndianRupee, description: 'Generate a QR code for UPI payments.' },
  { id: 'event-qr-generator', label: 'Event', icon: Calendar, description: 'Generate a QR code for an iCalendar event.' },
  { id: 'crypto-qr-generator', label: 'Crypto', icon: Bitcoin, description: 'Generate a QR code for a cryptocurrency transaction.' },
  { id: 'facebook-qr-generator', label: 'Facebook', icon: Facebook, description: 'Generate a QR code for a Facebook profile.' },
  { id: 'twitter-qr-generator', label: 'Twitter', icon: Twitter, description: 'Generate a QR code for a Twitter profile.' },
  { id: 'instagram-qr-generator', label: 'Instagram', icon: Instagram, description: 'Generate a QR code for an Instagram profile.' },
  { id: 'youtube-qr-generator', label: 'YouTube', icon: Youtube, description: 'Generate a QR code for a YouTube channel or video.' },
  { id: 'file-qr-generator', label: 'File URL', icon: FileText, description: 'Generate a QR code to link to a downloadable file.' }

];
