import React from 'react';
import { useParams } from 'react-router-dom';
import Generator from './Generator';
import { contentTypes } from '../data/contentTypes';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

const validSlugs = new Set(contentTypes.map(ct => `${ct.id}`));

function GeneratorPage() {
  const { slug } = useParams();

  // If the slug contains a dot, it's likely a file request (e.g., favicon.png)
  // that slipped past the static server. Treat it as a 404.
  // if (slug && slug.includes('.')) {
  //   return <NotFound />;
  // }

  // Handle root path ('/')
  if (!slug) {
    useSeo({
      title: 'Free QR Code Generator | Create Custom QR Codes Online',
      description: 'Generate QR codes for URLs, WiFi, UPI, vCard, and more. Free, fast, and customizable with colors and logos. Download high-quality PNG instantly.'
    });
    return <Generator initialContentType={'url'} />;
  }

  // Handle dynamic slug paths
  if (!validSlugs.has(slug)) {
    console.log("Invalid slug:", slug);
    
    return <NotFound />;
  }
  
  const contentTypeId = slug.replace('-qr-generator', '');
  const currentContentType = contentTypes.find(ct => ct.id === slug);
  

  // This should not happen due to the check above, but for safety
  if (!currentContentType) {
    return <NotFound />;
  }
  
  useSeo({
    title: `${currentContentType.label} QR Code Generator | QR Gen`,
    description: `Create a custom QR code for a ${currentContentType.label}. Free, fast, and customizable with colors and logos.`
  });

  return <Generator initialContentType={currentContentType.id} />;
}

export default GeneratorPage;
