import React from "react";
import { FaLeftLong } from "react-icons/fa6"; 

const Unauthorized = () => {
    const handleRedirect = () => {
        // Redirect to the dashboard and reload the page
        window.location.href = "/dashboard";  // Use your dashboard URL here
    };

    return (
        <div style={{ textAlign: "center", padding: "100px 20px", minHeight: "700px" }}>
            <img src="/assets/img/lock.png" alt="Unauthorized Access" width={200} />
            <h1 className="mt-4" style={{ fontSize: "2rem", color: "#c0392b" }}>403 - Unauthorized Access</h1>
            <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
                You do not have permission to access this page.
            </p>
            <button 
                onClick={handleRedirect} 
                style={{ fontSize: "1rem", color: "#2980b9", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>
                <FaLeftLong /> Back to Dashboard
            </button>
        </div>
    );
};

export default Unauthorized;
