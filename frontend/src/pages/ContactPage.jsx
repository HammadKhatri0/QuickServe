import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  User, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { createContact } from '../services/api';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createContact(formData);
      if (res.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitError(res.message || 'Failed to submit message.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      const msg = err.response?.data?.message || 'Error connecting to server. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page page-container fade-in">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-badge">Get In Touch</span>
          <h1 className="section-title">We'd Love to Hear From You</h1>
          <p className="section-subtitle">
            Have questions about our service coverage, pricing, or looking to partner with QuickServe? Drop us a line.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Contact Details Card */}
          <div className="contact-details-col">
            <div className="contact-info-card card">
              <h3>Contact Information</h3>
              <p className="info-desc">
                Our support team is available 7 days a week to ensure your requests are handled swiftly.
              </p>

              <div className="info-items-list">
                <div className="info-row">
                  <div className="info-icon-wrap">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="info-lbl">Phone Support</span>
                    <a href="tel:03001234567" className="info-val">0300-1234567</a>
                    <span className="info-sub">Available 8:00 AM - 10:00 PM</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-wrap">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="info-lbl">Email Support</span>
                    <a href="mailto:info@quickserve.com" className="info-val">info@quickserve.com</a>
                    <span className="info-sub">Response within 2 hours</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-wrap">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="info-lbl">Headquarters</span>
                    <p className="info-val">QuickServe Plaza, 4th Floor</p>
                    <span className="info-sub">Tech Avenue, Service City</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-wrap">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="info-lbl">Working Hours</span>
                    <p className="info-val">Monday – Sunday</p>
                    <span className="info-sub">8:00 AM to 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-col">
            <div className="contact-form-card card">
              <h2 className="form-card-title">Send a Message</h2>
              <p className="form-card-sub">
                Leave your information and inquiry. Your message will be securely stored in our system.
              </p>

              {submitSuccess && (
                <div className="alert alert-success">
                  <CheckCircle size={22} />
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>Thank you for reaching out. We will get back to you shortly.</p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="alert alert-error">
                  <AlertCircle size={20} />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className={`form-input has-icon ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <p className="form-error">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className={`form-input has-icon ${errors.email ? 'error' : ''}`}
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <p className="form-error">
                      <AlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">
                    Phone Number <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Phone size={18} className="field-icon" />
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className={`form-input has-icon ${errors.phone ? 'error' : ''}`}
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && (
                    <p className="form-error">
                      <AlertCircle size={14} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="form-error">
                      <AlertCircle size={14} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg submit-contact-btn"
                  disabled={isSubmitting}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
