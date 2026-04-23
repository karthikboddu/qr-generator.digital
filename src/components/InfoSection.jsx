import React, { useState } from 'react';
import { Edit, Palette, Download, Share2, ChevronDown, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const guideContent = {
  url: {
    title: 'When to Use a URL QR Code',
    intro: 'URL QR codes are best for sending visitors straight from print to web. They work well on posters, product packaging, menus, flyers, and business cards where typing a link would be slow or error-prone.',
    useCases: [
      'Send customers to a landing page, store, menu, or campaign URL.',
      'Share onboarding docs, event registration links, or product manuals.',
      'Connect offline marketing materials to measurable digital pages.',
    ],
    tips: [
      'Use a short, clean destination URL when possible.',
      'Test the final link on both Android and iPhone before printing.',
      'Keep strong contrast between foreground and background for faster scans.',
    ],
  },
  wifi: {
    title: 'How Wi-Fi QR Codes Help',
    intro: 'A Wi-Fi QR code lets guests join your network without manually typing a password. Especially useful for cafes, offices, clinics, salons, events, and home guest networks.',
    useCases: [
      'Display guest Wi-Fi access at reception desks and tables.',
      'Reduce support questions from visitors who struggle with passwords.',
      'Create a cleaner check-in experience at events and waiting areas.',
    ],
    tips: [
      'Double-check the SSID, password, and encryption type before downloading.',
      'Use large print placement so the code is easy to scan from standing distance.',
      'Update the printed code if your guest password changes.',
    ],
  },
  upi: {
    title: 'Why UPI QR Codes Matter',
    intro: 'UPI QR codes are useful for small businesses, freelancers, market stalls, and service professionals who want fast, low-friction digital payments.',
    useCases: [
      'Accept payments at a shop counter, pop-up stall, or delivery desk.',
      'Share a reusable payment code in invoices and printed bills.',
      'Collect event or class fees with a simple scan-and-pay experience.',
    ],
    tips: [
      'Verify the UPI ID and payee name carefully before publishing.',
      'Avoid over-styling payment QR codes if they will be printed in small sizes.',
      'Print one laminated version for the counter and keep a digital backup.',
    ],
  },
  vcard: {
    title: 'Why Use a vCard QR Code',
    intro: 'vCard QR codes act like digital business cards. They help people save your contact details instantly without spelling mistakes.',
    useCases: [
      'Add your contact card to conference badges or brochures.',
      'Share staff details on store counters, packaging, or welcome kits.',
      'Replace printed business cards with a reusable digital contact card.',
    ],
    tips: [
      'Include only the details you really want shared publicly.',
      'Test saving the contact on multiple phone brands before rollout.',
      'Keep the code large enough if you add a logo in the middle.',
    ],
  },
  event: {
    title: 'Event QR Codes for Better Attendance',
    intro: 'Event QR codes are useful when you want attendees to save dates quickly without typing. They work well for workshops, webinars, conferences, community events, and classes.',
    useCases: [
      'Add event details to posters, invites, and booth signage.',
      'Help guests save the schedule directly to their calendar.',
      'Reduce missed events by making the invite easier to act on.',
    ],
    tips: [
      'Check start and end times carefully, including timezone assumptions.',
      'Add a clear title so the saved calendar entry is easy to recognize.',
      'Test the exported event on calendar apps your audience commonly uses.',
    ],
  },
};

const steps = [
  { icon: Edit, label: 'Choose & Enter', desc: 'Select your content type and fill in the required information.', color: '#6366f1' },
  { icon: Palette, label: 'Customize', desc: 'Add logo, colors, and style to make it uniquely yours.', color: '#8b5cf6' },
  { icon: Download, label: 'Download', desc: 'Export a high-resolution PNG or SVG, ready for print or digital use.', color: '#06b6d4' },
];

const features = [
  { icon: Globe, title: 'Multiple Content Types', desc: 'Create QR codes for URLs, WiFi, vCards, UPI payments, social links, and more.', color: '#6366f1' },
  { icon: Palette, title: 'Full Colour Customisation', desc: 'Match your brand by customising foreground, background colors, and corner styles.', color: '#8b5cf6' },
  { icon: Shield, title: 'Embed Your Logo', desc: 'Add your logo to the center of your QR code. High error correction keeps it scannable.', color: '#06b6d4' },
  { icon: Download, title: 'High-Resolution Download', desc: 'Export as PNG, SVG, or a ZIP of all sizes — perfect for digital and print use.', color: '#10b981' },
];

function InfoSection({ activeTab = 'url', currentQrTypeName = 'QR code' }) {
  const [openFaq, setOpenFaq] = useState(null);
  const activeGuide = guideContent[activeTab] || {
    title: `Best Uses for ${currentQrTypeName} QR Codes`,
    intro: `${currentQrTypeName} QR codes work best when you want to reduce friction between discovery and action. The clearer the destination, the better the result.`,
    useCases: [
      `Use ${currentQrTypeName} QR codes on print materials, packaging, signage, or support docs.`,
      `Help customers move from an offline touchpoint to the exact action you want them to take.`,
      `Create a more convenient sharing experience than asking people to type manually.`,
    ],
    tips: [
      'Use strong visual contrast and enough quiet zone around the code.',
      'Test your final design on more than one device before publishing.',
      'Keep the destination clear so people know what will happen after scanning.',
    ],
  };

  const faqs = [
    {
      question: 'Are the QR codes generated here free to use?',
      answer: 'Yes, all QR codes generated on this platform are completely free to use for personal and commercial purposes.',
    },
    {
      question: 'Can I use my own logo in the QR code?',
      answer: 'Absolutely! You can upload your own logo and it will be embedded in the center of the QR code while maintaining scannability.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Yes, your data is processed securely. All QR code content is processed in your browser and is never stored without your consent.',
    },
    {
      question: 'Do the QR codes expire?',
      answer: 'No, the QR codes themselves never expire. However, if the content they point to (like a URL) becomes unavailable, the QR code won\'t work.',
    },
  ];

  const cardBg = 'rgba(22, 22, 31, 0.8)';
  const cardBorder = 'rgba(255, 255, 255, 0.07)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>

      {/* Guide Section */}
      <section style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: '20px',
        padding: '48px 40px',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: '#f0f0f8',
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            {activeGuide.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.7, marginBottom: '40px', fontSize: '15px' }}>
            {activeGuide.intro}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '16px', color: '#f0f0f8', marginBottom: '16px' }}>
                Common Use Cases
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeGuide.useCases.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      marginTop: '7px', flexShrink: 0,
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '16px', color: '#f0f0f8', marginBottom: '16px' }}>
                Best Practice Tips
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeGuide.tips.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      marginTop: '7px', flexShrink: 0,
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(22px, 3.5vw, 32px)',
          color: '#f0f0f8',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Get Your QR Code in 3 Simple Steps
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '15px' }}>
          From idea to scannable code in under a minute.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {steps.map(({ icon: Icon, label, desc, color }, i) => (
            <div key={label} style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: '16px',
              padding: '28px 24px',
              textAlign: 'center',
              transition: 'all 0.2s',
            }}>
              <div style={{
                width: 56, height: 56,
                background: `${color}18`,
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Icon size={24} color={color} />
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, borderRadius: '50%',
                background: color, fontSize: '11px', fontWeight: 800, color: '#fff',
                marginBottom: '10px',
              }}>
                {i + 1}
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '15px', color: '#f0f0f8', marginBottom: '8px' }}>
                {label}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(22px, 3.5vw, 32px)',
          color: '#f0f0f8',
          textAlign: 'center',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Powerful Features, Simple Interface
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px', fontSize: '15px' }}>
          Everything you need to create professional QR codes without the complexity.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: '14px',
              padding: '24px',
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              transition: 'all 0.2s',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '11px',
                background: `${color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px', color: '#f0f0f8', marginBottom: '6px' }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(22px, 3.5vw, 32px)',
          color: '#f0f0f8',
          textAlign: 'center',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Common Questions
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px', fontSize: '15px' }}>
          Here are some of the most frequently asked questions.
        </p>

        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span style={{ fontWeight: 500, fontSize: '14px' }}>{faq.question}</span>
                <ChevronDown
                  size={16}
                  style={{
                    color: 'var(--text-muted)',
                    transition: 'transform 0.2s',
                    transform: openFaq === index ? 'rotate(180deg)' : 'none',
                  }}
                />
              </button>
              {openFaq === index && (
                <div className="accordion-content" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, animation: 'fadeInUp 0.2s ease-out' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default InfoSection;
