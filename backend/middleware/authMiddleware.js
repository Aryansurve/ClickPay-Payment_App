const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// ✅ General Authentication Middleware
const authMiddleware = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.header("Authorization")); // ✅ Debugging

    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded); // ✅ Debugging

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Admin Authentication Middleware
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify Token
    req.user = decoded;

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ Authentication Middleware for Users Who Can Send Payments
const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request

    next();
  } catch (error) {
    console.error("Payment Auth Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware, adminAuth, authenticateUser };
