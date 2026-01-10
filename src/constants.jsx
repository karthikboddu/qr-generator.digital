import { Wifi, User, Link, Type, Mail, Phone,Landmark, MessageSquare, MessageCircle, Facebook, Twitter, Instagram, Youtube, MapPin, File as FileIcon, IndianRupee, Calendar, Bitcoin } from 'lucide-react';

export const QR_TYPES = [
  { id: 'url', name: 'URL', placeholder: 'https://example.com', icon: <Link className="w-4 h-4" /> },
  { id: 'text', name: 'Text', placeholder: 'Enter your text', icon: <Type className="w-4 h-4" /> },
  { id: 'email', name: 'Email', placeholder: 'user@example.com', icon: <Mail className="w-4 h-4" /> },
  { id: 'phone', name: 'Phone', placeholder: '1234567890', icon: <Phone className="w-4 h-4" /> },
  { id: 'sms', name: 'SMS', placeholder: 'Phone number', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'whatsapp', name: 'WhatsApp', placeholder: 'Phone number with country code', icon: <MessageCircle className="w-4 h-4" /> },
  { id: 'wifi', name: 'Wi-Fi', placeholder: 'Network Name/SSID', icon: <Wifi className="w-4 h-4" /> },
  { id: 'vcard', name: 'vCard', placeholder: 'Your Name', icon: <User className="w-4 h-4" /> },
  { id: 'map', name: 'Map', placeholder: 'Latitude', icon: <MapPin className="w-4 h-4" /> },
  { id: 'upi', name: 'UPI', placeholder: 'your-upi-id@okhdfcbank', icon: <IndianRupee className="w-4 h-4" /> },
    // { id: 'bank-account', name: 'Bank',placeholder: 'your account number', icon: <Landmark className="w-4 h-4"/>, description: 'Generate a QR code for bank account details.' },
  { id: 'event', name: 'Event', placeholder: 'Event Title', icon: <Calendar className="w-4 h-4" /> },
  { id: 'crypto', name: 'Crypto', placeholder: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', icon: <Bitcoin className="w-4 h-4" /> },
  { id: 'facebook', name: 'Facebook', placeholder: 'https://facebook.com/username', icon: <Facebook className="w-4 h-4" /> },
  { id: 'twitter', name: 'Twitter', placeholder: 'https://twitter.com/username', icon: <Twitter className="w-4 h-4" /> },
  { id: 'instagram', name: 'Instagram', placeholder: 'https://instagram.com/username', icon: <Instagram className="w-4 h-4" /> },
  { id: 'youtube', name: 'YouTube', placeholder: 'https://youtube.com/channel/ID', icon: <Youtube className="w-4 h-4" /> },
  { id: 'file', name: 'File URL', placeholder: 'https://example.com/document.pdf', icon: <FileIcon className="w-4 h-4" /> },
];
