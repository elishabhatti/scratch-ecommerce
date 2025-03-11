import { orderModel } from "../models/order.models.js";
import { fetchProducts } from "./fetchProduct.controller.js";

export const renderShopPage = async (req, res) => {
    try {
      const products = await fetchProducts();
      const orders =  await orderModel.find({userId : req.user._id})
      res.render("shop", { user: req.user, products, orders });
    } catch (error) {
      res.status(500).send("Error loading shop page", error);
    }
  };