const express = require("express");
const { getOrders, submitFeedback } = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/orders", authMiddleware, getOrders);
router.post("/feedback", authMiddleware, submitFeedback);

module.exports = router;