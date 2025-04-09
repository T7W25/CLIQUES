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