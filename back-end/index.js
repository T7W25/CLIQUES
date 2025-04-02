require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB(); // Connect to MongoDB

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
