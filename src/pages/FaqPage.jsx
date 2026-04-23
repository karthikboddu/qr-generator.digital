import React from 'react';
import Seo from '../components/Seo';
import Accordion from '../components/Accordion';
import { HelpCircle, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqItems = [
  {
    question: "Are the QR codes generated here free to use?",
    answer: "Yes, absolutely! All QR codes you create are completely free for both personal and commercial use. There are no limits or hidden costs."
  },
  {
    question: "What types of content can I create QR codes for?",
    answer: "You can create QR codes for a wide variety of content types, including website URLs, plain text, email addresses, phone numbers, SMS messages, WhatsApp chats, Wi-Fi network credentials, vCard contact details, map coordinates, and links to social media profiles."
  },
  {
    question: "Do the QR codes expire?",
    answer: "No, the QR codes generated are static and do not expire. They will work as long as the data they point to (like a website URL) is accessible."
  },
  {
    question: "Is my data safe?",
    answer: "Yes. All QR codes, including any logos you upload, are generated directly in your browser. Your data is never sent to our servers, ensuring complete privacy and security."
  },
  {
    question: "Can I use my own logo in the QR code?",
    answer: "Yes! On the generator page, you can find an 'Add Logo' section. Simply upload your image, and it will be placed in the center of the QR code. This is possible due to the high error correction level we use."
  },
  {
    question: "Why does the downloaded filename look like 'qr-code-wifi.png'?",
    answer: "We automatically name the downloaded file based on the content type you've selected to help you keep your files organized. If you create a QR code for a URL, it will be named 'qr-code-url.png'."
  },
  {
    question: "What is 'Error Correction Level'?",
    answer: "Error correction allows a QR code to be scanned even if it's partially damaged or obscured. We use the highest level ('H'), which means up to 30% of the code can be damaged while still being readable. This is what allows us to place a logo in the middle without breaking the code."
  }
];

function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Seo
        title="QR Code Generator FAQ"
        description="Find answers about QR code usage, privacy, downloads, customization, and supported QR types on QR Gen."
        path="/faq"
        jsonLd={faqJsonLd}
      />
      
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px' }}>
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="animate-fadeInUp relative z-10 max-w-3xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Support Center
            </div>
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', 
              color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.03em' 
            }}>
              Frequently Asked Questions
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', fontSize: '17px', margin: '0 auto',
              lineHeight: 1.6
            }}>
              Everything you need to know about our QR generator.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '64px' }}>
            {faqItems.map((item, index) => (
              <Accordion key={index} question={item.question} answer={item.answer} />
            ))}
          </div>

          <div className="dark-card" style={{ 
            padding: '40px', textAlign: 'center', 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
            border: '1px solid var(--border-active)'
          }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: '16px', 
              background: 'rgba(99, 102, 241, 0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: 'var(--accent-primary)'
            }}>
              <HelpCircle size={28} />
            </div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Still have questions?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
              Can't find the answer you're looking for? Please reach out to our friendly team.
            </p>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              <span>Contact Support</span>
              <MessageCircle size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default FaqPage;
