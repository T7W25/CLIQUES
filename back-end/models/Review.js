const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewerName: String,
  text: String,
  duplicate: { type: Boolean, default: false },
  reviewed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Review", reviewSchema);