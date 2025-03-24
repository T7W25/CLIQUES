import axios from "axios";

export const getPendingServices = () =>
  axios.get("/api/scm/services/pending", {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });

export const approveService = (id) =>
  axios.put(/api/scm/services/${id}/approve, {}, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });