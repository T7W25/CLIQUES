import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load User from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* ✅ Original CLIQUES Logo Styling */}
        <Link to="/" className="navbar-logo">
          CLIQUES
        </Link>

        {/* ✅ Mobile Menu Icon (Hidden on Desktop) */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* ✅ Navigation Links (Hide on Mobile) */}
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>

        {/* ✅ User Authentication Controls (No Extra Navbar) */}
        <div className="nav-buttons">
          {user ? (
            <>
              {/* Profile Icon (Redirects to Profile) */}
              <Link to="/profile" className="nav-icon">
                <FaUser />
              </Link>
              {/* Logout Button */}
              <button onClick={handleLogout} className="nav-btn logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn register-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
