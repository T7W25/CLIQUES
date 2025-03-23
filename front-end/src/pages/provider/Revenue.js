import React, { useEffect, useState } from "react";
import { getEarnings } from "../../services/api/providerApi";

/**
 * Revenue.jsx
 * Displays total earnings and payment history for service provider.
 */
const Revenue = () => {
  const [earnings, setEarnings] = useState({ totalEarnings: 0, transactions: [] });

  useEffect(() => {
    const fetchEarnings = async () => {
      const res = await getEarnings();
      setEarnings(res.data);
    };
    fetchEarnings();
  }, []);

  return (
    <div>
      <h2>Total Earnings: ${earnings.totalEarnings}</h2>
      <h3>Transactions:</h3>
      {earnings.transactions.map((txn) => (
        <div key={txn._id} className="txn-card">
          <p>Amount: ${txn.amount}</p>
          <p>Date: {new Date(txn.paymentDate).toLocaleDateString()}</p>
          <p>Status: {txn.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Revenue;