import React, { useEffect, useState } from "react";
import { cancelBooking, rescheduleBooking, getClientBookings } from "../../services/api/clientApi";

const CancelBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [reschedule, setReschedule] = useState({});

  useEffect(() => {
    getClientBookings().then((res) => {
      if (res.success) setBookings(res.bookings);
    });
  }, []);

  const handleCancel = async (bookingId) => {
    await cancelBooking(bookingId);
    alert("Booking cancelled!");
  };

  const handleReschedule = async (e, bookingId) => {
    e.preventDefault();
    await rescheduleBooking(bookingId, reschedule[bookingId]);
    alert("Booking rescheduled!");
  };

  return (
    <div>
      <h2>Manage My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id}>
          <p>Service: {b.serviceId.title}</p>
          <p>Date: {b.date}</p>
          <button onClick={() => handleCancel(b._id)}>Cancel</button>
          <form onSubmit={(e) => handleReschedule(e, b._id)}>
            <input
              type="datetime-local"
              onChange={(e) => setReschedule({ ...reschedule, [b._id]: e.target.value })}
              required
            />
            <button type="submit">Reschedule</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default CancelBooking;