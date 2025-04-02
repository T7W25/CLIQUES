const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes"); // ✅ Import new service routes


dotenv.config();

const app = express();
app.use(cors({ 
  origin: "http://localhost:3000", // ✅ Allow frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, 
}));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // ✅ Serve uploaded images

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Store images in 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes); // ✅ New Service API

// Users
app.use("/api/users", userRoutes);

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.status(200).send("Backend is live!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

