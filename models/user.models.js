import mongoose from "mongoose";
import { connectDB } from "../config/CONNECT_DB.js";
connectDB();

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: Number },
    cart: [
      {
        bagId: { type: mongoose.Schema.Types.ObjectId, ref: "bags" },
        quantity: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    orders: [
      {
        bagId: { type: mongoose.Schema.Types.ObjectId, ref: "bags" },
        quantity: { type: Number, required: true },
        orderDate: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["pending", "shipped", "delivered"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
