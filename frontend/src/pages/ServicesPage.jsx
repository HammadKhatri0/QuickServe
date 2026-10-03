import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { getServices } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const res = await getServices(query);
      if (res.success && res.data) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Unable to load services from the server. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search input
    const delayDebounceFn = setTimeout(() => {
      fetchServices(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="services-page page-container fade-in">
      {/* Header Banner */}
      <div className="services-header-banner">
        <div className="container text-center">
          <span className="section-badge">Our Comprehensive Catalog</span>
          <h1 className="services-page-title">Explore All Services</h1>
          <p className="services-page-sub">
            From routine home maintenance to specialized IT and digital solutions, our verified experts are at your service.
          </p>

          {/* Search Box Component */}
          <div className="search-bar-wrapper">
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                id="service-search-input"
                className="search-input"
                placeholder="Search Services: e.g. AC Repair, Cleaning, Plumbing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="search-status-text">
                Showing results for "<strong>{searchTerm}</strong>" ({services.length} found)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="container services-grid-container">
        {loading ? (
          <div className="services-loading-state">
            <div className="spinner"></div>
            <p>Loading available services...</p>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <div>
              <p>{error}</p>
              <button
                onClick={() => fetchServices(searchTerm)}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '10px' }}
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          </div>
        ) : services.length > 0 ? (
          <>
            <div className="services-count-bar">
              <span>Showing <strong>{services.length}</strong> available service{services.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </>
        ) : (
          /* Empty / No Service Found State */
          <div className="no-services-found">
            <div className="no-services-icon-wrap">
              <Search size={40} />
            </div>
            <h3 className="no-services-title">No service found.</h3>
            <p className="no-services-desc">
              We couldn't find any service matching "<strong>{searchTerm}</strong>".
              Try searching for "AC", "Cleaning", "Plumbing", or "Repair".
            </p>
            <button
              onClick={handleClearSearch}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '16px' }}
            >
              Clear Search & Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
