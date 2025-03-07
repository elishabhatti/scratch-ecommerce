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
const uri = "mongodb://127.0.0.1/scratch"; // Your MongoDB URI
const client = new MongoClient(uri);

await client.connect(); // Connect once globally
const database = client.db("scratch");
const productsCollection = database.collection("bags");

// Middleware
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
app.use(router)

// Function to fetch products



app.get("/product-details/:id", authenticateUser, async (req, res) => {
  try {
    const products = await fetchProducts();
    const product = products.find((p) => p._id.equals(new ObjectId(req.params.id)));

    if (!product) return res.status(404).send("Product not found");

    res.render("product-details", { user: req.user, product });
  } catch (error) {
    console.error("Error loading product details:", error);
    res.status(500).send("Error loading product details");
  }
});

app.post("/register", async (req, res) => {
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

    const token = jwt.sign({ email: user.email, id: user._id }, "secret");
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/shop");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/buy-bag", authenticateUser, async (req, res) => {
  try {
    let { productId, title, price, quantity, paymentMethod, totalAmount, image } = req.body;
    let userId = req.user._id;

    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    if (!productId || !title || !price || !quantity || !paymentMethod || !totalAmount || !image) {
      return res.status(400).json({ error: "All fields are required." });
    }

    price = parseFloat(price);
    quantity = parseInt(quantity, 10);
    totalAmount = parseFloat(totalAmount);

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number." });
    }

    await orderModel.create({
      userId,
      productId,
      title,
      image,
      price,
      quantity,
      totalAmount,
      paymentMethod,
    });

    res.status(201).redirect("/buyed-products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
