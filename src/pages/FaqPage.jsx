import React from 'react';
import Seo from '../components/Seo';
import Accordion from '../components/Accordion';

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
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Find answers to common questions about our QR Code Generator, including features, usage rights, and data privacy."
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground text-center mb-10">
          Have questions? We've got answers.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Accordion key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FaqPage;
