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
