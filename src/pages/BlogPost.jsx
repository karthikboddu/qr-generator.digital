import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, User, Calendar } from 'lucide-react';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <Link to="/blog" className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
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
            className="prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-2xl prose-h2:mb-3 prose-p:mb-4 prose-a:text-purple-600 hover:prose-a:text-purple-700 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
