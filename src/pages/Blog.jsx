import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';

function Blog() {
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'QR Gen Blog',
    url: 'https://qr-generator.digital/blog',
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://qr-generator.digital/blog/${post.slug}`,
      datePublished: post.dateIso,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };

  return (
    <>
      <Seo
        title="QR Code Blog"
        description="Read QR code guides, marketing ideas, payment tips, and generator comparisons from the QR Gen blog."
        path="/blog"
        type="blog"
        jsonLd={blogJsonLd}
      />
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: '100%', padding: '60px 20px' }}>
        <div className="animate-fadeInUp relative z-10 max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', 
              color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.04em'
            }}>
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto',
              lineHeight: 1.6
            }}>
              Insights, tips, and updates from the QR Generator team.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="dark-card p-6" style={{ background: 'var(--bg-card)' }}>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Practical Guides</h2>
              <p className="text-gray-400">
                Learn when to use URL, Wi-Fi, UPI, and contact QR codes in real business and everyday situations.
              </p>
            </div>
            <div className="dark-card p-6" style={{ background: 'var(--bg-card)' }}>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Design Best Practices</h2>
              <p className="text-gray-400">
                We publish tips on sizing, contrast, logo placement, and print readiness so your QR codes stay scannable.
              </p>
            </div>
            <div className="dark-card p-6" style={{ background: 'var(--bg-card)' }}>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Use-Case Ideas</h2>
              <p className="text-gray-400">
                Explore examples for shops, events, menus, packaging, business cards, onboarding, and digital payments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="group block dark-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1" style={{ padding: 0, background: 'var(--bg-card)' }}>
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">{post.date} &bull; {post.author}</p>
                  <h2 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-indigo-400 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>{post.title}</h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-indigo-400 font-medium">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
