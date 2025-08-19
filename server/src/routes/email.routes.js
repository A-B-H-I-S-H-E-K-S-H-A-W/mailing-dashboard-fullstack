import { Router } from "express";
import { sendEmail } from "../controllers/email.controller.js";

export const emailRouter = Router();

emailRouter.post("/send-email", sendEmail);
