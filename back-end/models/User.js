const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "provider"], required: true },
  availability: { type: String }, // Provider-specific
  skills: [{ type: String }],     // Provider-specific
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);