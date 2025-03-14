import mongoose from "mongoose";

const bagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }, // Assuming you store image URLs
  },
  { timestamps: true }
);

export const bagModel = mongoose.model("bags", bagSchema);
