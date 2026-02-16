import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { addMemberToGroup, createGroup, getGroups } from "../controllers/group.controller.js";

const router = Router();

router.post('/create', protect, isAdmin, createGroup);
router.post('/add/member/:groupId', protect, isAdmin, addMemberToGroup);
router.get('/groups', protect, getGroups);

export default router;