import User from "../models/user.js";
import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { createToken } from "../uttils/token-manager.js";
import { COOKIE_NAME } from "../uttils/constants.js";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log("Error fetching users", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// User signup
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    } else {
      const hashedPassword = await hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });

      const token = createToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);

      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        id: user._id.toString(),
      });
    }
  } catch (error) {
    console.error("Error in user signup:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user account",
    });
  }
};


// User login
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not registered",
      });
    } else {
      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      } else {
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          domain: "localhost",
          signed: true,
          path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
          path: "/",
          domain: "localhost",
          expires,
          httpOnly: true,
          signed: true,
        });

        res.status(200).json({
          success: true,
          message: "Login successful",
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        });
      }
    }
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
