import { 
  Utensils, 
  Heart, 
  Instagram, 
  UserCircle, 
  MessageCircle, 
  Wifi, 
  CreditCard, 
  FileUser, 
  Ticket,
  Briefcase,
  Store,
  Share2,
  Globe,
  ShoppingCart,
  Zap
} from 'lucide-react';

export const templateCategories = [
  { id: 'all', label: 'All Templates' },
  { id: 'wedding', label: 'Wedding & RSVP' },
  { id: 'social', label: 'Social Media' },
  { id: 'business', label: 'Business & Professional' },
  { id: 'hospitality', label: 'Hospitality & Events' },
  { id: 'utility', label: 'Utilities' },
];

export const templates = [
  {
    slug: 'restaurant-menu-qr-code',
    id: 'menu-qr-code-generator',
    title: 'Restaurant Menu QR Code Generator',
    shortTitle: 'Restaurant Menu',
    description: 'Create a digital menu QR code for your restaurant. Allow customers to view your menu instantly on their smartphones.',
    seoDescription: 'Generate a professional restaurant menu QR code. Free, easy to use, and perfect for contactless dining. Support for PDF menus and digital links.',
    category: 'hospitality',
    icon: Utensils,
    features: ['Contactless Dining', 'Update Anytime', 'PDF Support'],
    defaultValues: {
      contentType: 'menu-qr-code-generator',
    }
  },
  {
    slug: 'wedding-qr-code-generator',
    id: 'event-qr-generator',
    title: 'Wedding QR Code Generator',
    shortTitle: 'Wedding QR',
    description: 'Create a beautiful QR code for your wedding. Link to your digital invitation, RSVP form, or photo gallery.',
    seoDescription: 'Make your special day tech-savvy with a wedding QR code. Link to RSVPs, registries, and photo sharing. Elegant and easy for guests.',
    category: 'wedding',
    icon: Heart,
    features: ['RSVP Integration', 'Photo Gallery Link', 'Elegant Design'],
    path: '/wedding-rsvp-qr-code-generator',
    defaultValues: {
      contentType: 'event-qr-generator',
    }
  },
  {
    slug: 'wedding-rsvp-qr-code-template',
    id: 'dynamic-qr-generator',
    title: 'Wedding RSVP QR Code Generator',
    shortTitle: 'Wedding RSVP',
    description: 'Collect wedding RSVPs with a scan-first QR flow that sends guests through an elegant RSVP form and then to your wedding details.',
    seoDescription: 'Create a wedding RSVP QR code with elegant templates, digital guest confirmation, and editable wedding links.',
    category: 'wedding',
    icon: Heart,
    features: ['RSVP Form', 'Guest Count', 'Editable Link'],
    path: '/wedding-rsvp-qr-code-generator',
    defaultValues: {
      contentType: 'dynamic-qr-generator',
    }
  },
  {
    slug: 'floral-wedding-rsvp-qr',
    id: 'dynamic-qr-generator',
    title: 'Floral Wedding RSVP QR Template',
    shortTitle: 'Floral RSVP',
    description: 'A romantic floral RSVP QR template for blush, garden, and invitation-suite wedding designs.',
    seoDescription: 'Use a floral wedding RSVP QR template for elegant invitations and digital guest confirmations.',
    category: 'wedding',
    icon: Heart,
    features: ['Floral Style', 'Elegant Palette', 'Invitation Ready'],
    path: '/wedding-rsvp-qr-code-generator#floral-rsvp',
    defaultValues: {
      contentType: 'dynamic-qr-generator',
    }
  },
  {
    slug: 'luxury-gold-wedding-qr',
    id: 'dynamic-qr-generator',
    title: 'Luxury Gold Wedding QR Template',
    shortTitle: 'Luxury Gold',
    description: 'A premium gold wedding QR design for black-tie weddings, formal stationery, and luxury invite suites.',
    seoDescription: 'Create a luxury gold wedding QR code for formal invitations, RSVP cards, and upscale celebration branding.',
    category: 'wedding',
    icon: Heart,
    features: ['Gold Theme', 'Formal Invite', 'Premium Look'],
    path: '/wedding-rsvp-qr-code-generator#luxury-gold-wedding',
    defaultValues: {
      contentType: 'dynamic-qr-generator',
    }
  },
  {
    slug: 'indian-wedding-qr-template',
    id: 'dynamic-qr-generator',
    title: 'Indian Wedding QR Template',
    shortTitle: 'Indian Wedding',
    description: 'Built for multi-day Indian weddings, family invitations, mehendi, sangeet, and reception details.',
    seoDescription: 'Create an Indian wedding QR code for family invites, RSVP flow, and multi-event schedules.',
    category: 'wedding',
    icon: Heart,
    features: ['Multi-event', 'Festive Design', 'Family Friendly'],
    path: '/wedding-rsvp-qr-code-generator#indian-wedding-qr',
    defaultValues: {
      contentType: 'dynamic-qr-generator',
    }
  },
  {
    slug: 'save-the-date-qr-template',
    id: 'dynamic-qr-generator',
    title: 'Save The Date QR Template',
    shortTitle: 'Save The Date',
    description: 'Share your save-the-date with a QR that leads to a wedding website, RSVP page, or digital announcement.',
    seoDescription: 'Create a save-the-date QR code for weddings, engagement announcements, and invitation suites.',
    category: 'wedding',
    icon: Heart,
    features: ['Announcement Ready', 'Wedding Website', 'Shareable'],
    path: '/wedding-rsvp-qr-code-generator#save-the-date-qr',
    defaultValues: {
      contentType: 'dynamic-qr-generator',
    }
  },
  {
    slug: 'reception-qr-template',
    id: 'dynamic-qr-generator',
    title: 'Wedding Reception QR Template',
    shortTitle: 'Reception QR',
    description: 'Ideal for reception tables, wedding menus, photo sharing, and playlist requests.',
    seoDescription: 'Use a wedding reception QR code for menu details, table info, photo albums, and guest experiences.',
    category: 'wedding',
    icon: Heart,
    features: ['Reception Use', 'Guest Experience', 'Menu & Photos'],
    path: '/wedding-rsvp-qr-code-generator#reception-qr',
    defaultValues: {
      contentType: 'dynamic-qr-generator',
    }
  },
  {
    slug: 'instagram-qr-code-generator',
    id: 'instagram-qr-generator',
    title: 'Instagram QR Code Generator',
    shortTitle: 'Instagram QR',
    description: 'Grow your followers with a direct QR code to your Instagram profile or a specific post.',
    seoDescription: 'Create a custom Instagram QR code to boost your social media presence. Direct link to your profile, posts, or reels.',
    category: 'social',
    icon: Instagram,
    features: ['Instant Follow', 'Profile Link', 'Post Deep-linking'],
    defaultValues: {
      contentType: 'instagram-qr-generator',
    }
  },
  {
    slug: 'digital-business-card-qr',
    id: 'vcard-qr-generator',
    title: 'Digital Business Card QR Generator',
    shortTitle: 'Business Card',
    description: 'Share your contact details instantly with a vCard QR code. One scan to save your info to their phone.',
    seoDescription: 'Professional vCard QR code generator. Share your phone, email, and social links instantly. The modern replacement for paper business cards.',
    category: 'business',
    icon: UserCircle,
    features: ['Save to Contacts', 'Professional Info', 'vCard 3.0 Support'],
    defaultValues: {
      contentType: 'vcard-qr-generator',
    }
  },
  {
    slug: 'whatsapp-qr-code-generator',
    id: 'whatsapp-qr-generator',
    title: 'WhatsApp QR Code Generator',
    shortTitle: 'WhatsApp QR',
    description: 'Let people message you on WhatsApp with a single scan. Perfect for customer support or personal use.',
    seoDescription: 'Create a direct WhatsApp QR code with a pre-filled message. Ideal for businesses and personal networking. Scan to chat instantly.',
    category: 'social',
    icon: MessageCircle,
    features: ['Pre-filled Message', 'Scan to Chat', 'Business Support'],
    defaultValues: {
      contentType: 'whatsapp-qr-generator',
    }
  },
  {
    slug: 'wifi-qr-code-generator',
    id: 'wifi-qr-generator',
    title: 'Wi-Fi QR Code Generator',
    shortTitle: 'Wi-Fi QR',
    description: 'Share your Wi-Fi password securely. Guests can scan to join your network without typing a single character.',
    seoDescription: 'Generate a secure Wi-Fi QR code. Let guests connect to your internet instantly by scanning. No more sharing passwords manually.',
    category: 'utility',
    icon: Wifi,
    features: ['Secure Sharing', 'Scan to Connect', 'Supports WPA/WPA2'],
    defaultValues: {
      contentType: 'wifi-qr-generator',
    }
  },
  {
    slug: 'payment-qr-code-generator',
    id: 'upi-qr-generator',
    title: 'Payment QR Code Generator',
    shortTitle: 'Payment QR',
    description: 'Accept payments easily with a payment QR code. Perfect for small businesses and freelancers.',
    seoDescription: 'Create a custom payment QR code for UPI, Bank, or PayPal. Accept payments instantly and securely from any smartphone.',
    category: 'business',
    icon: CreditCard,
    features: ['UPI Support', 'Instant Payments', 'Secure & Reliable'],
    defaultValues: {
      contentType: 'upi-qr-generator',
    }
  },
  {
    slug: 'resume-qr-code-generator',
    id: 'resume-qr-code-generator',
    title: 'Resume & Portfolio QR Generator',
    shortTitle: 'Resume QR',
    description: 'Make your resume stand out. Link recruiters directly to your digital portfolio or LinkedIn profile.',
    seoDescription: 'Stand out to recruiters with a professional resume QR code. Link directly to your portfolio, projects, or digital CV.',
    category: 'business',
    icon: FileUser,
    features: ['Portfolio Link', 'Stand Out', 'Recruiter Friendly'],
    defaultValues: {
      contentType: 'resume-qr-code-generator',
    }
  },
  {
    slug: 'event-ticket-qr-code',
    id: 'event-qr-generator',
    title: 'Event Ticket QR Code Generator',
    shortTitle: 'Event Ticket',
    description: 'Generate QR codes for event tickets, check-ins, and registrations. Manage your attendees with ease.',
    seoDescription: 'Professional event QR code generator. Manage tickets, RSVPs, and entry with secure scan-based verification.',
    category: 'hospitality',
    icon: Ticket,
    features: ['Check-in Ready', 'RSVP Tracking', 'Digital Ticketing'],
    defaultValues: {
      contentType: 'event-qr-generator',
    }
  },
  {
    slug: 'social-media-hub-qr',
    id: 'social-hub-qr-generator',
    title: 'Social Media Hub QR Generator',
    shortTitle: 'Social Hub',
    description: 'A single QR code that links to all your social profiles. Like a mini-website for your digital identity.',
    seoDescription: 'Create a premium social media hub QR code. One link for Instagram, TikTok, YouTube, and more. Modern Linktree alternative.',
    category: 'social',
    icon: Globe,
    features: ['Multi-link Hub', 'Custom Themes', 'Detailed Analytics'],
    defaultValues: {
      contentType: 'social-hub-qr-generator',
    }
  }
];
