import { Router } from "express";
import { renderIndexPage } from "../controllers/renderIndexPage.controller.js";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { renderBuydedProduct } from "../controllers/renderBuyedProduct.controller.js";
import { renderShopPage } from "../controllers/renderShopPage.controller.js";
import { renderProductDetailsPageById } from "../controllers/renderProductDetailsById.controller.js";
import { registerUser } from "../controllers/registerUser.controller.js";
import { buyBagPost } from "../controllers/buyBagPost.controller.js";
import { loginUser } from "../controllers/loginUser.controller.js";
import { logoutUser } from "../controllers/logoutUser.controller.js";
import { renderProfilePage } from "../controllers/renderProfileUpdatePage.controller.js";
import { updateUserProfile } from "../controllers/updateUserProfile.controller.js";

export const router = Router();

router.get("/", renderIndexPage);
router.get("/buyed-products", authenticateUser, renderBuydedProduct);
router.get("/shop", authenticateUser, renderShopPage);
router.get("/product-details/:id", authenticateUser, renderProductDetailsPageById);
router.post("/register", registerUser)
router.post("/buy-bag", authenticateUser, buyBagPost)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/update-profile", authenticateUser, renderProfilePage)
router.post("/update-profile", authenticateUser, updateUserProfile)
