const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/links");

app.use("/api", authRoutes);
app.use("/api", linkRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
