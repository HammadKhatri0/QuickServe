import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Wrench, Menu, X, CalendarCheck, ShieldCheck } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header glass">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrap">
            <Wrench className="logo-icon" size={22} />
          </div>
          <span className="logo-text">
            QUICK<span className="logo-highlight">SERVE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Services
          </NavLink>
          <NavLink
            to="/book"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Book Service
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Contact
          </NavLink>
          <NavLink
            to="/manage-services"
            className={({ isActive }) => (isActive ? 'nav-link admin-pill active' : 'nav-link admin-pill')}
          >
            <ShieldCheck size={16} />
            Manage
          </NavLink>
        </nav>

        {/* Header Action Button */}
        <div className="navbar-actions">
          <Link to="/book" className="btn btn-primary btn-sm book-btn">
            <CalendarCheck size={16} />
            <span>Book Now</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
            onClick={closeMobileMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/book"
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
            onClick={closeMobileMenu}
          >
            Book Service
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
          <NavLink
            to="/manage-services"
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
            onClick={closeMobileMenu}
          >
            Service Management (Admin)
          </NavLink>
        </div>
        <div className="mobile-drawer-cta">
          <Link to="/book" className="btn btn-primary btn-lg" onClick={closeMobileMenu} style={{ width: '100%' }}>
            Book a Service Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
