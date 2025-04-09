import React, { useEffect, useState } from "react";
import { getProviderAnalytics } from "../../services/api/providerApi";

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getProviderAnalytics().then((res) => {
      if (res.success) setData(res.analytics);
    });
  }, []);

  return (
    <div>
      <h2>Performance Analytics</h2>
      {data ? (
        <ul>
          <li>Total Services: {data.totalServices}</li>
          <li>Total Bookings: {data.totalBookings}</li>
          <li>Completed Bookings: {data.completedBookings}</li>
          <li>Average Rating: {data.avgRating.toFixed(1)} ★</li>
        </ul>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default Analytics;