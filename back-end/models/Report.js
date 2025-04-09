const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  issue: String,
  status: {
    type: String,
    enum: ["pending", "in_review", "resolved", "escalated"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
