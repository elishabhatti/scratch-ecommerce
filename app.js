import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
// import { router } from "./routes/user.routes.js";
// import userRouter from "./routes/userRouter.routes.js";
import { router } from "./routes/indexRouter.routes.js";
import { SECRET_KEY } from "./config/SECRET_KEY.js";

const app = express();
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);


app.listen(process.env.PORT);
