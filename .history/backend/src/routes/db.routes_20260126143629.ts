import { Router } from "express";
import { dbHealthCheck } from "../controllers/db.controller";

const router = Router();

// build dbRoutes

router.get("/health", dbHealthCheck);

export default router;
