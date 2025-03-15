import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { renderProfilePage } from "../controllers/pages/renderProfileUpdatePage.controller.js";
import { updateUserProfile } from "../controllers/users/updateUserProfile.controller.js";
import { rednerCommentPage } from "../controllers/pages/renderCommentPage.controller.js";
import { commentOnPage } from "../controllers/orders/commentOnBag.controller.js";

const userRouter = Router();

userRouter.get("/update-profile", authenticateUser, renderProfilePage);
userRouter.post("/update-profile", authenticateUser, updateUserProfile);
userRouter.get("/comment-on-product/:orderId", rednerCommentPage);
userRouter.post("/submit-comment", commentOnPage);

router.us

export default userRouter;
