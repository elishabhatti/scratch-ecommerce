import { orderModel } from "../../models/order.models.js";


export const updateProduct = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { quantity, paymentMethod, totalAmount } = req.body;
    await orderModel.findByIdAndUpdate(orderId, {
      quantity,
      paymentMethod,
      totalAmount
    });
    res.redirect("/buyed-products");
  } catch (error) {
    console.error("Error", error);
  }
};
