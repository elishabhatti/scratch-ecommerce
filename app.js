import express from "express";
import cookieParser from "cookie-parser";
import { userModel } from "./models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authenticateUser = async (req, res, next) => {
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

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/shop", authenticateUser, (req, res) => {
  res.render("shop", {user: req.user});
});

app.post("/register", async (req, res) => {
  try {
    let { fullname, email, password, address, contact } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser) return res.send("Try with differnt Email");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
      address,
      contact,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, "secret");
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/shop");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000);
