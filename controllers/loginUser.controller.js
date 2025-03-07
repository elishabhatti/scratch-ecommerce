import { userModel } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/SECRET_KEY.js";

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.send("Email or Password is incorrect");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Email or password incorrect");

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    req.session.userId = user._id;

    res.redirect("/shop");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
