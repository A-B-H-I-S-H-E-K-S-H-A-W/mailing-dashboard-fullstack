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
    type: "",
  },
});

export const Email = model("Email", emailSchema);
