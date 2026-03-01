import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import Provider from "../models/ProviderProfile.js";

export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      phone,
      services,
      serviceArea,
    } = req.body;

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      phone,
      email,
      password: hashed,
      role: role || "client",
    });

    // ✅ If provider → validate & create provider profile
    if (user.role === "provider") {

      if (!services || services.length === 0) {
        return res.status(400).json({
          message: "Please select at least one service",
        });
      }

      if (!serviceArea) {
        return res.status(400).json({
          message: "Service area is required",
        });
      }

      await Provider.create({
        user: user._id,
        services,
        serviceArea,
      });
    }

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup error" });
  }
};


export const login = async (req, res) =>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    //  Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60* 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

};


/**
 * @desc   Get logged-in user
 * @route  GET /api/auth/me
 */
export const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};








export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

