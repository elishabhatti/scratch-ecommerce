import { Router } from "express";
import { registerUser } from "../controllers/auth/registerUser.controller.js";
import { loginUser } from "../controllers/auth/loginUser.controller.js";
import { logoutUser } from "../controllers/auth/logoutUser.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
