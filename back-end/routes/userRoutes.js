const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

// ✅ Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Register Route (Includes Skills Field)
router.post("/register", upload.fields([{ name: "profilePicture" }, { name: "identityProof" }]), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      serviceType,
      availability,
      pricing,
      experience,
      skills,
    } = req.body;

    if (!req.files || !req.files.identityProof) {
      return res.status(400).json({ success: false, message: "Identity Proof is required!" });
    }

    const newUser = new User({
      name,
      email,
      phone,
      address,
      password,
      role,
      serviceType: role === "service_provider" ? serviceType : null,
      availability: role === "service_provider" ? availability : null,
      pricing: role === "service_provider" ? pricing : null,
      experience: role === "service_provider" ? experience : null,
      skills: role === "service_provider" && skills
        ? skills.split(",").map(s => s.trim())
        : [],
      profilePicture: req.files.profilePicture
        ? "/uploads/" + req.files.profilePicture[0].filename
        : "/uploads/default-profile.png",
      identityProof: "/uploads/" + req.files.identityProof[0].filename,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error! Try again later." });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    console.log(`✅ Login Successful: ${email}`);
    res.json({ success: true, user });
  } catch (error) {
    console.error("❌ Login Server Error:", error);
    res.status(500).json({ success: false, message: "Server error! Please try again." });
  }
});

// ✅ Profile Update Route (Includes Skill Update)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // 🔥 Fix: Convert string to array
    if (updatedData.skills && typeof updatedData.skills === "string") {
      updatedData.skills = updatedData.skills.split(",").map(s => s.trim());
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated successfully!", updatedUser });
  } catch (error) {
    console.error("❌ Profile Update Error:", error);
    res.status(500).json({ success: false, message: "Server error!" });
  }
});

//Users

// 🧩 Get All Users (For Admin)
router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // You can later filter or sort this
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("❌ Fetch Users Error:", error);
    res.status(500).json({ success: false, message: "Server error! Unable to fetch users." });
  }
});

// 🧨 Delete a User by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error("❌ Delete User Error:", error);
    res.status(500).json({ success: false, message: "Server error! Unable to delete user." });
  }
});

// ✅ Get all users (Admin)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error! Unable to fetch users." });
  }
});

// ✅ Delete user by ID (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error! Unable to delete user." });
  }
});



module.exports = router;
