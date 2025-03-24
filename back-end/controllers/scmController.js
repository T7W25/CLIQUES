 
const Service = require("../models/Service");

exports.getPendingServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "Pending" });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

exports.approveService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndUpdate(id, { status: "Approved" }, { new: true });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to approve service" });
  }
};