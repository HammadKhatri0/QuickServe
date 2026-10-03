import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Wrench, 
  Calendar, 
  MapPin, 
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { getServices, createBooking } from '../services/api';
import './BookingPage.css';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service') || '';

  const [servicesList, setServicesList] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preSelectedService,
    date: '',
    address: '',
    message: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  // Fetch available services for the dropdown
  useEffect(() => {
    const fetchServicesDropdown = async () => {
      try {
        setLoadingServices(true);
        const res = await getServices();
        if (res.success && res.data) {
          setServicesList(res.data);
          // If no query param was set, default to first service
          if (!preSelectedService && res.data.length > 0) {
            setFormData((prev) => ({ ...prev, service: res.data[0].name }));
          }
        }
      } catch (err) {
        console.error('Failed to load services for booking dropdown:', err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServicesDropdown();
  }, [preSelectedService]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // 1. Name is required
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // 2. Email: Please enter a valid email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    // 3. Phone: Phone number is required
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits)';
    }

    // 4. Service: Please select a service
    if (!formData.service.trim()) {
      newErrors.service = 'Please select a service';
    }

    // 5. Date is required
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    // 6. Address is required
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createBooking(formData);

      if (res.success) {
        setSubmitSuccess(true);
        setSubmittedBooking(res.data);
      } else {
        setSubmitError(res.message || 'Something went wrong while booking. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      const msg = err.response?.data?.message || 'Failed to submit booking to server. Check connection.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to book another
  const handleBookAnother = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: servicesList.length > 0 ? servicesList[0].name : '',
      date: '',
      address: '',
      message: '',
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmittedBooking(null);
  };

  // Get tomorrow's date for date picker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-page page-container fade-in">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-badge">Fast & Easy</span>
          <h1 className="section-title">Schedule Your Service</h1>
          <p className="section-subtitle">
            Fill out the details below. Our certified technician will arrive on your preferred schedule.
          </p>
        </div>

        <div className="booking-layout-grid">
          {/* Booking Form Card */}
          <div className="booking-card card">
            {submitSuccess ? (
              /* Success Message Display */
              <div className="booking-success-box text-center">
                <div className="success-icon-wrap">
                  <CheckCircle size={56} className="success-icon" />
                </div>
                <h2 className="success-headline">Booking submitted successfully!</h2>
                <p className="success-subline">We will contact you soon.</p>

                {submittedBooking && (
                  <div className="booking-summary-box">
                    <h4>Booking Summary</h4>
                    <div className="summary-row">
                      <span className="summary-lbl">Service:</span>
                      <strong className="summary-val">{submittedBooking.service}</strong>
                    </div>
                    <div className="summary-row">
                      <span className="summary-lbl">Name:</span>
                      <span className="summary-val">{submittedBooking.name}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-lbl">Date:</span>
                      <span className="summary-val">{submittedBooking.date}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-lbl">Address:</span>
                      <span className="summary-val">{submittedBooking.address}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-lbl">Booking Status:</span>
                      <span className="status-badge-pending">Pending Confirmation</span>
                    </div>
                  </div>
                )}

                <div className="success-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleBookAnother}
                  >
                    Book Another Service
                  </button>
                  <Link to="/services" className="btn btn-secondary">
                    Browse More Services
                  </Link>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} noValidate>
                {submitError && (
                  <div className="alert alert-error">
                    <AlertCircle size={20} />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-input has-icon ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. John Doe"
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

                {/* Email & Phone in 2 Columns */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={18} className="field-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-input has-icon ${errors.email ? 'error' : ''}`}
                        placeholder="john@example.com"
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

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Phone size={18} className="field-icon" />
                      <input
                        type="tel"
                        id="phone"
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
                </div>

                {/* Select Service & Date in 2 Columns */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Select Service <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Wrench size={18} className="field-icon" />
                      <select
                        id="service"
                        name="service"
                        className={`form-select has-icon ${errors.service ? 'error' : ''}`}
                        value={formData.service}
                        onChange={handleChange}
                        disabled={loadingServices}
                      >
                        <option value="">-- Choose a Service --</option>
                        {servicesList.map((svc) => (
                          <option key={svc._id} value={svc.name}>
                            {svc.name} (Rs. {svc.price})
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.service && (
                      <p className="form-error">
                        <AlertCircle size={14} /> {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="form-label">
                      Preferred Date <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Calendar size={18} className="field-icon" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min={todayStr}
                        className={`form-input has-icon ${errors.date ? 'error' : ''}`}
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.date && (
                      <p className="form-error">
                        <AlertCircle size={14} /> {errors.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Service Address <span className="req-star">*</span>
                  </label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="field-icon" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={`form-input has-icon ${errors.address ? 'error' : ''}`}
                      placeholder="House/Apartment #, Street, Area, City"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.address && (
                    <p className="form-error">
                      <AlertCircle size={14} /> {errors.address}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Additional Instructions / Message (Optional)
                  </label>
                  <div className="input-with-icon">
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      className="form-textarea"
                      placeholder="Describe the issue, parking notes, or any special requests..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg submit-booking-btn"
                  disabled={isSubmitting}
                >
                  <CalendarCheck size={20} />
                  <span>{isSubmitting ? 'Processing Booking...' : 'Submit Booking'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Sidebar: Guarantees & Contact */}
          <div className="booking-info-sidebar">
            <div className="sidebar-box card">
              <h3 className="sidebar-box-title">Why Book with QuickServe?</h3>
              <ul className="sidebar-checklist">
                <li>
                  <ShieldCheck size={20} className="check-svg" />
                  <div>
                    <strong>Zero Cancellation Fee</strong>
                    <p>Cancel or reschedule anytime up to 2 hours before scheduled slot.</p>
                  </div>
                </li>
                <li>
                  <ShieldCheck size={20} className="check-svg" />
                  <div>
                    <strong>Insured & Vetted Experts</strong>
                    <p>Technicians undergo rigorous police background and skill checks.</p>
                  </div>
                </li>
                <li>
                  <ShieldCheck size={20} className="check-svg" />
                  <div>
                    <strong>Pay After Completion</strong>
                    <p>Pay safely via cash, bank transfer, or card once you are satisfied.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="sidebar-box emergency-box card">
              <h4>Need Same-Hour Assistance?</h4>
              <p>For urgent emergencies (burst pipes, short circuits), call our priority dispatch directly.</p>
              <a href="tel:03001234567" className="emergency-phone-link">
                <Phone size={18} /> 0300-1234567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
