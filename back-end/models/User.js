const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Client", "Provider", "Admin", "Moderator", "SCM"],
    default: "Client",
  },
  availability: { type: String }, // Relevant for Providers
  skills: [{ type: String }],     // Relevant for Providers
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);