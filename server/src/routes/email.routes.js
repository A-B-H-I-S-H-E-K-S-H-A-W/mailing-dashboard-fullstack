import { Router } from "express";
import {
  createEmail,
  deleteEmail,
  fetchEmail,
  sendEmail,
} from "../controllers/email.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const emailRouter = Router();

emailRouter.post("/send-email", authenticate(), sendEmail);
emailRouter.post("/create", authenticate(), createEmail);
emailRouter.get("/fetch", authenticate(), fetchEmail);
emailRouter.delete("/delete", authenticate(), deleteEmail);
