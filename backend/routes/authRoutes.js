const express = require("express");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/upload-image", upload.single("image"), uploadProfileImage);

module.exports = router;
