import { Router } from "express";
import { renderIndexPage } from "../controllers/pages/renderIndexPage.controller.js";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { renderBuydedProduct } from "../controllers/pages/renderBuyedProduct.controller.js";
import { renderShopPage } from "../controllers/pages/renderShopPage.controller.js";
import { renderProductDetailsPageById } from "../controllers/pages/renderProductDetailsById.controller.js";
import { buyBagPost } from "../controllers/orders/buyBagPost.controller.js";
import { renderProfilePage } from "../controllers/pages/renderProfileUpdatePage.controller.js";
import { updateUserProfile } from "../controllers/users/updateUserProfile.controller.js";
import { renderUpdateProductPage } from "../controllers/users/renderUpdateProfile.controller.js";
import { registerUser } from "../controllers/auth/registerUser.controller.js";
import { loginUser } from "../controllers/auth/loginUser.controller.js";
import { logoutUser } from "../controllers/auth/logoutUser.controller.js";
import { deleteProduct } from "../controllers/products/deleteProduct.controller.js";
import { updateProduct } from "../controllers/products/updateProduct.controller.js";

export const router = Router();

router.get("/", renderIndexPage);
router.get("/buyed-products", authenticateUser, renderBuydedProduct);
router.get("/shop", authenticateUser, renderShopPage);
router.get(
  "/product-details/:id",
  authenticateUser,
  renderProductDetailsPageById
);
router.post("/register", registerUser);
router.post("/buy-bag", authenticateUser, buyBagPost);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/update-profile", authenticateUser, renderProfilePage);
router.post("/update-profile", authenticateUser, updateUserProfile);
router.get("/delete-product/:id", authenticateUser, deleteProduct);
router.get("/update-product/:id", authenticateUser, renderUpdateProductPage);
router.post("/update-product/:id", authenticateUser, updateProduct);
