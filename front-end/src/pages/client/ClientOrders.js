import React, { useEffect, useState } from "react";
import { getClientBookings } from "../../services/api/clientApi";

/**
 * ClientOrders: Shows booking history for logged-in client.
 */
const ClientOrders = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await getClientBookings();
      setBookings(res.data);
    }
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <h4>{b.serviceId?.title}</h4>
            <p>Provider: {b.providerId?.name}</p>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
            <p>Location: {b.location}</p>
            <p>Status: {b.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ClientOrders;