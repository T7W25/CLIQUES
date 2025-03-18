const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Back-end is connected to Front-end!" });
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
