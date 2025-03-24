 
import axios from "axios";

export const getUsersWithRoles = () =>
  axios.get("/api/admin/users", {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });

export const updateUserRole = (id, role) =>
  axios.put(
    /api/admin/users/${id}/role,
    { role },
    {
      headers: { Authorization: Bearer ${localStorage.getItem("token")} },
    }
  );