import React, { useEffect, useState } from "react";
import { getFilteredServices } from "../../services/api/clientApi";

const ClientHome = () => {
  const [filters, setFilters] = useState({ rating: "", availability: "" });
  const [services, setServices] = useState([]);

  const fetchFiltered = async () => {
    const res = await getFilteredServices(filters);
    if (res.success) setServices(res.services);
  };

  useEffect(() => { fetchFiltered(); }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Find Services</h2>
      <select name="rating" onChange={handleChange}>
        <option value="">All Ratings</option>
        <option value="4">4★ & above</option>
        <option value="3">3★ & above</option>
      </select>

      <select name="availability" onChange={handleChange}>
        <option value="">All</option>
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>

      <button onClick={fetchFiltered}>Filter</button>

      {services.map((s) => (
        <div key={s._id}>
          <h4>{s.title}</h4>
          <p>Rating: {s.rating} ★</p>
          <p>Status: {s.availability}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientHome;
