import { Admin } from "../models/admin.model.js";
import Decrypt from "../utils/Decrypt.js";
import Encrypt from "../utils/Encrypt.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const admins = [
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

    for (const u of admins) {
      const existingAdmin = await Admin.findOne({ email: u.email });

      if (!existingAdmin) {
        const hashedPassword = await Encrypt(u.password);
        await Admin.create({ ...u, password: hashedPassword });
        console.log("Admin Created");
      } else {
        console.log("Admin already exists");
      }
    }
  } catch (error) {
    console.log("Error creating admin ::::", error);
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

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }

    const verifyPassword = await Decrypt(password, admin.password);

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Password did'nt match! Enter correct Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User logged In",
      token,
      admin: {
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({
      message: "Server error while admin login",
      success: false,
    });
  }
}
