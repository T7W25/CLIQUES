const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  name: { type: String }, 
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  availability: { type: String },
  status: { type: String, default: "Pending" }, 
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Service", serviceSchema);