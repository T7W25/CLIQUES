import React, { useEffect, useState } from "react";
import { getUsersWithRoles, updateUserRole } from "../../services/api/adminApi";

const AdminPermissions = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersWithRoles().then((res) => setUsers(res.data)).catch(console.error);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole)
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Manage User Permissions</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="Client">Client</option>
                  <option value="Provider">Provider</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="SCM">SCM</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPermissions;