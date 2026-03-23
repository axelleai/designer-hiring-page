import { Star } from 'lucide-react';
import { testimonials } from '../data/designers';

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <h2 className="section-title">Trusted by Industry Leaders</h2>
          <p className="section-subtitle">
            See what our clients say about finding their perfect designer
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <img className="testimonial-author-avatar" src={t.avatar} alt={t.author} />
                <div>
                  <div className="testimonial-author-name">{t.author}</div>
                  <div className="testimonial-author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
