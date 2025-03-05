import express from "express";
import cookieParser from "cookie-parser";
import { userModel } from "./models/user.models.js";

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
    let {fullname, email, password, address, contact} = req.body;
    let createdUser = await userModel.create({fullname, email, password, address, contact})
    res.send(createdUser)
});

app.listen(3000);
