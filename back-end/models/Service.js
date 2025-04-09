const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  duties: { type: String, required: true },
  notes: { type: String },
  availability: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  images: [{ type: String }], // Array to store image URLs
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  availability: { type: String, enum: ["available", "unavailable"], default: "available" },
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Service", ServiceSchema);

