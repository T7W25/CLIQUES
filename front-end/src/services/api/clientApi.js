 
import axios from "axios";

export const getOrders = async () => {
  const res = await axios.get(${process.env.REACT_APP_API_URL}/api/client/orders, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};

export const submitFeedback = async (data) => {
  const res = await axios.post(${process.env.REACT_APP_API_URL}/api/client/feedback, data, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });
  return res.data;
};