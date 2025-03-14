import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { renderShopPage } from "../controllers/pages/renderShopPage.controller.js";
import { renderProductDetailsPageById } from "../controllers/pages/renderProductDetailsById.controller.js";
import { deleteProduct } from "../controllers/products/deleteProduct.controller.js";
import { updateProduct } from "../controllers/products/updateProduct.controller.js";
import { renderUpdateProductPage } from "../controllers/users/renderUpdateProfile.controller.js";

const productRouter = Router();

productRouter.get("/shop", authenticateUser, renderShopPage);
productRouter.get("/product-details/:id", authenticateUser, renderProductDetailsPageById);
productRouter.get("/delete-product/:id", authenticateUser, deleteProduct);
productRouter.get("/update-product/:id", authenticateUser, renderUpdateProductPage);
productRouter.post("/update-product/:id", authenticateUser, updateProduct);

export default productRouter;
