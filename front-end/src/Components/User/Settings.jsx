import React, { useContext, useState } from "react";
import UserContext from "../../Context/User/userContext";
import Sidebar from "./Sidebar";

// Settings.js
const Settings = () => {
    const { users, changePassword } = useContext(UserContext);
    const [passwordData, setPasswordData] = useState({
        password: "",
        new_password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await changePassword(passwordData);
        setMessage(response.message);
    };

    if (!users) {
        return <h3>Loading user data...</h3>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <div className="row">
                    <div className="col-6">
                        <h4 className="mb-4">Change Password</h4>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <label>Current Password:</label>
                            <input type="password" name="password" value={passwordData.password} onChange={handleChange} className="form-control" required />

                            <label>New Password:</label>
                            <input type="password" name="new_password" value={passwordData.new_password} onChange={handleChange} className="form-control" required />

                            <button type="submit" className="btn-theme mt-3">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;