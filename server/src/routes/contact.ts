import express, { type Request, type Response } from "express";
import ContactController from "../controllers/contact.js";

const router = express.Router();

router.get("/list", ContactController.list);

export default router;
