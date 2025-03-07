import { orderModel } from "../models/order.models.js";

export const buyBagPost = async (req, res) => {
  try {
    let {
      productId,
      title,
      price,
      quantity,
      paymentMethod,
      totalAmount,
      image,
    } = req.body;
    let userId = req.user._id;

    if (!userId)
      return res.status(401).json({ error: "User not authenticated" });

    if (
      !productId ||
      !title ||
      !price ||
      !quantity ||
      !paymentMethod ||
      !totalAmount ||
      !image
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    price = parseFloat(price);
    quantity = parseInt(quantity, 10);
    totalAmount = parseFloat(totalAmount);

    if (isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive number." });
    }

    await orderModel.create({
      userId,
      productId,
      title,
      image,
      price,
      quantity,
      totalAmount,
      paymentMethod,
    });

    res.status(201).redirect("/buyed-products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
