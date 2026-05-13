import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart2,
  Code,
  CreditCard,
  Download,
  FileText,
  Globe,
  Heart,
  Instagram,
  Lock,
  MapPin,
  Package,
  Palette,
  QrCode,
  Search,
  Shield,
  Sparkles,
  Star,
  Utensils,
  Wifi,
  Zap,
} from 'lucide-react';

const growthFeatures = [
  {
    icon: Zap,
    title: 'Dynamic QR codes',
    body: 'Edit destinations after printing, pause campaigns, add expiry dates, and route traffic by device.',
    stat: 'Editable',
  },
  {
    icon: BarChart2,
    title: 'Analytics dashboard',
    body: 'Track scans, devices, browsers, scan timeline, peak hours, and campaign performance from one place.',
    stat: 'Trackable',
  },
  {
    icon: Globe,
    title: 'Social media QR hub',
    body: 'One QR opens Instagram, YouTube, WhatsApp, LinkedIn, website, coupons, and booking links.',
    stat: 'Link hub',
  },
  {
    icon: FileText,
    title: 'PDF and menu hosting',
    body: 'Upload menus or documents and update them later without reprinting a QR code.',
    stat: 'Menus',
  },
  {
    icon: Package,
    title: 'Bulk QR generator',
    body: 'Upload CSV data and generate hundreds of QR codes for inventory, schools, events, and packaging.',
    stat: 'CSV',
  },
  {
    icon: Shield,
    title: 'Lead and access control',
    body: 'Use password gates, landing pages, and lead-capture flows for campaigns that need conversion data.',
    stat: 'Growth',
  },
];

const templateCards = [
  { icon: Heart, label: 'Wedding RSVP QR', to: '/wedding-rsvp-qr-code-generator', color: '#f472b6' },
  { icon: Instagram, label: 'Instagram QR', to: '/generator/instagram-qr-generator', color: '#f472b6' },
  { icon: Wifi, label: 'WiFi QR', to: '/generator/wifi-qr-generator', color: '#22d3ee' },
  { icon: CreditCard, label: 'UPI QR', to: '/generator/upi-qr-generator', color: '#34d399' },
  { icon: Utensils, label: 'Restaurant menu', to: '/generator/menu-qr-code-generator', color: '#fb923c' },
  { icon: Star, label: 'Google review', to: '/generator/google-review-qr-code-generator', color: '#facc15' },
  { icon: FileText, label: 'Resume QR', to: '/generator/resume-qr-code-generator', color: '#a78bfa' },
];

const aiStyles = ['Cafe cozy', 'Anime neon', 'Cyberpunk', 'Wedding gold', 'Festival lights', 'Luxury minimal'];

