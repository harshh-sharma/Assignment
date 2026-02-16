import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getMessages, sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.post("/:groupId", protect, sendMessage);
router.get("/:groupId", protect, getMessages);

export default router;
