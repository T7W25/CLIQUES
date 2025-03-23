const express = require("express");
const { processPayment, getEarnings } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/process", authMiddleware, processPayment);
router.get("/earnings", authMiddleware, getEarnings); // ← NEW

module.exports = router;
//updated route