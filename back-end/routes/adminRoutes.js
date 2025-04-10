const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  toggleUserStatus,
  updateUserRole
} = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

router.get("/users", auth, getAllUsers);
router.put("/users/:id/toggle-status", auth, toggleUserStatus);
router.put("/users/:id/role", auth, updateUserRole);

module.exports = router;

router.get("/verify", auth, getVerificationRequests);
router.put("/verify/:id/approve", auth, approveVerification);
router.put("/verify/:id/reject", auth, rejectVerification);
