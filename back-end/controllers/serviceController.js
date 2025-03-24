const Service = require("../models/Service");

exports.createService = async (req, res) => {
  const { title, description, category, price, availability } = req.body;

  try {
    const newService = new Service({
      providerId: req.user.id,
      title,
      description,
      category,
      price,
      availability,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (err) {
    res.status(500).json({ message: "Failed to create service", error: err.message });
  }
};
