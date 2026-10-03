import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="container footer-content">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-brand">
            <div className="footer-logo-icon">
              <Wrench size={20} />
            </div>
            <span>QUICK<span className="footer-logo-accent">SERVE</span></span>
          </Link>
          <p className="footer-tagline">
            Professional Services at Your Doorstep. Reliable, background-verified professionals ready to serve your home and office needs.
          </p>
          <div className="footer-badges">
            <span className="trust-badge">
              <ShieldCheck size={16} /> 100% Verified Experts
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/"><ArrowRight size={14} /> Home</Link>
            </li>
            <li>
              <Link to="/about"><ArrowRight size={14} /> About</Link>
            </li>
            <li>
              <Link to="/services"><ArrowRight size={14} /> Services</Link>
            </li>
            <li>
              <Link to="/book"><ArrowRight size={14} /> Book Service</Link>
            </li>
            <li>
              <Link to="/contact"><ArrowRight size={14} /> Contact</Link>
            </li>
            <li>
              <Link to="/manage-services"><ArrowRight size={14} /> Service Management</Link>
            </li>
          </ul>
        </div>

        {/* Popular Services */}
        <div className="footer-col">
          <h4 className="footer-title">Popular Services</h4>
          <ul className="footer-links">
            <li><Link to="/services"><ArrowRight size={14} /> AC Repair & Servicing</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Deep Home Cleaning</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Expert Plumbing</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Certified Electrician</Link></li>
            <li><Link to="/services"><ArrowRight size={14} /> Laptop & PC Repair</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-title">Contact</h4>
          <div className="footer-contact-items">
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Phone:</span>
                <a href="tel:03001234567" className="contact-val">0300-1234567</a>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Email:</span>
                <a href="mailto:info@quickserve.com" className="contact-val">info@quickserve.com</a>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Address:</span>
                <span className="contact-val">QuickServe Plaza, 4th Floor, Tech Avenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 QuickServe. All Rights Reserved.</p>
          <p className="built-with">
            Built with MERN Stack (MongoDB, Express, React, Node.js)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
