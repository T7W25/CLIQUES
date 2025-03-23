const Message = require("../models/Message");

// Send a message
exports.sendMessage = async (req, res) => {
  const { receiverId, text } = req.body;
  try {
    const message = new Message({
      senderId: req.user.id,
      receiverId,
      text,
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Send failed", error: err.message });
  }
};

// Get chat between users
exports.getChat = async (req, res) => {
  const { userId } = req.params;
  try {
    const chat = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: userId },
        { senderId: userId, receiverId: req.user.id },
      ],
    }).sort({ timestamp: 1 });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};