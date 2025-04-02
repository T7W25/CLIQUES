import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    serviceType: "",
    availability: "",
    pricing: "",
    experience: "",
    skills: "", // comma-separated
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        ...storedUser,
        skills: storedUser.skills ? storedUser.skills.join(", ") : "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      skills: formData.skills
        ? formData.skills.split(",").map((skill) => skill.trim())
        : [],
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/update/${formData.email}`,
        updatedFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        alert("✅ Profile updated successfully!");
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.updatedUser)
        );
        setUser(response.data.updatedUser);
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (error) {
      console.error("❌ Profile Update Error:", error);
      alert("❌ Server error while updating profile.");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      {(user.role === "service_provider" ||
        user.role === "service_category_manager") && (
        <div className="dashboard-button-container">
          <button
            className="dashboard-button"
            onClick={() =>
              navigate(
                user.role === "service_provider"
                  ? "/provider/dashboard"
                  : "/scm/dashboard"
              )
            }
          >
            Go to Dashboard
          </button>
        </div>
      )}

      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email (Not Editable)</label>
        <input type="email" name="email" value={formData.email} disabled />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Role</label>
        <input type="text" name="role" value={formData.role} disabled />

        {/* 🔹 Service Provider Extra Fields */}
        {formData.role === "service_provider" && (
          <>
            <label>Service Type</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            />

            <label>Availability</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            />

            <label>Pricing</label>
            <input
              type="text"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              required
            />

            <label>Experience (Years)</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />

            <label>Skills (Comma-Separated)</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Plumbing, Painting, Tiling"
            />
          </>
        )}

        <button type="submit" className="profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
