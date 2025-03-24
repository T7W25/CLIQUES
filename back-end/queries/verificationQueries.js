const VerificationRequest = require("../models/VerificationRequest");

exports.getAllRequests = () => VerificationRequest.find();
exports.updateStatus = (id, status) =>
  VerificationRequest.findByIdAndUpdate(id, { status }, { new: true });