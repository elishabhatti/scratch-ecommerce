import { orderModel } from "../../models/order.models.js";

export const renderCommentPage =  async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.orderId);        
    const orders = await orderModel.find({}, "comments").populate("comments.userId");
    const allComments = orders.flatMap(order => order.comments);
    res.render("commentOnProduct", { id: order._id, userId: order.userId, order, allComments });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
