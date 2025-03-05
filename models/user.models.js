import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1/scratch");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: Number },
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
