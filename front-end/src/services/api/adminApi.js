 
import axios from "axios";

const API = ${process.env.REACT_APP_API_URL}/api/admin;

export const getAllUsers = async () => {
  const res = await axios.get(${API}/users, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};

export const toggleUserStatus = async (id) => {
  const res = await axios.put(${API}/users/${id}/toggle-status, {}, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await axios.put(${API}/users/${id}/role, { role }, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};


export const getVerificationRequests = async () => {
  const res = await axios.get(${API}/verify, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });
  return res.data;
};

export const approveVerification = async (id) =>
  axios.put(${API}/verify/${id}/approve);

export const rejectVerification = async (id) =>
  axios.put(${API}/verify/${id}/reject);