import React, { useState } from "react";
import { processPayment } from "../../services/api/clientApi";

const Payment = ({ bookingId, amount }) => {
  const [status, setStatus] = useState("");

  const handlePayment = async () => {
    try {
      const res = await processPayment({ bookingId, amount });
      setStatus(res.data.message);
    } catch (err) {
      setStatus("Payment failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <p>Booking ID: {bookingId}</p>
      <p>Amount: ${amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
      <p>{status}</p>
    </div>
  );
};

export default Payment;
