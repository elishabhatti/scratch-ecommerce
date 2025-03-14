import { userModel } from "../../models/user.models.js";

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { cart: { bagId: productId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
