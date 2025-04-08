 
const Booking = require("../models/Booking");
const Feedback = require("../models/Feedback");

exports.getClientOrders = async (req, res) => {
  try {
    const clientId = req.user._id;
    const orders = await Booking.find({ clientId }).populate("serviceId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { bookingId, feedback } = req.body;
    const newFeedback = new Feedback({
      bookingId,
      clientId: req.user._id,
      content: feedback,
    });
    await newFeedback.save();

    await Booking.findByIdAndUpdate(bookingId, { feedback: newFeedback._id });

    res.status(200).json({ success: true, message: "Feedback saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error submitting feedback" });
  }
};