import React, { useEffect, useState } from "react";
import { getSuspiciousReviews, markAsReviewed } from "../../services/api/moderatorApi";

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getSuspiciousReviews().then((res) => {
      if (res.success) setReviews(res.reviews);
    });
  }, []);

  const handleResolve = async (id) => {
    await markAsReviewed(id);
    alert("Marked as reviewed!");
    setReviews((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2>Suspicious Reviews</h2>
      {reviews.map((r) => (
        <div key={r._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <p><strong>Reviewer:</strong> {r.reviewerName}</p>
          <p><strong>Text:</strong> {r.text}</p>
          <button onClick={() => handleResolve(r._id)}>Mark as Reviewed</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewModeration;