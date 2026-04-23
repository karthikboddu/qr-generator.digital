import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { templates, templateCategories } from '../data/templates';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import Seo from '../components/Seo';

function TemplatesMarketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Seo 
        title="QR Code Templates Marketplace"
        description="Browse our curated collection of professional QR code templates for restaurants, weddings, social media, business cards, and more."
        path="/templates"
      />
      
      <div className="grid-bg relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px' }}>
        {/* Hero Section */}
        <div className="animate-fadeInUp relative z-10 max-w-6xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>
              <Sparkles size={10} />
              Professional Templates
            </div>
            <h1 style={{ 
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', 
              color: 'var(--text-primary)', margin: '0 0 20px', letterSpacing: '-0.04em', lineHeight: 1.1
            }}>
              Ready-to-use <span className="gradient-text">QR Templates</span>
            </h1>
            <p style={{ 
              color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto',
              lineHeight: 1.6
            }}>
              Choose from our curated collection of industry-specific templates. Optimized for conversion, SEO, and professional branding.
            </p>
          </div>

          {/* Search & Filters */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '20px',
              border: '1px solid var(--border-subtle)', backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="content-type-scroll">
                {templateCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`qr-type-tab ${activeCategory === cat.id ? 'active' : ''}`}
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dark-input"
                  style={{ paddingLeft: '40px', height: '44px' }}
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredTemplates.map((template, i) => (
              <Link 
                key={template.slug} 
                to={`/generator/${template.slug}`}
                className="dark-card animate-fadeInUp"
                style={{ 
                  padding: '32px', 
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${i * 0.05}s`
                }}
              >
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '16px', 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px', color: 'var(--accent-primary)'
                }}>
                  <template.icon size={28} />
                </div>
                
                <h3 style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {template.shortTitle}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '24px' }}>
                  {template.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {template.features.map(f => (
                    <span key={f} className="badge badge-purple" style={{ fontSize: '10px' }}>{f}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '14px', fontWeight: 600 }}>
                  Start Creating <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                <Search size={48} style={{ opacity: 0.2 }} />
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '20px' }}>No templates found</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TemplatesMarketplace;
