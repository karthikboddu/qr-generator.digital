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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Our Blog</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and updates from the QR Generator team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date} &bull; {post.author}</p>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-purple-600 font-medium">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
