import React from 'react';
import Seo from '../components/Seo';

function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the QR Gen privacy policy to understand how QR code data, uploaded logos, analytics, and local browser storage are handled."
        path="/privacy-policy"
      />
      <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-blue-400">
        <h1>Privacy Policy</h1>
        <p>Last updated: July 27, 2025</p>
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to QR Gen. We are committed to protecting your privacy. This Privacy Policy explains our stance on data collection and usage. Our core principle is simple: your data is your own.
        </p>

        <h2>2. Data Collection and Usage</h2>
        <p>
          <strong>We do not collect, store, or transmit any personal data you enter to create QR codes.</strong>
        </p>
        <p>
          All data processing required to generate the QR code happens entirely within your web browser on your device (client-side). The information you input into the fields (such as URLs, text, contact information, etc.) is never sent to our servers or any third party.
        </p>

        <h3>2.1. Uploaded Logos</h3>
        <p>
          When you upload a logo to embed in your QR code, the image file is processed directly in your browser. It is not uploaded to our servers, and we do not store or see the images you use.
        </p>

        <h2>3. Website Analytics</h2>
        <p>
          We may use privacy-friendly analytics tools to collect anonymous usage data about our website. This data helps us understand how users interact with the site, which features are popular, and how we can improve our service. This data is always aggregated and does not contain any personally identifiable information.
        </p>

        <h2>4. Cookies and Local Storage</h2>
        <p>
          Our website does not use cookies for tracking or advertising purposes. We may use your browser's local storage to save your preferences (like color choices) for a better user experience. This information is stored only on your device and is not accessible by us.
        </p>
        
        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
