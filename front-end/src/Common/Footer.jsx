import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row text-center text-md-start">

                    {/* Logo & Tagline */}
                    <div className="col-md-4 mb-4">
                        <h4 className="fw-bold text-primary">CLIQUES</h4>
                        <p className="">
                            Bridging the gap between clients and service providers with ease, trust, and innovation.
                        </p>
                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
                            <Link to="#" className="text-light fs-5"><FaFacebookF /></Link>
                            <Link to="#" className="text-light fs-5"><FaInstagram /></Link>
                            <Link to="#" className="text-light fs-5"><FaTwitter /></Link>
                            <Link to="#" className="text-light fs-5"><FaLinkedin /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="/" className="text-light text-decoration-none">🏠 Home</a></li>
                            <li className="mb-2"><a href="/explore-services" className="text-light text-decoration-none">🛠 Services</a></li>
                            <li className="mb-2"><a href="/aboutus" className="text-light text-decoration-none">📖 About Us</a></li>
                            <li className="mb-2"><a href="/contact" className="text-light text-decoration-none">📬 Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">Contact Us</h5>
                        <p className="mb-2">📍 123 CLIQUES Street, Tech City</p>
                        <p className="mb-2">📞 +91 12345 67890</p>
                        <p className="mb-2">📧 support@cliques.in</p>
                    </div>
                </div>

                <hr className="border-secondary my-4" />

                <div className="text-center small text-light">
                    &copy; {new Date().getFullYear()} <span className="text-light">CLIQUES</span>. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
