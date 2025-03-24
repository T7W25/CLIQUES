import React, { useEffect, useState } from "react";
import { sendMessage, getChatWithUser } from "../../services/api/chatApi";

const ChatRoom = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const loadChat = async () => {
      const res = await getChatWithUser(userId);
      setMessages(res.data);
    };
    loadChat();
  }, [userId]);

  const handleSend = async () => {
    const res = await sendMessage({ receiverId: userId, text });
    setMessages([...messages, res.data]);
    setText("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((m, idx) => (
          <p key={idx}><strong>{m.senderId === userId ? "Them" : "You"}:</strong> {m.text}</p>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatRoom;
