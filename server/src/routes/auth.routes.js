import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.get("/register", register);
authRouter.post("/login", login);
