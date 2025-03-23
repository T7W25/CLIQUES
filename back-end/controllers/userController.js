 
const User = require("../models/User");

// GET user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// UPDATE user profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

// Mongoose query used in getProfile (READ)
await User.findById(req.user.id).select("-password");

// Mongoose query used in updateProfile (UPDATE)
await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");