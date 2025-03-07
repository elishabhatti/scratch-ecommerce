import { Router } from "express";
import { renderIndexPage } from "../controllers/renderIndexPage.controller.js";
import { authenticateUser } from "../controllers/authticateUser.controller.js";
import { renderBuydedProduct } from "../controllers/renderBuyedProduct.controller.js";


export const router = Router();

router.get("/", renderIndexPage);
router.get("/buyed-products", authenticateUser, renderBuydedProduct);
