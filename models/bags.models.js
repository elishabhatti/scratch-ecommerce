import mongoose from "mongoose";

const bagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
  },
  { timestamps: true }
);

export const bagModel = mongoose.model("bags", bagSchema);
