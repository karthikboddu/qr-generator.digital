import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import Seo from '../components/Seo';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.dateIso,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'QR Gen',
      logo: {
        '@type': 'ImageObject',
        url: 'https://qr-generator.digital/web-app-manifest-512x512.png',
      },
    },
    mainEntityOfPage: `https://qr-generator.digital/blog/${post.slug}`,
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.image}
        jsonLd={articleJsonLd}
      />
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', padding: '40px 20px' }}>
        <div className="animate-fadeInUp relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>

          <article className="dark-card overflow-hidden" style={{ background: 'var(--bg-card)', padding: 0 }}>
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
            <div className="p-6 md:p-10">
              <h1 style={{ 
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', 
                color: 'var(--text-primary)', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2
              }}>
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1.5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>{post.date}</span>
                </div>
              </div>
              <div
                className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 prose-h2:text-gray-100 prose-h2:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-li:text-gray-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2 prose-strong:text-white"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
