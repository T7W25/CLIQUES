import React, { useEffect, useState } from "react";
import { getVerificationRequests, updateVerificationStatus } from "../../services/api/verificationApi";

const VerificationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getVerificationRequests().then(res => setRequests(res.data)).catch(console.error);
  }, []);

  const handleUpdate = (id, status) => {
    updateVerificationStatus(id, status).then(() => {
      setRequests(reqs => reqs.map(r => r._id === id ? { ...r, status } : r));
    }).catch(console.error);
  };

  return (
    <div>
      <h2>Verification Requests</h2>
      <ul>
        {requests.map(req => (
          <li key={req._id}>
            {req.userId} - Status: {req.status}
            <button onClick={() => handleUpdate(req._id, "Approved")}>Approve</button>
            <button onClick={() => handleUpdate(req._id, "Rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerificationRequests;