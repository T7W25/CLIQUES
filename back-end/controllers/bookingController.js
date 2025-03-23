const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const { serviceId, providerId, date, time, location } = req.body;

  try {
    const booking = new Booking({
      clientId: req.user.id,
      providerId,
      serviceId,
      date,
      time,
      location,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful!", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

const Booking = require("../models/Booking");

// View all bookings by client
exports.getClientBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ clientId: req.user.id })
      .populate("serviceId", "title")
      .populate("providerId", "name");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};