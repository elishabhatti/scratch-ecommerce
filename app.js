import express from "express";
import cookieParser from "cookie-parser";
import { ObjectId, MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import session from "express-session";
import { userModel } from "./models/user.models.js";
import { orderModel } from "./models/order.models.js";
import { router } from "./routes/user.routes.js";
import { authenticateUser } from "./controllers/authticateUser.controller.js";
import { fetchProducts } from "./controllers/fetchProduct.controller.js";

const app = express();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.send("Email or Password is incorrect");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Email or password incorrect");

    const token = jwt.sign({ email: user.email, id: user._id }, "secret");
    res.cookie("token", token, { httpOnly: true });
    req.session.userId = user._id;

    res.redirect("/shop");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
