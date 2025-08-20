import { Router } from "express";
import { createEmail, sendEmail } from "../controllers/email.controller.js";

export const emailRouter = Router();

emailRouter.post("/send-email", sendEmail);
emailRouter.post("/create", createEmail);
