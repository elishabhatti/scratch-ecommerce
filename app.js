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



app.post("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
