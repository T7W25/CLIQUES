import React, { useState } from "react";
import { submitFeedback } from "../../services/api/clientApi";

const OrderFeedbackForm = ({ bookingId }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback({ bookingId, feedback });
    alert("Feedback submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default OrderFeedbackForm;