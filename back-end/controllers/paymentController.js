 
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Create Payment Record
exports.processPayment = async (req, res) => {
  const { bookingId, amount } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const payment = new Payment({
      bookingId,
      clientId: req.user.id,
      amount,
      status: "Completed", // Simulate payment success
    });

    await payment.save();
    res.status(201).json({ message: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};