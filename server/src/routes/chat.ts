import express from "express";
import ChatController from "../controllers/chat.js";

const router = express.Router();

router.get("/list", ChatController.list);
router.post("/create", ChatController.create);
router.get("/:chatId", ChatController.metaData);
router.get("/:chatId/messages", ChatController.messages);

export default router;
