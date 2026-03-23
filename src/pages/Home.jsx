import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ArrowRight, Grid3X3, Palette, Share2, Monitor,
  Presentation, Globe, PenTool, Play, Package,
} from 'lucide-react';
import { designers, categories } from '../data/designers';
import DesignerCard from '../components/DesignerCard';
import FeaturedDesigners from '../components/FeaturedDesigners';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

const iconMap = { Grid3X3, Palette, Share2, Monitor, Presentation, Globe, PenTool, Play, Package };

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = designers;
    if (activeCategory !== 'all') {
      result = result.filter((d) => d.categories.includes(activeCategory));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.title.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            2,500+ designers ready to work
          </div>
          <h1>Discover & Hire <em>World-Class</em> Designers</h1>
          <p className="hero-subtitle">
            Browse portfolios, compare talent, and connect with the perfect graphic designer
            for your next project — all in one place.
          </p>
          <div className="hero-actions">
            <a href="#designers" className="btn btn-pink btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('designers')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Browse Designers <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Post a Project
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">2,500+</div>
              <div className="hero-stat-label">Verified Designers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">15,000+</div>
              <div className="hero-stat-label">Projects Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGNERS BROWSE */}
      <section id="designers" className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Browse Designers</h2>
              <p className="section-subtitle">Find the right creative talent for your project</p>
            </div>
          </div>

          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <Search />
              <input
                className="search-input"
                type="text"
                placeholder="Search by name, skill, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="results-count">{filtered.length} designer{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="filter-bar">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {Icon && <Icon size={16} />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="designers-grid" style={{ marginTop: 32 }}>
            {filtered.map((d) => (
              <DesignerCard key={d.id} designer={d} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: 'var(--gray-500)' }}>
                <p style={{ fontSize: 18, marginBottom: 8 }}>No designers found</p>
                <p style={{ fontSize: 14 }}>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <FeaturedDesigners />
      <Testimonials />
      <ContactForm />

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Join thousands of companies that have found their perfect designer on DesignHire.</p>
          <a href="#contact" className="btn btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get Started Free
          </a>
        </div>
      </section>
    </>
  );
}
