import { orderModel } from "../models/order.models.js";

export const deleteProduct = async (req, res) => {
  try {
    let orderId = req.params.id;
    if (!orderId) return res.send("product not fount");

    await orderModel.findByIdAndDelete(orderId);
    res.redirect("/buyed-products");
  } catch (error) {
    res.status(500).send("Product Not Found");
  }
};
