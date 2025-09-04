import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();

router.get("/me", AuthController.me);

export default router;