function PlatformShowcase() {
  return (
    <div className="platform-showcase" id="features">
      <section className="growth-grid-section">
        <div className="section-kicker">
          <Sparkles size={14} />
          Growth features
        </div>
        <div className="section-heading-row">
          <div>
            <h2>Move from a simple generator to a QR marketing platform.</h2>
            <p>
              The new experience highlights the features businesses pay for: editable QR links, analytics,
              social hubs, menu hosting, bulk creation, and campaign controls.
            </p>
          </div>
          <Link to="/generator/dynamic-qr-generator" className="btn-primary platform-cta">
            Create dynamic QR
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="growth-feature-grid">
          {growthFeatures.map(({ icon: Icon, title, body, stat }) => (
            <article key={title} className="growth-feature-card">
              <div className="growth-feature-icon">
                <Icon size={20} />
              </div>
              <span>{stat}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="analytics-showcase">
        <div className="analytics-copy">
          <div className="section-kicker">
            <BarChart2 size={14} />
            Retention engine
          </div>
          <h2>Scan analytics that turn printed QR codes into measurable campaigns.</h2>
          <p>
            Give restaurants, marketers, events, schools, and packaging teams clear reporting:
            total scans, unique scans, devices, browser mix, timeline, and export-ready insights.
          </p>
          <div className="analytics-points">
            <span><MapPin size={14} /> Country and city ready</span>
            <span><Download size={14} /> CSV/PDF report positioning</span>
            <span><Lock size={14} /> Pause and protect campaigns</span>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <strong>Campaign analytics</strong>
              <span>Spring cafe menu</span>
            </div>
            <span className="live-dot">Live</span>
          </div>
          <div className="analytics-stats">
            <div><strong>12.8K</strong><span>Total scans</span></div>
            <div><strong>8.4K</strong><span>Unique scans</span></div>
            <div><strong>42%</strong><span>Mobile growth</span></div>
          </div>
          <div className="chart-bars" aria-hidden="true">
            {[42, 58, 36, 74, 66, 88, 54, 92, 76, 63, 84, 69].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="device-split">
            <span>Mobile <b>71%</b></span>
            <span>Desktop <b>21%</b></span>
            <span>Tablet <b>8%</b></span>
          </div>
        </div>
      </section>

      <section className="ai-template-section">
        <div className="ai-card">
          <div className="section-kicker">
            <Palette size={14} />
            Viral design
          </div>
          <h2>AI styled QR concepts for social sharing.</h2>
          <p>
            Position QR Gen around artistic QR prompts: coffee themes, anime, neon, cyberpunk,
            festival posters, wedding invitations, and brand-led visual systems.
          </p>
          <div className="prompt-box">
            <span>Prompt</span>
            Create a coffee-themed QR for my cafe with warm latte colors and a bold scan frame.
          </div>
          <div className="style-chip-row">
            {aiStyles.map((style) => <span key={style}>{style}</span>)}
          </div>
        </div>

        <div className="qr-art-board" aria-label="AI QR style previews">
          {['#f97316', '#22d3ee', '#a78bfa', '#facc15'].map((color, index) => (
            <div key={color} className="art-qr" style={{ '--tile-color': color, '--tile-delay': `${index * 0.25}s` }}>
              <QrCode size={58} />
              <span />
            </div>
          ))}
        </div>
      </section>

      <section className="template-marketplace-section" id="templates">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">
              <Search size={14} />
              SEO landing pages
            </div>
            <h2>One QR tool per keyword, built for organic traffic.</h2>
            <p>
              Dedicated generator pages can target high-intent searches like WiFi QR generator,
              UPI QR generator, restaurant menu QR code, Instagram QR code, and Google review QR.
            </p>
          </div>
          <Link to="/blog" className="btn-secondary platform-cta">
            Read QR guides
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="template-grid">
          {templateCards.map(({ icon: Icon, label, to, color }) => (
            <Link key={label} to={to} className="template-card" style={{ '--template-color': color }}>
              <Icon size={20} />
              <strong>{label}</strong>
              <span>Open generator</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="trust-tool-section">
        <div className="scan-test-card">
          <div className="section-kicker">
            <QrCode size={14} />
            Scan confidence
          </div>
          <h2>QR scan testing before print.</h2>
          <p>
            A trust-building tool for contrast, print size, quiet zone, and damage simulation helps users avoid costly reprints.
          </p>
          <div className="test-meter">
            <span>Contrast</span>
            <i><b style={{ width: '92%' }} /></i>
            <strong>92%</strong>
          </div>
          <div className="test-meter">
            <span>Print size</span>
            <i><b style={{ width: '84%' }} /></i>
            <strong>84%</strong>
          </div>
          <div className="test-meter">
            <span>Error correction</span>
            <i><b style={{ width: '96%' }} /></i>
            <strong>96%</strong>
          </div>
        </div>

        <div className="developer-card">
          <div className="section-kicker">
            <Code size={14} />
            Developer ready
          </div>
          <h2>Future API and extension surface.</h2>
          <p>
            The redesigned product architecture makes room for a browser extension, API access,
            team collaboration, custom domains, scheduled redirects, and premium exports.
          </p>
          <pre>{`POST /generate-qr
{
  "type": "dynamic",
  "url": "https://example.com"
}`}</pre>
        </div>
      </section>
    </div>
  );
}

export default PlatformShowcase;
