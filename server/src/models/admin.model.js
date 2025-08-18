import { model, Schema } from "mongoose";

const adminSchema = Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Admin = model("Admin", adminSchema);
