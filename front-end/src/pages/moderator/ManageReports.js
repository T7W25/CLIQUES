import React, { useEffect, useState } from "react";
import { getReports, escalateReport } from "../../services/api/moderatorApi";

const ManageReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then((res) => {
      if (res.success) setReports(res.reports);
    });
  }, []);

  const handleEscalate = async (id) => {
    await escalateReport(id);
    alert("Issue escalated to admin!");
  };

  return (
    <div>
      <h2>Unresolved Reports</h2>
      {reports.map((r) => (
        <div key={r._id}>
          <p>{r.issue}</p>
          <p>Status: {r.status}</p>
          {r.status !== "escalated" && (
            <button onClick={() => handleEscalate(r._id)}>Escalate</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageReports;
