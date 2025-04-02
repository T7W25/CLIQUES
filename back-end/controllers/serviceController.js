const Service = require("../models/Service");

// ✅ Create New Service (For Service Providers)
exports.createService = async (req, res) => {
  try {
    const { title, category, subcategory, price, description, duties, notes, availability, location, phone, email } = req.body;

    const imagePaths = req.files ? req.files.map(file => "/uploads/" + file.filename) : [];

    const newService = new Service({
      title,
      category,
      subcategory,
      price,
      description,
      duties,
      notes,
      availability,
      location,
      phone,
      email,
      images: imagePaths,
      status: "Pending", // ✅ Default status
    });

    const savedService = await newService.save();
    res.status(201).json({ success: true, message: "Service submitted successfully!", service: savedService });

  } catch (error) {
    console.error("❌ Service Submission Error:", error);
    res.status(500).json({ success: false, message: "Server error! Unable to submit service." });
  }
};

// ✅ Get Services by Logged-in Provider's Email
exports.getServices = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required!" });
    }

    const services = await Service.find({ email }); // ✅ Only this user's services
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("❌ Fetch Services Error:", error);
    res.status(500).json({ success: false, message: "Server error! Unable to fetch services." });
  }
};

// ✅ Get ALL Services (For SCM Dashboard)
exports.getAllServices = async (req, res) => {
    try {
      const services = await Service.find(); // ✅ Fetch all services
      res.status(200).json({ success: true, services });
    } catch (error) {
      console.error("❌ Fetch All Services Error:", error);
      res.status(500).json({ success: false, message: "Server error! Unable to fetch services." });
    }
  };




 // ✅ Fetch Only Approved Services
exports.getApprovedServices = async (req, res) => {
    try {
        const approvedServices = await Service.find({ status: "Approved" });
        res.status(200).json({ success: true, services: approvedServices });
    } catch (error) {
        console.error("❌ Fetch Approved Services Error:", error);
        res.status(500).json({ success: false, message: "Server error! Unable to fetch approved services." });
    }
};
  

// ✅ Update Service Status (SCM Approve/Reject)
exports.updateServiceStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedService) {
        return res.status(404).json({ success: false, message: "Service not found!" });
      }
  
      res.status(200).json({ success: true, message: `Service ${status} successfully!`, service: updatedService });
    } catch (error) {
      console.error("❌ Error updating service status:", error);
      res.status(500).json({ success: false, message: "Server error! Unable to update service status." });
    }
  };
