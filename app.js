import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { router } from "./routes/user.routes.js";
import dotenv from "dotenv"
dotenv.config();

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

app.listen(process.env.PORT);
