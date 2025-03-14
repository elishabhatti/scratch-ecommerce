import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.middleware.js";
import { renderProfilePage } from "../controllers/pages/renderProfileUpdatePage.controller.js";
import { updateUserProfile } from "../controllers/users/updateUserProfile.controller.js";

const userRouter = Router();

userRouter.get("/update-profile", authenticateUser, renderProfilePage);
userRouter.post("/update-profile", authenticateUser, updateUserProfile);

export default userRouter;
