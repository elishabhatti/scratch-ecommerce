import { Router } from "express";
import { renderIndexPage } from "../controllers/renderIndexPage.controller.js";

export const router = Router();

router.get("/", renderIndexPage);
