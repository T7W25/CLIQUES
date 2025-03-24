import React, { useEffect, useState } from "react";
import { getReports, updateReportStatus } from "../../services/api/moderatorApi";

const ManageReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then((res) => setReports(res.data)).catch(console.error);
  }, []);

  const handleStatusChange = (id, status) => {
    updateReportStatus(id, status)
      .then(() => setReports(prev => prev.map(r => r._id === id ? { ...r, status } : r)))
      .catch(console.error);
  };

  return (
    <div>
      <h2>Moderator Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            {report.description} - Status: {report.status}
            <button onClick={() => handleStatusChange(report._id, "Resolved")}>Resolve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageReports;
