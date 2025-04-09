const express = require("express");
const { getProviderAnalytics } = require("../controllers/providerController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/analytics", auth, getProviderAnalytics);

module.exports = router;
