import { orderModel } from "../models/order.models.js";

export const updateProduct = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { quantity, paymentMethod } = req.body;
    await orderModel.findByIdAndUpdate(orderId, {
      quantity,
      paymentMethod,
    });
    res.redirect("/buyed-products");
  } catch (error) {
    console.error("Error", error);
  }
};
