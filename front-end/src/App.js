import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceProviderDashboard from "./pages/provider/ServiceProviderDashboard";
import ServiceCategoryManagerDashboard from "./pages/admin/ServiceCategoryManagerDashboard";
import ServiceListings from "./pages/ServiceListings";
import AdminDashboard from "./pages/admin/AdminDashboard"; // ✅ Adjust path if needed

// app start
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/provider/dashboard" element={<ServiceProviderDashboard />} /> 
        <Route path="/services" element={<ServiceListings />} />
        {/* ✅ SCM Dashboard */}
        {user && user.role === "service_category_manager" && (
          <Route path="/scm/dashboard" element={<ServiceCategoryManagerDashboard />} />        
        )}

        {/* ✅ Admin Dashboard */}
        {user && user.role === "admin" && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
