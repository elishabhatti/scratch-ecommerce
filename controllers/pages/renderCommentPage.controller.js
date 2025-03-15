import { orderModel } from "../../models/order.models.js";

export const rednerCommentPage =  async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.orderId);        
    res.render("commentOnProduct", { id: order._id, userId: order.userId, order });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
