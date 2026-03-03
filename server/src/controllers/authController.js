import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import Provider from "../models/ProviderProfile.js";
import crypto from "crypto";

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
    const { email, password, rememberMe } = req.body;

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
      maxAge: rememberMe ? 7 * 24 * 60 * 60* 1000 : 24 * 60 * 60 * 1000  // 1 day
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




export const forgotPassword = async (req, res) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

 const resetUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.FRONTEND_URL}/auth/resetPassword/${resetToken}`
    : `http://localhost:5176/auth/resetPassword/${resetToken}`;

  const message = `
  You requested a password reset.
  Click this link to reset your password:
  ${resetUrl}
  `;

  await sendEmail({
    email: user.email,
    subject: "Password Reset Request",
    message
  });

  res.status(200).json({
    success: true,
    message: "Reset link sent to email"
  });
};



export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reset failed"
    });
  }
};