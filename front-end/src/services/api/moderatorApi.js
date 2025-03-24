 
import axios from "axios";

export const getReports = () =>
  axios.get("/api/moderator/reports", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

export const updateReportStatus = (id, status) =>
  axios.put(`/api/moderator/reports/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
