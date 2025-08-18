import { User } from "../models/user.model.js";
import Encrypt from "../utils/Encrypt.js";

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
      const existingUser = await User({ email: u.email });

      if (!existingUser) {
        const hashedPassword = Encrypt(u.password);
        await User.create({ ...u, password: hashedPassword });
        console.log("User Created");
        res.status(201).json({
          success: true,
          message: "User registered successfully",
        });
      } else {
        console.log("User already exists");
      }
    }
  } catch (error) {
    console.log("Error creating user ::::", error);
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
}
