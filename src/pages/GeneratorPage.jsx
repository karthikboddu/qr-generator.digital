import React from 'react';
import { useParams } from 'react-router-dom';
import Generator from './Generator';
import { contentTypes } from '../data/contentTypes';
import { templates } from '../data/templates';
import NotFound from './NotFound';
import Seo from '../components/Seo';

function GeneratorPage() {
  const { slug } = useParams();

  // 1. Check if it's a template slug
  const currentTemplate = templates.find(t => t.slug === slug);
  
  if (currentTemplate) {
    return (
      <>
        <Seo 
          title={currentTemplate.title}
          description={currentTemplate.seoDescription}
          path={`/generator/${currentTemplate.slug}`}
          jsonLd={[
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": currentTemplate.title,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "description": currentTemplate.seoDescription,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": currentTemplate.features.join(', ')
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://qr-generator.digital/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "Generator",
                "item": "https://qr-generator.digital/templates"
              },{
                "@type": "ListItem",
                "position": 3,
                "name": currentTemplate.title,
                "item": `https://qr-generator.digital/generator/${currentTemplate.slug}`
              }]
            }
          ]}
        />
        <Generator initialContentType={currentTemplate.defaultValues.contentType} />
      </>
    );
  }

  // 2. Check if it's a legacy/content-type slug (for backward compatibility)
  const currentContentType = contentTypes.find(ct => ct.id === slug);
  
  if (currentContentType) {
    return (
      <>
        <Seo 
          title={currentContentType.label + ' QR Code Generator'}
          description={currentContentType.description}
          path={`/generator/${currentContentType.id}`}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://qr-generator.digital/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Generator",
              "item": "https://qr-generator.digital/templates"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": currentContentType.label,
              "item": `https://qr-generator.digital/generator/${currentContentType.id}`
            }]
          }}
        />
        <Generator initialContentType={currentContentType.id} />
      </>
    );
  }

  // 3. Not found
  return <NotFound />;
}

export default GeneratorPage;
