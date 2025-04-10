 
const User = require("../models/User");

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.suspended = !user.suspended;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Toggle status failed" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Role update failed" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role suspended").lean();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to fetch users" });
  }
};