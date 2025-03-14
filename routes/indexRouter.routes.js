import { Router } from "express";
import authRouter from "./authRouter.routes.js";
import userRouter from "./userRouter.routes.js";
import productRouter from "./produtRouter.routes.js";
import cartRouter from "./cartRouter.routes.js";
import { renderIndexPage } from "../controllers/pages/renderIndexPage.controller.js";

export const router = Router();

// Home Page Route
router.get("/", renderIndexPage);

// Use Modular Route Files
router.use(authRouter);
router.use(userRouter);
router.use(productRouter);
router.use(cartRouter);

// 404 Page Route
router.use((req, res) => {
  res.status(404).render("404");
});
