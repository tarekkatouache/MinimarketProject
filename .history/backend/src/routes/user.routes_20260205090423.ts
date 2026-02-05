import { Router } from "express";
import { authMiddleware,requireRole } from "../middleware/role.middleware";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", requireRole(["ADMIN"]), deleteUser);
export default router;
