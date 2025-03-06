import express from "express";
import cookieParser from "cookie-parser";
import { ObjectId } from "mongodb";
import { userModel } from "./models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { bagModel } from "./models/products.models.js";
import { MongoClient } from "mongodb";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: "shhhh",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const uri = "mongodb://127.0.0.1/scratch"; // Your MongoDB URI
const client = new MongoClient(uri);

async function fetchProducts() {
  try {
    await client.connect();
    const database = client.db("scratch");
    const collection = database.collection("products");

    const products = await collection.find({}).toArray(); // Get all products
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

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

app.get("/shop", authenticateUser, async (req, res) => {
  try {
    const products = await fetchProducts();
    res.render("shop", { user: req.user, products });
  } catch (error) {
    res.status(500).send("error leadning shop page");
  }
});

app.get("/buyed-products", authenticateUser, async (req, res) => {
  try {
    let user = await userModel.findById(req.user._id).select("orders");
    res.render("buyed-products", { user: req.user, orders: user.orders });
  } catch (error) {
    console.error("Error loading buyed-products page:", error);
    res.status(500).send("Error loading buyed-products page");
  }
});


app.get("/product-details/:id", authenticateUser, async (req, res) => {
  try {
    // Fetch all products
    const products = await fetchProducts(); // Assuming this returns an array

    // Find the specific product using `id`
    const product = products.find(p => p._id.toString() === req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Ensure `req.user` is passed
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
app.post("/buy-bag", authenticateUser, async (req, res) => {
  try {
    let { name, price, quantity, paymentMethod, totalAmount } = req.body;
    let userId = req.user._id;
    
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!name || !price || !quantity || !paymentMethod || !totalAmount) {
      return res.status(400).json({ error: "All fields are required." });
    }

    price = parseFloat(price);
    quantity = parseInt(quantity, 10);
    totalAmount = parseFloat(totalAmount);

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number." });
    }
    let newOrder = {
      productId: new ObjectId(),
      name,
      price,
      quantity,
      totalAmount,
      paymentMethod,
      orderDate: new Date(),
      status: "pending",
    };
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder } },
      { new: true } 
    );
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

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: user.email, id: user._id }, "secret");
        res.cookie("token", token, { httpOnly: true });
        req.session.userId = user._id;
        res.redirect("/shop");
      } else {
        return res.status(401).send("Email or password incorrect");
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

app.listen(3000);
