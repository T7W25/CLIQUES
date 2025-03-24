import React, { useEffect, useState } from "react";
import { getOrders, submitFeedback } from "../../services/api/feedbackApi";

const OrdersAndFeedback = () => {
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    getOrders().then((res) => setOrders(res.data)).catch(console.error);
  }, []);

  const handleSubmit = (orderId) => {
    submitFeedback(orderId, feedback[orderId] || "")
      .then(() => alert("Feedback submitted!"))
      .catch(console.error);
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Service: {order.serviceName}</p>
          <textarea
            placeholder="Leave feedback"
            value={feedback[order._id] || ""}
            onChange={(e) =>
              setFeedback({ ...feedback, [order._id]: e.target.value })
            }
          />
          <button onClick={() => handleSubmit(order._id)}>Submit</button>
        </div>
      ))}
    </div>
  );
};

export default OrdersAndFeedback;