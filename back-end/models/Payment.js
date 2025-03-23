const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  paymentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
