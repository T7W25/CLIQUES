import React, { useState } from "react";
import { createService } from "../../services/api/providerApi";

const ProviderDashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    availability: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createService(formData);
      alert("Service submitted successfully!");
      setFormData({ title: "", description: "", category: "", price: "", availability: "" });
    } catch (err) {
      alert("Error submitting service: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Service</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Service Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProviderDashboard;
