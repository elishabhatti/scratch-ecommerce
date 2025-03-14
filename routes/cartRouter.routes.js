import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { addToCart } from "../controllers/cart/addToCart.controller.js";
import { removeFromCart } from "../controllers/cart/removeFromCart.controller.js";
import { renderCartPage } from "../controllers/cart/renderCartPage.controller.js";
import { buyBagPost } from "../controllers/orders/buyBagPost.controller.js";
import { renderBuydedProduct } from "../controllers/pages/renderBuyedProduct.controller.js";

const cartRouter = Router();

cartRouter.post("/add-to-cart", authenticateUser, addToCart);
cartRouter.post("/remove-from-cart", authenticateUser, removeFromCart);
cartRouter.get("/cart", authenticateUser, renderCartPage);
cartRouter.post("/buy-bag", authenticateUser, buyBagPost);
cartRouter.get("/buyed-products", authenticateUser, renderBuydedProduct);

export default cartRouter;
