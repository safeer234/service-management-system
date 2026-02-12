import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup  = async(req,res) =>{
   try{
const {username,email,password,role} = req.body;

const exist = await User.findOne ({username});
if(exist)return res.staus(400).json({message:"User already exists"});

const hashed = await bcrypt.hash(password,10);

const user = await User.create({
   username,
   email,
   password:hashed,
   role
});
res.json({message:"signup succesfull",user})

   } catch(error){
    res.status(500).json({message:"signup error"})
   }
}


export const login = async (req, res) =>{
   try{
       const { email, password } = req.body;
const user = await User.findOne({email});
if(!user)return res.status(400).json({message:"!invalid credentials"});

   const match = await bcrypt.compare(password, user.password);
   if(!match)return res.status(400).json({message:"!invalid credentials"});

      const token = generateToken(user);
      res.json({message:"Login succesfull", token});
   }catch (error) {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error.message
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

