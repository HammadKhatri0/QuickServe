import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  const { _id, name, description, price, duration, image } = service;

  // Fallback image in case URL is broken
  const defaultImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="card service-card">
      <div className="service-card-img-wrap">
        <img
          src={image || defaultImage}
          alt={name}
          className="service-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          loading="lazy"
        />
        <div className="service-duration-badge">
          <Clock size={13} />
          <span>{duration}</span>
        </div>
      </div>

      <div className="service-card-body">
        <h3 className="service-card-title">{name}</h3>
        <p className="service-card-desc">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>

        <div className="service-card-footer">
          <div className="service-price-wrap">
            <span className="price-label">Starting from</span>
            <span className="price-amount">
              Rs. {Number(price).toLocaleString()}
            </span>
          </div>

          <Link to={`/services/${_id}`} className="btn btn-primary btn-sm service-action-btn">
            <span>View Details</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
