import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminDashboard.css"; // ✅ Make sure this file exists

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.users);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/users/${id}`);
      if (res.data.success) {
        alert("✅ User deleted successfully");
        fetchUsers(); // Refresh list
      } else {
        alert("❌ Failed to delete user");
      }
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      alert("❌ Server error while deleting user");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4">No users found.</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
