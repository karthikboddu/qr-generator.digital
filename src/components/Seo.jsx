import React from 'react';
// import { Helmet } from 'react-helmet-async';

function Seo({ title, description, children }) {
  const siteTitle = 'QR Code Generator';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    // <Helmet>
    //   <title>{fullTitle}</title>
    //   <meta name="description" content={description} />
    //   <meta property="og:title" content={fullTitle} />
    //   <meta property="og:description" content={description} />
    //   <meta name="twitter:title" content={fullTitle} />
    //   <meta name="twitter:description" content={description} />
    //   {children}
    // </Helmet>
    <></>
  );
}

export default Seo;
