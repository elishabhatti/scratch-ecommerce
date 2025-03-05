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

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  try {
    let { fullname, email, password, address, contact } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(401).send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
            address,
            contact,
          });
          const token = jwt.sign({ email: user.email, id: user._id }, "secret");
          res.cookie("token", token);
          res.render("shop")
        }
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000);
