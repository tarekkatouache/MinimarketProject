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

router.post("/", createUser);
router.get("/", authMiddleware, requireRole(["ADMIN"]), deleteUser, getUsers);
router.get("/:id", getUserById);
router.put(
  "/:id",
  authMiddleware,
  requireRole(["ADMIN"]),
  deleteUser,
  updateUser,
);
router.delete("/:id", authMiddleware, requireRole(["ADMIN"]), deleteUser);
export default router;
