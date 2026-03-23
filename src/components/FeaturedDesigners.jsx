import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { designers } from '../data/designers';

export default function FeaturedDesigners() {
  const featured = designers.filter((d) => d.featured);

  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Designers</h2>
            <p className="section-subtitle" style={{ color: 'var(--gray-400)' }}>
              Hand-picked talent trusted by leading brands
            </p>
          </div>
          <Link to="/" className="section-link" style={{ color: 'var(--pink-500)' }}>
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((designer) => (
            <Link to={`/designer/${designer.id}`} key={designer.id} className="featured-card">
              <img className="featured-card-avatar" src={designer.avatar} alt={designer.name} />
              <h3>{designer.name}</h3>
              <div className="featured-card-title">{designer.title}</div>
              <div className="featured-card-rating">
                <Star size={14} />
                {designer.rating} · {designer.reviewCount} reviews · ${designer.hourlyRate}/hr
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
