import { orderModel } from "../../models/order.models.js";
import mongoose from "mongoose";

export const commentOnPage = async (req, res) => {
  const { orderId, userId, comment } = req.body;
  try {
    let order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (!order.comments) {
      order.comments = [];
    }
    order.comments.push({
      userId: new mongoose.Types.ObjectId(userId),
      text: comment,
    });
    await order.save();
    res.redirect(`/comment-on-product/${orderId}`);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
