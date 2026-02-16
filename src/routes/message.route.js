import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/:groupId", protect, sendMessage);
router.get("/:groupId", protect, getMessages);

export default router;
