import { orderModel } from "../models/order.models.js";
import { fetchProducts } from "./products/fetchProduct.controller.js";

export const renderUpdateProductPage = async (req, res) => {
  try {
    const products = await fetchProducts();
    const product = products.find(
      (p) => String(p._id) === String(req.params.id)
    );
    const order = await orderModel.findById(req.params.id);
    res.render("update-product", { product, user: req.user, order });
  } catch (error) {
    res.status(500).send("Error fetching product");
  }
};
