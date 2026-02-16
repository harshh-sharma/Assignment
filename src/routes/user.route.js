import { Router } from "express";
import { createMember, login, register } from "../controllers/user.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.post('/member', protect, isAdmin, createMember);


export default router;