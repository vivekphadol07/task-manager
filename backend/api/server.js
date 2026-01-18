const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");

const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const taskRoutes = require("../routes/taskRoutes");
const reportRoutes = require("../routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

module.exports = app;
