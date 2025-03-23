import axios from "axios";

const CHAT_URL = "/api/chat";

export const sendMessage = (data) =>
  axios.post(${CHAT_URL}/send, data, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });

export const getChatWithUser = (userId) =>
  axios.get(${CHAT_URL}/with/${userId}, {
    headers: { Authorization: Bearer ${localStorage.getItem("token")} },
  });