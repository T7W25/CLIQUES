const Booking = require("../models/Booking");
const Feedback = require("../models/Feedback");

exports.getClientOrders = async (req, res) => {
  try {
    const clientId = req.user._id;

    // Fetch orders and populate 'serviceId' with only specific fields, and also link feedback if available
    const orders = await Booking.find({ clientId })
      .populate("serviceId", "title category pricing")  // Populate only the required fields for serviceId
      .populate("feedback"); // Link feedback if it exists

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching client orders:", error);
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