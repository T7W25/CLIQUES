const VerificationRequest = require("../models/VerificationRequest");

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await VerificationRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Error fetching requests" });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const request = await VerificationRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: "Failed to update verification status" });
  }
};