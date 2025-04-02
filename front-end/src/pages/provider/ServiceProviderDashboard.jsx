import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ServiceProviderDashboard.css";

const ServiceProviderDashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    price: "",
    description: "",
    duties: "",
    notes: "",
    availability: "",
    location: "",
    phone: "",
    email: "",
    images: [],
  });

  const [services, setServices] = useState([]);

  // ✅ Fetch user data & their submitted services when the page loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData((prevData) => ({
        ...prevData,
        email: storedUser.email || "",
        phone: storedUser.phone || "",
      }));
  
      // ✅ Fetch ONLY services submitted by this user
      const fetchServices = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/services?email=${storedUser.email}`);
          setServices(response.data.services); // Only logged-in provider's services
        } catch (error) {
          console.error("❌ Error fetching services:", error);
        }
      };
  
      fetchServices();
    }
  }, []);
  

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  // ✅ Handle form submission (send data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData[key].forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/services",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Service submitted successfully!");
      setServices([...services, response.data.service]); // ✅ Update table immediately
      setFormData({
        title: "",
        category: "",
        subcategory: "",
        price: "",
        description: "",
        duties: "",
        notes: "",
        availability: "",
        location: "",
        phone: response.data.service.phone, // ✅ Keep the user's phone
        email: response.data.service.email, // ✅ Keep the user's email
        images: [],
      });

    } catch (error) {
      console.error("❌ Error submitting service:", error);
      alert("❌ Failed to submit service. Try again.");
    }
  };

  return (
    <div className="provider-dashboard">
      <h2 className="dashboard-title">Service Provider Dashboard</h2>

      {/* ✅ Service Submission Form (Added Back) */}
      <form className="service-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>Add a New Service</h3>

        <input type="text" name="title" placeholder="Service Title" value={formData.title} onChange={handleChange} required />

        {/* ✅ Arrange category, subcategory, and price in one line */}
        <div className="inline-fields">
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Home Services">Home Services</option>
            <option value="General Services">General Services</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Food Services">Food Services</option>
            <option value="Technician">Technician</option>
          </select>
          <input type="text" name="subcategory" placeholder="Subcategory (e.g., Plumber, Electrician)" value={formData.subcategory} onChange={handleChange} required />
          <input type="text" name="price" placeholder="Price Range (e.g., $50 - $500)" value={formData.price} onChange={handleChange} required />
        </div>

        <textarea name="description" placeholder="Service Description" value={formData.description} onChange={handleChange} required></textarea>
        <textarea name="duties" placeholder="Duties & Responsibilities" value={formData.duties} onChange={handleChange} required></textarea>
        <textarea name="notes" placeholder="Additional Notes (Optional)" value={formData.notes} onChange={handleChange}></textarea>
        <input type="text" name="availability" placeholder="Availability (e.g., Mon-Fri 9AM-5PM)" value={formData.availability} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Service Area (City, Zip Code)" value={formData.location} onChange={handleChange} required />

        {/* ✅ Phone & Email (Pre-filled & Read-only) */}
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} readOnly />
        <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} readOnly />

        <input type="file" name="images" multiple onChange={handleImageUpload} accept="image/*" />
        <button type="submit">Submit for Approval</button>
      </form>

      {/* ✅ Display Only Provider's Own Services */}
      <h3>My Submitted Services</h3>
      <table className="services-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr><td colSpan="5">No services submitted yet.</td></tr>
          ) : (
            services.map((service, index) => (
              <tr key={index}>
                <td>{service.title}</td>
                <td>{service.category}</td>
                <td>{service.subcategory}</td>
                <td>{service.price}</td>
                <td className={`status-${service.status.toLowerCase()}`}>
                  {service.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceProviderDashboard;
