import { Router } from "express";
import mongoose from "mongoose";
import authRouter from "./authRouter.routes.js";
import userRouter from "./userRouter.routes.js";
import productRouter from "./produtRouter.routes.js";
import cartRouter from "./cartRouter.routes.js";
import { renderIndexPage } from "../controllers/pages/renderIndexPage.controller.js";
import { orderModel } from "../models/order.models.js";

export const router = Router();

router.get("/", renderIndexPage);

router.get("/comment-on-product/:orderId", async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.orderId);    
    console.log(order.comments);
    
    res.render("commentOnProduct", { id: order._id, userId: order.userId });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/submit-comment", async (req, res) => {
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
      text: comment
    });
    await order.save();
    res.redirect(`/comment-on-product/${orderId}`);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.use(authRouter);
router.use(userRouter);
router.use(productRouter);
router.use(cartRouter);

router.use((req, res) => {
  res.status(404).render("404");
});
