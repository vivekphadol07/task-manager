const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

//User Management Routs
router.get("/", protect, getUsers); // Get All users ( Admin only)
router.get("/:id", protect, getUserById); // geta specfic user

module.exports = router;
