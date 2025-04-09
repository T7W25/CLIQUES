import React, { useEffect, useState } from "react";
import { getMyServices, updatePromotionalPrice } from "../../services/api/providerApi";

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getMyServices().then((res) => {
      if (res.success) setServices(res.services);
    });
  }, []);

  const handleChange = (e, id) => {
    const value = e.target.value;
    setServices((prev) =>
      prev.map((s) => (s._id === id ? { ...s, promoPrice: value } : s))
    );
  };

  const handleUpdate = async (id, promoPrice) => {
    await updatePromotionalPrice(id, { promoPrice });
    alert("Promotional price updated!");
  };

  return (
    <div>
      <h2>My Services</h2>
      {services.map((s) => (
        <div key={s._id}>
          <h4>{s.title}</h4>
          <p>Base Price: ₹{s.pricing}</p>
          <input
            type="number"
            placeholder="Promo Price"
            value={s.promoPrice || ""}
            onChange={(e) => handleChange(e, s._id)}
          />
          <button onClick={() => handleUpdate(s._id, s.promoPrice)}>
            Update Promo
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProviderDashboard;