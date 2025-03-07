import { orderModel } from "../models/order.models.js";

export const renderBuydedProduct =   async (req, res) => {
    try {
      let orders = await orderModel.find({ userId: req.user._id });
      res.render("buyed-products", { user: req.user, orders });
    } catch (error) {
      console.error("Error loading buyed-products page:", error);
      res.status(500).send("Error loading buyed-products page");
    }
  };