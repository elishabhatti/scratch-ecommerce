import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/");

    const decoded = jwt.verify(token, "secret");
    req.user = await userModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};