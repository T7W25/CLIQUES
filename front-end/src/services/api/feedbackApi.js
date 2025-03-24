import axios from "axios";

export const getOrders = () =>
  axios.get("/api/feedback/orders", {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });

export const submitFeedback = (orderId, message) =>
  axios.post("/api/feedback/feedback", { orderId, message }, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} }
  });