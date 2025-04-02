require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware (if needed)
app.use(express.json());

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("Backend is live!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
