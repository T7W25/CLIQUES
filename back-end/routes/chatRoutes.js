const express = require("express");
const { sendMessage, getChat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/with/:userId", authMiddleware, getChat);

module.exports = router;
