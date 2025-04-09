const express = require("express");
const router = express.Router();
const { getUnresolvedReports, escalateToAdmin } = require("../controllers/moderatorController");
const auth = require("../middleware/authMiddleware");

router.get("/reports", auth, getUnresolvedReports);
router.put("/escalate/:id", auth, escalateToAdmin);

module.exports = router;
