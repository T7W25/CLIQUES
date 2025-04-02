const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "service_provider", "service_category_manager"], required: true },

  // ✅ Only for Service Providers
  serviceType: { type: String, default: null },
  availability: { type: String, default: null },
  pricing: { type: String, default: null },
  experience: { type: String, default: null },
  skills: { type: [String], default: [] }, // ✅ New Skills Field (Array of Strings)

  // ✅ Uploaded Files
  profilePicture: { type: String, default: "/uploads/default-profile.png" }, // Profile Picture
  identityProof: { type: String, required: true }, // Identity Proof (Required)

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
