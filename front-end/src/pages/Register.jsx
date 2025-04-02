import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css"; // ✅ Ensure correct CSS path

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    serviceType: "",
    availability: "",
    pricing: "",
    experience: "",
    skills: "", // ✅ New Field: Skills
    profilePicture: null,
    identityProof: null,
  });

  // ✅ Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file uploads
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    formDataToSend.append("role", userType); // ✅ Ensure role is sent

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        alert(response.data.message || "❌ Registration failed! Try again.");
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);
      alert(error.response?.data?.message || "❌ Registration failed! Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />

        {/* ✅ Role Selection */}
        <div className="role-selection">
          <label>
            <input type="radio" name="userType" value="client" checked={userType === "client"} onChange={(e) => setUserType(e.target.value)} />
            Client
          </label>
          <label>
            <input type="radio" name="userType" value="service_provider" checked={userType === "service_provider"} onChange={(e) => setUserType(e.target.value)} />
            Service Provider
          </label>
        </div>

        {/* ✅ Service Provider Fields */}
        {userType === "service_provider" && (
          <>
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              <option value="">Select Service Type</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Painter">Painter</option>
              <option value="HVAC Specialist">HVAC Specialist</option>
              <option value="Contractor">Contractor</option>
              <option value="Cleaning">Cleaning</option>
            </select>
            <input type="text" name="availability" placeholder="Availability (e.g., Mon-Fri 9AM-5PM)" value={formData.availability} onChange={handleChange} required />
            <input type="text" name="pricing" placeholder="Pricing (e.g., $50 - $500)" value={formData.pricing} onChange={handleChange} required />
            <input type="text" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required />

            {/* ✅ Styled Skills Input (Textarea) */}
            <textarea
              className="styled-textarea"
              name="skills"
              placeholder="Enter your skills (comma-separated, e.g., Plumbing, Electrical Work, Painting)"
              value={formData.skills}
              onChange={handleChange}
              required
            ></textarea>
          </>
        )}

        {/* ✅ Profile Picture Upload */}
        <label>Profile Picture (Optional)</label>
        <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} />

        {/* ✅ Identity Proof Upload */}
        <label>Identity Proof (Required)</label>
        <input type="file" name="identityProof" accept="image/*,application/pdf" onChange={handleFileChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
