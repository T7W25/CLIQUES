const Service = require("../models/Service");

exports.getPendingServices = () => Service.find({ status: "Pending" });

exports.approveServiceById = (id) =>
  Service.findByIdAndUpdate(id, { status: "Approved" }, { new: true });