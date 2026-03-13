import React, { useState } from 'react';
import { Edit, Palette, Download, Share2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function InfoSection() {
  const [openFaq, setOpenFaq] = useState(null);

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
            <a href="/privacy-policy" className="hover:text-purple-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InfoSection;
