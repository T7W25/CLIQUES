import axios from "axios";

const API_BASE = {
  BOOKING: "/api/booking",
  PAYMENT: "/api/payment",
  SERVICE: "/api/service",
};

// Booking a service
export const bookService = (data) =>
  axios.post(`${API_BASE.BOOKING}/create`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// Processing payment
export const processPayment = (data) =>
  axios.post(`${API_BASE.PAYMENT}/process`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// Fetching approved services (already used in ClientHome.jsx)
export const fetchApprovedServices = () =>
  axios.get(`${API_BASE.SERVICE}/approved`);

// Already includes booking + payment functions
export const getClientBookings = () =>
  axios.get("/api/booking/client", {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });
