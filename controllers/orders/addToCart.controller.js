import { userModel } from "../../models/user.models.js";

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find(
      (item) => item.bagId.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ bagId: productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
