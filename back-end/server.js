require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

// CORS setup
app.use(cors({
  origin: "https://your-frontend-site.netlify.app", // <-- Update this
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Static files

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Backend is live!");
});

// Server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


