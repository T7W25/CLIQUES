const express = require("express");
const { updateUserProfile, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

module.exports = router;

