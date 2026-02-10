import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes - allow only logged-in users
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select("-password");

    next(); // move to next middleware/controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token invalid"
    });
  }
};
