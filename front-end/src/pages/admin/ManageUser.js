import React, { useEffect, useState } from "react";
import { getAllUsers, toggleUserStatus, updateUserRole } from "../../services/api/adminApi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.success) setUsers(res.users);
    });
  }, []);

  const handleToggleStatus = async (id) => {
    await toggleUserStatus(id);
    setUsers((prev) =>
      prev.map((u) => u._id === id ? { ...u, suspended: !u.suspended } : u)
    );
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    setUsers((prev) =>
      prev.map((u) => u._id === id ? { ...u, role } : u)
    );
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {users.map((u) => (
        <div key={u._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <p>{u.name} ({u.email})</p>
          <p>Status: {u.suspended ? "Suspended" : "Active"}</p>
          <p>Role: {u.role}</p>
          <button onClick={() => handleToggleStatus(u._id)}>
            {u.suspended ? "Reinstate" : "Suspend"}
          </button>
          <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
            <option value="client">Client</option>
            <option value="service_provider">Service Provider</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;