import mongoose, { model, Schema } from "mongoose";

const emailSchema = Schema({
  html: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
  },
});

export const Email = model("Email", emailSchema);
