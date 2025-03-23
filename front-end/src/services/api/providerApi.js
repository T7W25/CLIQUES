import axios from "axios";

const API_URL = "/api/service";

export const createService = (data) =>
  axios.post(`${API_URL}/create`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
 
