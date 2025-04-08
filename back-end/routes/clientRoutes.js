const express = require("express");
const { getClientOrders, submitFeedback } = require("../controllers/clientController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/orders", authMiddleware, getClientOrders);
router.post("/feedback", authMiddleware, submitFeedback);

router.put("/cancel/:id", auth, cancelBooking);
router.put("/reschedule/:id", auth, rescheduleBooking);

module.exports = router;
