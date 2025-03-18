import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const getUserProfile = async (token) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateUserProfile = async (token, userData) => {
    const response = await axios.put(`${API_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

