const express = require("express");
const multer = require("multer");
const { createService, getServices, getAllServices, updateServiceStatus, getApprovedServices } = require("../controllers/serviceController");
const Service = require("../models/Service"); // ✅ Ensure Service model is imported

const router = express.Router();

// ✅ Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Store images in 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Service Provider Routes
router.post("/", upload.array("images", 3), createService); // Allow up to 3 images
router.get("/", getServices); // Get services (Filtered for Service Provider)

// ✅ SCM Route: Get all submitted services (For SCM Dashboard)
router.get("/all", getAllServices); // Fetches all services for SCM

// ✅ SCM Approve/Reject Service Route (Fix: Clearer API Path)
router.put("/update-status/:id", updateServiceStatus); // 🔥 Fix: Correct Route Name

// only approved services
router.get("/approved", getApprovedServices); 

const express = require("express");
const { getFilteredServices } = require("../controllers/serviceController");

router.get("/filter", getFilteredServices);

module.exports = router;
  
