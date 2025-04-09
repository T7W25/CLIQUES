const bookingSchema = new mongoose.Schema({
    ...
    status: { type: String, enum: ["Pending", "Booked", "Cancelled", "Rescheduled"], default: "Pending" },
    ...
  }); 
// Booking model already includes providerId and status
status: {
  type: String,
  enum: ["Pending", "Booked", "Cancelled", "Rescheduled", "Completed"],
  default: "Pending"
}