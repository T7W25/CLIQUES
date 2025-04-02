import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/SCMDashboard.css";

const ServiceCategoryManagerDashboard = () => {
  const [services, setServices] = useState([]);

  // ✅ Fetch all services for SCM when page loads
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services/all"); // ✅ Fetch all services
        setServices(response.data.services);
      } catch (error) {
        console.error("❌ Error fetching all services:", error);
      }
    };

    fetchAllServices();
  }, []);

  // ✅ Approve or Reject Service
  const updateServiceStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/services/update-status/${id}`, { status });

      if (response.data.success) {
        alert(`✅ Service ${status} successfully!`);
        // ✅ Update UI after approval/rejection
        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === id ? { ...service, status } : service
          )
        );
      }
    } catch (error) {
      console.error("❌ Error updating service status:", error);
      alert("❌ Failed to update service status. Try again.");
    }
  };

  return (
    <div className="scm-dashboard">
      <h2>Service Category Manager Dashboard</h2>

      {/* ✅ Table of ALL Submitted Services */}
      <table className="services-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Provider</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr><td colSpan="7">No services found.</td></tr>
          ) : (
            services.map((service, index) => (
              <tr key={index}>
                <td>{service.title}</td>
                <td>{service.category}</td>
                <td>{service.subcategory}</td>
                <td>{service.price}</td>
                <td>{service.email}</td>
                <td className={`status-${service.status.toLowerCase()}`}>
                  {service.status}
                </td>
                <td>
                  {service.status === "Pending" && (
                    <>
                      <button className="approve-btn" onClick={() => updateServiceStatus(service._id, "Approved")}>Approve</button>
                      <button className="reject-btn" onClick={() => updateServiceStatus(service._id, "Rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceCategoryManagerDashboard;
