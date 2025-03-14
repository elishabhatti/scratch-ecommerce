import { userModel } from "../../models/user.models.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cartItem = user.cart.find(
      (item) => item.bagId.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity = 1;
    } else {
      user.cart.push({ bagId: productId, quantity: 1 });
    }
    await user.save();
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
