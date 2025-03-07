import { orderModel } from "../models/order.models.js";

export const deleteProduct = async (req, res) => {
  let orderId = req.params.id;
  if (!orderId) return res.send("product not fount");

  await orderModel.findByIdAndDelete(orderId);
  res.redirect("/buyed-products");
};
