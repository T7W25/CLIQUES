const express = require("express");
const { createBooking, getClientBookings } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createBooking);
router.get("/client", authMiddleware, getClientBookings); // User Story 6

module.exports = router;