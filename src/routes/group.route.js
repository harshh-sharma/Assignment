import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { addMemberToGroup, createGroup, getGroups } from "../controllers/group.controller";

const router = Router();

router.post('/create', protect, isAdmin, createGroup);
router.post('/add/member', protect, isAdmin, addMemberToGroup);
router.get('/groups', protect, getGroups);

export default router;