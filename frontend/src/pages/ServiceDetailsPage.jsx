import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ArrowLeft, 
  CalendarCheck, 
  ShieldCheck, 
  Check, 
  Star, 
  Wrench, 
  PhoneCall,
  AlertCircle
} from 'lucide-react';
import { getServiceById } from '../services/api';
import './ServiceDetailsPage.css';

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getServiceById(id);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error fetching service detail:', err);
        setError('Failed to load service details. It may have been removed or the ID is invalid.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  const defaultImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80';

  if (loading) {
    return (
      <div className="page-container container text-center" style={{ paddingTop: '120px' }}>
        <div className="spinner"></div>
        <p>Loading service specifications...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="page-container container" style={{ paddingTop: '100px' }}>
        <div className="alert alert-error">
          <AlertCircle size={24} />
          <div>
            <h3>Error Loading Service</h3>
            <p>{error || 'Requested service could not be found.'}</p>
            <Link to="/services" className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>
              <ArrowLeft size={16} /> Back to All Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-details-page page-container fade-in">
      <div className="container">
        {/* Breadcrumb & Back Link */}
        <div className="details-nav-bar">
          <Link to="/services" className="back-link">
            <ArrowLeft size={18} />
            <span>Back to All Services</span>
          </Link>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current">{service.name}</span>
        </div>

        {/* Main Details Grid */}
        <div className="details-layout-grid">
          {/* Left Column: Image & Highlights */}
          <div className="details-media-col">
            <div className="details-img-wrap">
              <img
                src={service.image || defaultImage}
                alt={service.name}
                className="details-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
              <div className="details-floating-duration">
                <Clock size={16} />
                <span>Estimated: {service.duration}</span>
              </div>
            </div>

            {/* Quality Commitments */}
            <div className="service-commitments card">
              <h4>QuickServe Service Guarantee</h4>
              <ul>
                <li>
                  <Check size={18} className="check-icon" />
                  <span>100% Verified, background-checked technician</span>
                </li>
                <li>
                  <Check size={18} className="check-icon" />
                  <span>Transparent estimate before any extra parts are installed</span>
                </li>
                <li>
                  <Check size={18} className="check-icon" />
                  <span>7-Day post-service rework guarantee</span>
                </li>
                <li>
                  <Check size={18} className="check-icon" />
                  <span>Full cleanup after service completion</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Information & Booking Card */}
          <div className="details-info-col">
            <div className="details-meta-pill">
              <Star size={15} className="rating-star" />
              <span>4.9 (120+ Verified Reviews)</span>
            </div>

            <h1 className="service-detail-title">{service.name}</h1>

            <div className="service-pricing-strip">
              <div className="pricing-box">
                <span className="price-tag-title">Price</span>
                <span className="price-value">Rs. {Number(service.price).toLocaleString()}</span>
              </div>
              <div className="pricing-separator"></div>
              <div className="duration-box">
                <span className="duration-tag-title">Duration</span>
                <span className="duration-value">{service.duration}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-subheading">Service Overview</h3>
              <p className="service-full-description">{service.description}</p>
            </div>

            <div className="detail-section">
              <h3 className="section-subheading">What Is Included</h3>
              <div className="features-checklist">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Standard diagnostics & multi-point safety inspection</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>High-grade specialized equipment and professional tools</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Safety compliant procedure and sanitized workspace</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <span>Detailed digital invoice upon service sign-off</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="details-action-bar">
              <button
                type="button"
                className="btn btn-primary btn-lg book-now-main-btn"
                onClick={() => navigate(`/book?service=${encodeURIComponent(service.name)}`)}
              >
                <CalendarCheck size={20} />
                <span>Book Now</span>
              </button>

              <Link to="/contact" className="btn btn-secondary btn-lg">
                <PhoneCall size={18} />
                <span>Ask Questions</span>
              </Link>
            </div>

            {/* Help Callout */}
            <div className="need-help-callout">
              <p>
                Have custom requirements or need emergency service? Call us directly at <strong>0300-1234567</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
