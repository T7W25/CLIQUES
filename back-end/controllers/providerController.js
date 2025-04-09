const Booking = require("../models/Booking");
const Service = require("../models/Service");

exports.getProviderAnalytics = async (req, res) => {
  try {
    const providerId = req.user._id;

    const totalServices = await Service.countDocuments({ providerId });
    const totalBookings = await Booking.countDocuments({ providerId });
    const completedBookings = await Booking.countDocuments({ providerId, status: "Completed" });

    const ratingAgg = await Service.aggregate([
      { $match: { providerId } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const avgRating = ratingAgg[0]?.avgRating || 0;

    res.json({
      success: true,
      analytics: {
        totalServices,
        totalBookings,
        completedBookings,
        avgRating,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
};
