import { Router } from "express";
import { dbHealthCheck } from "../controllers/db.controller";

const router = Router();
router.get("/health", dbHealthCheck);

export default router;
