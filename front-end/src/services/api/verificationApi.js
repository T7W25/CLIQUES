import axios from "axios";

export const getVerificationRequests = () =>
  axios.get("/api/verification/requests", {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });

export const updateVerificationStatus = (id, status) =>
  axios.put(/api/verification/requests/${id}/status, { status }, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });