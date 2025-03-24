const Feedback = require("../models/Feedback");

exports.createFeedback = (data) => new Feedback(data).save();
exports.getFeedbackForOrder = (orderId) => Feedback.find({ orderId });