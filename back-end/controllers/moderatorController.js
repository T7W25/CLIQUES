 
const Report = require("../models/Report");

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

exports.updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};