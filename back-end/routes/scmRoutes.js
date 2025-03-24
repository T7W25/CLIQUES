const express = require("express");
const { getPendingServices, approveService } = require("../controllers/scmController");

const router = express.Router();

router.get("/services/pending", getPendingServices);
router.put("/services/:id/approve", approveService);

module.exports = router;
