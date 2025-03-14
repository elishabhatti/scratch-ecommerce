import { userModel } from "../../models/user.models.js";

export const renderCartPage = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("cart.bagId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.render("cart", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
