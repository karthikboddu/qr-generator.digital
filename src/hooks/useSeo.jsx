import { useEffect } from 'react';

const SITE_NAME = 'QR Gen';
const SITE_URL = 'https://qr-generator.digital';
const DEFAULT_TITLE = 'Free QR Code Generator | Create Custom QR Codes Online';
const DEFAULT_DESCRIPTION =
  'Generate QR codes for URLs, Wi-Fi, UPI, vCard, social links, and more. Free, fast, and customizable with colors, logos, and instant downloads.';
const DEFAULT_IMAGE = `${SITE_URL}/web-app-manifest-512x512.png`;

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes.identity).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  Object.entries(attributes.values).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function upsertJsonLd(jsonLd) {
  const existingScripts = document.head.querySelectorAll('script[data-seo-json-ld="true"]');
  existingScripts.forEach((script) => script.remove());

  const entries = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  entries.filter(Boolean).forEach((entry) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonLd = 'true';
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  });
}

export function getCanonicalUrl(path = '/') {
  if (!path || path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function useSeo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  robots = 'index,follow',
  type = 'website',
  jsonLd,
}) {
  useEffect(() => {
    const currentPath = path ?? window.location.pathname;
    const canonicalUrl = getCanonicalUrl(currentPath);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', {
      identity: { name: 'description' },
      values: { content: description },
    });
    upsertMeta('meta[name="robots"]', {
      identity: { name: 'robots' },
      values: { content: robots },
    });
    upsertMeta('meta[property="og:title"]', {
      identity: { property: 'og:title' },
      values: { content: fullTitle },
    });
    upsertMeta('meta[property="og:description"]', {
      identity: { property: 'og:description' },
      values: { content: description },
    });
    upsertMeta('meta[property="og:type"]', {
      identity: { property: 'og:type' },
      values: { content: type },
    });
    upsertMeta('meta[property="og:url"]', {
      identity: { property: 'og:url' },
      values: { content: canonicalUrl },
    });
    upsertMeta('meta[property="og:image"]', {
      identity: { property: 'og:image' },
      values: { content: image },
    });
    upsertMeta('meta[property="og:site_name"]', {
      identity: { property: 'og:site_name' },
      values: { content: SITE_NAME },
    });
    upsertMeta('meta[name="twitter:card"]', {
      identity: { name: 'twitter:card' },
      values: { content: 'summary_large_image' },
    });
    upsertMeta('meta[name="twitter:title"]', {
      identity: { name: 'twitter:title' },
      values: { content: fullTitle },
    });
    upsertMeta('meta[name="twitter:description"]', {
      identity: { name: 'twitter:description' },
      values: { content: description },
    });
    upsertMeta('meta[name="twitter:image"]', {
      identity: { name: 'twitter:image' },
      values: { content: image },
    });
    upsertLink('canonical', canonicalUrl);

    if (jsonLd) {
      upsertJsonLd(jsonLd);
    } else {
      const existingScripts = document.head.querySelectorAll('script[data-seo-json-ld="true"]');
      existingScripts.forEach((script) => script.remove());
    }
  }, [description, image, jsonLd, path, robots, title, type]);
}

export const seoDefaults = {
  defaultDescription: DEFAULT_DESCRIPTION,
  defaultImage: DEFAULT_IMAGE,
  defaultTitle: DEFAULT_TITLE,
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
};
