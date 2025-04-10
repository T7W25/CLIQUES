import React, { useEffect, useState } from "react";
import {
  getVerificationRequests,
  approveVerification,
  rejectVerification,
} from "../../services/api/adminApi";

const VerifyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getVerificationRequests().then((res) => {
      if (res.success) setRequests(res.requests);
    });
  }, []);

  const handleApprove = async (id) => {
    await approveVerification(id);
    setRequests(requests.filter((r) => r._id !== id));
  };

  const handleReject = async (id) => {
    await rejectVerification(id);
    setRequests(requests.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2>Verification Requests</h2>
      {requests.map((req) => (
        <div key={req._id}>
          <p><strong>{req.name}</strong> - {req.email}</p>
          <button onClick={() => handleApprove(req._id)}>Approve</button>
          <button onClick={() => handleReject(req._id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default VerifyRequests;