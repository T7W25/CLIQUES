import React, { useEffect, useState } from "react";
import {
  getProviderBookings,
  updateBookingStatus,
} from "../../services/api/providerApi";

/**
 * BookingRequests.jsx
 * Shows booking requests for a service provider and allows Accept/Reject.
 */
const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getProviderBookings();
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus({ bookingId: id, status });
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status } : b))
    );
  };

  return (
    <div>
      <h2>Booking Requests</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <h4>{b.serviceId?.title}</h4>
            <p>Client: {b.clientId?.name}</p>
            <p>Date: {b.date} | Time: {b.time}</p>
            <p>Location: {b.location}</p>
            <p>Status: {b.status}</p>
            {b.status === "Pending" && (
              <>
                <button onClick={() => handleStatusChange(b._id, "Booked")}>Accept</button>
                <button onClick={() => handleStatusChange(b._id, "Rejected")}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookingRequests;