import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/api/clientApi";
import OrderFeedbackForm from "./OrderFeedbackForm";

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders();
      if (res.success) setOrders(res.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <p>Service: {order.serviceName}</p>
          <p>Date: {order.date}</p>
          <OrderFeedbackForm bookingId={order._id} />
        </div>
      ))}
    </div>
  );
};

export default ClientOrders;