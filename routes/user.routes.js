import { Router } from "express";
import { renderIndexPage } from "../controllers/renderIndexPage.controller.js";
import { authenticateUser } from "../controllers/authticateUser.controller.js";
import { renderBuydedProduct } from "../controllers/renderBuyedProduct.controller.js";
import { renderShopPage } from "../controllers/renderShopPage.controller.js";
import { renderProductDetailsPageById } from "../controllers/renderProductDetailsById.controller.js";
import { registerUser } from "../controllers/registerUser.controller.js";
import { buyBagPost } from "../controllers/buyBagPost.controller.js";
import { loginUser } from "../controllers/loginUser.controller.js";

export const router = Router();

router.get("/", renderIndexPage);
router.get("/buyed-products", authenticateUser, renderBuydedProduct);
router.get("/shop", authenticateUser, renderShopPage);
router.get("/product-details/:id", authenticateUser, renderProductDetailsPageById);
router.post("/register", registerUser)
router.post("/buy-bag", authenticateUser, buyBagPost)
router.post("/login", loginUser)
