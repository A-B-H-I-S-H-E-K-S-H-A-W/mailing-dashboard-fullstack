import { model, Schema } from "mongoose";

const emailSchema = Schema({
  html: {
    type: String,
    required: true,
  },
});

export const Email = model("Email", emailSchema);
