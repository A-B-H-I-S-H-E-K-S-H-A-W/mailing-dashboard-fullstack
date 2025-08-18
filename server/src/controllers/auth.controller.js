import { User, User } from "../models/user.model.js";
import Decrypt from "../utils/Decrypt.js";
import Encrypt from "../utils/Encrypt.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const users = [
      {
        username: process.env.AUTH_ROHIT_USERNAME,
        email: process.env.AUTH_ROHIT_EMAIL,
        password: process.env.AUTH_ROHIT_PASSWORD,
      },
      {
        username: process.env.AUTH_AYUSH_USERNAME,
        email: process.env.AUTH_AYUSH_EMAIL,
        password: process.env.AUTH_AYUSH_PASSWORD,
      },
      {
        username: process.env.AUTH_ABHI_USERNAME,
        email: process.env.AUTH_ABHI_EMAIL,
        password: process.env.AUTH_ABHI_PASSWORD,
      },
    ];

    for (const u of users) {
      const existingUser = await User.findOne({ email: u.email });

      if (!existingUser) {
        const hashedPassword = await Encrypt(u.password);
        await User.create({ ...u, password: hashedPassword });
        console.log("User Created");
      } else {
        console.log("User already exists");
      }
    }
  } catch (error) {
    console.log("Error creating user ::::", error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Email or password not found",
      });
    }

    const User = await User.findOne({ email });

    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const verifyPassword = await Decrypt(User.password, password);

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Password did'nt match! Enter correct Password",
      });
    }

    const token = jwt.sign({
      
    })
  } catch (error) {}
}
