import { Router } from "express";
import { requireRole } from "../middleware/role.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", authMiddleware, requireRole(["MANAGER", "ADMIN"]), createUser);
router.get("/:id", authMiddleware, requireRole(["MANAGER", "ADMIN"]), getUsers);
router.get("/:id", getUserById);
// Update user
router.put(
  "/:id",
  authMiddleware,
  requireRole(["MANAGER", "ADMIN"]),
  updateUser,
);
// delete user
router.delete(
  "/:id",
  authMiddleware,
  requireRole(["MANAGER", "ADMIN"]),
  deleteUser,
);
export default router;
