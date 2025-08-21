import mongoose, { model, Schema } from "mongoose";

const emailSchema = Schema(
  {
    html: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export const Email = model("Email", emailSchema);
