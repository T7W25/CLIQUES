const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceName: String,
  date: Date,
  status: String,
});

module.exports = mongoose.model("Order", orderSchema);