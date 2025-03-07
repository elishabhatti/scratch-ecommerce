import { userModel } from "../models/user.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/SECRET_KEY.js";

export const registerUser =  async (req, res) => {
  try {
    let { fullname, email, password, address, contact } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser) return res.send("Try with a different Email");

    const hashPassword = await bcrypt.hash(password, 10);

    let user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
      address,
      contact,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/shop");
  } catch (error) {
    res.status(500).send(error.message);
  }
};