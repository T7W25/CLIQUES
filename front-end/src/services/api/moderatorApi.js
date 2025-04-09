 
import axios from "axios";

const API = ${process.env.REACT_APP_API_URL}/api/moderator;

export const getReports = async () => {
  const res = await axios.get(${API}/reports, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};

export const escalateReport = async (id) => {
  const res = await axios.put(${API}/escalate/${id}, {}, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};