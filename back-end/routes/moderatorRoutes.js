const express = require("express");
const { getUnresolvedReports, escalateToAdmin } = require("../controllers/moderatorController");
const auth = require("../middleware/authMiddleware");

router.get("/reports", auth, getUnresolvedReports);
router.put("/escalate/:id", auth, escalateToAdmin);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getSuspiciousReviews,
  markAsReviewed
} = require("../controllers/moderatorController");
const auth = require("../middleware/authMiddleware");

router.get("/suspicious-reviews", auth, getSuspiciousReviews);
router.put("/reviews/:id/reviewed", auth, markAsReviewed);

module.exports = router;
