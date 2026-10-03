import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Image, 
  DollarSign, 
  FileText, 
  Layers, 
  Inbox, 
  Mail, 
  Calendar,
  X,
  RefreshCw,
  Eye
} from 'lucide-react';
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService, 
  getBookings,
  deleteBooking,
  getContacts
} from '../services/api';
import './ManageServicesPage.css';

const ManageServicesPage = () => {
  const [activeTab, setActiveTab] = useState('services'); // 'services', 'bookings', 'contacts'

  // Services State
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  // Add / Edit Service Form State
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Contacts State
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Fetch Services
  const fetchAllServices = async () => {
    try {
      setLoadingServices(true);
      setServicesError(null);
      const res = await getServices();
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setServicesError('Failed to fetch services. Make sure backend is running.');
    } finally {
      setLoadingServices(false);
    }
  };

  // Fetch Bookings
  const fetchAllBookings = async () => {
    try {
      setLoadingBookings(true);
      const res = await getBookings();
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Fetch Contacts
  const fetchAllContacts = async () => {
    try {
      setLoadingContacts(true);
      const res = await getContacts();
      if (res.success && res.data) {
        setContacts(res.data);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
    fetchAllBookings();
    fetchAllContacts();
  }, []);

  // Form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation
  const validateServiceForm = () => {
    const errs = {};
    if (!serviceForm.name.trim()) errs.name = 'Service name is required';
    if (!serviceForm.description.trim()) errs.description = 'Description is required';
    if (!serviceForm.price || isNaN(Number(serviceForm.price)) || Number(serviceForm.price) <= 0) {
      errs.price = 'Please enter a valid price (greater than 0)';
    }
    if (!serviceForm.duration.trim()) errs.duration = 'Duration is required (e.g. 2 Hours)';
    if (!serviceForm.image.trim()) errs.image = 'Image URL is required';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Form Submit (Add or Edit)
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!validateServiceForm()) return;

    try {
      setIsSubmitting(true);
      setActionSuccess(null);

      if (isEditing) {
        // Update service
        const res = await updateService(editId, serviceForm);
        if (res.success) {
          setActionSuccess(`Service "${res.data.name}" updated successfully!`);
          resetForm();
          fetchAllServices();
        }
      } else {
        // Create service
        const res = await createService(serviceForm);
        if (res.success) {
          setActionSuccess(`Service "${res.data.name}" created successfully!`);
          resetForm();
          fetchAllServices();
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert(err.response?.data?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Start Edit Mode
  const handleEditClick = (service) => {
    setIsEditing(true);
    setEditId(service._id);
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
    });
    setFormErrors({});
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Delete Service
  const handleDeleteService = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the service "${name}"?`)) {
      try {
        const res = await deleteService(id);
        if (res.success) {
          setActionSuccess(`Service "${name}" was deleted successfully.`);
          fetchAllServices();
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert(err.response?.data?.message || 'Failed to delete service');
      }
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id) => {
    if (window.confirm('Delete this booking record?')) {
      try {
        await deleteBooking(id);
        fetchAllBookings();
      } catch (err) {
        console.error('Error deleting booking:', err);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setServiceForm({
      name: '',
      description: '',
      price: '',
      duration: '',
      image: '',
    });
    setIsEditing(false);
    setEditId(null);
    setFormErrors({});
  };

  return (
    <div className="manage-page page-container fade-in">
      <div className="container">
        {/* Header */}
        <div className="manage-header">
          <div>
            <span className="section-badge">Admin Demonstration</span>
            <h1 className="manage-title">Service & Operations Management</h1>
            <p className="manage-sub">
              Manage services catalog (Add, Edit, Delete, View) and monitor live bookings & inquiries from MongoDB.
            </p>
          </div>
          <button onClick={() => { fetchAllServices(); fetchAllBookings(); fetchAllContacts(); }} className="btn btn-secondary btn-sm refresh-all-btn">
            <RefreshCw size={15} /> Refresh Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="manage-tabs">
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Layers size={18} />
            <span>Services Catalog ({services.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={18} />
            <span>Bookings Received ({bookings.length})</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Inbox size={18} />
            <span>Contact Messages ({contacts.length})</span>
          </button>
        </div>

        {/* TAB 1: Services CRUD Management */}
        {activeTab === 'services' && (
          <div className="tab-pane fade-in">
            {actionSuccess && (
              <div className="alert alert-success">
                <CheckCircle size={20} />
                <span>{actionSuccess}</span>
              </div>
            )}

            <div className="manage-crud-layout">
              {/* Add / Edit Service Form Card */}
              <div className="manage-form-col">
                <div className="card manage-form-card">
                  <div className="card-header-row">
                    <h3>{isEditing ? 'Edit Service' : 'Add New Service'}</h3>
                    {isEditing && (
                      <button
                        type="button"
                        className="btn-cancel-edit"
                        onClick={resetForm}
                        title="Cancel edit"
                      >
                        <X size={18} /> Cancel Edit
                      </button>
                    )}
                  </div>
                  <p className="card-form-sub">
                    {isEditing 
                      ? 'Update the details for this service below.'
                      : 'Fill in the service details to publish to the catalog.'}
                  </p>

                  <form onSubmit={handleServiceSubmit} noValidate>
                    {/* Service Name */}
                    <div className="form-group">
                      <label htmlFor="service-name" className="form-label">
                        Service Name <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="service-name"
                        name="name"
                        className={`form-input ${formErrors.name ? 'error' : ''}`}
                        placeholder="e.g. AC Repair"
                        value={serviceForm.name}
                        onChange={handleFormChange}
                      />
                      {formErrors.name && (
                        <p className="form-error"><AlertCircle size={14} /> {formErrors.name}</p>
                      )}
                    </div>

                    {/* Price and Duration in 2 Columns */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="service-price" className="form-label">
                          Price (Rs.) <span className="req-star">*</span>
                        </label>
                        <input
                          type="number"
                          id="service-price"
                          name="price"
                          className={`form-input ${formErrors.price ? 'error' : ''}`}
                          placeholder="e.g. 2500"
                          value={serviceForm.price}
                          onChange={handleFormChange}
                        />
                        {formErrors.price && (
                          <p className="form-error"><AlertCircle size={14} /> {formErrors.price}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="service-duration" className="form-label">
                          Duration <span className="req-star">*</span>
                        </label>
                        <input
                          type="text"
                          id="service-duration"
                          name="duration"
                          className={`form-input ${formErrors.duration ? 'error' : ''}`}
                          placeholder="e.g. 2 Hours"
                          value={serviceForm.duration}
                          onChange={handleFormChange}
                        />
                        {formErrors.duration && (
                          <p className="form-error"><AlertCircle size={14} /> {formErrors.duration}</p>
                        )}
                      </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-group">
                      <label htmlFor="service-image" className="form-label">
                        Image URL <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="service-image"
                        name="image"
                        className={`form-input ${formErrors.image ? 'error' : ''}`}
                        placeholder="https://images.unsplash.com/... or ac.jpg"
                        value={serviceForm.image}
                        onChange={handleFormChange}
                      />
                      {formErrors.image && (
                        <p className="form-error"><AlertCircle size={14} /> {formErrors.image}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                      <label htmlFor="service-desc" className="form-label">
                        Description <span className="req-star">*</span>
                      </label>
                      <textarea
                        id="service-desc"
                        name="description"
                        rows="3"
                        className={`form-textarea ${formErrors.description ? 'error' : ''}`}
                        placeholder="Professional AC repair and maintenance service..."
                        value={serviceForm.description}
                        onChange={handleFormChange}
                      ></textarea>
                      {formErrors.description && (
                        <p className="form-error"><AlertCircle size={14} /> {formErrors.description}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className={`btn ${isEditing ? 'btn-accent' : 'btn-primary'} btn-lg`}
                      style={{ width: '100%' }}
                      disabled={isSubmitting}
                    >
                      {isEditing ? <Edit3 size={18} /> : <PlusCircle size={18} />}
                      <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Service' : 'Add Service'}</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* View / Manage Existing Services List */}
              <div className="manage-list-col">
                <div className="card manage-list-card">
                  <div className="card-header-row">
                    <h3>All Services in Catalog ({services.length})</h3>
                  </div>

                  {loadingServices ? (
                    <div className="spinner"></div>
                  ) : servicesError ? (
                    <div className="alert alert-error">{servicesError}</div>
                  ) : services.length === 0 ? (
                    <div className="empty-catalog-text">
                      <p>No services registered yet. Add a service using the form on the left.</p>
                    </div>
                  ) : (
                    <div className="services-table-wrap">
                      <table className="manage-table">
                        <thead>
                          <tr>
                            <th>Service</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {services.map((svc) => (
                            <tr key={svc._id} className={editId === svc._id ? 'highlight-editing-row' : ''}>
                              <td>
                                <div className="svc-meta-cell">
                                  <img
                                    src={svc.image}
                                    alt={svc.name}
                                    className="svc-thumbnail"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80';
                                    }}
                                  />
                                  <div>
                                    <strong className="svc-tbl-name">{svc.name}</strong>
                                    <p className="svc-tbl-desc">
                                      {svc.description.length > 55 ? `${svc.description.substring(0, 55)}...` : svc.description}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="duration-pill">{svc.duration}</span>
                              </td>
                              <td>
                                <strong className="price-tbl-val">Rs. {Number(svc.price).toLocaleString()}</strong>
                              </td>
                              <td>
                                <div className="table-actions">
                                  <button
                                    onClick={() => handleEditClick(svc)}
                                    className="action-btn edit-btn"
                                    title="Edit Service"
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteService(svc._id, svc.name)}
                                    className="action-btn delete-btn"
                                    title="Delete Service"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: View Bookings from MongoDB */}
        {activeTab === 'bookings' && (
          <div className="tab-pane fade-in">
            <div className="card manage-list-card">
              <div className="card-header-row">
                <h3>Customer Bookings Stored in MongoDB ({bookings.length})</h3>
                <button onClick={fetchAllBookings} className="btn btn-secondary btn-sm">
                  <RefreshCw size={14} /> Refresh
                </button>
              </div>

              {loadingBookings ? (
                <div className="spinner"></div>
              ) : bookings.length === 0 ? (
                <div className="empty-catalog-text">
                  <p>No bookings received yet. Submit one from the <a href="/book" style={{ color: 'var(--primary)', fontWeight: 600 }}>Book Service</a> page to test!</p>
                </div>
              ) : (
                <div className="services-table-wrap">
                  <table className="manage-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th>Notes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b._id}>
                          <td>
                            <strong>{b.name}</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <div>{b.email}</div>
                              <div>{b.phone}</div>
                            </div>
                          </td>
                          <td>
                            <span className="badge-svc">{b.service}</span>
                          </td>
                          <td>
                            <strong>{b.date}</strong>
                          </td>
                          <td style={{ maxWidth: '200px', fontSize: '0.85rem' }}>
                            {b.address}
                          </td>
                          <td style={{ maxWidth: '200px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {b.message || '—'}
                          </td>
                          <td>
                            <button
                              onClick={() => handleDeleteBooking(b._id)}
                              className="action-btn delete-btn"
                              title="Delete booking"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: View Contact Messages from MongoDB */}
        {activeTab === 'contacts' && (
          <div className="tab-pane fade-in">
            <div className="card manage-list-card">
              <div className="card-header-row">
                <h3>Contact Messages Stored in MongoDB ({contacts.length})</h3>
                <button onClick={fetchAllContacts} className="btn btn-secondary btn-sm">
                  <RefreshCw size={14} /> Refresh
                </button>
              </div>

              {loadingContacts ? (
                <div className="spinner"></div>
              ) : contacts.length === 0 ? (
                <div className="empty-catalog-text">
                  <p>No messages received yet. Submit a message from the <a href="/contact" style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact</a> page to test!</p>
                </div>
              ) : (
                <div className="services-table-wrap">
                  <table className="manage-table">
                    <thead>
                      <tr>
                        <th>Sender Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c) => (
                        <tr key={c._id}>
                          <td><strong>{c.name}</strong></td>
                          <td><a href={`mailto:${c.email}`} style={{ color: 'var(--primary)' }}>{c.email}</a></td>
                          <td>{c.phone}</td>
                          <td style={{ maxWidth: '350px', fontSize: '0.9rem' }}>
                            {c.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServicesPage;
