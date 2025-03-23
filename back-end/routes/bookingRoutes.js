const express = require("express");
const { createBooking } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createBooking);

module.exports = router;
