import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        { email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      
      
  
      console.log("🔍 Backend Response:", response.data); // ✅ Debugging Log
  
      if (response.data.success) {
        alert("✅ Login Successful!");
  
        // ✅ Save user details in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        const role = response.data.user.role;

        // ✅ Redirect the user based on their role
        if (role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (role === "service_provider") {
          window.location.href = "/provider/dashboard";
        } else if (role === "service_category_manager") {
          window.location.href = "/scm/dashboard";
        } else {
          window.location.href = "/profile";
        }
      } else {
        alert(response.data.message || "❌ Login failed! Try again.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("❌ Login failed! Check your API or server.");
    }
  };
  
  
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
