// import React from "react";
// import ReactDOM from "react-dom/client"; // ✅ Correct import for React 18
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct method
// root.render(
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//     </Routes>
//   </Router>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ServiceProviderDashboard from "./pages/provider/ServiceProviderDashboard";
import ServiceCategoryManagerDashboard from "./pages/admin/ServiceCategoryManagerDashboard";
import ServiceListings from "./pages/ServiceListings";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Navbar /> {/* ✅ Navbar always visible */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/provider/dashboard" element={<ServiceProviderDashboard />} /> {/* ✅ Fixes Missing Route */}
      <Route path="/scm/dashboard" element={<ServiceCategoryManagerDashboard />} />
      <Route path="/services" element={<ServiceListings />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
    <Footer /> {/* ✅ Footer always visible */}
  </Router>
);
