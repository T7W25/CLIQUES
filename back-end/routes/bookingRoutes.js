const express = require("express");
const {
  createBooking,
  getClientBookings,
  getProviderBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createBooking);
router.get("/client", authMiddleware, getClientBookings);

// New for User Story 8
router.get("/provider", authMiddleware, getProviderBookings);
router.put("/update-status", authMiddleware, updateBookingStatus);

module.exports = router;