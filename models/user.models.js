import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1/scratch");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    contact: { type: Number },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
