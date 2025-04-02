import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../../styles/Footer.css"; // Ensure correct path to CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Branding */}
        <div className="footer-brand">
          <h2>CLIQUES</h2>
          <p>Connecting you with the best services, hassle-free.</p>
        </div>

        {/* Footer Navigation */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 CLIQUES. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
