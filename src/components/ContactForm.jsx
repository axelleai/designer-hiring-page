import { useState } from 'react';
import { Send, CheckCircle, Clock, Shield, Zap } from 'lucide-react';
import { categories } from '../data/designers';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', category: '', budget: '', message: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Find Your Perfect Designer</h2>
            <p>
              Tell us about your project and we'll match you with the ideal designer
              from our curated network. Most clients receive their first proposal within 24 hours.
            </p>
            <ul className="contact-features">
              <li className="contact-feature">
                <div className="contact-feature-icon"><Clock size={20} /></div>
                <div>
                  <h4>24-Hour Matching</h4>
                  <p>Get matched with top designers within a day</p>
                </div>
              </li>
              <li className="contact-feature">
                <div className="contact-feature-icon"><Shield size={20} /></div>
                <div>
                  <h4>Vetted Talent</h4>
                  <p>Every designer is reviewed and portfolio-verified</p>
                </div>
              </li>
              <li className="contact-feature">
                <div className="contact-feature-icon"><Zap size={20} /></div>
                <div>
                  <h4>Free to Browse</h4>
                  <p>No cost to explore profiles and request quotes</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form">
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={56} />
                <h3>Inquiry Sent!</h3>
                <p>We'll review your project and connect you with the best designers within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: 'var(--gray-900)' }}>
                  Send an Inquiry
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={update('name')} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="jane@company.com" value={form.email} onChange={update('email')} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input className="form-input" type="text" placeholder="Your Company" value={form.company} onChange={update('company')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Design Category</label>
                    <select className="form-select" value={form.category} onChange={update('category')} required>
                      <option value="">Select a category</option>
                      {categories.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select className="form-select" value={form.budget} onChange={update('budget')} required>
                    <option value="">Select budget range</option>
                    <option value="1k-5k">$1,000 – $5,000</option>
                    <option value="5k-10k">$5,000 – $10,000</option>
                    <option value="10k-25k">$10,000 – $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Description</label>
                  <textarea className="form-textarea" placeholder="Tell us about your project, timeline, and what you're looking for..." value={form.message} onChange={update('message')} required />
                </div>
                <button type="submit" className="btn btn-pink btn-lg" style={{ width: '100%' }}>
                  <Send size={18} />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
