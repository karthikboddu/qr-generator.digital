import React, { useState } from 'react';
import { Edit, Palette, Download, Share2, ChevronDown } from 'lucide-react';
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
    intro: 'A Wi-Fi QR code lets guests join your network without manually typing a password. This is especially useful for cafes, offices, clinics, salons, events, and home guest networks.',
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
    intro: 'UPI QR codes are useful for small businesses, freelancers, market stalls, and service professionals who want fast, low-friction digital payments. A clear payment QR can reduce queues and improve checkout speed.',
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
    intro: 'vCard QR codes act like digital business cards. They help people save your contact details instantly without spelling mistakes, which is useful for networking, events, consulting, and sales teams.',
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
      'Test the exported event on the calendar apps your audience commonly uses.',
    ],
  },
};

function InfoSection({ activeTab = 'url', currentQrTypeName = 'QR code' }) {
  const [openFaq, setOpenFaq] = useState(null);
  const activeGuide = guideContent[activeTab] || {
    title: `Best Uses for ${currentQrTypeName} QR Codes`,
    intro: `${currentQrTypeName} QR codes work best when you want to reduce friction between discovery and action. The clearer the destination and the simpler the scan experience, the better the conversion rate.`,
    useCases: [
      `Use ${currentQrTypeName} QR codes on print materials, packaging, signage, or support documentation.`,
      `Help customers move from an offline touchpoint to the exact action you want them to take.`,
      `Create a more convenient sharing experience than asking people to type text manually.`,
    ],
    tips: [
      'Use strong visual contrast and enough white space around the code.',
      'Test your final design on more than one device before publishing it widely.',
      'Keep the destination clear so people know what will happen after scanning.',
    ],
  };

  const faqs = [
    {
      question: 'Are the QR codes generated here free to use?',
      answer: 'Yes, all QR codes generated on this platform are completely free to use for personal and commercial purposes.'
    },
    {
      question: 'Can I use my own logo in the QR code?',
      answer: 'Absolutely! You can upload your own logo and it will be embedded in the center of the QR code while maintaining scannability.'
    },
    {
      question: 'Is my data safe?',
      answer: 'Yes, your data is processed securely. When you connect Supabase, all data is stored in your own Supabase project with industry-standard encryption.'
    },
    {
      question: 'Do the QR codes expire?',
      answer: 'No, the QR codes themselves never expire. However, if the content they point to (like a URL) becomes unavailable, the QR code won&apos;t work.'
    }
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            {activeGuide.title}
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {activeGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-3 text-gray-600">
                {activeGuide.useCases.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Best Practice Tips</h3>
              <ul className="space-y-3 text-gray-600">
                {activeGuide.tips.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Get Your QR Code in 3 Simple Steps
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          From idea to scannable code in under a minute.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose & Enter</h3>
            <p className="text-gray-600">
              Select your desired content type and fill in the required information.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customize</h3>
            <p className="text-gray-600">
              Personalise the colours and add your logo to make it uniquely yours.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Download</h3>
            <p className="text-gray-600">
              Get a high-resolution PNG file, ready for digital use or printing.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Powerful Features, Simple Interface
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to create professional QR codes without the complexity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Content Types</h3>
              <p className="text-gray-600">
                Create QR codes for URLs, WiFi, vCards, UPI payments, and more.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Palette className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Colour Customisation</h3>
              <p className="text-gray-600">
                Match your brand by customising foreground and background colours.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Edit className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Embed Your Logo</h3>
              <p className="text-gray-600">
                Increase brand recognition by adding your logo to the centre of your QR code. High error correction ensures it remains scannable.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Resolution Download</h3>
              <p className="text-gray-600">
                Export your final QR code as a high-quality PNG file, perfect for both digital and print use.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Common Questions
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Here are some of the most frequently asked questions.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 pt-2 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>© 2026 QR Generator. All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">About</Link>
            <a href="/faq" className="hover:text-purple-600 transition">FAQ</a>
            <a href="/contact" className="hover:text-purple-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InfoSection;
