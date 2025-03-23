import axios from "axios";

const BOOKING_URL = "/api/booking";

// Provider: Get all bookings
export const getProviderBookings = () =>
  axios.get(${BOOKING_URL}/provider, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });

// Provider: Accept or Reject a booking
export const updateBookingStatus = (data) =>
  axios.put(${BOOKING_URL}/update-status, data, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });