import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";

export const app = express();

app.use(cors());
app.use("/api/v1/auth", authRouter);
