import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { renderProfilePage } from "../controllers/pages/renderProfileUpdatePage.controller.js";
import { updateUserProfile } from "../controllers/users/updateUserProfile.controller.js";
import { renderCommentPage } from "../controllers/pages/renderCommentPage.controller.js";
import { commentOnPage } from "../controllers/orders/commentOnBag.controller.js";

const userRouter = Router();

userRouter.get("/update-profile", authenticateUser, renderProfilePage);
userRouter.post("/update-profile", authenticateUser, updateUserProfile);
userRouter.get("/comment-on-product/:orderId", authenticateUser, renderCommentPage);
userRouter.post("/submit-comment", authenticateUser, commentOnPage);

export default userRouter;
