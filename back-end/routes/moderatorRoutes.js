const express = require("express");
const { getAllReports, updateReportStatus } = require("../controllers/moderatorController");

const router = express.Router();

router.get("/reports", getAllReports);
router.put("/reports/:id/status", updateReportStatus);

module.exports = router;
