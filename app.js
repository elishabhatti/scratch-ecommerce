import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("HI");
});

app.listen(3000);
