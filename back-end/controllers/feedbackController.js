const Order = require("../models/Order");
const Feedback = require("../models/Feedback");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ clientId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { orderId, message } = req.body;
    const feedback = new Feedback({
      orderId,
      clientId: req.user._id,
      message,
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};