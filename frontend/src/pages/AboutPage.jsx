import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  Award, 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page page-container fade-in">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="container text-center">
          <span className="section-badge">About QuickServe</span>
          <h1 className="about-hero-title">Connecting You with Trusted Professionals</h1>
          <p className="about-hero-sub">
            QuickServe is a service platform that connects customers with professional service providers. 
            We make home, business, and digital services reliable, affordable, and accessible at your doorstep.
          </p>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="section about-intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text-col">
              <span className="section-badge">Our Story</span>
              <h2>Transforming How Services Are Delivered</h2>
              <p>
                Founded in 2026, QuickServe was created with a straightforward goal: eliminate the stress, guesswork, and delays traditionally associated with finding trustworthy repairmen, cleaners, and technical experts.
              </p>
              <p>
                Whether it is an emergency AC breakdown during sweltering heat, urgent plumbing leakage, or professional computer repairs, QuickServe delivers verified and vetted service professionals to your doorstep with guaranteed quality and upfront pricing.
              </p>

              <div className="intro-stats-mini">
                <div className="mini-stat">
                  <span className="mini-num">10k+</span>
                  <span className="mini-lbl">Happy Homes</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-num">98.5%</span>
                  <span className="mini-lbl">On-Time Arrival</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-num">4.9/5</span>
                  <span className="mini-lbl">Average Rating</span>
                </div>
              </div>
            </div>

            <div className="intro-image-col">
              <div className="intro-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                  alt="QuickServe Team Collaborating"
                  className="intro-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section mission-vision-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">Purpose & Vision</span>
            <h2 className="section-title">Driven by Quality & Integrity</h2>
            <p className="section-subtitle">
              Our culture revolves around customer comfort, artisan empowerment, and technological convenience.
            </p>
          </div>

          <div className="mission-grid">
            <div className="mission-card card">
              <div className="mission-icon-wrap">
                <Target size={30} />
              </div>
              <h3 className="mission-title">Our Mission</h3>
              <p className="mission-desc">
                To empower customers with on-demand access to dependable, background-verified professionals while creating dignified, lucrative job opportunities for skilled technicians and service craftsmen across communities.
              </p>
            </div>

            <div className="mission-card card">
              <div className="mission-icon-wrap vision-wrap">
                <Eye size={30} />
              </div>
              <h3 className="mission-title">Our Vision</h3>
              <p className="mission-desc">
                To be the most reliable and loved service brand in the nation, renowned for unparalleled punctuality, transparent pricing, exceptional craft standards, and customer-first service delivery.
              </p>
            </div>

            <div className="mission-card card">
              <div className="mission-icon-wrap values-wrap">
                <HeartHandshake size={30} />
              </div>
              <h3 className="mission-title">Our Core Values</h3>
              <p className="mission-desc">
                Honesty in pricing, uncompromising safety through thorough vetting, respect for your home environment, and continuous training for our service partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Summary */}
      <section className="section about-services-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">What We Offer</span>
            <h2 className="section-title">Our Wide Range of Services</h2>
            <p className="section-subtitle">
              We cater to all residential and commercial maintenance requirements under one convenient roof.
            </p>
          </div>

          <div className="about-services-pills-grid">
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>AC Repair & Servicing:</strong> Compressor repair, gas charging, deep cleaning</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Home & Office Cleaning:</strong> Deep sanitization, sofas, kitchens, bathrooms</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Plumbing Services:</strong> Leaks, sanitary fixtures, water pumps, pipe fittings</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Certified Electricians:</strong> Wiring, breaker boxes, fans, inverter setups</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Computer & Laptop Repair:</strong> Hardware, OS formatting, malware cleanup, speedup</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Car Detailing & Wash:</strong> Exterior foam wash, interior vacuuming, machine polish</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Graphic Design:</strong> Logos, brand identity, social banners, marketing creative</span>
            </div>
            <div className="service-pill-item">
              <span className="pill-check">✓</span>
              <span><strong>Modern Web Development:</strong> Responsive websites, MERN stack web apps, portals</span>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '36px' }}>
            <Link to="/services" className="btn btn-primary btn-lg">
              <span>View Full Services Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section about-why-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-badge">The QuickServe Advantage</span>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              Experience the difference that real expertise and dedicated customer care bring.
            </p>
          </div>

          <div className="why-us-columns">
            <div className="why-us-feature">
              <div className="why-feat-icon">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4>Strict Background Checks</h4>
                <p>All service experts go through police record checks and practical skill tests.</p>
              </div>
            </div>

            <div className="why-us-feature">
              <div className="why-feat-icon">
                <Clock size={24} />
              </div>
              <div>
                <h4>Punctual & Reliable</h4>
                <p>We value your schedule. Technicians arrive on time, fully prepared with tools.</p>
              </div>
            </div>

            <div className="why-us-feature">
              <div className="why-feat-icon">
                <Award size={24} />
              </div>
              <div>
                <h4>7-Day Service Warranty</h4>
                <p>Enjoy complete peace of mind with our no-questions-asked rework warranty.</p>
              </div>
            </div>

            <div className="why-us-feature">
              <div className="why-feat-icon">
                <Users size={24} />
              </div>
              <div>
                <h4>Friendly 24/7 Support</h4>
                <p>Our dedicated operations team is always one click or call away to assist you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
