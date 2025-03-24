import React, { useEffect, useState } from "react";
import { getPendingServices, approveService } from "../../services/api/scmApi";

const ApproveServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getPendingServices()
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = (id) => {
    approveService(id)
      .then(() => {
        setServices((prev) => prev.filter((s) => s._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Pending Service Approvals</h2>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            {service.name} - {service.description}
            <button onClick={() => handleApprove(service._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveServices;