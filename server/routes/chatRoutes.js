import express from "express";
import { history, sendMessage } from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.post("/history", authMiddleware, history);

export default router;