// User Api
import axios from "axios";

const API_URL = "/api/user";

export const getProfile = () =>
  axios.get(${API_URL}/profile, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });


export const updateProfile = (data) =>
    axios.put("/api/user/profile", data, {
      headers: { Authorization: Bearer ${localStorage.getItem("token")} },
    });