import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup  = async(req,res) =>{
   try {
    const { username, email, password, role, phone } = req.body;

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

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Signup error" });
  }
}


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
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
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

