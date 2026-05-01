import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiArrowRight } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-black">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">AURORA<span>.</span></h2>
            <p className="footer-desc">
              Experience the finest blend of artisanal coffee, exquisite pastries, and an atmosphere designed for moments of pure luxury.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Reservations</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Visit Us</h3>
            <p>123 Luxury Avenue</p>
            <p>New York, NY 10012</p>
            <p className="footer-phone">+1 (555) 123-4567</p>
            <p className="footer-email">hello@auroracafe.com</p>
          </div>

          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive tasting events, and more.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" required />
              <button type="submit" aria-label="Subscribe"><FiArrowRight /></button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Aurora Cafe. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;