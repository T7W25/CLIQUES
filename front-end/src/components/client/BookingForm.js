import React, { useState } from "react";
import { bookService } from "../../services/api/clientApi";

const BookingForm = ({ service }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService({
        serviceId: service._id,
        providerId: service.providerId._id,
        ...formData,
      });
      alert("Service booked successfully!");
    } catch (err) {
      alert("Booking failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book: {service.title}</h3>
      <input name="date" type="date" onChange={handleChange} required />
      <input name="time" type="time" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm; 
