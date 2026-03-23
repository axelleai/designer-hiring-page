import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { categories } from '../data/designers';

export default function DesignerCard({ designer }) {
  const categoryLabels = designer.categories
    .map((catId) => categories.find((c) => c.id === catId)?.label)
    .filter(Boolean);

  return (
    <Link to={`/designer/${designer.id}`} className="designer-card">
      <div className="designer-card-portfolio">
        {designer.portfolio.slice(0, 4).map((item) => (
          <img key={item.id} src={item.image} alt={item.title} loading="lazy" />
        ))}
      </div>
      <div className="designer-card-body">
        <div className="designer-card-top">
          <img className="designer-card-avatar" src={designer.avatar} alt={designer.name} />
          <div className="designer-card-info">
            <h3>{designer.name}</h3>
            <div className="designer-card-title">{designer.title}</div>
            <div className="designer-card-location">
              <MapPin />
              {designer.location}
            </div>
          </div>
          <span className={`availability-badge ${designer.available ? 'available' : 'unavailable'}`}>
            <span className="availability-badge-dot" />
            {designer.available ? 'Available' : 'Busy'}
          </span>
        </div>
        <div className="designer-card-tags">
          {categoryLabels.map((label) => (
            <span key={label} className="designer-card-tag">{label}</span>
          ))}
        </div>
        <div className="designer-card-meta">
          <div className="designer-card-rating">
            <Star />
            {designer.rating}
            <span>({designer.reviewCount})</span>
          </div>
          <div className="designer-card-rate">
            <strong>${designer.hourlyRate}</strong>/hr
          </div>
        </div>
      </div>
    </Link>
  );
}
