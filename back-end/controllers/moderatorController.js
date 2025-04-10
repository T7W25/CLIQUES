const Report = require("../models/Report");

exports.getUnresolvedReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: { $ne: "resolved" } });
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching reports" });
  }
};

exports.escalateToAdmin = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "escalated" },
      { new: true }
    );
    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Escalation failed" });
  }
};

const reports = await Report.find({ status: { $in: ["pending", "in_review"] } }).lean();



const Review = require("../models/Review");

exports.getSuspiciousReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      $or: [
        { text: /(?:free|offer|click here|http)/i },
        { duplicate: true }
      ],
      reviewed: false
    });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

exports.markAsReviewed = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndUpdate(id, { reviewed: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};