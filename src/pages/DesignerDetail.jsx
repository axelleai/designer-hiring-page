import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Star, Clock, DollarSign, Send,
  CheckCircle, X, Heart, Share2, MessageCircle,
} from 'lucide-react';
import { designers, categories } from '../data/designers';

export default function DesignerDetail() {
  const { id } = useParams();
  const designer = designers.find((d) => d.id === Number(id));
  const [lightbox, setLightbox] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  if (!designer) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Designer not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Back to Home</Link>
      </div>
    );
  }

  const categoryLabels = designer.categories
    .map((catId) => categories.find((c) => c.id === catId)?.label)
    .filter(Boolean);

  return (
    <div className="designer-detail">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          Back to Designers
        </Link>

        {/* HEADER */}
        <div className="designer-profile-header">
          <img className="designer-profile-avatar" src={designer.avatar} alt={designer.name} />
          <div className="designer-profile-info">
            <h1>{designer.name}</h1>
            <div className="designer-profile-title">{designer.title}</div>
            <div className="designer-profile-meta">
              <div className="designer-profile-meta-item">
                <MapPin size={18} />
                {designer.location}
              </div>
              <div className="designer-profile-meta-item">
                <Star size={18} style={{ color: 'var(--amber-400)', fill: 'var(--amber-400)' }} />
                {designer.rating} ({designer.reviewCount} reviews)
              </div>
              <div className="designer-profile-meta-item">
                <DollarSign size={18} />
                ${designer.hourlyRate}/hr
              </div>
              <div className="designer-profile-meta-item">
                <Clock size={18} />
                <span className={`availability-badge ${designer.available ? 'available' : 'unavailable'}`}>
                  <span className="availability-badge-dot" />
                  {designer.available ? 'Available for work' : 'Currently busy'}
                </span>
              </div>
            </div>
          </div>
          <div className="designer-profile-actions">
            <button className="btn btn-secondary btn-icon" aria-label="Save">
              <Heart size={20} />
            </button>
            <button className="btn btn-secondary btn-icon" aria-label="Share">
              <Share2 size={20} />
            </button>
            <button className="btn btn-pink" onClick={() => setInquiryOpen(true)}>
              <MessageCircle size={18} />
              Contact
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="designer-profile-body">
          <div>
            <p className="designer-bio">{designer.bio}</p>

            <div className="designer-skills">
              {designer.skills.map((skill) => (
                <span key={skill} className="designer-skill">{skill}</span>
              ))}
            </div>

            {/* PORTFOLIO */}
            <div className="portfolio-section">
              <h2>Portfolio</h2>
              <div className="portfolio-grid">
                {designer.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="portfolio-item"
                    onClick={() => setLightbox(item)}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="portfolio-item-overlay">
                      <span>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="designer-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-rate">
                ${designer.hourlyRate}<span>/hr</span>
              </div>
              <hr className="sidebar-divider" />
              <div className="sidebar-info-row">
                <span className="label">Rating</span>
                <span className="value" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} style={{ color: 'var(--amber-400)', fill: 'var(--amber-400)' }} />
                  {designer.rating} ({designer.reviewCount})
                </span>
              </div>
              <div className="sidebar-info-row">
                <span className="label">Location</span>
                <span className="value">{designer.location}</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label">Specialties</span>
                <span className="value">{categoryLabels.length} areas</span>
              </div>
              <div className="sidebar-info-row">
                <span className="label">Availability</span>
                <span className="value">{designer.available ? 'Open' : 'Busy'}</span>
              </div>
              <button className="btn btn-pink btn-lg" onClick={() => setInquiryOpen(true)}>
                <Send size={18} />
                Send Inquiry
              </button>
              <button className="btn btn-secondary btn-lg" style={{ marginTop: 8, width: '100%' }}>
                <Heart size={18} />
                Save Profile
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <img
            className="lightbox-image"
            src={lightbox.image}
            alt={lightbox.title}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption">{lightbox.title}</div>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {inquiryOpen && (
        <div className="lightbox-overlay" onClick={() => { setInquiryOpen(false); setInquirySent(false); }}>
          <div
            className="contact-form"
            style={{ maxWidth: 520, width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              style={{ position: 'absolute', top: 16, right: 16, color: 'var(--gray-400)' }}
              onClick={() => { setInquiryOpen(false); setInquirySent(false); }}
            >
              <X size={24} />
            </button>

            {inquirySent ? (
              <div className="form-success">
                <CheckCircle size={56} />
                <h3>Message Sent!</h3>
                <p>Your inquiry has been sent to {designer.name}. They typically respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--gray-900)' }}>
                  Contact {designer.name}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 24 }}>
                  Send a direct inquiry about your project
                </p>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" type="text" placeholder="Jane Smith" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Email</label>
                  <input className="form-input" type="email" placeholder="jane@company.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Description</label>
                  <textarea className="form-textarea" placeholder="Tell the designer about your project..." required />
                </div>
                <button type="submit" className="btn btn-pink btn-lg" style={{ width: '100%' }}>
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
