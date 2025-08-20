import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { emailRouter } from "./routes/email.routes.js";

export const app = express();

app.use(
  cors({
    origin: "https://mailing-dashboard.vercel.app/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/email", emailRouter);
