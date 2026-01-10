import React, {useState} from 'react';
import { Link, Type, Mail, Phone, MessageSquare, Wifi, CreditCard, MapPin, IndianRupee, Calendar, Bitcoin, Facebook, Twitter, Instagram, Youtube, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const contentTypes = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'vCard', icon: CreditCard },
  { id: 'map', label: 'Map', icon: MapPin },
  { id: 'upi', label: 'UPI', icon: IndianRupee },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
  { id: 'twitter', label: 'Twitter', icon: Twitter },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'fileurl', label: 'File URL', icon: FileText }
];

function ContentTypeSelector({ selected, onSelect ,activeTab, setActiveTab, qrTypes}) {

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {qrTypes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                onSelect(tab.id)
                }
              }
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
  );
}

export default ContentTypeSelector;
