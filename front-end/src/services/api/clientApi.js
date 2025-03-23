import axios from "axios";

const SERVICE_URL = "/api/service";
const BOOKING_URL = "/api/booking";

export const fetchApprovedServices = () => axios.get(`${SERVICE_URL}/approved`);

export const bookService = (data) =>
  axios.post(`${BOOKING_URL}/create`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

