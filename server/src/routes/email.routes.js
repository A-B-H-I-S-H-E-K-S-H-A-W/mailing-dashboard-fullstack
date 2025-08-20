import { Router } from "express";
import {
  createEmail,
  fetchEmail,
  sendEmail,
} from "../controllers/email.controller.js";

export const emailRouter = Router();

emailRouter.post("/send-email", sendEmail);
emailRouter.post("/create", createEmail);
emailRouter.get("/fetchEmail", fetchEmail);
