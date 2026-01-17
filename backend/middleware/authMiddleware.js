const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
const protect = async (req, res, next) => {
  // ✅ Allow CORS preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// Admin-only access
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  next();
};

module.exports = { protect, adminOnly };
