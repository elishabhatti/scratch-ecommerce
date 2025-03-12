import { userModel } from "../../models/user.models.js";

export const updateUserProfile = async (req, res) => {
  try {
    const { fullname, password, address, contact } = req.body;
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (fullname) user.fullname = fullname;
    if (password) user.password = password;
    if (address) user.address = address;
    if (contact) user.contact = contact;

    await user.save();

    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
};
