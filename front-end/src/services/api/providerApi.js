 
import axios from "axios";

const API = ${process.env.REACT_APP_API_URL}/api/services;

export const getMyServices = async () => {
  const res = await axios.get(${API}/my-services, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};

export const updatePromotionalPrice = async (id, data) => {
  const res = await axios.put(${API}/promo/${id}, data, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};