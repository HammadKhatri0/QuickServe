import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Users, 
  ThumbsUp, 
  Search,
  Headphones
} from 'lucide-react';
import { getServices } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import './HomePage.css';

const HomePage = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await getServices();
        if (res.success && res.data) {
          // Take first 4 or 6 services for the homepage
          setFeaturedServices(res.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load featured services', err);
        setError('Could not connect to service catalog. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>#1 On-Demand Service Platform</span>
            </div>
            <h1 className="hero-title">
              Professional Services <br />
              <span className="hero-highlight">at Your Doorstep</span>
            </h1>
            <p className="hero-subtitle">
              QuickServe connects you with trusted, vetted, and background-checked technicians and service professionals for home repairs, cleaning, plumbing, electronics, and digital services.
            </p>

            <div className="hero-cta-group">
              <Link to="/book" className="btn btn-primary btn-lg hero-cta-btn">
                <span>Book a Service</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-secondary btn-lg">
                Explore Services
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="hero-trust-list">
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-check" />
                <span>Verified Professionals</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-check" />
                <span>Upfront Fair Pricing</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-check" />
                <span>On-Time Guarantee</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="hero-image-backdrop"></div>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
              alt="Professional Service Provider"
              className="hero-main-img"
            />
            {/* Floating Glass Badges */}
            <div className="floating-card top-float glass">
              <div className="floating-icon-wrap">
                <Star size={20} className="star-icon" />
              </div>
              <div>
                <span className="float-bold">4.9 / 5.0</span>
                <span className="float-sub">Customer Rating</span>
              </div>
            </div>

            <div className="floating-card bottom-float glass">
              <div className="floating-icon-wrap pro-icon-wrap">
                <Users size={20} className="pro-icon" />
              </div>
              <div>
                <span className="float-bold">10,000+</span>
                <span className="float-sub">Services Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container stats-container">
          <div className="stat-box">
            <span className="stat-number">5,000+</span>
            <span className="stat-desc">Satisfied Customers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-box">
            <span className="stat-number">50+</span>
            <span className="stat-desc">Verified Specialists</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-box">
            <span className="stat-number">30 Mins</span>
            <span className="stat-desc">Average Arrival Time</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-box">
            <span className="stat-number">100%</span>
            <span className="stat-desc">Service Guarantee</span>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">Our Services</span>
            <h2 className="section-title">Popular Services You Can Rely On</h2>
            <p className="section-subtitle">
              Book our most requested doorstep services with fixed, upfront pricing and instant booking confirmation.
            </p>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="services-grid">
              {featuredServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}

          <div className="view-all-wrap">
            <Link to="/services" className="btn btn-secondary btn-lg">
              <span>View All Available Services</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">Why QuickServe</span>
            <h2 className="section-title">Why Thousands Trust QuickServe</h2>
            <p className="section-subtitle">
              We eliminate the hassle of finding reliable contractors. Here is how we make service booking effortless and risk-free.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h3 className="why-card-title">Verified Professionals</h3>
              <p className="why-card-text">
                Every service professional undergoes thorough background verification, skill assessments, and strict identity checks.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <DollarSign size={28} />
              </div>
              <h3 className="why-card-title">Transparent Pricing</h3>
              <p className="why-card-text">
                Zero hidden charges or unexpected rate hikes. Clear and competitive estimates before any work begins on your property.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <Clock size={28} />
              </div>
              <h3 className="why-card-title">Quick On-Time Arrival</h3>
              <p className="why-card-text">
                Book a time slot that suits your schedule. Our technicians arrive equipped with all necessary tools promptly.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <ThumbsUp size={28} />
              </div>
              <h3 className="why-card-title">Satisfaction Guaranteed</h3>
              <p className="why-card-text">
                If you are not 100% satisfied with the quality of the service provided, our dedicated resolution team will make it right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-inner">
            <div className="cta-text">
              <h2>Need a Service Right Now?</h2>
              <p>Experience hassle-free repair, cleaning, and tech solutions with QuickServe today.</p>
            </div>
            <div className="cta-action">
              <Link to="/book" className="btn btn-accent btn-lg">
                Book a Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
