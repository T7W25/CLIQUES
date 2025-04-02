import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ServiceListings.css"; // ✅ Ensure CSS is included

const ServiceListingPage = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // ✅ Fetch only approved services when the page loads
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services/approved`); // ✅ API route
        setServices(response.data.services);
      } catch (error) {
        console.error("❌ Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // ✅ Filter services based on search query, category, and location
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? service.category === categoryFilter : true) &&
      (locationFilter ? service.location.toLowerCase().includes(locationFilter.toLowerCase()) : true)
  );

  return (
    <div className="service-listing">
      <h2>Find a Service</h2>

      {/* ✅ Search & Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Home Services">Home Services</option>
          <option value="General Services">General Services</option>
          <option value="Tutoring">Tutoring</option>
          <option value="Food Services">Food Services</option>
          <option value="Technician">Technician</option>
        </select>
        <input
          type="text"
          placeholder="Enter location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      {/* ✅ Display Services */}
      <div className="services-container">
        {filteredServices.length === 0 ? (
          <p>No services found.</p>
        ) : (
          filteredServices.map((service) => (
            <div key={service._id} className="service-card">
              <div className="service-image">
                {/* ✅ Ensure images display correctly */}
                {service.images && service.images.length > 0 ? (
                  <img src={`http://localhost:5000${service.images[0]}`} alt={service.title} />
                ) : (
                  <img src="/default-service.jpg" alt="Default Service" />
                )}
              </div>

              <div className="service-info">
                <h3>{service.title}</h3>
                <p><strong>Category:</strong> {service.category}</p>
                <p><strong>Subcategory:</strong> {service.subcategory}</p>
                <p><strong>Price:</strong> {service.price}</p>
                <p><strong>Location:</strong> {service.location}</p>
              </div>

              {/* ✅ Select Button (For Payment or Choosing the Service) */}
              <button className="select-btn">Select</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceListingPage;
