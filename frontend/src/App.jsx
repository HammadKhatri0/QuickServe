import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import ManageServicesPage from './pages/ManageServicesPage';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import './App.css';

// Scroll to top upon navigating routes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

// 404 Page Component
const NotFoundPage = () => {
  return (
    <div className="page-container container text-center" style={{ padding: '100px 20px' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px auto'
      }}>
        <AlertTriangle size={40} />
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '12px' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 30px auto' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <ArrowLeft size={18} />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailsPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/manage-services" element={<ManageServicesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
