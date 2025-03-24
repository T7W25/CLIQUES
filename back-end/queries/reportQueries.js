const Report = require("../models/Report");

exports.fetchAllReports = () => Report.find();

exports.resolveReport = (id) =>
  Report.findByIdAndUpdate(id, { status: "Resolved" }, { new: true });