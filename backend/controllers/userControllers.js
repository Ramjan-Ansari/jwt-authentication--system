import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { genAccessToken, genRefeshToken } from "../utils/generateTokens.js";
import { accessTokenOptions, refreshTokenOptions } from "../utils/cookieOptions.js";

//register page
const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    //user alredy exist or not
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a strong password" });
    }

    //hashing user password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User Registered Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}


//login page
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
           return res.status(400).json({message: "User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Password"})
        }

        const accessToken = genAccessToken(user._id);
        const refreshToken = genRefeshToken(user._id);

        res.cookie("accessToken", accessToken, accessTokenOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenOptions);

        // const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite : "secret",
        //     maxAge : 1 * 24 * 60 * 60 * 1000
        // })

        res.status(200).json({
            message : "Login successfully",
            accessToken,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"})
    }
}

//refresh token
const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message: "Unathorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = genAccessToken(decoded.id);

        res.cookie("accessToken", newAccessToken, accessTokenOptions);
        res.json({message: "Token refreshed"})

    } catch (error) {
        res.status(403).json({ message: "Invalid refresh token", error });
    }
}

//user details
const getUserDetails = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({message: "Token Missing"});
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

//logout
const logOut = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        res.status(500).json({message: "Server Error", error});
    }
}

export {registerUser, loginUser, getUserDetails, logOut, refreshToken};
