import { userModel } from "../../models/user.models.js";
import { fetchProducts } from "../products/fetchProduct.controller.js";
import { orderModel } from "../../models/order.models.js";

export const renderCartPage = async (req, res) => {
  try {
    const product = await fetchProducts()
    const order = await orderModel.find({userId: req.user._id})
    const user = await userModel.findById(req.user._id).populate("cart.bagId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.render("cart", { user, product, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};